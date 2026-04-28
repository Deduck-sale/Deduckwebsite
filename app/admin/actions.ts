"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PortfolioCategory } from "@/lib/supabase/types";

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

function revalidateHome() {
  revalidatePath("/", "page");
}

// ---------- Packages ----------

export async function savePackage(formData: FormData) {
  const supabase = await requireAuth();

  const id = formData.get("id") as string | null;
  const data = {
    section: formData.get("section") as "marketing" | "production",
    name: formData.get("name") as string,
    subtitle: (formData.get("subtitle") as string) || null,
    price: Number(formData.get("price")),
    features: (formData.get("features") as string)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    channels: (formData.get("channels") as string)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    is_recommended: formData.get("is_recommended") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
    is_active: formData.get("is_active") === "on",
  };

  if (id) {
    const { error } = await supabase.from("packages").update(data).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("packages").insert(data);
    if (error) throw error;
  }
  revalidateHome();
}

export async function deletePackage(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw error;
  revalidateHome();
}

// ---------- Portfolio ----------

export async function uploadPortfolioImage(file: File): Promise<string> {
  const supabase = await requireAuth();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export async function savePortfolio(formData: FormData) {
  const supabase = await requireAuth();
  const id = formData.get("id") as string | null;

  let imageUrl = formData.get("image_url") as string;
  const file = formData.get("file") as File | null;
  if (file && file.size > 0) {
    imageUrl = await uploadPortfolioImage(file);
  }

  const data = {
    title: (formData.get("title") as string) || null,
    category: formData.get("category") as PortfolioCategory,
    image_url: imageUrl,
    sort_order: Number(formData.get("sort_order") || 0),
    is_active: formData.get("is_active") === "on",
  };

  if (id) {
    const { error } = await supabase.from("portfolio").update(data).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("portfolio").insert(data);
    if (error) throw error;
  }
  revalidateHome();
}

export async function deletePortfolio(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("portfolio").delete().eq("id", id);
  if (error) throw error;
  revalidateHome();
}

// ---------- Reels ----------

export async function uploadReelMedia(file: File): Promise<string> {
  const supabase = await requireAuth();
  const ext = file.name.split(".").pop() ?? "mp4";
  const path = `reels/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export async function saveReel(formData: FormData) {
  const supabase = await requireAuth();
  const id = formData.get("id") as string | null;

  let imageUrl = formData.get("image_url") as string;
  const file = formData.get("file") as File | null;
  if (file && file.size > 0) {
    imageUrl = await uploadReelMedia(file);
  }

  const data = {
    caption: formData.get("caption") as string,
    audio_text: formData.get("audio_text") as string,
    image_url: imageUrl,
    views: Number(formData.get("views") || 0),
    likes: Number(formData.get("likes") || 0),
    shares: Number(formData.get("shares") || 0),
    sort_order: Number(formData.get("sort_order") || 0),
    is_active: formData.get("is_active") === "on",
  };

  if (id) {
    const { error } = await supabase.from("reels").update(data).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("reels").insert(data);
    if (error) throw error;
  }
  revalidateHome();
}

export async function deleteReel(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("reels").delete().eq("id", id);
  if (error) throw error;
  revalidateHome();
}
