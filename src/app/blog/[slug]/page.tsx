import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { getPostBySlug, categoryLabel, categoryBadgeClass } from "@/lib/data/posts";

export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n").filter((p) => p.trim() !== "");

  return (
    <>
      <section className="border-b-2 border-ink bg-surface-alt py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <Link href="/blog" className="text-sm font-semibold text-accent hover:text-ink">
              ← Volver al blog
            </Link>
            <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em]">
              <span className={`rounded px-2 py-1 ${categoryBadgeClass[post.category]}`}>
                {categoryLabel(post.category)}
              </span>
              <span className="text-muted">{formatDate(post.created_at)}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl text-ink text-balance sm:text-5xl">
              {post.title}
            </h1>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <Reveal>
            {post.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.cover_image_url}
                alt=""
                className="mb-10 aspect-[16/9] w-full rounded-2xl border-2 border-ink/10 object-cover"
              />
            ) : null}
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
