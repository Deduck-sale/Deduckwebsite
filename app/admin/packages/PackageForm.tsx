"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Package } from "@/lib/supabase/types";
import { savePackage } from "../actions";

interface Props {
  pkg?: Package;
}

export default function PackageForm({ pkg }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    start(async () => {
      try {
        await savePackage(formData);
        router.push("/admin/packages");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="glass-card p-8 space-y-5 max-w-3xl">
      {pkg && <input type="hidden" name="id" value={pkg.id} />}

      <Field label="ประเภท">
        <select
          name="section"
          defaultValue={pkg?.section ?? "marketing"}
          className="form-input"
          required
        >
          <option value="marketing">Marketing</option>
          <option value="production">Production</option>
        </select>
      </Field>

      <Field label="ชื่อ Package">
        <input
          type="text"
          name="name"
          defaultValue={pkg?.name ?? ""}
          className="form-input"
          placeholder="เช่น Marketing Standard"
          required
        />
      </Field>

      <Field label="ราคา (บาท)">
        <input
          type="number"
          name="price"
          defaultValue={pkg?.price ?? 0}
          className="form-input"
          min={0}
          required
        />
      </Field>

      <Field
        label="รายละเอียด Service (ขึ้นบรรทัดใหม่ = 1 ข้อ)"
      >
        <textarea
          name="features"
          defaultValue={pkg?.features.join("\n") ?? ""}
          className="form-input min-h-[140px]"
          placeholder={"4 Video Clips + Caption\n10 Social Media Post\n..."}
        />
      </Field>

      <Field label="ช่องทางการดูแล (ขึ้นบรรทัดใหม่ = 1 ข้อ)">
        <textarea
          name="channels"
          defaultValue={pkg?.channels.join("\n") ?? ""}
          className="form-input min-h-[80px]"
          placeholder={"Facebook, IG, Tiktok\nบริการดูแล Ads"}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="ลำดับการแสดง">
          <input
            type="number"
            name="sort_order"
            defaultValue={pkg?.sort_order ?? 0}
            className="form-input"
          />
        </Field>
        <div className="flex items-end gap-6">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              name="is_recommended"
              defaultChecked={pkg?.is_recommended ?? false}
              className="w-5 h-5 accent-deduck-yellow"
            />
            แนะนำ (RECOMMENDED)
          </label>
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={pkg?.is_active ?? true}
              className="w-5 h-5 accent-deduck-yellow"
            />
            แสดงผล
          </label>
        </div>
      </div>

      <input type="hidden" name="subtitle" value={pkg?.subtitle ?? ""} />

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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2">{label}</label>
      {children}
    </div>
  );
}
