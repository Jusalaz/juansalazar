import type { Post } from "@/lib/data/posts";

// Bocetos y prototipos originales + relato directo del autor sobre el lanzamiento.
export const kuddosPost: Post = {
  id: "editorial-kuddos",
  slug: "kuddos-mi-primer-emprendimiento",
  title: "Kuddos: construimos para el estudiante. El usuario eran los papás.",
  excerpt: "Mi primer emprendimiento empezó con bocetos en papel y se convirtió en una app de acompañamiento académico. Al lanzarla descubrimos el error: habíamos puesto al usuario equivocado en el centro.",
  content: "Kuddos fue mi primer emprendimiento. Empezamos con los bocetos de los archivos new doc, los llevamos a una app de acompañamiento académico y, al lanzarla, descubrimos que nuestro usuario eran los papás. Habíamos construido pensando en el estudiante.",
  category: "emprendimiento",
  cover_image_url: "/blog/kuddos/portada.png",
  published: true,
  created_at: "2026-09-18T13:00:00-05:00",
};
