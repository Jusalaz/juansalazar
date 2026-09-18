# Juan Salazar — Consultoría Estratégica

Sitio web de servicios de consultoría, construido con Next.js (App Router), TypeScript y Tailwind CSS.

## Estructura

- **Inicio** (`/`) — hero, resumen de servicios, portafolio y blog destacados, CTA de contacto.
- **Servicios** (`/servicios`) — detalle de las cuatro líneas de consultoría.
- **Sobre mí** (`/sobre-mi`) — trayectoria y forma de trabajo.
- **Portafolio** (`/portafolio`, `/portafolio/[slug]`) — casos de éxito con métricas.
- **Blog** (`/blog`, `/blog/[slug]`) — artículos.
- **Contacto** (`/contacto`) — formulario de contacto.

El contenido (servicios, casos de portafolio y artículos de blog) vive en [`src/lib/content.ts`](src/lib/content.ts) — es el lugar para editar textos sin tocar los componentes.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Deploy

Pensado para desplegarse en [Vercel](https://vercel.com/new).

## Portada, recursos y contenido editorial

- El presupuesto vive en `public/herramientas/presupuesto.html`. Funciona también como archivo independiente; guarda cambios en el almacenamiento local del navegador y exporta una copia HTML con los valores actuales. Cambiar el mes cambia la etiqueta del presupuesto actual: para conservar varios meses se descarga una copia de cada uno.
- `node --test tests/budget.test.mjs` verifica saldos, repartos proporcionales, casos sin ingresos y validación de datos recuperados.
- La historia de Afectus está en `src/content/afectus.ts` y `src/components/AfectusStory.tsx`, con capturas en `public/blog/afectus/`. Es contenido editorial del proyecto, incluido en el blog junto al contenido de Supabase; no es un registro del panel de administración. Su slug queda reservado para esta pieza local.
- Fuentes de Afectus: relato directo de Juan sobre San Francisco, análisis político, generación de texto, flujos de WhatsApp y adquisición del producto de firma digital por voz; documento del autor con capturas archivadas en mayo de 2023. Se conserva la secuencia sin inventar fechas, nombres de clientes ni términos de la adquisición. Los ejemplos de definición del problema son ilustrativos.
- Contacto prepara un correo con `mailto:`. El visitante revisa y envía el mensaje desde su aplicación de correo; el formulario no simula una entrega por servidor.

### Kuddos: primer emprendimiento

La historia de Kuddos vive en `src/content/kuddos.ts` y `src/components/KuddosStory.tsx`. Aparece en Inicio, Blog y Emprendimiento. Combina los bocetos de los archivos «new doc» del 22 y 26 de julio de 2019, `Prototipo_Kuddos.pdf`, `Kuddos_App_Materias.pdf` y `Kuddos_App_Oct31.pdf` con el relato directo de Juan: al lanzar la app descubrieron que los usuarios eran los padres, después de construir pensando en los estudiantes. Las imágenes seleccionadas están en `public/blog/kuddos/`; el ejemplo de los dos puntos de vista es ilustrativo.

Kuddos reemplaza a Afectus como primer emprendimiento en la narrativa. Afectus se conserva como historia independiente en `/blog/afectus-del-analisis-a-la-conversacion`; su URL anterior redirige permanentemente a la nueva.
