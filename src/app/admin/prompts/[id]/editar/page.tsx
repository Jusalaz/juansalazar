import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { updatePrompt, deletePrompt } from "@/app/admin/prompts/actions";
import { inputClass, labelClass } from "@/lib/admin-ui";

type Props = { params: Promise<{ id: string }> };

export default async function EditarPromptPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: prompt } = await supabase
    .from("prompts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!prompt) notFound();

  const updatePromptWithId = updatePrompt.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Editar prompt</h1>
        <form action={deletePrompt}>
          <input type="hidden" name="id" value={prompt.id} />
          <button type="submit" className="text-sm font-medium text-muted hover:text-red-600">
            Eliminar
          </button>
        </form>
      </div>

      <form action={updatePromptWithId} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>Título</label>
          <input id="title" name="title" type="text" required defaultValue={prompt.title} className={inputClass} />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>Slug</label>
          <input id="slug" name="slug" type="text" defaultValue={prompt.slug} className={inputClass} />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>Descripción corta</label>
          <textarea id="description" name="description" required rows={2} defaultValue={prompt.description} className={inputClass} />
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>Prompt (texto exacto para copiar)</label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            defaultValue={prompt.content}
            className={`${inputClass} font-mono text-xs`}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={prompt.published} className="h-4 w-4 rounded border-border" />
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
