"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Prompt } from "@/lib/data/prompts";

export default function PromptModal({ prompt, onClose }: { prompt: Prompt; onClose: () => void }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, []);
  async function handleCopy() {
    try { await navigator.clipboard.writeText(prompt.content); setCopyStatus("copied"); }
    catch { setCopyStatus("error"); }
  }
  return createPortal(
    <dialog ref={dialog} onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose(); }} aria-labelledby="prompt-modal-title" className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border border-ink/15 bg-surface p-0 text-ink shadow-2xl backdrop:bg-inverse/70 backdrop:backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4 border-b border-ink/10 p-6 sm:p-8"><div><p className="eyebrow text-coral-dark">Listo para adaptar</p><h2 id="prompt-modal-title" className="mt-3 font-display text-2xl">{prompt.title}</h2><p className="mt-2 text-sm text-muted">{prompt.description}</p></div><button type="button" onClick={onClose} aria-label="Cerrar prompt" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-xl">×</button></div>
      <div className="p-6 sm:p-8"><pre tabIndex={0} className="whitespace-pre-wrap break-words rounded-2xl bg-surface-alt p-5 font-mono text-xs leading-relaxed text-ink-soft">{prompt.content}</pre></div>
      <div className="border-t border-ink/10 p-6"><button type="button" onClick={handleCopy} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-inverse px-6 py-4 text-sm font-semibold text-white hover:bg-coral-dark">{copyStatus === "copied" ? "¡Copiado! ✓" : "Copiar prompt ⧉"}</button><p role="status" className="mt-3 text-center text-xs text-muted">{copyStatus === "error" ? "No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente." : copyStatus === "copied" ? "Ya puedes pegarlo en tu herramienta de IA." : "Personaliza el texto con tu contexto para obtener mejores resultados."}</p></div>
    </dialog>, document.body,
  );
}
