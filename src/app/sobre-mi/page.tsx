import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Quién soy: CEO y cofundador de una startup healthtech, product manager, y por qué comparto contenido sobre emprendimiento, finanzas e IA.",
};

const experience = [
  {
    tag: "Ahora",
    title: "CEO y cofundador — Sofmed",
    description:
      "Construyendo una startup healthtech desde cero: producto, fundraising, equipo y las decisiones difíciles que no salen en LinkedIn.",
  },
  {
    tag: "Antes",
    title: "Product Manager en una multinacional de datos",
    description:
      "Liderando producto en una organización grande, donde aprendí a tomar decisiones con datos reales y a convivir con la IA como herramienta de trabajo, no como promesa.",
  },
];

const voice = [
  {
    title: "Directa y concreta",
    description: "Números y ejemplos reales, no promesas ni fórmulas mágicas.",
    accent: "bg-berry/10 text-berry",
  },
  {
    title: "Cercana",
    description: "Como le explicaría algo a un socio de confianza, no a una audiencia.",
    accent: "bg-amber/15 text-amber-dark",
  },
  {
    title: "Honesta sobre la IA",
    description: "Curiosa frente a lo que la inteligencia artificial puede hacer, sin exagerarlo.",
    accent: "bg-coral/12 text-coral-dark",
  },
];

export default function SobreMiPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-surface-alt py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Sobre mí"
              title="Comparto lo que aprendo construyendo un negocio, mi plata y usando IA"
            />
            <p className="mt-6 max-w-xl text-base text-muted text-balance">
              Soy Juan Salazar, CEO y cofundador de Sofmed, una startup
              healthtech. Antes fui product manager en una multinacional de
              datos. Este espacio nació de las publicaciones que comparto en
              redes sociales sobre esas tres cosas: negocio, plata e
              inteligencia artificial.
            </p>
            <p className="mt-4 max-w-xl text-base text-muted text-balance">
              No vendo un sueño de libertad financiera ni discursos de gurú.
              Comparto cómo se ven estas decisiones desde adentro, con la
              misma disciplina con la que se lee un estado financiero.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contacto">Escríbeme</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="justify-self-center lg:justify-self-end">
            <div className="aspect-[4/5] w-full max-w-sm rounded-2xl border-2 border-ink bg-gradient-to-br from-berry via-coral to-amber" />
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Trayectoria" title="De dónde viene lo que comparto" />
          </Reveal>
          <div className="mt-12 space-y-8">
            {experience.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="grid gap-2 border-b-2 border-ink/10 pb-8 last:border-0 last:pb-0 sm:grid-cols-[120px_1fr] sm:gap-8">
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-coral-dark">
                    {item.tag}
                  </p>
                  <div>
                    <h3 className="font-display text-xl text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t-2 border-ink bg-surface-alt py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Cómo escribo" title="La voz detrás del contenido" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {voice.map((item) => (
              <RevealItem key={item.title}>
                <div className="h-full rounded-2xl border-2 border-ink/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-2 hover:border-ink">
                  <span className={`inline-block rounded-full px-3 py-1 font-mono text-xs ${item.accent}`}>
                    ✦
                  </span>
                  <h3 className="mt-4 font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted">{item.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
