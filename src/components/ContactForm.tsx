"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";

const inputClass =
  "w-full rounded-xl border-2 border-ink/10 bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border-2 border-ink/10 bg-surface p-8 text-center">
        <p className="font-display text-xl text-ink">¡Gracias por escribir!</p>
        <p className="mt-2 text-sm text-muted">
          Recibí tu mensaje y te responderé en menos de 48 horas hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            Nombre
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            Correo electrónico
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="tucorreo@ejemplo.com" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Cuéntame tu pregunta, idea o sugerencia"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Enviar mensaje
      </Button>
    </form>
  );
}
