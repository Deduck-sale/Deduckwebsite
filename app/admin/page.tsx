import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: pkgCount }, { count: portfolioCount }, { count: reelsCount }] =
    await Promise.all([
      supabase.from("packages").select("*", { count: "exact", head: true }),
      supabase.from("portfolio").select("*", { count: "exact", head: true }),
      supabase.from("reels").select("*", { count: "exact", head: true }),
    ]);

  const cards = [
    { title: "Packages", count: pkgCount ?? 0, href: "/admin/packages", icon: "💰" },
    { title: "Portfolio", count: portfolioCount ?? 0, href: "/admin/portfolio", icon: "🖼️" },
    { title: "Reels", count: reelsCount ?? 0, href: "/admin/reels", icon: "🎬" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">ยินดีต้อนรับครับ 🦆</h1>
      <p className="text-gray-400 mb-10">เลือกเมนูที่ต้องการจัดการได้เลย</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="glass-card p-8 block group"
          >
            <div className="text-4xl mb-3">{c.icon}</div>
            <h2 className="text-xl font-bold text-white group-hover:text-deduck-yellow transition mb-2">
              {c.title}
            </h2>
            <p className="text-3xl font-bold text-deduck-yellow">{c.count}</p>
            <p className="text-xs text-gray-500 mt-1">รายการ</p>
          </Link>
        ))}
      </div>

      <div className="glass-card p-8 mt-10">
        <h3 className="text-lg font-bold text-white mb-3">💡 เคล็ดลับการใช้งาน</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• แก้ไขราคา Package ได้ที่เมนู "จัดการ Packages"</li>
          <li>• อัปโหลดรูปผลงานใหม่ที่ "จัดการ Portfolio"</li>
          <li>• อัปโหลดวิดีโอ Reels ได้ที่ "จัดการ Reels"</li>
          <li>• เว็บจะอัปเดตอัตโนมัติภายใน 60 วินาที หลังบันทึก</li>
        </ul>
      </div>
    </div>
  );
}
