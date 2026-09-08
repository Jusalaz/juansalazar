import { Tool } from "@/lib/tools";

export default function ToolIcon({ icon }: { icon: Tool["icon"] }) {
  if ("path" in icon) {
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-white"
        style={{ color: icon.hex }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d={icon.path} />
        </svg>
      </span>
    );
  }

  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-mono text-[0.65rem] font-medium text-white"
      style={{ backgroundColor: icon.hex }}
      aria-hidden
    >
      {icon.letters}
    </span>
  );
}
