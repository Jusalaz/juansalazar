import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { getBookBySlug } from "@/lib/data/books";

export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};
  return { title: book.title, description: `Reseña de ${book.title}, de ${book.author}` };
}

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex gap-1 text-lg text-amber" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden>
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const paragraphs = book.review.split("\n").filter((p) => p.trim() !== "");

  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <Link href="/libros" className="text-sm font-semibold text-accent hover:text-ink">
            ← Volver a libros
          </Link>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row">
            {book.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.cover_image_url}
                alt=""
                className="aspect-[3/4] w-40 shrink-0 rounded-2xl border-2 border-ink/10 object-cover"
              />
            ) : (
              <div className="aspect-[3/4] w-40 shrink-0 rounded-2xl bg-gradient-to-br from-berry via-coral to-amber" />
            )}
            <div>
              <Stars rating={book.rating} />
              <h1 className="mt-3 font-display text-4xl text-ink text-balance sm:text-5xl">
                {book.title}
              </h1>
              <p className="mt-2 text-muted">{book.author}</p>
              {book.link_url ? (
                <a
                  href={book.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-ink"
                >
                  Ver libro →
                </a>
              ) : null}
            </div>
          </div>

          <div className="reading-body mt-12 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-[1.85] text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
