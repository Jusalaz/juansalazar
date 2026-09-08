"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";

async function uploadCoverIfPresent(
  formData: FormData,
  slug: string,
): Promise<string | null> {
  const file = formData.get("cover") as File | null;
  if (!file || file.size === 0) return null;

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop();
  const path = `books/${slug}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type, upsert: true });

  if (error) {
    console.error("uploadCoverIfPresent (books)", error.message);
    return null;
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

function parseRating(formData: FormData): number | null {
  const raw = formData.get("rating");
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export async function createBook(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const review = String(formData.get("review") ?? "").trim();
  const linkUrl = String(formData.get("link_url") ?? "").trim() || null;
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));
  const rating = parseRating(formData);

  const coverUrl = await uploadCoverIfPresent(formData, slug);

  const supabase = createAdminClient();
  const { error } = await supabase.from("books").insert({
    slug,
    title,
    author,
    review,
    rating,
    link_url: linkUrl,
    cover_image_url: coverUrl,
    published,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/libros");
  revalidatePath("/libros");
  revalidatePath("/");
  redirect("/admin/libros");
}

export async function updateBook(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const review = String(formData.get("review") ?? "").trim();
  const linkUrl = String(formData.get("link_url") ?? "").trim() || null;
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));
  const rating = parseRating(formData);

  const coverUrl = await uploadCoverIfPresent(formData, slug);

  const supabase = createAdminClient();
  const update: Record<string, unknown> = {
    slug,
    title,
    author,
    review,
    rating,
    link_url: linkUrl,
    published,
    updated_at: new Date().toISOString(),
  };
  if (coverUrl) update.cover_image_url = coverUrl;

  const { error } = await supabase.from("books").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/libros");
  revalidatePath("/libros");
  revalidatePath(`/libros/${slug}`);
  revalidatePath("/");
  redirect("/admin/libros");
}

export async function deleteBook(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = createAdminClient();
  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/libros");
  revalidatePath("/libros");
  revalidatePath("/");
}
