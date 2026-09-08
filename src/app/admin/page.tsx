import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

async function getCounts() {
  const supabase = createAdminClient();
  const [posts, books, resources, prompts] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("books").select("id", { count: "exact", head: true }),
    supabase.from("resources").select("id", { count: "exact", head: true }),
    supabase.from("prompts").select("id", { count: "exact", head: true }),
  ]);

  return {
    posts: posts.count ?? 0,
    books: books.count ?? 0,
    resources: resources.count ?? 0,
    prompts: prompts.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { label: "Posts", value: counts.posts, href: "/admin/posts" },
    { label: "Libros", value: counts.books, href: "/admin/libros" },
    { label: "Recursos", value: counts.resources, href: "/admin/recursos" },
    { label: "Prompts", value: counts.prompts, href: "/admin/prompts" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">Resumen del contenido publicado y en borrador.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-lg border border-border bg-surface p-6 hover:border-accent"
          >
            <p className="font-display text-3xl text-ink">{card.value}</p>
            <p className="mt-2 text-sm text-muted">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
