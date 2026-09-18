"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import DiamondMark from "@/components/DiamondMark";

const navLinks = [{ href: "/", label: "Inicio" }, { href: "/blog", label: "Blog" }, { href: "/libros", label: "Libros" }, { href: "/recursos", label: "Recursos" }];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-inverse/95 text-white backdrop-blur-xl" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label="Juan Salazar, inicio">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20"><DiamondMark className="h-3.5 w-3.5 border-lime" /></span>
          <span className="font-display text-lg font-semibold tracking-tight">Juan Salazar<span className="text-coral">.</span></span>
        </Link>
        <nav aria-label="Navegación principal" className="hidden items-center gap-1 rounded-full border border-white/10 p-1 lg:flex">
          {navLinks.map((link) => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined} className={`rounded-full px-5 py-2 text-xs font-medium transition-colors ${active(link.href) ? "bg-white text-inverse" : "text-white/65 hover:bg-white/10 hover:text-white"}`}>{link.label}</Link>)}
        </nav>
        <Link href="/contacto" className="hidden items-center gap-5 rounded-full bg-lime px-5 py-3 text-xs font-semibold text-inverse transition-colors hover:bg-white lg:inline-flex">Hablemos <span aria-hidden="true">↗</span></Link>
        <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 lg:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span aria-hidden="true" className="text-xl">{open ? "×" : "☰"}</span></button>
      </Container>
      {open ? <nav id="mobile-navigation" aria-label="Navegación móvil" className="border-t border-white/10 lg:hidden"><Container className="grid gap-2 py-4">{[...navLinks, { href: "/contacto", label: "Hablemos ↗" }].map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={active(link.href) ? "page" : undefined} className={`rounded-xl px-4 py-3 text-sm ${active(link.href) ? "bg-lime text-inverse" : "text-white/80 hover:bg-white/10"}`}>{link.label}</Link>)}</Container></nav> : null}
    </header>
  );
}
