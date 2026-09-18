import Image from "next/image";
import Link from "next/link";

function ArchiveImage({ src, alt, caption, width = 1200, height = 729 }: {
  src: string; alt: string; caption: string; width?: number; height?: number;
}) {
  return (
    <figure className="my-8 min-w-0">
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar: ${alt}`} className="block overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full" />
      </a>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">{caption} <span className="text-coral-dark">Ampliar ↗</span></figcaption>
    </figure>
  );
}

export default function KuddosStory() {
  return (
    <article className="editorial-story">
      <div className="mb-8 flex flex-wrap gap-2">
        <span className="rounded-full bg-lime/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wider">Mi primer emprendimiento</span>
        <span className="rounded-full border border-ink/15 px-4 py-2 font-mono text-[10px] uppercase tracking-wider">Del papel al código</span>
      </div>
      <p className="story-lead">Kuddos fue mi primer emprendimiento. Empezó con unas fotocopias, nos tuvo unos tres años intentando sacar la idea adelante y nos dejó varias cagadas para aprender.</p>

      <section>
        <h2>Todo empezó en papel.</h2>
        <p>Éramos unos pelados de 18 años. Fuimos a fotocopiar como 20 hojas de estas y empezamos a pintar el flujo del usuario en la app: por dónde entraba, qué escogía, a dónde lo llevaba cada botón.</p>
        <p>Imagínense lo que ven en las imágenes, pero repartido en 20 páginas sobre la mesa del comedor. La mesa llena de hojas y nosotros tratando de imaginarnos cómo se iba a sentir todo eso en un celular. Cada hoja era una pantalla; las flechas eran nuestra forma de pasar de una a otra.</p>
        <p>Ahí, entre dibujos y botones de papel, íbamos armando el recorrido completo. La app todavía no existía en lo digital, pero nosotros ya la estábamos recorriendo sobre el comedor.</p>
        <p>Así, tal como se ve en las imágenes, empezó nuestra primera app. A punta de papel, dibujos y flechas.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <ArchiveImage src="/blog/kuddos/boceto-inicio.png" alt="Boceto a mano de la pantalla de inicio de Kuddos, con indicaciones para animar el logo" caption="Una de las primeras hojas: así imaginábamos el inicio de Kuddos." width={848} height={1200} />
          <ArchiveImage src="/blog/kuddos/boceto-materias.png" alt="Boceto a mano con materias de acompañamiento académico y accesos a Plan Futuro y Hobbies" caption="Materias, opciones y flechas: el flujo de la app todavía en papel." width={848} height={1200} />
        </div>
      </section>

      <section>
        <h2>Del papel al código.</h2>
        <p>Después tocó pasar todo eso a código. En ese entonces no teníamos una IA que nos ayudara a programar: todo el código tocaba hacerlo a mano. Ya se imaginarán el tiempo que tomó empezar a volver realidad lo que habíamos dibujado.</p>
        <p>Los entregables, los ajustes, que esto todavía falta, que aquello hay que revisarlo… Lo que en una hoja resolvíamos con una flecha, en la app tenía que funcionar de verdad. Y para los que entienden del tema: preparar una app para Apple puede ser un dolor de cabeza. Nosotros también nos metimos en ese cuento.</p>
        <p>Y esas hojas se fueron convirtiendo en lo que ven aquí: las pantallas de nuestra app.</p>
        <ArchiveImage src="/blog/kuddos/app-materias.png" alt="Tres pantallas del diseño de Kuddos: materias, plan de estudio y tutoría" caption="Del papel a las pantallas: materias, planes de estudio y tutorías." />
        <ArchiveImage src="/blog/kuddos/iteracion-planes.png" alt="Comparación de dos diseños de los planes de estudio de Kuddos" caption="Seguíamos ajustando cómo se veían y se escogían los planes. La app todavía estaba en construcción." />
      </section>

      <section>
        <h2>Los tutores y el Café de la Lerner de la 93.</h2>
        <p>Mientras tanto, hacíamos entrevistas en el Café de la Lerner de la 93. Ahí conocíamos a quienes iban a ser nuestros tutores. Entrevistamos como a 10 para empezar a conectar estudiantes con tutores.</p>
        <p>Claro, ya habíamos hecho merch y tales. Ya teníamos hasta los sacos de Kuddos. Entre las entrevistas, las pantallas y todo lo que estábamos preparando, le íbamos dando forma a eso que queríamos montar.</p>
        <p>Y aquí hay una primera pista de dónde la cagamos: para empezar a hacer esas conexiones no necesitábamos algo tan complejo. La app todavía tenía que encajar mejor con lo que la gente necesitaba, y nosotros ya estábamos metidos en construirla.</p>
      </section>

      <section>
        <h2>Y luego llegóooo el COVID.</h2>
        <p>Nos cambió el juego. La gente ahora buscaba todo digital, nuevos espacios y nuevas experiencias. Fue cuando dijimos: «Demos clases de música y hagámoslas por Zoom».</p>
        <p>Pa ese entonces, para nosotros no era tan fácil ni tan obvio como parece hoy. Pensándolo ahora, se sentía como el comienzo de una vida mucho más digitalizada. Pero bueno, ese no es el cuento de esta historia.</p>
        <p>Yo tenía una organeta de los años 2000 y andaba por todo Bogotá llevándola de un lado a otro. La dejaba en la portería y, cuando la recogíamos, tocaba limpiarla con alcohol a lo que daba. En ese momento sentíamos que había que desinfectar absolutamente todo por ese tal COVID.</p>
        <p>Y claro: ¡el que tiene tienda, que la atienda! Tocaba estar conectado a las sesiones de Zoom, estar pilas de que las clases sí se dieran y así poder cobrar. Entre mover la organeta y estar pendientes de las sesiones, también íbamos aprendiendo lo que implicaba prestar el servicio.</p>
      </section>

      <section>
        <h2>Un par de años después.</h2>
        <p>Kuddos duró como tres años. Perooo la aplicación nuuunca se lanzó. Una cosa fue todo lo que hicimos con las clases y los tutores, y otra la app que estábamos construyendo.</p>
        <p>Decidimos cerrar KUDDOS. Después de las hojas sobre el comedor, el código, las entrevistas y la organeta por Bogotá, hasta ahí llegó ese primer emprendimiento.</p>
        <p>Aún tengo los sacos que hicimos.</p>
      </section>

      <section>
        <h2>Las cagadas.</h2>
        <ol className="my-8 space-y-5">
          <li className="rounded-3xl border border-ink/10 bg-surface p-6 sm:p-8">
            <p className="eyebrow text-coral-dark">01 / Empezar con lo suficiente</p>
            <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight sm:text-3xl">El primer producto debe ser funcional. ¡PUNTO!</h3>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">Nos metimos a construir una app cuando el primer producto no tenía que ser espectacular. Viéndolo desde hoy, una hoja de Excel y un grupo de WhatsApp eran suficientes para empezar a conectar estudiantes con tutores.</p>
          </li>
          <li className="rounded-3xl bg-inverse p-6 text-white sm:p-8">
            <p className="eyebrow text-lime">02 / Entender quién pide la clase</p>
            <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight sm:text-3xl">Los que pedían las clases <span className="text-lime">eran los papás.</span></h3>
            <p className="mt-4 text-base leading-relaxed text-white/80">Pensábamos la app para los niños, pero quienes pedían las clases eran los papás. Los estudiantes recibían las tutorías; a los papás era a quienes teníamos que entender para diseñar cómo se pedían.</p>
          </li>
        </ol>
      </section>

      <div className="mt-12 border-t border-ink/15 pt-6 text-xs leading-relaxed text-muted">
        <p>Relato de Juan Salazar, acompañado de los bocetos y diseños originales de Kuddos. Las imágenes muestran la app que estábamos construyendo y que nunca se lanzó.</p>
        <Link href="/blog?categoria=emprendimiento" className="mt-5 inline-flex min-h-11 items-center gap-3 font-semibold text-coral-dark">Más historias de emprendimiento <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
