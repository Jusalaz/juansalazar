"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";
import type { PostCategory } from "@/lib/data/posts";

async function uploadCoverIfPresent(
  formData: FormData,
  slug: string,
): Promise<string | null> {
  const file = formData.get("cover") as File | null;
  if (!file || file.size === 0) return null;

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop();
  const path = `posts/${slug}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type, upsert: true });

  if (error) {
    console.error("uploadCoverIfPresent (posts)", error.message);
    return null;
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "finanzas") as PostCategory;
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));

  const coverUrl = await uploadCoverIfPresent(formData, slug);

  const supabase = createAdminClient();
  const { error } = await supabase.from("posts").insert({
    slug,
    title,
    excerpt,
    content,
    category,
    cover_image_url: coverUrl,
    published,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "finanzas") as PostCategory;
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));

  const coverUrl = await uploadCoverIfPresent(formData, slug);

  const supabase = createAdminClient();
  const update: Record<string, unknown> = {
    slug,
    title,
    excerpt,
    content,
    category,
    published,
    updated_at: new Date().toISOString(),
  };
  if (coverUrl) update.cover_image_url = coverUrl;

  const { error } = await supabase.from("posts").update(update).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = createAdminClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/");
}
