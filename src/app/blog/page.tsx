import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import EmptyState from "@/components/EmptyState";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";
import { getPublishedPosts, postCategories, type PostCategory } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos sobre emprendimiento, finanzas personales e IA aplicada.",
};

export const revalidate = 0;

type Props = { searchParams: Promise<{ categoria?: string }> };

function isPostCategory(value: string | undefined): value is PostCategory {
  return postCategories.some((c) => c.value === value);
}

export default async function BlogPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const activeCategory = isPostCategory(categoria) ? categoria : undefined;
  const posts = await getPublishedPosts(activeCategory);

  return (
    <>
      <PageIntro eyebrow="01 / El blog" title="Ideas para pensar." accent="Y para hacer." description="Negocio, plata e inteligencia artificial, sin vueltas. Lo que aprendo, lo que pruebo y lo que vale la pena compartir." />

      <section className="py-14 sm:py-20">
        <Container>
          <Reveal className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              aria-current={!activeCategory ? "page" : undefined}
              className={`rounded-full border-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                !activeCategory
                  ? "border-ink bg-inverse text-white"
                  : "border-ink/15 text-muted hover:border-ink hover:text-ink"
              }`}
            >
              Todo
            </Link>
            {postCategories.map((cat) => (
              <Link
                key={cat.value}
                href={`/blog?categoria=${cat.value}`}
                aria-current={activeCategory === cat.value ? "page" : undefined}
                className={`rounded-full border-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                  activeCategory === cat.value
                    ? "border-ink bg-inverse text-white"
                    : "border-ink/15 text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </Reveal>

          {posts.length > 0 ? (
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <RevealItem key={post.slug}>
                  <BlogCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <div className="mt-10"><EmptyState title="Las próximas ideas están en camino." description="Mientras llega un nuevo artículo, puedes poner manos a la obra con las herramientas y plantillas gratuitas." /></div>
          )}
        </Container>
      </section>
    </>
  );
}
