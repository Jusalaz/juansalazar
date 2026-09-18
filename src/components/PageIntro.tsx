import Container from "@/components/Container";

export default function PageIntro({ eyebrow, title, accent, description, symbol = "↗" }: {
  eyebrow: string; title: string; accent: string; description: string; symbol?: string;
}) {
  return (
    <section className="page-intro overflow-hidden bg-inverse text-white">
      <Container className="relative grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_240px] lg:items-center">
        <div className="hero-enter relative z-10">
          <p className="eyebrow text-lime">{eyebrow}</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.045em]">{title}<br /><span className="text-lime">{accent}</span></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{description}</p>
        </div>
        <div aria-hidden="true" className="intro-art absolute -right-12 top-12 opacity-10 lg:relative lg:right-auto lg:top-auto lg:opacity-100">
          <div className="flex h-56 w-56 items-center justify-center rounded-full border border-white/20"><div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/20 font-display text-8xl text-coral">{symbol}</div></div>
          <span className="absolute bottom-3 right-0 rotate-[-8deg] rounded-full bg-lime px-5 py-2 font-mono text-[10px] tracking-widest text-inverse">IDEAS EN ACCIÓN</span>
        </div>
      </Container>
    </section>
  );
}
