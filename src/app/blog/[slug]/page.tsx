import KuddosStory from "@/components/KuddosStory";
import { kuddosPost } from "@/content/kuddos";
import type { ComponentType } from "react";
import AfectusStory from "@/components/AfectusStory";
import { afectusPost } from "@/content/afectus";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { getPostBySlug, categoryLabel, categoryBadgeClass } from "@/lib/data/posts";

export const revalidate = 0;

const editorialStories: Record<string, ComponentType> = {
  [afectusPost.slug]: AfectusStory,
  [kuddosPost.slug]: KuddosStory,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "afectus-mi-primer-emprendimiento") {
    permanentRedirect(`/blog/${afectusPost.slug}`);
  }
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
  if (slug === "afectus-mi-primer-emprendimiento") {
    permanentRedirect(`/blog/${afectusPost.slug}`);
  }
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const Story = editorialStories[post.slug];
  const paragraphs = post.content.split("\n").filter((p) => p.trim() !== "");

  return (
    <>
      <section className="border-b border-ink/10 bg-surface-alt py-14 sm:py-20">
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
            <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-muted">Por Juan Salazar</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <Reveal>
            {post.cover_image_url && !Story ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.cover_image_url}
                alt=""
                className="mb-10 aspect-[16/9] w-full rounded-2xl border-2 border-ink/10 object-cover"
              />
            ) : null}
            {Story ? <Story /> : <div className="reading-body space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg leading-[1.85] text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
