import { createClient } from "@/lib/supabase/client";

export type UploadProgress = (loaded: number, total: number) => void;

/**
 * Upload a file directly from the browser to Supabase Storage.
 * Bypasses Next.js Server Action body limit (1MB default) and Vercel's
 * 4.5MB request limit on the Hobby plan, so videos up to Supabase's
 * 50MB free-tier limit can be uploaded.
 *
 * Auth: relies on the user's session cookie (admin must be logged in).
 * RLS policy "media auth write" enforces this on the Supabase side.
 */
export async function uploadToStorage(
  file: File,
  folder: "portfolio" | "reels"
): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
