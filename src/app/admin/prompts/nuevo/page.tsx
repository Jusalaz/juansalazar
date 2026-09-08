import { createPrompt } from "@/app/admin/prompts/actions";
import { inputClass, labelClass } from "@/lib/admin-ui";

export default function NuevoPromptPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-ink">Nuevo prompt</h1>

      <form action={createPrompt} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={labelClass}>Título</label>
          <input id="title" name="title" type="text" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>Slug (opcional, se genera del título)</label>
          <input id="slug" name="slug" type="text" className={inputClass} />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>Descripción corta</label>
          <textarea id="description" name="description" required rows={2} className={inputClass} />
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>Prompt (texto exacto para copiar)</label>
          <textarea id="content" name="content" required rows={8} className={`${inputClass} font-mono text-xs`} />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" className="h-4 w-4 rounded border-border" />
          Publicar ahora
        </label>

        <button
          type="submit"
          className="rounded-full bg-inverse px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Guardar prompt
        </button>
      </form>
    </div>
  );
}
