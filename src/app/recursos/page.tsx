import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ResourceCard from "@/components/ResourceCard";
import ToolCard from "@/components/ToolCard";
import PromptCard from "@/components/PromptCard";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";
import { getPublishedResources } from "@/lib/data/resources";
import { getPublishedPrompts } from "@/lib/data/prompts";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Herramientas de IA que uso, prompts listos para copiar, más plantillas de Excel, documentos y cursos descargables gratis.",
};

export const revalidate = 0;

export default async function RecursosPage() {
  const [resources, prompts] = await Promise.all([
    getPublishedResources(),
    getPublishedPrompts(),
  ]);

  return (
    <>
      <section className="border-b-2 border-ink bg-surface-alt py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Recursos"
              title="Herramientas gratis para usar hoy"
              description="Las herramientas de IA que uso, prompts listos para copiar, y plantillas, documentos y cursos que puedes descargar de inmediato."
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Herramientas" index="01" title="Herramientas de IA que uso" />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <RevealItem key={tool.name}>
                <ToolCard tool={tool} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="border-t-2 border-ink bg-surface-alt py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Prompts"
              index="02"
              title="Prompts listos para usar"
              description="Haz clic en cualquier tarjeta para copiar el prompt completo al portapapeles."
            />
          </Reveal>
          {prompts.length > 0 ? (
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {prompts.map((prompt) => (
                <RevealItem key={prompt.slug}>
                  <PromptCard prompt={prompt} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-10 text-center text-muted">
              Todavía no hay prompts publicados. Vuelve pronto.
            </p>
          )}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Descargas" index="03" title="Plantillas, documentos y cursos" />
          </Reveal>
          {resources.length > 0 ? (
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <RevealItem key={resource.slug}>
                  <ResourceCard resource={resource} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-10 text-center text-muted">
              Todavía no hay recursos publicados. Vuelve pronto.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
