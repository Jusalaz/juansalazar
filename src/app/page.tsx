import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import BlogCard from "@/components/BlogCard";
import BookCard from "@/components/BookCard";
import Marquee from "@/components/Marquee";
import DiamondMark from "@/components/DiamondMark";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";
import { getPublishedPosts } from "@/lib/data/posts";
import { getPublishedBooks } from "@/lib/data/books";

export const revalidate = 0;

const pillars = [
  {
    title: "Emprendimiento",
    description: "Cómo se construye y se sostiene un negocio, desde adentro.",
    href: "/blog?categoria=emprendimiento",
    text: "text-berry",
  },
  {
    title: "Finanzas personales",
    description: "Decisiones de plata explicadas con números reales, no fórmulas mágicas.",
    href: "/blog?categoria=finanzas",
    text: "text-amber-dark",
  },
  {
    title: "Inteligencia artificial",
    description: "Herramientas de IA aplicadas, para gente que no programa.",
    href: "/blog?categoria=ia",
    text: "text-coral-dark",
  },
];

export default async function Home() {
  const [posts, books] = await Promise.all([
    getPublishedPosts(),
    getPublishedBooks(),
  ]);

  const latestPosts = posts.slice(0, 3);
  const latestBooks = books.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-inverse text-white">
        <Container className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div
            aria-hidden
            className="pointer-events-none absolute right-6 top-6 hidden sm:block"
          >
            <DiamondMark className="h-16 w-16 border-coral/50" />
          </div>

          <Reveal>
            <p className="max-w-sm font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              Juan Salazar — un punto de vista para gente en movimiento
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-8 font-display uppercase leading-[0.82] tracking-tight">
              <span className="block text-5xl sm:text-6xl lg:text-7xl">Claridad</span>
              <span className="block pl-[0.4em] text-7xl text-coral sm:text-8xl lg:text-9xl">
                para
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">decisiones</span>
              <span className="block text-8xl sm:text-9xl lg:text-[11rem]">
                <span className="text-lime">reales</span>
                <span className="text-coral">.</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-coral" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                  Desliza
                </span>
              </div>
              <p className="max-w-sm text-sm text-white/70">
                <span
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-lime align-middle"
                  aria-hidden
                />
                Negocio, plata e inteligencia artificial explicados sin humo,
                con la misma disciplina con la que se lee un estado financiero.
              </p>
            </div>
          </Reveal>
        </Container>

        <Reveal delay={0.3}>
          <div className="border-t border-white/10 bg-lime py-3 text-inverse">
            <Marquee
              items={["EMPRENDIMIENTO", "FINANZAS", "IA", "SIN HUMO", "DECISIONES CLARAS"]}
            />
          </div>
        </Reveal>
      </section>

      {/* Premisa */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-coral-dark">
              01 / Mi premisa
            </p>
          </Reveal>
          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={0.06}>
              <h2 className="font-display leading-[0.85] tracking-tight text-ink">
                <span className="block text-2xl sm:text-3xl">Menos teoría. Más</span>
                <span className="block text-7xl text-coral sm:text-8xl lg:text-9xl">
                  decisiones
                </span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl">
                  <span className="text-lime">reales</span>
                  <span className="text-coral">.</span>
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="flex flex-col gap-6">
                <p className="text-lg text-muted">
                  Comparto cómo se ven de verdad las decisiones de negocio,
                  plata e IA — no la versión pulida para LinkedIn.
                </p>
                <div className="border-l-2 border-coral pl-5">
                  <p className="text-sm text-muted">
                    No es consultoría genérica: es la bitácora de alguien
                    construyendo una startup mientras aprende a manejar su
                    propia plata.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Pilares de contenido */}
      <section className="border-y-2 border-ink">
        <Container>
          <RevealGroup className="grid divide-y-2 divide-ink/10 sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
            {pillars.map((pillar, index) => (
              <RevealItem key={pillar.title}>
                <Link
                  href={pillar.href}
                  className="group relative flex h-full flex-col gap-3 overflow-hidden px-6 py-12 transition-colors hover:bg-surface-alt"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-8 -right-2 select-none font-display text-[9rem] leading-none text-ink/[0.04] transition-colors group-hover:text-ink/[0.07]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`relative font-mono text-xs ${pillar.text}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative font-display text-2xl leading-none text-ink">
                    {pillar.title}
                  </h3>
                  <p className="relative max-w-[26ch] text-sm text-muted">{pillar.description}</p>
                  <span className={`relative mt-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] ${pillar.text}`}>
                    Explorar
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Blog preview */}
      <section className="bg-surface-alt py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Blog"
                title="Últimos artículos"
                description="Ideas breves y accionables sobre emprendimiento, finanzas e IA."
              />
              <Link
                href="/blog"
                className="text-sm font-semibold text-accent hover:text-ink whitespace-nowrap"
              >
                Ver todo el blog →
              </Link>
            </div>
          </Reveal>

          {latestPosts.length > 0 ? (
            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <RevealItem key={post.slug}>
                  <BlogCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-12 text-muted">Muy pronto, el primer artículo.</p>
          )}
        </Container>
      </section>

      {/* Libros preview */}
      <section className="py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Libros"
                title="Lo que estoy leyendo"
                description="Reseñas honestas de libros sobre negocio, plata e IA."
              />
              <Link
                href="/libros"
                className="text-sm font-semibold text-accent hover:text-ink whitespace-nowrap"
              >
                Ver todos los libros →
              </Link>
            </div>
          </Reveal>

          {latestBooks.length > 0 ? (
            <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
              {latestBooks.map((book) => (
                <RevealItem key={book.slug}>
                  <BookCard book={book} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-12 text-muted">Muy pronto, la primera reseña.</p>
          )}
        </Container>
      </section>

      {/* Recursos CTA */}
      <section className="pb-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-inverse px-8 py-16 text-center sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-coral/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-lime/15 blur-3xl"
              />
              <h2 className="relative font-display leading-[0.95] tracking-tight text-white">
                <span className="block text-4xl sm:text-5xl">Plantillas y recursos</span>
                <span className="block text-6xl text-lime sm:text-7xl">gratis.</span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-base text-white/70 text-balance">
                Excel para presupuesto, documentos y cursos cortos que puedes
                descargar y empezar a usar hoy mismo.
              </p>
              <div className="relative mt-8">
                <ButtonLink href="/recursos" variant="accent">
                  Ver recursos
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
