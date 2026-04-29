"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Reel } from "@/lib/supabase/types";
import { saveReel } from "../actions";
import { uploadToStorage } from "@/lib/supabase/upload";

interface Props {
  reel?: Reel;
}

export default function ReelForm({ reel }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(reel?.image_url ?? null);
  const [isVideo, setIsVideo] = useState(
    reel?.image_url ? /\.(mp4|webm|mov)(\?.*)?$/i.test(reel.image_url) : false
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file") as File;
    let imageUrl = formData.get("image_url") as string;

    if (!reel && (!file || file.size === 0) && !imageUrl) {
      setError("กรุณาเลือกไฟล์ หรือใส่ URL");
      return;
    }
    setError(null);

    // Upload directly from browser to Supabase Storage if a new file is selected,
    // then send only the resulting URL to the server action.
    if (file && file.size > 0) {
      try {
        setStatus(
          `กำลังอัปโหลด ${(file.size / 1024 / 1024).toFixed(1)}MB ...`
        );
        imageUrl = await uploadToStorage(file, "reels");
        formData.set("image_url", imageUrl);
        formData.delete("file");
      } catch (err) {
        setStatus(null);
        setError(
          "อัปโหลดไฟล์ไม่สำเร็จ: " +
            (err instanceof Error ? err.message : String(err))
        );
        return;
      }
    }

    setStatus("กำลังบันทึก...");
    start(async () => {
      try {
        await saveReel(formData);
        router.push("/admin/reels");
        router.refresh();
      } catch (err) {
        setStatus(null);
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      }
    });
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    setIsVideo(f.type.startsWith("video/"));
  }

  return (
    <form onSubmit={onSubmit} className="glass-card p-8 space-y-5 max-w-2xl">
      {reel && <input type="hidden" name="id" value={reel.id} />}
      <input type="hidden" name="image_url" value={reel?.image_url ?? ""} />

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          วิดีโอ หรือ รูปภาพ (แนะนำสัดส่วน 9:16)
        </label>
        {preview && (
          <div className="w-full max-w-[200px] aspect-[9/16] rounded-xl overflow-hidden mb-3 border border-white/10 bg-black">
            {isVideo ? (
              <video
                src={preview}
                muted
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
        <input
          type="file"
          name="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          onChange={onFile}
          className="form-input file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-deduck-yellow file:text-deduck-dark file:font-bold file:text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {reel
            ? "เลือกไฟล์ใหม่หากต้องการเปลี่ยน (ไม่บังคับ)"
            : "รองรับ MP4, WebM, MOV หรือ JPG, PNG (สูงสุด 50MB)"}
        </p>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">Caption</label>
        <textarea
          name="caption"
          defaultValue={reel?.caption ?? ""}
          className="form-input min-h-[80px]"
          placeholder="เช่น วิดีโอรีวิวสินค้าสไตล์ Tiktok #review"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">ชื่อเพลง / Audio</label>
        <input
          type="text"
          name="audio_text"
          defaultValue={reel?.audio_text ?? "Original Audio - De Duck Agency"}
          className="form-input"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Views เริ่มต้น</label>
          <input
            type="number"
            name="views"
            defaultValue={reel?.views ?? 0}
            className="form-input"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Likes เริ่มต้น</label>
          <input
            type="number"
            name="likes"
            defaultValue={reel?.likes ?? 0}
            className="form-input"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Shares เริ่มต้น</label>
          <input
            type="number"
            name="shares"
            defaultValue={reel?.shares ?? 0}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">ลำดับ</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={reel?.sort_order ?? 0}
            className="form-input"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={reel?.is_active ?? true}
              className="w-5 h-5 accent-deduck-yellow"
            />
            แสดงผล
          </label>
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      {status && !error && (
        <div className="text-deduck-yellow text-sm bg-deduck-yellow/10 border border-deduck-yellow/20 rounded-lg px-4 py-2">
          {status}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending || status !== null}
          className="px-6 py-3 bg-deduck-yellow text-deduck-dark font-bold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {status ?? "บันทึก"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition"
        >
          ยกเลิก
        </button>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus { border-color: rgba(255,208,0,0.5); }
      `}</style>
    </form>
  );
}
