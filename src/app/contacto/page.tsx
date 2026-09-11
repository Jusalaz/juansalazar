import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { socialLinks } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbeme, comparte una idea de contenido o cuéntame en qué puedo ayudarte.",
};

export default function ContactoPage() {
  return (
    <section className="py-20">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contacto"
            index="01"
            title="Escríbeme"
            description="¿Tienes una pregunta sobre finanzas personales, una idea para un artículo o quieres sugerir un libro? Cuéntame."
          />

          <div className="mt-10 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-coral-dark">
                Correo
              </p>
              <p className="mt-1 text-base text-ink">contacto@juansalazar.com</p>
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
  );
}
