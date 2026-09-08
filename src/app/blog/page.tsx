import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
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
      <section className="border-b-2 border-ink bg-surface-alt py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Blog"
              title="Negocio, plata e IA"
              description="Artículos cortos y directos sobre construir un negocio, tomar mejores decisiones con tu plata, y usar la IA para resolver problemas reales."
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
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
                className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
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
            <p className="mt-10 text-center text-muted">
              Todavía no hay artículos en esta categoría.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
