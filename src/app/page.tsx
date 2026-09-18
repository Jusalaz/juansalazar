import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import BookCard from "@/components/BookCard";
import BudgetFeature from "@/components/BudgetFeature";
import EmptyState from "@/components/EmptyState";
import HomeHero from "@/components/HomeHero";
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
      <HomeHero />

      <section id="descubre" className="scroll-mt-24 py-16 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <p className="eyebrow text-coral-dark">01 / Lo que vas a encontrar</p>
            <div><h2 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">Aprender está bien.<br /><span className="text-muted">Hacer algo con eso, mejor.</span></h2><p className="mt-6 max-w-xl text-base leading-relaxed text-muted">Esta es mi bitácora construyendo una startup, organizando mi plata y probando qué puede hacer la IA. Comparto el proceso, con sus aciertos y sus errores.</p></div>
          </div>
        </Container>
      </section>

      {/* Pilares de contenido */}
      <section className="border-y border-ink/15">
        <Container>
          <RevealGroup className="grid divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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
      <section className="bg-surface-alt py-16 sm:py-24">
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
            <div className="mt-10"><EmptyState title="Nuevas ideas, muy pronto." description="Mientras preparo los próximos artículos, prueba una herramienta que puedes usar desde hoy." /></div>
          )}
        </Container>
      </section>

      {/* Libros preview */}
      <section className="py-16 sm:py-24">
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
            <div className="mt-10"><EmptyState title="Las buenas lecturas se comparten." description="Estoy preparando las primeras reseñas. Mientras tanto, explora ideas de negocio, plata e IA." href="/blog" action="Ir al blog" /></div>
          )}
        </Container>
      </section>

      <section className="pb-16 sm:pb-24"><Container><BudgetFeature /></Container></section>
    </>
  );
}
