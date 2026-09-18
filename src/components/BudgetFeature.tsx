export default function BudgetFeature() {
  return (
    <div className="budget-feature relative grid overflow-hidden rounded-[2rem] bg-inverse text-white lg:grid-cols-[1.1fr_1fr]">
      <div className="relative z-10 p-7 sm:p-10 lg:p-12">
        <p className="eyebrow text-lime">Gratis / Hecho para tu día a día</p>
        <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">Tu plata.<br /><span className="text-lime">Un plan claro.</span></h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">Pon tus ingresos, gastos y metas en un solo lugar. Tu presupuesto se calcula al instante y puedes guardar una copia para llevarlo contigo.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/herramientas/presupuesto.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-5 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-inverse transition-transform hover:-translate-y-1">Abrir mi presupuesto <span aria-hidden="true">↗</span></a>
          <a href="/herramientas/presupuesto.html" download="presupuesto-juan-salazar.html" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-5 py-3 text-sm hover:bg-white/10">Descargar plantilla <span aria-hidden="true">↓</span></a>
        </div>
        <p className="mt-5 font-mono text-[10px] leading-relaxed text-white/50">Sin registro · Datos en tu navegador · Lista para imprimir</p>
      </div>
      <div className="relative flex items-center justify-center bg-white/[0.04] p-7 sm:p-10" aria-hidden="true">
        <div className="w-full max-w-sm rotate-[-3deg] rounded-2xl border border-white/15 bg-[#272e2a] p-6 shadow-2xl transition-transform duration-500 hover:rotate-0">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-white/55"><span>Mi presupuesto</span><span>Ejemplo · COP</span></div>
          <p className="mt-7 text-xs text-white/60">Disponible después de tus metas</p><p className="mt-2 font-display text-4xl tracking-tight text-lime">$ 1.200.000</p>
          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-white/15"><span className="w-1/2 bg-coral"/><span className="w-[15%] bg-amber"/><span className="w-[15%] bg-lime"/></div>
          <div className="mt-6 space-y-3 text-xs"><p className="flex justify-between border-b border-white/10 pb-3"><span className="text-white/60">Ingresos</span><span>$ 6.000.000</span></p><p className="flex justify-between border-b border-white/10 pb-3"><span className="text-white/60">Gastos</span><span>$ 3.000.000</span></p><p className="flex justify-between"><span className="text-white/60">Inversión + ahorro</span><span>$ 1.800.000</span></p></div>
        </div>
      </div>
    </div>
  );
}
