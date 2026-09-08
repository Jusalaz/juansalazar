import { createPost } from "@/app/admin/posts/actions";
import { inputClass, labelClass } from "@/lib/admin-ui";
import { postCategories } from "@/lib/data/posts";

export default function NuevoPostPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-ink">Nuevo post</h1>

      <form action={createPost} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>Título</label>
          <input id="title" name="title" type="text" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>Slug (opcional, se genera del título)</label>
          <input id="slug" name="slug" type="text" className={inputClass} placeholder="se-genera-automaticamente" />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>Categoría</label>
          <select id="category" name="category" className={inputClass} defaultValue="finanzas">
            {postCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="excerpt" className={labelClass}>Resumen corto</label>
          <textarea id="excerpt" name="excerpt" required rows={2} className={inputClass} />
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>
            Contenido (cada línea en blanco separa un párrafo)
          </label>
          <textarea id="content" name="content" required rows={12} className={inputClass} />
        </div>

        <div>
          <label htmlFor="cover" className={labelClass}>Imagen de portada (opcional)</label>
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
          Guardar post
        </button>
      </form>
    </div>
  );
}
