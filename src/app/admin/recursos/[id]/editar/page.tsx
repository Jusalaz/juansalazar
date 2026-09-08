import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { updateResource, deleteResource } from "@/app/admin/recursos/actions";
import { inputClass, labelClass } from "@/lib/admin-ui";

type Props = { params: Promise<{ id: string }> };

export default async function EditarRecursoPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: resource } = await supabase
    .from("resources")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!resource) notFound();

  const updateResourceWithId = updateResource.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Editar recurso</h1>
        <form action={deleteResource}>
          <input type="hidden" name="id" value={resource.id} />
          <button type="submit" className="text-sm font-medium text-muted hover:text-red-600">
            Eliminar
          </button>
        </form>
      </div>

      <form action={updateResourceWithId} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>Título</label>
          <input id="title" name="title" type="text" required defaultValue={resource.title} className={inputClass} />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>Slug</label>
          <input id="slug" name="slug" type="text" defaultValue={resource.slug} className={inputClass} />
        </div>

        <div>
          <label htmlFor="type" className={labelClass}>Tipo</label>
          <select id="type" name="type" className={inputClass} defaultValue={resource.type}>
            <option value="excel">Plantilla Excel</option>
            <option value="html">Documento</option>
            <option value="curso">Curso</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>Descripción</label>
          <textarea id="description" name="description" required rows={4} defaultValue={resource.description} className={inputClass} />
        </div>

        <p className="text-sm text-muted">
          Archivo actual: <span className="text-ink">{resource.file_name}</span>
        </p>

        <div>
          <label htmlFor="file" className={labelClass}>Reemplazar archivo (opcional)</label>
          <input id="file" name="file" type="file" className={inputClass} />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={resource.published} className="h-4 w-4 rounded border-border" />
          Publicado
        </label>

        <button
          type="submit"
          className="rounded-full bg-inverse px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
