import Link from "next/link";

export default function EmptyState({ title, description, href = "/recursos", action = "Explorar recursos" }: { title: string; description: string; href?: string; action?: string }) {
  return <div className="rounded-3xl border border-dashed border-ink/20 bg-surface/60 px-6 py-14 text-center">
    <span aria-hidden="true" className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime font-display text-3xl">↗</span>
    <h3 className="mt-5 font-display text-2xl tracking-tight">{title}</h3>
    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">{description}</p>
    <Link href={href} className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold underline underline-offset-8">{action} <span aria-hidden="true">→</span></Link>
  </div>;
}
