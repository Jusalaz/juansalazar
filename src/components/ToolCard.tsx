import { Tool } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-2xl border-2 border-ink/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink"
    >
      <ToolIcon icon={tool.icon} />
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg text-ink">{tool.name}</h3>
          <span
            aria-hidden
            className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{tool.description}</p>
      </div>
    </a>
  );
}
