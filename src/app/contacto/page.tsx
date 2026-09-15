import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { socialLinks } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbeme si quieres agendar una charla, una colaboración o cuéntame en qué puedo ayudarte.",
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
            description="¿Quieres agendar una charla, invitarme a un espacio o proponer una colaboración? Escríbeme y coordinamos."
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
