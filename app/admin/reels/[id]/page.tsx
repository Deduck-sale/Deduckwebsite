import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Reel } from "@/lib/supabase/types";
import ReelForm from "../ReelForm";

export default async function EditReelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("reels")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">แก้ไข Reel</h1>
      <p className="text-gray-400 mb-8 line-clamp-1">
        {(data as Reel).caption}
      </p>
      <ReelForm reel={data as Reel} />
    </div>
  );
}
