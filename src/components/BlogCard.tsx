import Link from "next/link";
import { Post, categoryLabel, categoryBadgeClass } from "@/lib/data/posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="content-card group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-ink/30"
    >
      {post.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt=""
          loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className={`editorial-cover cover-${post.category}`} aria-hidden="true"><span className="eyebrow relative z-10">{categoryLabel(post.category)}</span><span className="cover-symbol">{post.category === "ia" ? "✳" : post.category === "finanzas" ? "+" : "↗"}</span><span className="relative z-10 font-mono text-[10px] uppercase tracking-widest">Un punto de vista / JS.</span></div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em]">
          <span className={`rounded px-2 py-1 ${categoryBadgeClass[post.category]}`}>
            {categoryLabel(post.category)}
          </span>
          <span className="text-muted">{formatDate(post.created_at)}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl leading-tight text-ink text-balance">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm text-muted">{post.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Leer artículo
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
