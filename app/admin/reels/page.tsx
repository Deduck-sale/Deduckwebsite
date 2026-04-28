import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Reel } from "@/lib/supabase/types";
import DeleteButton from "../components/DeleteButton";
import { deleteReel } from "../actions";

export default async function ReelsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reels")
    .select("*")
    .order("sort_order", { ascending: true });
  const reels = (data ?? []) as Reel[];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">จัดการ Reels</h1>
          <p className="text-gray-400 mt-1">วิดีโอแนวตั้ง / Shorts ในหน้าแรก</p>
        </div>
        <Link
          href="/admin/reels/new"
          className="px-5 py-2 bg-deduck-yellow text-deduck-dark font-bold rounded-full hover:bg-yellow-400 transition"
        >
          + เพิ่ม Reel
        </Link>
      </div>

      {reels.length === 0 ? (
        <div className="glass-card p-10 text-center text-gray-400">
          ยังไม่มี Reel ในระบบ
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reels.map((reel) => {
            const isVideo = /\.(mp4|webm|mov)(\?.*)?$/i.test(reel.image_url);
            return (
              <div
                key={reel.id}
                className="glass-card overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[9/16] bg-black">
                  {isVideo ? (
                    <video
                      src={reel.image_url}
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={reel.image_url}
                      alt={reel.caption}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {!reel.is_active && (
                    <span className="absolute top-2 right-2 text-[10px] bg-red-500/80 text-white px-2 py-0.5 rounded-full">
                      ปิด
                    </span>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <p className="text-white text-xs leading-snug line-clamp-2 mb-2">
                    {reel.caption}
                  </p>
                  <p className="text-[10px] text-gray-500 mb-3">
                    {reel.views.toLocaleString()} views ·{" "}
                    {reel.likes.toLocaleString()} likes
                  </p>
                  <div className="flex gap-1 mt-auto">
                    <Link
                      href={`/admin/reels/${reel.id}`}
                      className="flex-1 text-center px-2 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-deduck-yellow/20 hover:text-deduck-yellow transition text-xs"
                    >
                      แก้ไข
                    </Link>
                    <DeleteButton id={reel.id} action={deleteReel} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
