"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Prompt } from "@/lib/data/prompts";

export default function PromptModal({
  prompt,
  onClose,
}: {
  prompt: Prompt;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API no disponible; no hay nada más que intentar aquí.
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="prompt-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border-2 border-ink bg-surface"
      >
        <div className="flex items-start justify-between gap-4 border-b-2 border-ink/10 p-6">
          <div>
            <h3 id="prompt-modal-title" className="font-display text-xl text-ink">
              {prompt.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{prompt.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink/15 text-ink transition-colors hover:border-ink"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <pre className="whitespace-pre-wrap rounded-lg bg-surface-alt p-4 font-mono text-xs leading-relaxed text-ink-soft">
            {prompt.content}
          </pre>
        </div>

        <div className="border-t-2 border-ink/10 p-6">
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors ${
              copied ? "bg-coral" : "bg-inverse hover:bg-accent-dark"
            }`}
          >
            {copied ? "¡Copiado! ✓" : "Copiar prompt"}
            {!copied ? <span aria-hidden>⧉</span> : null}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
