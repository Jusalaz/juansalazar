import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deletePost } from "@/app/admin/posts/actions";
import { categoryLabel } from "@/lib/data/posts";

async function getAllPosts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, category, published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllPosts", error.message);
    return [];
  }
  return data;
}

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Posts</h1>
        <Link
          href="/admin/posts/nuevo"
          className="rounded-full bg-inverse px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Nuevo post
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3">Título</th>
              <th className="px-5 py-3">Categoría</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3">Fecha</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-border">
                <td className="px-5 py-4 text-ink">{post.title}</td>
                <td className="px-5 py-4 text-muted">{categoryLabel(post.category)}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      post.published
                        ? "bg-accent-soft text-accent-dark"
                        : "bg-surface-alt text-muted"
                    }`}
                  >
                    {post.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted">
                  {new Date(post.created_at).toLocaleDateString("es-ES")}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/admin/posts/${post.id}/editar`}
                      className="font-medium text-accent-dark hover:text-ink"
                    >
                      Editar
                    </Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="font-medium text-muted hover:text-red-600">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  Aún no hay posts.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
