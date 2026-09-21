import type { Metadata } from "next";
import Link from "next/link";
import { requireOwner } from "@/lib/auth/admin";
import { getReport } from "@/lib/analytics/storage";
import { bogotaDay } from "@/lib/analytics/model";
import { getPublishedPosts } from "@/lib/data/posts";
import { signOut } from "@/app/admin/actions";

export const metadata: Metadata = { title: "Tu sitio en números", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
const number = (n: number) => new Intl.NumberFormat("es-CO").format(n);

export default async function AdminSalazar({ searchParams }: { searchParams: Promise<{ periodo?: string }> }) {
  await requireOwner();
  const params = await searchParams;
  const period = ["7", "30"].includes(params.periodo || "") ? Number(params.periodo) : 7;
  const [report, posts] = await Promise.all([getReport(period, bogotaDay()).catch(error => { console.error("Analytics report failed", error instanceof Error ? error.message : "unknown"); return null; }), getPublishedPosts()]);
  const titles = new Map(posts.map(p => [`/blog/${p.slug}`, p.title]));
  const maxVisits = Math.max(1, ...(report?.daily.map(d => d.visits) || []));
  return <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
    <div className="flex flex-wrap items-start justify-between gap-6">
      <div><p className="eyebrow text-coral-dark">Solo para ti / Panel privado</p><h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">Tu sitio en números<span className="text-coral">.</span></h1><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">Quién llega, qué historias lee y quién se lleva la plantilla. Datos desde que activamos la medición.</p></div>
      <div className="flex flex-wrap items-center gap-5 text-sm"><Link href="/admin" className="font-semibold underline underline-offset-4">Gestionar contenido</Link><form action={signOut}><button className="min-h-11 text-muted hover:text-ink">Cerrar sesión</button></form></div>
    </div>
    <div className="my-9 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4">
      <nav aria-label="Período de métricas" className="flex gap-2">{[7, 30].map(days => <Link key={days} href={`/adminsalazar?periodo=${days}`} aria-current={period === days ? "page" : undefined} className={`rounded-full px-5 py-3 text-sm font-semibold ${period === days ? "bg-inverse text-white" : "bg-surface hover:bg-lime/25"}`}>Últimos {days} días</Link>)}</nav>
      <p className="text-xs text-muted">Hora de Colombia · Se actualiza al recargar, hasta 1 min de demora</p>
    </div>
    {!report ? <div role="alert" className="rounded-3xl border border-coral/30 bg-coral/10 p-8"><h2 className="font-display text-2xl">No pudimos cargar las métricas.</h2><p className="mt-3 text-sm">Intenta recargar en un momento. No mostramos ceros cuando la fuente de datos falla.</p></div> : <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
        { label: "Visitas", value: report.visits, note: "Sesiones de navegación" },
        { label: "Visitantes", value: report.visitors, note: "Navegadores únicos · aproximado" },
        { label: "Personas que descargan", value: report.downloaders, note: `${number(report.downloads)} descargas o copias iniciadas` },
        { label: "Lectores de artículos", value: report.readers, note: `${number(report.reads)} lecturas estimadas` },
      ].map((card, i) => <div key={card.label} className={`rounded-3xl border border-ink/10 p-6 ${i === 0 ? "bg-inverse text-white" : "bg-surface"}`}><p className={`text-sm ${i === 0 ? "text-white/70" : "text-muted"}`}>{card.label}</p><p className={`mt-5 font-display text-5xl tracking-tight ${i === 0 ? "text-lime" : ""}`}>{number(card.value)}</p><p className={`mt-4 text-xs ${i === 0 ? "text-white/60" : "text-muted"}`}>{card.note}</p></div>)}</div>
      {report.visits === 0 && <p className="mt-6 rounded-2xl bg-lime/20 p-5 text-sm leading-relaxed">Todavía no hay visitas registradas en este período. Los números aparecerán con las próximas visitas; tu actividad con sesión de administrador no se cuenta.</p>}
      <section className="mt-8 rounded-3xl border border-ink/10 bg-surface p-6 sm:p-8">
        <h2 className="font-display text-2xl">Cómo vienen las visitas</h2>
        <div className="mt-7 flex h-44 items-end gap-1 sm:gap-2" role="img" aria-label={`Visitas diarias en los últimos ${period} días; detalle numérico disponible debajo.`}>{report.daily.map(day => <div key={day.day} className="group relative flex h-full min-w-0 flex-1 items-end"><div className="w-full rounded-t-md bg-lime transition-colors group-hover:bg-coral" style={{ height: `${day.visits ? Math.max(3, day.visits / maxVisits * 100) : 0}%` }} /><span className="sr-only">{day.day}: {day.visits} visitas.</span></div>)}</div>
        <div className="mt-3 flex justify-between font-mono text-[10px] text-muted"><span>{report.daily[0]?.day}</span><span>{report.daily.at(-1)?.day}</span></div>
        <details className="mt-6 text-sm"><summary className="cursor-pointer font-semibold">Ver cifras por día</summary><div className="mt-4 overflow-x-auto"><table className="w-full text-left"><caption className="sr-only">Visitas y descargas diarias</caption><thead><tr className="border-b border-ink/10"><th scope="col" className="py-3">Fecha</th><th scope="col">Visitas</th><th scope="col">Descargas</th></tr></thead><tbody>{report.daily.map(d => <tr key={d.day} className="border-b border-ink/5"><td className="py-2">{d.day}</td><td>{number(d.visits)}</td><td>{number(d.downloads)}</td></tr>)}</tbody></table></div></details>
      </section>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section className="min-w-0 rounded-3xl border border-ink/10 bg-surface p-6 sm:p-8"><h2 className="font-display text-2xl">Las historias que más leen</h2><p className="mt-2 text-xs leading-relaxed text-muted">Abrir un artículo y leerlo son señales distintas.</p><div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Aperturas y lecturas por artículo</caption><thead><tr className="border-b border-ink/15 text-xs text-muted"><th scope="col" className="pb-3 pr-4">Artículo</th><th scope="col" className="pb-3 pr-4 text-right">Aperturas</th><th scope="col" className="pb-3 text-right">Lectores</th></tr></thead><tbody>{report.blogs.map(post => <tr key={post.path} className="border-b border-ink/10"><th scope="row" className="py-4 pr-4 font-medium"><Link href={post.path} className="hover:text-coral-dark">{titles.get(post.path) || post.path.replace('/blog/', '')}</Link></th><td className="text-right">{number(post.opens)}</td><td className="text-right">{number(post.readers)}</td></tr>)}</tbody></table>{report.blogs.length === 0 && <p className="py-8 text-sm text-muted">Todavía no hay actividad en los artículos.</p>}</div></section>
        <section className="rounded-3xl bg-lime/25 p-6 sm:p-8"><p className="eyebrow text-lime-dark">Plantilla de presupuesto</p><h2 className="mt-4 font-display text-2xl">De la visita a la descarga.</h2><dl className="mt-6 space-y-5 text-sm"><div className="flex justify-between gap-3"><dt>Descargar plantilla</dt><dd className="font-semibold">{number(report.templateDownloads)}</dd></div><div className="flex justify-between gap-3"><dt>Guardar copia desde la herramienta</dt><dd className="font-semibold">{number(report.savedCopies)}</dd></div><div className="flex justify-between gap-3 border-t border-ink/15 pt-5"><dt>Navegadores únicos que descargan</dt><dd className="font-semibold">{number(report.downloaders)}</dd></div></dl><p className="mt-6 text-xs leading-relaxed text-ink-soft">Medimos cuando alguien inicia la descarga. El navegador no confirma si finalmente guardó el archivo. Las copias abiertas sin conexión no envían datos.</p></section>
      </div>
      <section className="mt-8 rounded-3xl border border-ink/10 bg-surface p-6 sm:p-8"><h2 className="font-display text-2xl">Páginas que visitan</h2><ul className="mt-5 divide-y divide-ink/10">{report.pages.slice(0, 15).map(p => <li key={p.path} className="flex justify-between gap-4 py-3 text-sm"><span className="break-all">{p.path}</span><span className="font-mono">{number(p.views)}</span></li>)}</ul>{!report.pages.length && <p className="mt-4 text-sm text-muted">Las páginas aparecerán con las primeras visitas.</p>}</section>
    </>}
    <section className="mt-10 text-xs leading-relaxed text-muted"><h2 className="font-semibold text-ink">Cómo leer estos números</h2><p className="mt-2">Una visita es una sesión; después de 30 minutos sin actividad empieza otra. Contamos una apertura, lectura o descarga por sesión, página y día. Una lectura estimada requiere al menos 30 segundos con la pestaña visible y haber llegado al 75 % del artículo.</p><p className="mt-2">Los visitantes se aproximan con un identificador del navegador que caduca tras 30 días sin actividad. Otro dispositivo, borrar el almacenamiento o bloquear la medición puede cambiar los conteos. Respetamos «No rastrear» y excluimos las rutas de administración. No recogemos nombres, correos, IP ni valores del presupuesto.</p><p className="mt-2">Este panel usa la medición propia del sitio. Vercel Analytics mantiene su medición independiente; sus cifras pueden diferir.</p></section>
  </div>;
}
