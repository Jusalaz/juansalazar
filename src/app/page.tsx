import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import BlogCard from "@/components/BlogCard";
import BookCard from "@/components/BookCard";
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
    bg: "bg-berry",
    text: "text-berry",
  },
  {
    title: "Finanzas personales",
    description: "Decisiones de plata explicadas con números reales, no fórmulas mágicas.",
    href: "/blog?categoria=finanzas",
    bg: "bg-amber",
    text: "text-amber-dark",
  },
  {
    title: "Inteligencia artificial",
    description: "Herramientas de IA aplicadas, para gente que no programa.",
    href: "/blog?categoria=ia",
    bg: "bg-coral",
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
      <section className="py-32 text-center lg:py-44">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-coral-dark">
              Emprendimiento — Finanzas — IA
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mx-auto mt-8 max-w-5xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink text-balance sm:text-7xl lg:text-8xl">
              Claridad para tomar
              <br />
              <span className="text-berry">mejores</span> decisiones
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-lg text-lg text-muted text-balance">
              Negocio, plata e inteligencia artificial explicados sin humo,
              con la misma disciplina con la que se lee un estado financiero.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/blog" className="uppercase tracking-[0.1em]">
                Leer el blog
              </ButtonLink>
              <ButtonLink href="/recursos" variant="secondary" className="uppercase tracking-[0.1em]">
                Descargar recursos
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Pilares de contenido */}
      <section className="border-y-2 border-ink py-20">
        <Container>
          <RevealGroup className="grid divide-y-2 divide-ink/10 sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
            {pillars.map((pillar) => (
              <RevealItem key={pillar.title}>
                <Link
                  href={pillar.href}
                  className="group flex h-full flex-col items-center gap-3 px-6 py-10 text-center transition-colors hover:bg-surface-alt"
                >
                  <span className={`h-2 w-2 rounded-full ${pillar.bg}`} aria-hidden />
                  <h3 className="font-display text-xl uppercase tracking-tight text-ink">
                    {pillar.title}
                  </h3>
                  <p className="max-w-[22ch] text-sm text-muted">{pillar.description}</p>
                  <span className={`mt-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] ${pillar.text}`}>
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
      <section className="border-t-2 border-ink bg-surface-alt py-28">
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
            <div className="relative overflow-hidden rounded-2xl bg-berry px-8 py-16 text-center sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-coral/25 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-coral/20 blur-3xl"
              />
              <h2 className="relative font-display text-4xl text-white text-balance sm:text-5xl">
                Plantillas y recursos gratis
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-base text-white/80 text-balance">
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
