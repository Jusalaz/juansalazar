import Link from "next/link";
import Container from "@/components/Container";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return <footer className="bg-inverse text-white">
    <Container className="pt-14 pb-7 sm:pt-20">
      <div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-12 sm:flex-row sm:items-end">
        <div><p className="eyebrow text-white/50">La siguiente idea empieza conversando</p><p className="mt-5 font-display text-5xl leading-none tracking-tight sm:text-7xl">Hagamos que<br /><span className="text-lime">pase algo.</span></p></div>
        <Link href="/contacto" aria-label="Hablemos, ir a contacto" className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-coral text-4xl text-inverse transition-transform hover:-rotate-12">↗</Link>
      </div>
      <div className="grid gap-8 py-10 sm:grid-cols-2">
        <div><Link href="/" className="font-display text-2xl font-semibold tracking-tight">Juan Salazar<span className="text-coral">.</span></Link><p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">Negocio, plata e IA. Un punto de vista para gente en movimiento.</p><SocialLinks className="mt-5" /></div>
        <nav aria-label="Navegación del pie de página" className="flex flex-wrap items-start gap-x-7 gap-y-4 sm:justify-end">{[{href:"/blog",label:"Blog"},{href:"/libros",label:"Libros"},{href:"/recursos",label:"Recursos"},{href:"/contacto",label:"Contacto"}].map(link => <Link key={link.href} href={link.href} className="py-2 text-sm text-white/70 hover:text-lime">{link.label}</Link>)}</nav>
      </div>
      <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Juan Salazar</p><a href="mailto:contacto@juansalazar.com" className="hover:text-white">contacto@juansalazar.com ↗</a></div>
    </Container>
  </footer>;
}
