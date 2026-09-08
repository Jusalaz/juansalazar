"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import Logo from "@/components/Logo";

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
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-9 w-9" />
          <span>
            <span className="block font-display text-xl text-ink">Juan Salazar</span>
            <span className="block font-mono text-[0.65rem] uppercase tracking-[0.15em] text-coral-dark">
              Emprendimiento · Finanzas · IA
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
          {navLinks.map((link, index) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <span key={link.href} className="flex items-center gap-1">
                {index > 0 ? <span className="text-border">/</span> : null}
                <Link
                  href={link.href}
                  className={`group relative px-2 py-1 uppercase tracking-[0.05em] transition-colors ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-2 right-2 h-[2px] origin-left rounded-full bg-coral transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </span>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <ButtonLink href="/contacto" variant="primary">
            Contacto
          </ButtonLink>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-ink"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <svg
            width="24"
            height="24"
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
        <div className="lg:hidden border-t border-border bg-background">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-surface-alt"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-inverse px-6 py-3 text-center text-sm font-medium text-white"
            >
              Contacto
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
