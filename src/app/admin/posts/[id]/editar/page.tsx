import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { updatePost, deletePost } from "@/app/admin/posts/actions";
import { inputClass, labelClass } from "@/lib/admin-ui";
import { postCategories } from "@/lib/data/posts";

type Props = { params: Promise<{ id: string }> };

export default async function EditarPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  const updatePostWithId = updatePost.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Editar post</h1>
        <form action={deletePost}>
          <input type="hidden" name="id" value={post.id} />
          <button type="submit" className="text-sm font-medium text-muted hover:text-red-600">
            Eliminar
          </button>
        </form>
      </div>

      <form action={updatePostWithId} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>Título</label>
          <input id="title" name="title" type="text" required defaultValue={post.title} className={inputClass} />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>Slug</label>
          <input id="slug" name="slug" type="text" defaultValue={post.slug} className={inputClass} />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>Categoría</label>
          <select id="category" name="category" className={inputClass} defaultValue={post.category}>
            {postCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="excerpt" className={labelClass}>Resumen corto</label>
          <textarea id="excerpt" name="excerpt" required rows={2} defaultValue={post.excerpt} className={inputClass} />
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>
            Contenido (cada línea en blanco separa un párrafo)
          </label>
          <textarea id="content" name="content" required rows={12} defaultValue={post.content} className={inputClass} />
        </div>

        {post.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image_url} alt="" className="h-32 w-auto rounded-lg object-cover" />
        ) : null}

        <div>
          <label htmlFor="cover" className={labelClass}>Reemplazar imagen de portada (opcional)</label>
          <input id="cover" name="cover" type="file" accept="image/*" className={inputClass} />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={post.published} className="h-4 w-4 rounded border-border" />
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
