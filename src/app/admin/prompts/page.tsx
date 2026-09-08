import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deletePrompt } from "@/app/admin/prompts/actions";

async function getAllPrompts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("prompts")
    .select("id, slug, title, published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllPrompts", error.message);
    return [];
  }
  return data;
}

export default async function AdminPromptsPage() {
  const prompts = await getAllPrompts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Prompts</h1>
        <Link
          href="/admin/prompts/nuevo"
          className="rounded-full bg-inverse px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Nuevo prompt
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3">Título</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3">Fecha</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {prompts.map((prompt) => (
              <tr key={prompt.id} className="border-t border-border">
                <td className="px-5 py-4 text-ink">{prompt.title}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      prompt.published
                        ? "bg-accent-soft text-accent-dark"
                        : "bg-surface-alt text-muted"
                    }`}
                  >
                    {prompt.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted">
                  {new Date(prompt.created_at).toLocaleDateString("es-ES")}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/admin/prompts/${prompt.id}/editar`}
                      className="font-medium text-accent-dark hover:text-ink"
                    >
                      Editar
                    </Link>
                    <form action={deletePrompt}>
                      <input type="hidden" name="id" value={prompt.id} />
                      <button type="submit" className="font-medium text-muted hover:text-red-600">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {prompts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-muted">
                  Aún no hay prompts.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
