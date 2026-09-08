import { createClient } from "@/lib/supabase/server";

export type PostCategory = "emprendimiento" | "finanzas" | "ia";

export const postCategories: { value: PostCategory; label: string }[] = [
  { value: "emprendimiento", label: "Emprendimiento" },
  { value: "finanzas", label: "Finanzas" },
  { value: "ia", label: "IA" },
];

export function categoryLabel(category: PostCategory): string {
  return postCategories.find((c) => c.value === category)?.label ?? category;
}

// Cada pilar tiene un color de marca fijo: índigo = emprendimiento, ámbar = finanzas, coral = IA.
export const categoryBadgeClass: Record<PostCategory, string> = {
  emprendimiento: "bg-berry/10 text-berry",
  finanzas: "bg-amber/15 text-amber-dark",
  ia: "bg-coral/12 text-coral-dark",
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
};

export async function getPublishedPosts(category?: PostCategory): Promise<Post[]> {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getPublishedPosts", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getPostBySlug", error.message);
    return null;
  }
  return data;
}
