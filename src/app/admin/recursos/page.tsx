import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteResource } from "@/app/admin/recursos/actions";

async function getAllResources() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("resources")
    .select("id, slug, title, type, published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllResources", error.message);
    return [];
  }
  return data;
}

export default async function AdminRecursosPage() {
  const resources = await getAllResources();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Recursos</h1>
        <Link
          href="/admin/recursos/nuevo"
          className="rounded-full bg-inverse px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Nuevo recurso
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3">Título</th>
              <th className="px-5 py-3">Tipo</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id} className="border-t border-border">
                <td className="px-5 py-4 text-ink">{resource.title}</td>
                <td className="px-5 py-4 text-muted capitalize">{resource.type}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      resource.published
                        ? "bg-accent-soft text-accent-dark"
                        : "bg-surface-alt text-muted"
                    }`}
                  >
                    {resource.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/admin/recursos/${resource.id}/editar`}
                      className="font-medium text-accent-dark hover:text-ink"
                    >
                      Editar
                    </Link>
                    <form action={deleteResource}>
                      <input type="hidden" name="id" value={resource.id} />
                      <button type="submit" className="font-medium text-muted hover:text-red-600">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {resources.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-muted">
                  Aún no hay recursos.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
