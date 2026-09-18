import type { Post } from "@/lib/data/posts";

// Contenido editorial local. No modifica el documento original ni la base de datos.
export const afectusPost: Post = {
  id: "editorial-afectus",
  slug: "afectus-del-analisis-a-la-conversacion",
  title: "Afectus: el problema tenía que ir primero",
  excerpt: "De analizar debates políticos y Twitter a crear flujos y una firma digital por voz en WhatsApp. El recorrido de Afectus y la lección que nos dejaron sus cambios de rumbo.",
  content: "Después de vivir en San Francisco, creamos Afectus para analizar palabras y emociones. Trabajamos con políticos en Colombia, cruzando debates con Twitter, pero era un mercado muy cíclico y casi sin escalabilidad. Pasamos a generar textos para redes sociales con OpenAI y después a crear flujos por WhatsApp. Hicimos cobranza de cartera para una telco y campañas de marketing y captación de clientes para una aerolínea de Latinoamérica. Finalmente, una empresa decidió adquirir nuestro producto de firma digital por voz en WhatsApp. La lección: no habíamos definido y acotado bien el problema. El producto debe adaptarse al problema, no el problema a la solución.",
  category: "emprendimiento",
  cover_image_url: "/blog/afectus/flujos.png",
  published: true,
  created_at: "2026-09-18T12:00:00-05:00",
};
