import Image from "next/image";
import Link from "next/link";

function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return <aside className="my-8 rounded-2xl border border-lime-dark/15 bg-lime/15 p-6 sm:p-8"><p className="eyebrow text-lime-dark">Ejemplo ilustrativo / No es un caso de cliente</p><h3 className="mt-3 font-display text-2xl leading-tight tracking-tight">{title}</h3><div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">{children}</div></aside>;
}
function ArchiveImage({ src, alt, caption, width, height }: { src: string; alt: string; caption: string; width: number; height: number }) {
  return <figure className="my-10"><a href={src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-ink/10 bg-surface" aria-label={`Ampliar imagen: ${alt}`}><Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full" /></a><figcaption className="mt-3 text-xs leading-relaxed text-muted">{caption} <span className="text-coral-dark">Abre la imagen para ampliarla ↗</span></figcaption></figure>;
}

export default function AfectusStory() {
  return <article className="editorial-story">
    <div className="mb-10 flex flex-wrap gap-2"><span className="rounded-full bg-lime/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wider">Historia de un emprendimiento</span><span className="rounded-full border border-ink/15 px-4 py-2 font-mono text-[10px] uppercase tracking-wider">Parte 01 / El producto</span></div>
    <p className="story-lead">Afectus fue uno de mis emprendimientos. Para empezar a contar su historia, quiero volver a algo concreto: las pantallas del producto. Ahí se ve qué intentábamos resolver y cómo esas ideas tomaron forma.</p>
    <p>El archivo que conservo reúne dos frentes: una herramienta para analizar conversaciones de Twitter y una plataforma para organizar la atención y los flujos de WhatsApp. Mirarlos juntos permite contar esta primera parte desde lo que se estaba construyendo.</p>
    <p>Esta entrega se centra en el producto. Cómo terminó la historia y por qué falló merece un relato aparte, con el contexto completo.</p>

    <nav aria-label="En este artículo" className="my-10 rounded-2xl border border-ink/10 bg-surface p-6"><p className="eyebrow text-coral-dark">En esta historia</p><ol className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><li><a href="#escuchar" className="hover:underline">01 / Escuchar las conversaciones</a></li><li><a href="#entender" className="hover:underline">02 / Darle forma al texto</a></li><li><a href="#conversar" className="hover:underline">03 / Organizar la respuesta</a></li><li><a href="#siguiente" className="hover:underline">04 / La historia continúa</a></li></ol></nav>

    <section id="escuchar" className="scroll-mt-28"><h2>Primero, hacer una pregunta concreta.</h2>
      <p>En el módulo de Twitter, el recorrido comenzaba con una búsqueda. La interfaz permitía escoger el idioma, escribir una palabra y delimitar fechas y horas. También mostraba opciones de búsqueda simple y doble. Antes de llegar a cualquier gráfico, había que decidir qué conversación se quería observar.</p>
      <p>La pantalla de bienvenida describía el objetivo: analizar tweets mediante minería de texto y procesamiento de lenguaje natural. Traducido al día a día, se trataba de pasar de muchos mensajes sueltos a una lectura más ordenada de lo que estaba diciendo la gente.</p>
      <ArchiveImage src="/blog/afectus/busqueda.png" alt="Pantalla original de Afectus con selección de idioma, palabra y fechas para buscar en Twitter" caption="Archivo de Afectus: el punto de partida era definir la búsqueda." width={1509} height={768} />
      <Example title="Una marca acaba de lanzar un producto."><p>Imagina una marca de café que quiere entender la conversación sobre su lanzamiento. Podría buscar su nombre en español durante esa semana y revisar qué palabras aparecen alrededor: sabor, precio, entrega o empaque.</p><p>La pregunta útil sería: «¿De qué están hablando?». Si aparece mucho la palabra “entrega”, el siguiente paso sería leer esos mensajes para saber si hablan de rapidez, retrasos o algo distinto.</p></Example>
    </section>

    <section id="entender" className="scroll-mt-28"><h2>Del texto a una señal que se pudiera explorar.</h2>
      <p>Las capturas muestran nubes de palabras, opciones para excluir términos que no aportaban al análisis y una separación entre palabras positivas, negativas y neutrales. También aparece un panel de sentimientos con un indicador y un gráfico de varias emociones.</p>
      <p>En una de las búsquedas del archivo se usó “petro” como término. Esa captura permite ver cómo funcionaba la visualización; por sí sola no explica el tamaño de la muestra ni demuestra qué pensaba la población. Aquí sirve como registro del producto, no como conclusión sobre esa conversación.</p>
      <ArchiveImage src="/blog/afectus/nube-de-palabras.png" alt="Nube de palabras original de Afectus con controles para separar términos positivos, negativos y neutrales" caption="Archivo de Afectus: una visualización para explorar los términos de una búsqueda." width={1164} height={636} />
      <p>Hay una distinción que importa al mirar este tipo de herramientas: ver una palabra repetida ayuda a encontrar dónde mirar; entender por qué aparece requiere volver al contexto. Un gráfico puede abrir una pregunta, pero no siempre la responde.</p>
    </section>

    <section id="conversar" className="scroll-mt-28"><h2>La otra cara: organizar la conversación.</h2>
      <p>El archivo también muestra Afectus Co en una interfaz con chats, calendario, contactos, catálogo, plantillas, campañas y flujos. En la propuesta de página comercial aparecía una idea muy concreta: automatizar procesos y personalizar la comunicación por WhatsApp.</p>
      <p>La diferencia se entiende al mirar el constructor visual. En lugar de dejar toda la atención en un intercambio de mensajes libres, se podían dibujar caminos: una pregunta, varias respuestas posibles y un siguiente paso para cada una. El menú incluía mensajes con botones, listas, imágenes, documentos y la opción de un agente humano.</p>
      <ArchiveImage src="/blog/afectus/flujos.png" alt="Constructor visual de Afectus con bloques conectados para solicitar, cancelar o reprogramar una recolección" caption="Archivo de Afectus: un flujo de recolección con verificación de datos, selección de fecha y confirmación. La captura muestra el diseño del flujo; no documenta resultados comerciales." width={1583} height={775} />
      <Example title="Coordinar una recolección sin repetir cada pregunta."><p>Una persona escribe porque necesita una recolección. El flujo le ofrece opciones, confirma la dirección, pide una fecha y muestra una confirmación. Si quiere cambiar el día, toma la ruta de reprogramación.</p><p>Este ejemplo está inspirado en los pasos visibles en el constructor. Ayuda a entender la experiencia que se podía diseñar, sin asumir cuántas personas la usaron ni cuánto tiempo ahorró.</p></Example>
      <Example title="Una tienda recibe la misma pregunta todos los días."><p>«¿Tienen este producto?», «¿Cuánto cuesta?» y «¿Cómo lo pido?» podrían tener un primer recorrido guiado: escoger una opción, consultar información y continuar con una persona cuando hiciera falta.</p><p>El valor a explorar sería la continuidad de la atención: que cada mensaje tenga un siguiente paso claro. Para saber si eso mejora un negocio, harían falta pruebas y resultados; una pantalla por sí sola no los demuestra.</p></Example>
    </section>

    <section id="siguiente" className="scroll-mt-28"><h2>Hasta aquí, lo que estábamos construyendo.</h2>
      <p>Vistas en conjunto, las pantallas muestran una relación interesante: por un lado, entender conversaciones; por otro, diseñar cómo responder y qué hacer después. Esa es una forma concreta de entrar en la historia de Afectus.</p>
      <p>Quedan preguntas que las capturas no pueden resolver: cómo se eligieron las prioridades, cómo se intentó vender la propuesta y qué pasó al llevarla al mercado. Esas decisiones pertenecen a la siguiente parte.</p>
      <div className="my-10 rounded-3xl bg-inverse p-7 text-white sm:p-9"><p className="eyebrow text-lime">Continuará / Parte 02</p><h3 className="mt-4 font-display text-3xl leading-tight tracking-tight">Lo que pasó después.<br /><span className="text-lime">Y por qué falló.</span></h3><p className="mt-4 !text-sm !text-white/65">El próximo capítulo entra en las decisiones, los tropiezos y el desenlace. Esta primera parte deja la historia abierta.</p></div>
    </section>
    <div className="border-t border-ink/15 pt-6 text-xs leading-relaxed text-muted"><p className="!text-xs">Nota de archivo: este relato parte de las capturas del documento «Afectus», conservado en mayo de 2023. Los ejemplos están identificados como ilustrativos. No se atribuyen clientes, ventas o resultados que el archivo no documenta.</p><Link href="/blog?categoria=emprendimiento" className="mt-5 inline-flex min-h-11 items-center gap-3 font-semibold text-coral-dark">Más sobre emprendimiento <span aria-hidden="true">→</span></Link></div>
  </article>;
}
