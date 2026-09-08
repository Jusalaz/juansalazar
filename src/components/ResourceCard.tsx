import { Resource } from "@/lib/data/resources";

const typeLabels: Record<Resource["type"], string> = {
  excel: "Plantilla Excel",
  html: "Documento",
  curso: "Curso",
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const isInteractive = resource.type === "html";

  return (
    <div className="flex flex-col rounded-2xl border-2 border-ink/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-2 hover:border-ink">
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-coral-dark">
        {typeLabels[resource.type]}
      </p>
      <h3 className="mt-3 font-display text-xl text-ink text-balance">
        {resource.title}
      </h3>
      <p className="mt-3 flex-1 text-sm text-muted">{resource.description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={resource.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-inverse px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-berry"
        >
          {isInteractive ? "Abrir herramienta" : "Descargar"}
          <span aria-hidden>{isInteractive ? "↗" : "↓"}</span>
        </a>
        {isInteractive ? (
          <a
            href={resource.file_url}
            download={resource.file_name}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Descargar
            <span aria-hidden>↓</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
