import { createResource } from "@/app/admin/recursos/actions";
import { inputClass, labelClass } from "@/lib/admin-ui";

export default function NuevoRecursoPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-ink">Nuevo recurso</h1>

      <form action={createResource} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>Título</label>
          <input id="title" name="title" type="text" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>Slug (opcional, se genera del título)</label>
          <input id="slug" name="slug" type="text" className={inputClass} />
        </div>

        <div>
          <label htmlFor="type" className={labelClass}>Tipo</label>
          <select id="type" name="type" className={inputClass} defaultValue="excel">
            <option value="excel">Plantilla Excel</option>
            <option value="html">Documento</option>
            <option value="curso">Curso</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>Descripción</label>
          <textarea id="description" name="description" required rows={4} className={inputClass} />
        </div>

        <div>
          <label htmlFor="file" className={labelClass}>Archivo</label>
          <input id="file" name="file" type="file" required className={inputClass} />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" className="h-4 w-4 rounded border-border" />
          Publicar ahora
        </label>

        <button
          type="submit"
          className="rounded-full bg-inverse px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Guardar recurso
        </button>
      </form>
    </div>
  );
}
