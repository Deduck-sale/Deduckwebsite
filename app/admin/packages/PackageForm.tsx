"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Package } from "@/lib/supabase/types";
import { autoTranslatePackage, savePackage } from "../actions";

interface Props {
  pkg?: Package;
}

export default function PackageForm({ pkg }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TH fields stay uncontrolled (defaultValue) for snappy typing.
  // EN fields are controlled state because the "🪄 auto-translate"
  // button writes into them programmatically.
  const [nameEn, setNameEn] = useState(pkg?.name_en ?? "");
  const [featuresEn, setFeaturesEn] = useState(
    pkg?.features_en?.join("\n") ?? ""
  );
  const [channelsEn, setChannelsEn] = useState(
    pkg?.channels_en?.join("\n") ?? ""
  );
  const [bestFitEn, setBestFitEn] = useState(pkg?.best_fit_en ?? "");

  async function handleAutoTranslate(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form") as HTMLFormElement | null;
    if (!form) return;
    setTranslating(true);
    setError(null);
    try {
      const data = new FormData(form);
      const splitLines = (v: FormDataEntryValue | null) =>
        ((v as string) || "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);

      const result = await autoTranslatePackage({
        name: (data.get("name") as string) || "",
        features: splitLines(data.get("features")),
        channels: splitLines(data.get("channels")),
        best_fit: (data.get("best_fit") as string) || "",
      });

      setNameEn(result.name_en);
      setFeaturesEn(result.features_en.join("\n"));
      setChannelsEn(result.channels_en.join("\n"));
      setBestFitEn(result.best_fit_en);
    } catch (err) {
      setError(
        "แปลภาษาไม่สำเร็จ: " +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setTranslating(false);
    }
  }

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

      {/* Auto-translate banner */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-deduck-yellow/10 border border-deduck-yellow/30">
        <div>
          <p className="text-deduck-yellow text-sm font-bold mb-1">
            🪄 แปลภาษาอัตโนมัติ
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            กรอกฝั่ง 🇹🇭 ไทยก่อน → กดปุ่ม จะแปลฟิลด์ทั้งหมดเป็น EN ให้
            (แก้ได้ก่อนบันทึก)
          </p>
        </div>
        <button
          type="button"
          onClick={handleAutoTranslate}
          disabled={translating}
          className="shrink-0 px-4 py-2 bg-deduck-yellow text-deduck-dark font-bold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 text-sm"
        >
          {translating ? "กำลังแปล..." : "🪄 แปล TH → EN"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="🇹🇭 ชื่อ Package (TH)">
          <input
            type="text"
            name="name"
            defaultValue={pkg?.name ?? ""}
            className="form-input"
            placeholder="เช่น Marketing Standard"
            required
          />
        </Field>
        <Field label="🇬🇧 ชื่อ Package (EN) — ไม่บังคับ">
          <input
            type="text"
            name="name_en"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="form-input"
            placeholder="e.g. Marketing Standard"
          />
        </Field>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="🇹🇭 รายละเอียด Service (TH) — บรรทัดใหม่ = 1 ข้อ">
          <textarea
            name="features"
            defaultValue={pkg?.features.join("\n") ?? ""}
            className="form-input min-h-[140px]"
            placeholder={"4 Video Clips + Caption\n10 Social Media Post\n..."}
          />
        </Field>
        <Field label="🇬🇧 What's included (EN) — บรรทัดใหม่ = 1 ข้อ">
          <textarea
            name="features_en"
            value={featuresEn}
            onChange={(e) => setFeaturesEn(e.target.value)}
            className="form-input min-h-[140px]"
            placeholder={"4 Video Clips + Caption\n10 Social Media Posts\n..."}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="🇹🇭 ช่องทางการดูแล (TH) — บรรทัดใหม่ = 1 ข้อ">
          <textarea
            name="channels"
            defaultValue={pkg?.channels.join("\n") ?? ""}
            className="form-input min-h-[80px]"
            placeholder={"Facebook, IG, Tiktok\nบริการดูแล Ads"}
          />
        </Field>
        <Field label="🇬🇧 Channels covered (EN) — บรรทัดใหม่ = 1 ข้อ">
          <textarea
            name="channels_en"
            value={channelsEn}
            onChange={(e) => setChannelsEn(e.target.value)}
            className="form-input min-h-[80px]"
            placeholder={"Facebook, IG, Tiktok\nAds management"}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="🇹🇭 เหมาะกับใคร / Best fit (TH) — 1 บรรทัดสั้นๆ">
          <input
            type="text"
            name="best_fit"
            defaultValue={pkg?.best_fit ?? ""}
            className="form-input"
            placeholder="เช่น SME ใหม่ ร้านเล็ก ร้านอาหาร คาเฟ่"
          />
        </Field>
        <Field label="🇬🇧 Best fit (EN)">
          <input
            type="text"
            name="best_fit_en"
            value={bestFitEn}
            onChange={(e) => setBestFitEn(e.target.value)}
            className="form-input"
            placeholder="e.g. New SMEs, small restaurants, cafés"
          />
        </Field>
      </div>

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
          disabled={pending || translating}
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
