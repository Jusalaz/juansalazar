import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteBook } from "@/app/admin/libros/actions";

async function getAllBooks() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("books")
    .select("id, slug, title, author, published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllBooks", error.message);
    return [];
  }
  return data;
}

export default async function AdminLibrosPage() {
  const books = await getAllBooks();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Libros</h1>
        <Link
          href="/admin/libros/nuevo"
          className="rounded-full bg-inverse px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Nuevo libro
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3">Título</th>
              <th className="px-5 py-3">Autor</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t border-border">
                <td className="px-5 py-4 text-ink">{book.title}</td>
                <td className="px-5 py-4 text-muted">{book.author}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      book.published
                        ? "bg-accent-soft text-accent-dark"
                        : "bg-surface-alt text-muted"
                    }`}
                  >
                    {book.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/admin/libros/${book.id}/editar`}
                      className="font-medium text-accent-dark hover:text-ink"
                    >
                      Editar
                    </Link>
                    <form action={deleteBook}>
                      <input type="hidden" name="id" value={book.id} />
                      <button type="submit" className="font-medium text-muted hover:text-red-600">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {books.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-muted">
                  Aún no hay libros.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
