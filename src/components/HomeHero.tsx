"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Marquee from "@/components/Marquee";

const topics = [
  { label: "Negocio", tag: "01 / EMPRENDIMIENTO", title: "De la idea a la acción.", description: "Lo que aprendo construyendo una startup. Decisiones, errores y aprendizajes desde adentro.", action: "Explorar emprendimiento", href: "/blog?categoria=emprendimiento", word: "CONSTRUYE", symbol: "↗", color: "#c7f35e" },
  { label: "Plata", tag: "02 / FINANZAS PERSONALES", title: "Tu plata, con un plan.", description: "Menos enredos con los números. Más herramientas para entender tu dinero y decidir con claridad.", action: "Explorar finanzas", href: "/blog?categoria=finanzas", word: "DECIDE", symbol: "+", color: "#ffb072" },
  { label: "IA", tag: "03 / INTELIGENCIA ARTIFICIAL", title: "Haz espacio para lo importante.", description: "IA aterrizada a tu día a día. Ideas y herramientas que puedes usar, aunque no sepas programar.", action: "Explorar inteligencia artificial", href: "/blog?categoria=ia", word: "EXPERIMENTA", symbol: "✳", color: "#f06449" },
];

export default function HomeHero() {
  const [selected, setSelected] = useState(0);
  const topic = topics[selected];

  return (
    <section className="home-hero relative overflow-hidden bg-inverse text-white" aria-labelledby="home-title">
      <div className="hero-grid" aria-hidden="true" />
      <Container className="relative pt-12 pb-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="hero-enter">
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
              Ideas claras. Gente en movimiento.
            </p>
            <h1 id="home-title" className="mt-7 font-display text-[clamp(3.4rem,7.5vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.055em]">
              Menos humo.<br />
              Más <span className="hero-outline">ideas</span><br />
              <span className="relative inline-block text-lime">en acción<span className="text-coral">.</span><span className="hero-underline" aria-hidden="true" /></span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
              Soy Juan Salazar. Comparto lo que aprendo sobre negocio, plata e IA para que tomes mejores decisiones.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href="/recursos" className="hero-primary group inline-flex min-h-12 items-center gap-6 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-inverse transition-transform hover:-translate-y-1">
                Quiero empezar <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
              </Link>
              <Link href="/blog" className="inline-flex min-h-12 items-center gap-3 text-sm text-white/80 underline decoration-white/30 underline-offset-8 hover:text-lime">Leer el blog <span aria-hidden="true">→</span></Link>
            </div>
            <p className="mt-4 font-mono text-[10px] text-white/45">Recursos gratis. Ideas para llevar a la práctica.</p>
          </div>

          <div className="hero-enter hero-explorer relative">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/55">
              <span>¿Qué quieres mover hoy?</span><span aria-hidden="true">↓ Elige un tema</span>
            </div>
            <div className="rounded-[1.5rem] border border-white/20 bg-[#222725] p-2 shadow-2xl">
              <div className="grid grid-cols-3 gap-1 p-1" role="group" aria-label="Elige un tema para explorar">
                {topics.map((item, index) => (
                  <button key={item.label} type="button" aria-pressed={selected === index} aria-controls="hero-topic" onClick={() => setSelected(index)} className={`min-h-11 cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-colors ${selected === index ? "bg-white text-inverse" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
                    {item.label}
                  </button>
                ))}
              </div>
              <div id="hero-topic" className="mt-2 overflow-hidden rounded-[1.1rem] text-inverse" style={{ backgroundColor: topic.color }} aria-live="polite" aria-atomic="true">
                <div key={topic.label} className="hero-topic-enter p-6 sm:p-8">
                  <p className="font-mono text-[10px] tracking-[0.12em]">{topic.tag}</p>
                  <div className="relative my-4 flex h-36 items-center justify-center overflow-hidden sm:h-44" aria-hidden="true">
                    <div className="hero-orbit absolute h-32 w-32 rounded-full border border-black/20 sm:h-40 sm:w-40" />
                    <div className="absolute h-24 w-24 rounded-full border border-black/15 sm:h-32 sm:w-32" />
                    <span className="hero-symbol font-display text-[8rem] leading-none sm:text-[10rem]">{topic.symbol}</span>
                    <span className="absolute bottom-0 right-0 -rotate-6 rounded-full border border-inverse/60 bg-white/30 px-3 py-1 font-mono text-[9px] tracking-widest">{topic.word}</span>
                  </div>
                  <h2 className="max-w-[15ch] font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">{topic.title}</h2>
                  <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-inverse/75">{topic.description}</p>
                  <Link href={topic.href} className="mt-6 flex min-h-11 items-center justify-between gap-3 border-t border-inverse/25 pt-4 text-sm font-semibold hover:underline">{topic.action}<span aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/15 pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50 lg:mt-16">
          <span>Un punto de vista. Muchas posibilidades.</span>
          <a href="#descubre" className="shrink-0 py-2 text-white/75 hover:text-lime">Descubre más ↓</a>
        </div>
      </Container>
      <div className="border-y border-inverse bg-lime py-3.5 text-inverse"><Marquee items={["EMPRENDIMIENTO", "FINANZAS", "INTELIGENCIA ARTIFICIAL", "MENOS HUMO", "MÁS ACCIÓN"]} /></div>
    </section>
  );
}
