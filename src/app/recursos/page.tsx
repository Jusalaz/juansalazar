import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import SectionHeading from "@/components/SectionHeading";
import BudgetFeature from "@/components/BudgetFeature";
import EmptyState from "@/components/EmptyState";
import ResourceCard from "@/components/ResourceCard";
import ToolCard from "@/components/ToolCard";
import PromptCard from "@/components/PromptCard";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";
import { getPublishedResources } from "@/lib/data/resources";
import { getPublishedPrompts } from "@/lib/data/prompts";
import { tools } from "@/lib/tools";

export const metadata: Metadata = { title: "Recursos", description: "Tu presupuesto personal, plantillas gratis, prompts y herramientas de IA para pasar de la idea a la acción." };
export const revalidate = 0;

export default async function RecursosPage() {
  const [resources, prompts] = await Promise.all([getPublishedResources(), getPublishedPrompts()]);
  const otherResources = resources.filter(resource => !resource.file_url.endsWith("/herramientas/presupuesto.html"));
  return <>
    <PageIntro eyebrow="03 / Tu caja de herramientas" title="Menos vueltas." accent="Más herramientas." description="Un presupuesto que sí se entiende, prompts para empezar y herramientas para hacer más con tus ideas. Elige por dónde arrancar." symbol="+" />
    <div className="border-b border-ink/10"><Container><nav aria-label="Secciones de recursos" className="flex flex-wrap gap-x-7 gap-y-2 py-5 text-sm font-medium"><a href="#presupuesto" className="py-2 hover:text-coral-dark">Presupuesto ↗</a><a href="#herramientas" className="py-2 hover:text-coral-dark">Herramientas de IA</a><a href="#prompts" className="py-2 hover:text-coral-dark">Prompts</a><a href="#descargas" className="py-2 hover:text-coral-dark">Descargas ↓</a></nav></Container></div>
    <section id="presupuesto" className="scroll-mt-24 py-14 sm:py-20"><Container><BudgetFeature /></Container></section>
    <section id="herramientas" className="scroll-mt-24 pb-16 sm:pb-24"><Container><SectionHeading eyebrow="01 / Mi selección" title="IA con un propósito." description="Herramientas que uso para investigar, crear y trabajar mejor. Cada una tiene su lugar." /><RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tools.map(tool => <RevealItem key={tool.name}><ToolCard tool={tool} /></RevealItem>)}</RevealGroup></Container></section>
    <section id="prompts" className="scroll-mt-24 border-y border-ink/10 bg-surface-alt py-16 sm:py-24"><Container><SectionHeading eyebrow="02 / Un buen punto de partida" title="Pregunta mejor." description="Abre un prompt, copia el texto y adáptalo a lo que necesitas. La primera idea ya está escrita." />{prompts.length ? <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{prompts.map(prompt => <RevealItem key={prompt.slug}><PromptCard prompt={prompt} /></RevealItem>)}</RevealGroup> : <div className="mt-10"><EmptyState title="Los próximos prompts están en preparación." description="Mientras tanto, encuentra una herramienta de IA para tu siguiente proyecto." href="#herramientas" action="Explorar herramientas" /></div>}</Container></section>
    <section id="descargas" className="scroll-mt-24 py-16 sm:py-24"><Container><SectionHeading eyebrow="03 / Para llevar" title="De aquí a tu día a día." description="Plantillas, documentos y recursos para guardar, adaptar y usar a tu ritmo." />{otherResources.length ? <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{otherResources.map(resource => <RevealItem key={resource.slug}><ResourceCard resource={resource} /></RevealItem>)}</RevealGroup> : <div className="mt-10"><ResourceCard resource={{id:"presupuesto",slug:"presupuesto",title:"Tu presupuesto personal",description:"Organiza ingresos, gastos, inversión y ahorro. Descarga la plantilla HTML, ábrela en tu navegador y guarda tu propio presupuesto.",type:"html",file_url:"/herramientas/presupuesto.html",file_name:"presupuesto-juan-salazar.html",published:true,created_at:""}} /></div>}</Container></section>
  </>;
}
