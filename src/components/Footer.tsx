import Link from "next/link";
import Container from "@/components/Container";
import DiamondMark from "@/components/DiamondMark";
import SocialLinks from "@/components/SocialLinks";

const columns = [
  {
    title: "Contenido",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/libros", label: "Libros" },
      { href: "/recursos", label: "Recursos" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-inverse text-white">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <DiamondMark className="h-3.5 w-3.5 border-coral" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em]">
                Juan Salazar
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Contenido sobre emprendimiento, finanzas personales e
              inteligencia artificial: artículos, libros y recursos gratis.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-coral">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-xs uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Juan Salazar. Todos los derechos reservados.</p>
          <p>contacto@juansalazar.com</p>
        </div>
      </Container>
    </footer>
  );
}
