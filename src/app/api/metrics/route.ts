import { NextRequest } from "next/server";
import { validateInput } from "@/lib/analytics/model";
import { recordEvent } from "@/lib/analytics/storage";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowed = ["https://www.juansalazar.io", "https://juansalazar.io"];
  if (process.env.NODE_ENV === "development") allowed.push(request.nextUrl.origin);
  if (!origin || !allowed.includes(origin)) return new Response(null, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return new Response(null, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 1024) return new Response(null, { status: 413 });
  const text = await request.text();
  if (text.length > 1024) return new Response(null, { status: 413 });
  let input;
  try { input = validateInput(JSON.parse(text)); } catch { return new Response(null, { status: 400 }); }
  if (!input) return new Response(null, { status: 400 });
  if (/bot|crawler|spider|headless|preview/i.test(request.headers.get("user-agent") || "")) return new Response(null, { status: 204 });
  // Ignore visits from authenticated editors; never include admin activity.
  if (request.cookies.getAll().some(c => c.name.startsWith("sb-") && c.name.includes("auth-token"))) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return new Response(null, { status: 204 });
  }
  try {
    await recordEvent(input);
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Metrics unavailable", error instanceof Error ? error.message : "unknown");
    return new Response(null, { status: 503 });
  }
}
