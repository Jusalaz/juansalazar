import "server-only";
import { createHmac } from "node:crypto";
import { unstable_cache } from "next/cache";
import { bogotaDay, daysInPeriod, summarize, type MetricEvent, type MetricInput } from "./model";

const BUCKET = "site-analytics";

async function storage(path: string, init: RequestInit = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!key || !base) throw new Error("Analytics storage is not configured");
  return fetch(`${base}/storage/v1/${path}`, {
    ...init, cache: "no-store", signal: AbortSignal.timeout(10000),
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...init.headers },
  });
}

// Deterministic object names make retries / concurrent tabs idempotent.
// Raw browser identifiers, IPs and financial data are never stored.
export function eventFile(input: MetricInput, day = bogotaDay()) {
  const hash = (value: string) => createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY!).update(`site-analytics:${value}`).digest("hex").slice(0, 32);
  const event: MetricEvent = { ...input, day, visitor: hash(input.visitor), session: hash(input.session) };
  const name = Buffer.from(JSON.stringify([event.type, event.path, event.visitor, event.session])).toString("base64url") + ".json";
  return { event, key: `${day}/${name}` };
}

export async function recordEvent(input: MetricInput) {
  const { event, key } = eventFile(input);
  const response = await storage(`object/${BUCKET}/${key}`, { method: "POST", body: JSON.stringify(event), headers: { "x-upsert": "false" } });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (response.status === 409 || error.code === "Duplicate" || error.statusCode === "409") return;
    throw new Error(`Analytics write failed (${response.status})`);
  }
}

async function eventsForDay(day: string) {
  const events: MetricEvent[] = [];
  for (let offset = 0; offset < 100000; offset += 1000) {
    const response = await storage(`object/list/${BUCKET}`, {
      method: "POST", body: JSON.stringify({ prefix: `${day}/`, limit: 1000, offset, sortBy: { column: "name", order: "asc" } }),
    });
    if (!response.ok) throw new Error(`Analytics read failed (${response.status})`);
    const files: { name: string; id: string | null }[] = await response.json();
    for (const file of files) {
      if (!file.id || !file.name.endsWith(".json")) continue;
      try {
        const [type, path, visitor, session] = JSON.parse(Buffer.from(file.name.slice(0, -5), "base64url").toString());
        if (["pageview", "blog_read", "download", "budget_save"].includes(type) && typeof path === "string" && typeof visitor === "string" && typeof session === "string") events.push({ type, path, visitor, session, day });
      } catch { /* Ignore non-event files, e.g. setup verification objects. */ }
    }
    if (files.length < 1000) return events;
  }
  throw new Error("Analytics volume exceeded the report limit; report was not truncated silently");
}

// Authorization belongs to the caller, before this shared server-side cache.
export const getReport = unstable_cache(async (period: number, today: string) => {
  const days = daysInPeriod(period, new Date(`${today}T12:00:00-05:00`));
  const events: MetricEvent[] = [];
  // Bound concurrency to avoid flooding Storage on a cold report.
  for (let i = 0; i < days.length; i += 5) {
    const batch = await Promise.all(days.slice(i, i + 5).map(eventsForDay));
    events.push(...batch.flat());
  }
  return summarize(events, days);
}, ["site-analytics-v1"], { revalidate: 60 });
