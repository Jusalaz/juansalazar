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
        <span className="rounded-full border border-ink/15 px-4 py-2 font-mono text-[10px] uppercase tracking-wider">Del papel al lanzamiento</span>
      </div>
      <p className="story-lead">Kuddos fue mi primer emprendimiento. Empezó con pantallas dibujadas a mano, se convirtió en una app y nos dejó una lección que llegó cuando ya habíamos lanzado: creíamos que nuestro usuario era el estudiante. Eran los papás.</p>
      <p>Viendo los documentos hoy, se puede seguir el recorrido casi pantalla por pantalla. Primero están los archivos llamados “new doc”, con dibujos, flechas y notas al margen. Después aparecen el prototipo y los diseños de la aplicación. La idea fue tomando forma. La suposición sobre para quién la estábamos construyendo también viajó con ella.</p>

      <ol aria-label="Recorrido de Kuddos" className="my-10 grid gap-4 sm:grid-cols-3">
        {[
          { number: "01", when: "Julio de 2019", title: "El papel", text: "Bocetos y recorridos escritos a mano." },
          { number: "02", when: "Diseños de octubre de 2019", title: "La app", text: "Materias, planes, calendario y compra." },
          { number: "03", when: "Al lanzar", title: "El descubrimiento", text: "El usuario que debíamos entender eran los papás." },
        ].map(step => <li key={step.number} className="rounded-2xl border border-ink/10 bg-surface p-5"><span className="font-mono text-xs text-coral-dark">{step.number} /</span><h2 className="mt-4 font-display text-2xl tracking-tight">{step.title}</h2><p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p><p className="mt-5 font-mono text-[9px] uppercase tracking-wider text-muted">{step.when}</p></li>)}
      </ol>

      <section>
        <h2>Todo empezó en esos “new doc”.</h2>
        <p>Los dos escaneos de julio de 2019 muestran algo más que ideas sueltas. Ya estábamos definiendo cómo se entraba a Kuddos, qué información pedir en el registro y cómo navegar entre materias, tutorías, perfil y calendario. Hasta la aparición del logo tenía instrucciones de movimiento.</p>
        <p>En el segundo documento, el recorrido se vuelve más concreto: elegir una materia, escoger entre un plan de estudio y una tutoría, seleccionar un paquete de horas, agendar y llegar al pago. El acompañamiento académico ya estaba pensado como una experiencia que se podía recorrer en el celular.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <ArchiveImage src="/blog/kuddos/boceto-inicio.png" alt="Boceto a mano de la pantalla de inicio de Kuddos, con indicaciones para animar el logo" caption="“new doc”, 22 de julio de 2019: el inicio y su comportamiento." width={848} height={1200} />
          <ArchiveImage src="/blog/kuddos/boceto-materias.png" alt="Boceto a mano con materias de acompañamiento académico y accesos a Plan Futuro y Hobbies" caption="“new doc”, 26 de julio de 2019: la selección de materias." width={848} height={1200} />
        </div>
        <p>Las hojas tenían espacios para describir tanto la vista como su comportamiento. Había decisiones pequeñas —qué se desplegaba, dónde llevaba un botón— y otras que organizaban toda la propuesta: planes de estudio, tutorías, seguimiento y ayuda.</p>
      </section>

      <section>
        <h2>Del dibujo a un producto.</h2>
        <p>Después llevamos esos recorridos a una app. En los diseños de Kuddos aparecen la identidad de marca, los íconos de las materias y las pantallas de registro. La navegación conectaba el acompañamiento académico con los planes, las horas por agendar, el calendario y la compra.</p>
        <ArchiveImage src="/blog/kuddos/app-materias.png" alt="Tres pantallas del diseño de Kuddos: materias, plan de estudio y tutoría" caption="Kuddos_App_Oct31: los recorridos del papel convertidos en pantallas de producto." />
        <p>Los documentos también muestran que el diseño se revisaba. En “Kuddos_App_Materias” se propuso presentar los planes como bloques de 10, 16 y 22 horas y quitar la palabra “proceso” para facilitar la elección. En otra pantalla se discutía usar “Compra” para describir mejor el momento anterior al pago.</p>
        <ArchiveImage src="/blog/kuddos/iteracion-planes.png" alt="Comparación original de dos diseños de planes de estudio: lista de procesos y bloques con horas" caption="Una iteración real del archivo: hacer más clara la selección del plan. Las cantidades pertenecen al prototipo." />
        <p>Había trabajo concreto en cómo se entendía y se recorría la aplicación. Pero mejorar ese recorrido dejaba pendiente una pregunta que atravesaba todo: ¿quién necesitaba estar al mando de esa experiencia?</p>
      </section>

      <section>
        <h2>Aquí fue donde la cagamos.</h2>
        <p>Construimos creyendo que nuestro usuario era el estudiante. Cuando lanzamos la app nos dimos cuenta de que eran los papás. Esa fue la equivocación que terminó cambiando nuestra lectura del producto.</p>
        <blockquote className="my-9 rounded-3xl bg-inverse p-7 sm:p-10">
          <p className="font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">“Creímos que nuestro usuario era el estudiante. Pero no: <span className="text-lime">eran los papás.</span>”</p>
          <footer className="mt-5 font-mono text-[10px] uppercase tracking-wider text-white/55">Juan Salazar / El aprendizaje de Kuddos</footer>
        </blockquote>
        <p>El estudiante seguía siendo quien recibía el acompañamiento académico. El error estaba en convertir ese hecho en una respuesta automática sobre quién usaría la app. Para entender el servicio completo también había que mirar la experiencia de los padres.</p>
        <p>Eso cambia las preguntas de producto: ¿quién busca el apoyo?, ¿quién organiza el horario?, ¿quién necesita entender el plan?, ¿quién revisa qué pasó en la tutoría? Pensar en una materia y pensar en el acompañamiento de un hijo pueden llevar a prioridades diferentes.</p>
      </section>

      <aside className="my-10 rounded-3xl border border-ink/10 bg-surface p-6 sm:p-8" aria-labelledby="kuddos-example">
        <p className="eyebrow text-coral-dark">Ejemplo ilustrativo / No es un testimonio de cliente</p>
        <h2 id="kuddos-example" className="mt-4 font-display text-3xl leading-tight tracking-tight">La misma tutoría, dos puntos de vista.</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface-alt p-5"><h3 className="font-display text-xl">Desde el estudiante</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">“Necesito entender ecuaciones para la próxima clase”. La materia, el tema y la sesión podrían ser el centro de su atención.</p></div>
          <div className="rounded-2xl bg-lime/25 p-5"><h3 className="font-display text-xl">Desde mamá o papá</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">“Quiero entender qué apoyo necesita mi hijo, cómo coordinarlo y cómo saber si le está sirviendo”. El recorrido tendría que ayudar a responder esas preguntas.</p></div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted">Es una forma de ilustrar el cambio de enfoque. Ambos se relacionan con el mismo servicio, pero pueden necesitar información y acciones distintas.</p>
      </aside>

      <section>
        <h2>Había una pista dentro del propio prototipo.</h2>
        <p>Al revisar “Prototipo_Kuddos” aparece un detalle que hoy vale la pena detenerse a mirar: una pantalla preguntaba por el objetivo del acompañamiento e incluía un campo de comentario para los padres, marcado como opcional.</p>
        <div className="mx-auto max-w-xs"><ArchiveImage src="/blog/kuddos/comentarios-padres.png" alt="Pantalla original del prototipo con el campo Comentario para los padres, opcional" caption="Prototipo_Kuddos, pantalla 20: los padres ya estaban mencionados en el flujo." width={563} height={1000} /></div>
        <p>Los padres aparecían en el producto. Aun así, como descubrimos al lanzar, nuestra idea del usuario seguía centrada en el estudiante. Incluir a alguien en un campo y entender su recorrido completo son trabajos diferentes.</p>
      </section>

      <section>
        <h2>La pregunta que quedó para el siguiente emprendimiento.</h2>
        <p>Kuddos me dejó una lección sobre el orden en que construimos. Pasamos de bocetos a una app antes de descubrir que debíamos poner a otra persona en el centro. El aprendizaje llegó con el lanzamiento, cuando esa suposición se encontró con el uso real.</p>
        <p>Para llevar esta historia a otro proyecto, vale la pena separar los roles desde el principio: quién recibe el beneficio, quién usa la herramienta, quién toma la decisión y quién paga. A veces es la misma persona. En otros casos, asumir que lo es puede orientar todo el producto hacia el lugar equivocado.</p>
        <div className="my-8 border-l-4 border-coral pl-6"><p className="font-display text-2xl leading-snug tracking-tight sm:text-3xl">Antes de decidir la próxima pantalla: ¿a quién le estamos haciendo más fácil la vida?</p></div>
      </section>

      <div className="mt-12 border-t border-ink/15 pt-6 text-xs leading-relaxed text-muted">
        <p>Archivo de esta historia: los dos “new doc” de julio de 2019, Prototipo_Kuddos, Kuddos_App_Materias y Kuddos_App_Oct31. Los documentos muestran la evolución del diseño; el relato del lanzamiento y del error de usuario proviene de mi experiencia como fundador. Las imágenes son bocetos y prototipos originales.</p>
        <Link href="/blog?categoria=emprendimiento" className="mt-5 inline-flex min-h-11 items-center gap-3 font-semibold text-coral-dark">Más historias de emprendimiento <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
