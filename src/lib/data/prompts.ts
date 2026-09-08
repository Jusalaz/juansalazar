import { createClient } from "@/lib/supabase/server";

export type Prompt = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
  created_at: string;
};

export async function getPublishedPrompts(): Promise<Prompt[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPublishedPrompts", error.message);
    return [];
  }
  return data ?? [];
}
