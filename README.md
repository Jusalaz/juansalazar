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

La historia de Kuddos vive en `src/content/kuddos.ts` y `src/components/KuddosStory.tsx`. Aparece en Inicio, Blog y Emprendimiento. Combina los bocetos de los archivos «new doc» del 22 y 26 de julio de 2019, `Prototipo_Kuddos.pdf`, `Kuddos_App_Materias.pdf` y `Kuddos_App_Oct31.pdf` con el relato actualizado de Juan: empezaron a los 18 años con unas 20 fotocopias, entrevistaron a unos 10 tutores en el Café de la Lerner de la 93 y durante el COVID dieron clases de música. Kuddos duró unos tres años y cerró por no generar ingresos; la app nunca se lanzó. Los aprendizajes son empezar con algo funcional y entender que los padres pedían las clases. Las imágenes seleccionadas están en `public/blog/kuddos/`.

Kuddos reemplaza a Afectus como primer emprendimiento en la narrativa. Afectus se conserva como historia independiente en `/blog/afectus-del-analisis-a-la-conversacion`; su URL anterior redirige permanentemente a la nueva.

## Métricas privadas

`/adminsalazar` muestra visitas, visitantes aproximados, lecturas estimadas y descargas en períodos de 7 o 30 días. Reutiliza Supabase Auth; tanto el proxy como la página comprueban el ID de la cuenta propietaria en `src/lib/auth/admin.ts`. No tiene enlaces en la navegación pública y devuelve `noindex, nofollow`. La gestión de contenido sigue en `/admin`.

- `SiteAnalytics` integra `Analytics` de `@vercel/analytics/next` en el layout global, excluye administración y elimina consultas/fragments de las URLs enviadas. Web Analytics debe estar habilitado en el proyecto de Vercel. La herramienta HTML alojada también carga el script oficial.
- El panel usa una medición propia, independiente de los conteos de Vercel y de sus eventos personalizados. `public/site-metrics.js` envía únicamente tipo de evento, ruta pública e identificadores aleatorios del navegador/sesión a `POST /api/metrics`. No envía datos del presupuesto, correos, IP ni formularios. Respeta Do Not Track; ignora hosts de preview, rutas de administración y sesiones autenticadas.
- Una sesión termina tras 30 minutos sin actividad medida. El identificador local de visitante caduca tras 30 días sin actividad. Los visitantes son navegadores aproximados, no personas identificadas. Sin almacenamiento local se usa memoria de la página.
- Aperturas, lecturas y descargas se deduplican por sesión, ruta y día de Colombia. Una lectura estimada exige 30 segundos con la pestaña visible y avance al 75 % del contenido. Una descarga registra el clic que la inicia, no una confirmación del sistema de archivos. «Guardar copia» se distingue de descargar la plantilla. Las copias offline no cargan los scripts de medición.
- Los eventos se guardan como objetos idempotentes en el bucket privado `site-analytics` de Supabase Storage, con identificadores transformados por HMAC y sin políticas para usuarios públicos. Solo el servidor usa `SUPABASE_SERVICE_ROLE_KEY`. El bucket se creó con `public: false`, límite de 2048 bytes y MIME `application/json`; para otro entorno debe crearse igual. No crear políticas públicas para este bucket.
- El reporte lista nombres de eventos por día, con paginación, concurrencia limitada y caché de 60 segundos, después de autorizar al propietario. Los errores de almacenamiento muestran un estado de error, no ceros. Tiene un límite explícito de 100.000 objetos/día; si crece hasta ese volumen conviene migrar a una tabla de eventos y agregados SQL. La vista consulta hasta 30 días; los eventos anteriores permanecen privados en el bucket hasta su eliminación administrativa.
- La medición empieza con esta integración: no hay reconstrucción de visitas pasadas. `node --test tests/*.test.mjs` cubre validación, períodos, conteos y la plantilla.
