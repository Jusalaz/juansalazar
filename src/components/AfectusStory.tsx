import Image from "next/image";
import Link from "next/link";

function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border border-lime-dark/15 bg-lime/15 p-6 sm:p-8">
      <p className="eyebrow text-lime-dark">Ejemplo ilustrativo</p>
      <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight">{title}</h3>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">{children}</div>
    </aside>
  );
}

function ArchiveImage({ src, alt, caption, width, height }: { src: string; alt: string; caption: string; width: number; height: number }) {
  return (
    <figure className="my-10">
      <a href={src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-ink/10 bg-surface" aria-label={`Ampliar imagen: ${alt}`}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full" />
      </a>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">{caption} <span className="text-coral-dark">Abre la imagen para ampliarla ↗</span></figcaption>
    </figure>
  );
}

export default function AfectusStory() {
  return (
    <article className="editorial-story">
      <div className="mb-10 flex flex-wrap gap-2">
        <span className="rounded-full bg-lime/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wider">Historia de un emprendimiento</span>
        <span className="rounded-full border border-ink/15 px-4 py-2 font-mono text-[10px] uppercase tracking-wider">Afectus / Encontrar el problema</span>
      </div>
      <p className="story-lead">Venía de vivir en San Francisco, CA, con una idea que me parecia del carajo: analizar palabras para entender emociones y poder predecirlas. De ahí nació Afectus. Lo que todavía no teníamos bien definido era qué problema íbamos a resolver y para quién.</p>
      <p>En ese momento, el análisis de texto era una novedad. Las herramientas y los lenguajes que estábamos explorando permitían convertir conversaciones en señales que podíamos analizar. Nos metimos de lleno y construimos una app que analizaba palabras y medía emociones.</p>
      <p>Después vinieron varios cambios de rumbo: política, contenido para redes sociales, flujos por WhatsApp y, finalmente, un producto de firma digital por voz que una empresa decidió adquirir. En ese recorrido aprendimos cuánto importa empezar por un problema bien definido.</p>

      <nav aria-label="En este artículo" className="my-10 rounded-2xl border border-ink/10 bg-surface p-6">
        <p className="eyebrow text-coral-dark">El recorrido de Afectus</p>
        <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <li><a href="#politica" className="hover:underline">01 / Debates, emociones y Twitter</a></li>
          <li><a href="#redes" className="hover:underline">02 / Texto para redes sociales</a></li>
          <li><a href="#whatsapp" className="hover:underline">03 / Flujos y clientes en WhatsApp</a></li>
          <li><a href="#firma" className="hover:underline">04 / Firma por voz y adquisición</a></li>
          <li><a href="#aprendizaje" className="hover:underline">05 / La cagada: el problema</a></li>
        </ol>
      </nav>

      <section id="politica" className="scroll-mt-28">
        <h2>La primera parada fue la política.</h2>
        <p>Trabajamos con varios políticos en Colombia (uno nos termino tumbado, peroooo esa es otra historia). Analizábamos los debates y cruzábamos ese análisis con lo que se decía en Twitter (X hoy en día). Queríamos entender las palabras y las emociones que aparecían alrededor de esas conversaciones.</p>
        <ArchiveImage src="/blog/afectus/busqueda.png" alt="Pantalla original de Afectus con selección de idioma, palabra y fechas para buscar en Twitter" caption="Archivo de Afectus: la búsqueda permitía delimitar la conversación que queríamos analizar." width={1509} height={768} />
        <p>El problema apareció en el mercado: era supremamente cíclico. La escalabilidad que encontrábamos ahí era casi nula. Ya habíamos construido una herramienta y trabajado con clientes, pero ese camino tenía un límite para el negocio que queríamos crear.</p>
        <ArchiveImage src="/blog/afectus/nube-de-palabras.png" alt="Nube de palabras de Afectus con términos positivos, negativos y neutrales" caption="Archivo de Afectus: una de las visualizaciones del análisis de palabras." width={1164} height={636} />
      </section>

      <section id="redes" className="scroll-mt-28">
        <h2>Después, texto para redes sociales.</h2>
        <p>Decidimos migrar. En esa etapa empezábamos a explorar lo que OpenAI permitía hacer con la generación de texto, y creamos una app para redes sociales.</p>
        <p>La posibilidad de crear texto nos abrió otra dirección. Pero al llevarla al mercado vimos que la propuesta no conectaba con las personas. Tampoco era por ahí. Habíamos cambiado de producto y seguíamos buscando un problema en el que enfocarnos.</p>
      </section>

      <section id="whatsapp" className="scroll-mt-28">
        <h2>En WhatsApp llegamos mucho más lejos.</h2>
        <p>Volvimos a la idea de analizar emociones, esta vez en WhatsApp. A partir de ahí construimos un producto que permitía crear flujos de conversación: definir caminos, preguntas y siguientes pasos dentro del chat.</p>
        <ArchiveImage src="/blog/afectus/flujos.png" alt="Constructor visual de Afectus con bloques conectados para solicitar, cancelar o reprogramar una recolección" caption="Archivo de Afectus: el constructor de flujos. Esta pantalla muestra un recorrido de recolección, distinto de los casos comerciales que cuento aquí." width={1583} height={775} />
        <p>Con ese producto llegamos lejos. Hicimos cobranza de cartera para una telco. También realizamos varias campañas de marketing y captación de clientes para una aerolínea de Latinoamérica.</p>
        <p>Ya había usos concretos en negocios distintos: cobrar cartera, hacer campañas, captar clientes. El producto nos permitía hacer muchas cosas. Elegir en cuál problema especializarnos seguía siendo nuestra tarea pendiente.</p>
      </section>

      <section id="firma" className="scroll-mt-28">
        <h2>Una firma por voz llamó la atención.</h2>
        <p>Después creamos un producto de firma digital por voz a través de WhatsApp. Esa propuesta llamó la atención de una empresa, que decidió adquirirlo.</p>
        <p>Ese fue el desenlace de ese producto. Al mirar todo el recorrido de Afectus, también veo la cantidad de veces que cambiamos de dirección antes de llegar ahí.</p>
      </section>

      <section id="aprendizaje" className="scroll-mt-28">
        <h2>¿Dónde la cagamos? En definir el problema.</h2>
        <p>No encontramos ni acotamos bien el problema en el que debíamos enfocarnos. Nos entusiasmaban las posibilidades de la tecnología y construíamos a partir de ellas. Luego buscábamos dónde encajaba lo que habíamos hecho.</p>
        <p>La lección que me dejó Afectus es que el problema es lo más importante. Hay que entender a quién le pasa, cuándo le pasa y qué necesita resolver. Esa definición debe guiar lo que construimos.</p>
        <div className="my-10 rounded-3xl bg-inverse p-7 text-white sm:p-9">
          <p className="eyebrow text-lime">Lo que me llevo de Afectus</p>
          <blockquote className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">El producto se adapta al problema.<br /><span className="text-lime">No el problema a la solución.</span></blockquote>
        </div>
        <Example title="Cobrar cartera: empezar por lo que se necesita resolver.">
          <p>En un caso hipotético, un equipo necesita contactar a personas con pagos pendientes y dar seguimiento a sus respuestas. Antes de dibujar un flujo, las preguntas serían: ¿en qué paso se está trabando el proceso?, ¿qué necesita la persona para avanzar?, ¿cuándo hace falta que intervenga alguien del equipo?</p>
          <p>Las respuestas ayudan a decidir qué construir y cómo evaluar si sirve. Tener un constructor de flujos, por sí solo, todavía no define el problema.</p>
        </Example>
        <Example title="Captar clientes: definir qué significa avanzar.">
          <p>Imagina una campaña en la que llegan consultas, pero muchas quedan sin seguimiento. Primero habría que entender dónde se pierde la conversación y qué información necesitan tanto la persona interesada como quien la atiende.</p>
          <p>Con ese problema concreto, ya se puede probar un recorrido y observar si más consultas reciben un siguiente paso útil. Este ejemplo ilustra el aprendizaje; no describe los resultados de la campaña de la aerolínea.</p>
        </Example>
        <p>Hoy, antes de preguntarme qué podemos hacer con una tecnología, quiero poder explicar con claridad qué problema vale la pena resolver y para quién. Afectus me enseñó por qué esa pregunta tiene que ir primero.</p>
      </section>

      <div className="mt-10 border-t border-ink/15 pt-6 text-xs leading-relaxed text-muted">
        <p>Relato de Juan Salazar, acompañado de capturas del archivo de Afectus. Los recuadros de ejemplos son ilustrativos.</p>
        <Link href="/blog?categoria=emprendimiento" className="mt-5 inline-flex min-h-11 items-center gap-3 font-semibold text-coral-dark">Más sobre emprendimiento <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
