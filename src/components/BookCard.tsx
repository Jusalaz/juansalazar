import Link from "next/link";
import { Book } from "@/lib/data/books";

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5 text-amber-dark" aria-label={`${rating} de 5 estrellas`}>
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
      className="content-card group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 sm:flex-row"
    >
      {book.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.cover_image_url}
          alt=""
          loading="lazy" className="aspect-[3/4] w-full object-cover sm:w-40 sm:shrink-0"
        />
      ) : (
        <div className="book-cover flex aspect-[3/4] w-full flex-col justify-between bg-lime p-6 text-inverse sm:w-40 sm:shrink-0" aria-hidden="true"><span className="font-mono text-[9px] uppercase tracking-widest">En mi biblioteca</span><span className="font-display text-2xl leading-tight">{book.title}</span><span className="text-xs">{book.author}</span></div>
      )}
      <div className="flex min-w-0 flex-1 flex-col p-7">
        <Stars rating={book.rating} />
        <h3 className="mt-3 font-display text-2xl leading-tight text-ink text-balance">
          {book.title}
        </h3>
        <p className="text-sm text-muted">{book.author}</p>
        <p className="mt-3 flex-1 text-sm text-muted line-clamp-3">
          {book.review}
        </p>
        <span className="mt-5 text-sm font-semibold text-coral-dark">Leer reseña <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  );
}
