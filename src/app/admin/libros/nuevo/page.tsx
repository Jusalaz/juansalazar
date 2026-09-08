import { createBook } from "@/app/admin/libros/actions";
import { inputClass, labelClass } from "@/lib/admin-ui";

export default function NuevoLibroPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-ink">Nuevo libro</h1>

      <form action={createBook} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>Título</label>
          <input id="title" name="title" type="text" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="author" className={labelClass}>Autor</label>
          <input id="author" name="author" type="text" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>Slug (opcional, se genera del título)</label>
          <input id="slug" name="slug" type="text" className={inputClass} />
        </div>

        <div>
          <label htmlFor="rating" className={labelClass}>Calificación (1 a 5)</label>
          <input id="rating" name="rating" type="number" min={1} max={5} className={inputClass} />
        </div>

        <div>
          <label htmlFor="link_url" className={labelClass}>Enlace para comprar/ver (opcional)</label>
          <input id="link_url" name="link_url" type="url" className={inputClass} placeholder="https://..." />
        </div>

        <div>
          <label htmlFor="review" className={labelClass}>
            Reseña (cada línea en blanco separa un párrafo)
          </label>
          <textarea id="review" name="review" required rows={10} className={inputClass} />
        </div>

        <div>
          <label htmlFor="cover" className={labelClass}>Portada del libro (opcional)</label>
          <input id="cover" name="cover" type="file" accept="image/*" className={inputClass} />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" className="h-4 w-4 rounded border-border" />
          Publicar ahora
        </label>

        <button
          type="submit"
          className="rounded-full bg-inverse px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Guardar libro
        </button>
      </form>
    </div>
  );
}
