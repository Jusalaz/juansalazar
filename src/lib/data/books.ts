import { createClient } from "@/lib/supabase/server";

export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  cover_image_url: string | null;
  review: string;
  rating: number | null;
  link_url: string | null;
  published: boolean;
  created_at: string;
};

export async function getPublishedBooks(): Promise<Book[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPublishedBooks", error.message);
    return [];
  }
  return data ?? [];
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getBookBySlug", error.message);
    return null;
  }
  return data;
}
