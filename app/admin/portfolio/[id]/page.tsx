import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { PortfolioItem } from "@/lib/supabase/types";
import PortfolioForm from "../PortfolioForm";

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">แก้ไขรูปผลงาน</h1>
      <p className="text-gray-400 mb-8">{(data as PortfolioItem).title ?? id}</p>
      <PortfolioForm item={data as PortfolioItem} />
    </div>
  );
}
