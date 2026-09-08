"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";

export async function createPrompt(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));

  const supabase = createAdminClient();
  const { error } = await supabase.from("prompts").insert({
    slug,
    title,
    description,
    content,
    published,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/prompts");
  revalidatePath("/recursos");
  redirect("/admin/prompts");
}

export async function updatePrompt(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("prompts")
    .update({
      slug,
      title,
      description,
      content,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/prompts");
  revalidatePath("/recursos");
  redirect("/admin/prompts");
}

export async function deletePrompt(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = createAdminClient();
  const { error } = await supabase.from("prompts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/prompts");
  revalidatePath("/recursos");
}
