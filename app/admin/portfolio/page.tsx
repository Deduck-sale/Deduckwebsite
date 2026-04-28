import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { PortfolioItem } from "@/lib/supabase/types";
import DeleteButton from "../components/DeleteButton";
import { deletePortfolio } from "../actions";

const CATEGORY_LABELS: Record<string, string> = {
  beverage: "เครื่องดื่ม",
  food: "อาหาร",
  product: "สินค้า",
  graphic: "กราฟิก",
};

export default async function PortfolioAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio")
    .select("*")
    .order("sort_order", { ascending: true });
  const items = (data ?? []) as PortfolioItem[];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">จัดการ Portfolio</h1>
          <p className="text-gray-400 mt-1">รูปผลงานที่แสดงบนหน้าเว็บ</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="px-5 py-2 bg-deduck-yellow text-deduck-dark font-bold rounded-full hover:bg-yellow-400 transition"
        >
          + เพิ่มรูป
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="glass-card p-10 text-center text-gray-400">
          ยังไม่มีรูปในระบบ คลิก "+ เพิ่มรูป" เพื่อเริ่มต้น
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-card overflow-hidden flex flex-col"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title ?? ""}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-white text-sm font-medium truncate">
                  {item.title ?? "(ไม่มีชื่อ)"}
                </p>
                <p className="text-xs text-deduck-yellow mb-3">
                  {CATEGORY_LABELS[item.category]}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/admin/portfolio/${item.id}`}
                    className="flex-1 text-center px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-deduck-yellow/20 hover:text-deduck-yellow transition text-xs"
                  >
                    แก้ไข
                  </Link>
                  <DeleteButton id={item.id} action={deletePortfolio} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
