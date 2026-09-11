"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import DiamondMark from "@/components/DiamondMark";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/libros", label: "Libros" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre-mi", label: "Sobre mí" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-inverse text-white">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <DiamondMark className="h-3 w-3 border-coral" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em]">
            Juan Salazar
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[0.7rem] uppercase tracking-[0.15em] transition-colors ${
                  active ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] transition-colors hover:border-white"
          >
            Hablemos
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <div className="lg:hidden border-t border-white/10 bg-inverse">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 font-mono text-xs uppercase tracking-[0.1em] text-white/80 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-white/30 px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.1em] text-white"
            >
              Hablemos
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
