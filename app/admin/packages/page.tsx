import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Package } from "@/lib/supabase/types";
import DeleteButton from "../components/DeleteButton";
import { deletePackage } from "../actions";

export default async function PackagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("packages")
    .select("*")
    .order("section", { ascending: true })
    .order("sort_order", { ascending: true });
  const packages = (data ?? []) as Package[];

  const marketing = packages.filter((p) => p.section === "marketing");
  const production = packages.filter((p) => p.section === "production");

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">จัดการ Packages</h1>
          <p className="text-gray-400 mt-1">เพิ่ม / แก้ไข / ลบ แพ็กเกจการตลาดและโปรดักชั่น</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="px-5 py-2 bg-deduck-yellow text-deduck-dark font-bold rounded-full hover:bg-yellow-400 transition"
        >
          + เพิ่ม Package
        </Link>
      </div>

      <Section title="Marketing Packages" packages={marketing} />
      <Section title="Production Packages" packages={production} />
    </div>
  );
}

function Section({ title, packages }: { title: string; packages: Package[] }) {
  if (packages.length === 0) {
    return (
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="glass-card p-6 text-gray-400 text-sm">
          ยังไม่มีแพ็กเกจในกลุ่มนี้
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="grid gap-4">
        {packages.map((p) => (
          <div
            key={p.id}
            className="glass-card p-6 flex flex-col md:flex-row md:items-center gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-lg font-bold text-white">{p.name}</h3>
                {p.is_recommended && (
                  <span className="text-[10px] bg-deduck-yellow/20 text-deduck-yellow px-2 py-0.5 rounded-full border border-deduck-yellow/30">
                    RECOMMENDED
                  </span>
                )}
                {!p.is_active && (
                  <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                    ปิดใช้งาน
                  </span>
                )}
              </div>
              <p className="text-deduck-yellow font-bold text-xl">
                {p.price.toLocaleString("en-US")} บาท
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {p.features.length} features · ลำดับที่ {p.sort_order}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/packages/${p.id}`}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-deduck-yellow/20 hover:border-deduck-yellow/30 hover:text-deduck-yellow transition text-sm"
              >
                แก้ไข
              </Link>
              <DeleteButton id={p.id} action={deletePackage} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
