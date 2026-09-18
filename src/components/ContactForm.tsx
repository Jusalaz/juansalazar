"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";

const inputClass = "w-full rounded-xl border border-ink/15 bg-background/60 px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 transition-colors";
export default function ContactForm() {
  const [opened, setOpened] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Contacto desde la web · ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`);
    window.location.href = `mailto:contacto@juansalazar.com?subject=${subject}&body=${body}`;
    setOpened(true);
  }
  return <form onSubmit={handleSubmit} className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_16px_60px_-35px_#171b1a40] sm:p-9">
    <p className="eyebrow text-coral-dark">De idea a conversación</p><h2 className="mt-3 mb-7 font-display text-3xl tracking-tight">Cuéntame qué tienes en mente.</h2>
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="name" className="mb-2 block text-sm font-medium">Tu nombre</label><input id="name" name="name" type="text" autoComplete="name" required maxLength={100} className={inputClass} placeholder="¿Cómo te llamas?" /></div><div><label htmlFor="email" className="mb-2 block text-sm font-medium">Tu correo</label><input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="hola@ejemplo.com" /></div></div>
      <div><label htmlFor="message" className="mb-2 block text-sm font-medium">Tu idea o mensaje</label><textarea id="message" name="message" required maxLength={2000} rows={6} className={inputClass} placeholder="Una colaboración, una charla o una buena pregunta…" /></div>
      <Button type="submit" className="w-full">Preparar correo <span aria-hidden="true">↗</span></Button>
      <p className="text-xs leading-relaxed text-muted">Se abrirá tu aplicación de correo con el mensaje listo. Revísalo y envíalo desde allí.</p>
      {opened ? <p role="status" className="rounded-xl bg-lime/25 p-4 text-sm leading-relaxed">Tu correo está preparado. Si no se abrió tu aplicación, puedes escribir a <a href="mailto:contacto@juansalazar.com" className="font-semibold underline">contacto@juansalazar.com</a>. El mensaje todavía no se ha enviado.</p> : null}
    </div>
  </form>;
}
