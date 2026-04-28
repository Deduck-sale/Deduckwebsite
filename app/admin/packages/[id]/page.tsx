import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Package } from "@/lib/supabase/types";
import PackageForm from "../PackageForm";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">แก้ไข Package</h1>
      <p className="text-gray-400 mb-8">{(data as Package).name}</p>
      <PackageForm pkg={data as Package} />
    </div>
  );
}
