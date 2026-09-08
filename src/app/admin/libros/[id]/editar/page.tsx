import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { updateBook, deleteBook } from "@/app/admin/libros/actions";
import { inputClass, labelClass } from "@/lib/admin-ui";

type Props = { params: Promise<{ id: string }> };

export default async function EditarLibroPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!book) notFound();

  const updateBookWithId = updateBook.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Editar libro</h1>
        <form action={deleteBook}>
          <input type="hidden" name="id" value={book.id} />
          <button type="submit" className="text-sm font-medium text-muted hover:text-red-600">
            Eliminar
          </button>
        </form>
      </div>

      <form action={updateBookWithId} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>Título</label>
          <input id="title" name="title" type="text" required defaultValue={book.title} className={inputClass} />
        </div>

        <div>
          <label htmlFor="author" className={labelClass}>Autor</label>
          <input id="author" name="author" type="text" required defaultValue={book.author} className={inputClass} />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>Slug</label>
          <input id="slug" name="slug" type="text" defaultValue={book.slug} className={inputClass} />
        </div>

        <div>
          <label htmlFor="rating" className={labelClass}>Calificación (1 a 5)</label>
          <input id="rating" name="rating" type="number" min={1} max={5} defaultValue={book.rating ?? ""} className={inputClass} />
        </div>

        <div>
          <label htmlFor="link_url" className={labelClass}>Enlace para comprar/ver (opcional)</label>
          <input id="link_url" name="link_url" type="url" defaultValue={book.link_url ?? ""} className={inputClass} />
        </div>

        <div>
          <label htmlFor="review" className={labelClass}>
            Reseña (cada línea en blanco separa un párrafo)
          </label>
          <textarea id="review" name="review" required rows={10} defaultValue={book.review} className={inputClass} />
        </div>

        {book.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.cover_image_url} alt="" className="h-32 w-auto rounded-lg object-cover" />
        ) : null}

        <div>
          <label htmlFor="cover" className={labelClass}>Reemplazar portada (opcional)</label>
          <input id="cover" name="cover" type="file" accept="image/*" className={inputClass} />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={book.published} className="h-4 w-4 rounded border-border" />
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
