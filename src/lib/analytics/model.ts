export const eventTypes = ["pageview", "blog_read", "download", "budget_save"] as const;
export type EventType = typeof eventTypes[number];
export type MetricEvent = { type: EventType; path: string; visitor: string; session: string; day: string };
export type MetricInput = Omit<MetricEvent, "day">;
export const BUDGET_PATH = "/herramientas/presupuesto.html";
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

export function publicPath(path: string) {
  return ["/", "/blog", "/recursos", "/libros", "/contacto", BUDGET_PATH].includes(path)
    || /^\/(blog|libros)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(path);
}

export function validateInput(value: unknown): MetricInput | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (!eventTypes.includes(v.type as EventType) || typeof v.path !== "string" || v.path.length > 160 || !publicPath(v.path)) return null;
  if (typeof v.visitor !== "string" || typeof v.session !== "string" || !uuid.test(v.visitor) || !uuid.test(v.session)) return null;
  if (v.type === "blog_read" && !v.path.startsWith("/blog/")) return null;
  if ((v.type === "download" || v.type === "budget_save") && v.path !== BUDGET_PATH) return null;
  return { type: v.type as EventType, path: v.path, visitor: v.visitor, session: v.session };
}

export function bogotaDay(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function daysInPeriod(count: number, now = new Date()) {
  const today = new Date(`${bogotaDay(now)}T12:00:00-05:00`);
  return Array.from({ length: count }, (_, i) => bogotaDay(new Date(today.getTime() - (count - 1 - i) * 86400000)));
}

export function summarize(events: MetricEvent[], days: string[]) {
  const within = events.filter(e => days.includes(e.day));
  const views = within.filter(e => e.type === "pageview");
  const reads = within.filter(e => e.type === "blog_read");
  const downloads = within.filter(e => e.type === "download" || e.type === "budget_save");
  const unique = (rows: MetricEvent[], key: "visitor" | "session") => new Set(rows.map(e => e[key])).size;
  const blogs = [...new Set(within.filter(e => e.path.startsWith("/blog/")).map(e => e.path))].map(path => {
    const opened = views.filter(e => e.path === path);
    const read = reads.filter(e => e.path === path);
    return { path, opens: opened.length, readers: unique(read, "visitor"), reads: read.length };
  }).sort((a, b) => b.opens - a.opens);
  return {
    visitors: unique(views, "visitor"), visits: unique(views, "session"),
    downloaders: unique(downloads, "visitor"), downloads: downloads.length,
    templateDownloads: downloads.filter(e => e.type === "download").length,
    savedCopies: downloads.filter(e => e.type === "budget_save").length,
    readers: unique(reads, "visitor"), reads: reads.length, blogs,
    pages: [...new Set(views.map(e => e.path))].map(path => ({ path, views: views.filter(e => e.path === path).length })).sort((a, b) => b.views - a.views),
    daily: days.map(day => ({ day, visits: unique(views.filter(e => e.day === day), "session"), downloads: downloads.filter(e => e.day === day).length })),
  };
}
