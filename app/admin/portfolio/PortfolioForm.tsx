"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioItem } from "@/lib/supabase/types";
import { savePortfolio } from "../actions";

interface Props {
  item?: PortfolioItem;
}

export default function PortfolioForm({ item }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(item?.image_url ?? null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const imageUrl = formData.get("image_url") as string;
    if (!item && (!file || file.size === 0) && !imageUrl) {
      setError("กรุณาเลือกรูปภาพ หรือใส่ URL");
      return;
    }
    setError(null);
    start(async () => {
      try {
        await savePortfolio(formData);
        router.push("/admin/portfolio");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      }
    });
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  }

  return (
    <form onSubmit={onSubmit} className="glass-card p-8 space-y-5 max-w-2xl">
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="image_url" value={item?.image_url ?? ""} />

      <div>
        <label className="block text-sm text-gray-300 mb-2">รูปภาพ</label>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="preview"
            className="w-full max-w-xs aspect-square object-cover rounded-xl mb-3 border border-white/10"
          />
        )}
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={onFile}
          className="form-input file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-deduck-yellow file:text-deduck-dark file:font-bold file:text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {item ? "เลือกไฟล์ใหม่หากต้องการเปลี่ยนรูป (ไม่บังคับ)" : "รองรับ JPG, PNG, WebP"}
        </p>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">ชื่อผลงาน (ไม่บังคับ)</label>
        <input
          type="text"
          name="title"
          defaultValue={item?.title ?? ""}
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">หมวดหมู่</label>
        <select
          name="category"
          defaultValue={item?.category ?? "beverage"}
          className="form-input"
          required
        >
          <option value="beverage">เครื่องดื่ม (Beverage)</option>
          <option value="food">อาหาร (Food)</option>
          <option value="product">สินค้า (Product)</option>
          <option value="graphic">กราฟิก (Graphic & Ads)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">ลำดับ</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={item?.sort_order ?? 0}
            className="form-input"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={item?.is_active ?? true}
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

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-3 bg-deduck-yellow text-deduck-dark font-bold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {pending ? "กำลังบันทึก..." : "บันทึก"}
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
