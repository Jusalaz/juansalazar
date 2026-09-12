"use client";

import { useState } from "react";
import { Prompt } from "@/lib/data/prompts";
import PromptModal from "@/components/PromptModal";

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full flex-col rounded-2xl border-2 border-ink/10 bg-surface p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-ink"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl text-ink">{prompt.title}</h3>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-surface-alt px-3 py-1 font-mono text-xs text-muted transition-colors group-hover:text-ink">
            Ver
            <span aria-hidden>↗</span>
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{prompt.description}</p>
        <p className="mt-4 line-clamp-3 rounded-lg bg-surface-alt p-4 font-mono text-xs leading-relaxed text-ink-soft">
          {prompt.content}
        </p>
      </button>

      {open ? <PromptModal prompt={prompt} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
