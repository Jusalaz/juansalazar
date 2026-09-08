import Link from "next/link";
import { Book } from "@/lib/data/books";

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5 text-amber" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden>
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/libros/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-ink/10 bg-surface transition-all duration-300 hover:-translate-y-2 hover:border-ink sm:flex-row"
    >
      {book.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.cover_image_url}
          alt=""
          className="aspect-[3/4] w-full object-cover sm:w-40 sm:shrink-0"
        />
      ) : (
        <div className="aspect-[3/4] w-full bg-gradient-to-br from-berry via-coral to-amber sm:w-40 sm:shrink-0" />
      )}
      <div className="flex flex-1 flex-col p-7">
        <Stars rating={book.rating} />
        <h3 className="mt-3 font-display text-xl text-ink text-balance">
          {book.title}
        </h3>
        <p className="text-sm text-muted">{book.author}</p>
        <p className="mt-3 flex-1 text-sm text-muted line-clamp-3">
          {book.review}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Ver reseña
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
