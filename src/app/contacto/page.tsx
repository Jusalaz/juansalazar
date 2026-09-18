import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { socialLinks } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbeme si quieres agendar una charla, una colaboración o cuéntame en qué puedo ayudarte.",
};

export default function ContactoPage() {
  return (
    <>
      <PageIntro eyebrow="04 / Hablemos" title="Las buenas ideas" accent="se conversan." description="Una colaboración, una charla o algo que quieras construir. Este es un buen lugar para empezar." />
    <section className="py-14 sm:py-20">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow text-coral-dark">Conectemos</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight">Del otro lado<br />también hay una persona.</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">Cuéntame tu idea con tus palabras. Puedes preparar un correo aquí o encontrarme en mis redes.</p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-coral-dark">
                Correo
              </p>
              <a href="mailto:contacto@juansalazar.com" className="mt-2 inline-block text-base text-ink underline decoration-coral underline-offset-4">contacto@juansalazar.com ↗</a>
            </div>
            {socialLinks.map((social) => (
              <div key={social.name}>
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-coral-dark">
                  {social.name}
                </p>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-base text-ink hover:text-accent"
                >
                  {social.handle}
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
    </>
  );
}
