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
