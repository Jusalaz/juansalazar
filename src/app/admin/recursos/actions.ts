"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";
import type { ResourceType } from "@/lib/data/resources";

async function uploadFile(
  formData: FormData,
  slug: string,
): Promise<{ url: string; name: string } | null> {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return null;

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop();
  const path = `resources/${slug}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("resources")
    .upload(path, file, { contentType: file.type, upsert: true });

  if (error) {
    console.error("uploadFile (resources)", error.message);
    return null;
  }

  const { data } = supabase.storage.from("resources").getPublicUrl(path);
  return { url: data.publicUrl, name: file.name };
}

export async function createResource(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const type = String(formData.get("type") ?? "excel") as ResourceType;
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));

  const uploaded = await uploadFile(formData, slug);
  if (!uploaded) {
    throw new Error("Debes seleccionar un archivo para el recurso.");
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("resources").insert({
    slug,
    title,
    description,
    type,
    file_url: uploaded.url,
    file_name: uploaded.name,
    published,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/recursos");
  revalidatePath("/recursos");
  revalidatePath("/");
  redirect("/admin/recursos");
}

export async function updateResource(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const type = String(formData.get("type") ?? "excel") as ResourceType;
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));

  const uploaded = await uploadFile(formData, slug);

  const supabase = createAdminClient();
  const update: Record<string, unknown> = {
    slug,
    title,
    description,
    type,
    published,
    updated_at: new Date().toISOString(),
  };
  if (uploaded) {
    update.file_url = uploaded.url;
    update.file_name = uploaded.name;
  }

  const { error } = await supabase.from("resources").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/recursos");
  revalidatePath("/recursos");
  revalidatePath("/");
  redirect("/admin/recursos");
}

export async function deleteResource(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = createAdminClient();
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/recursos");
  revalidatePath("/recursos");
  revalidatePath("/");
}
