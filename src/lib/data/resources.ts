import { createClient } from "@/lib/supabase/server";

export type ResourceType = "excel" | "html" | "curso";

export type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  file_url: string;
  file_name: string;
  published: boolean;
  created_at: string;
};

export async function getPublishedResources(): Promise<Resource[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPublishedResources", error.message);
    return [];
  }
  return data ?? [];
}
