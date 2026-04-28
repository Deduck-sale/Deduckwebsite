"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";
import type { PortfolioCategory, PortfolioItem } from "@/lib/supabase/types";

const filters: { key: PortfolioCategory | "all"; label: string }[] = [
  { key: "all", label: "ทั้งหมด (All)" },
  { key: "beverage", label: "เครื่องดื่ม (Beverage)" },
  { key: "food", label: "อาหาร (Food)" },
  { key: "product", label: "สินค้า (Products)" },
  { key: "graphic", label: "กราฟิก (Graphic & Ads)" },
];

interface Props {
  items: PortfolioItem[];
}

export default function Portfolio({ items }: Props) {
  const [active, setActive] = useState<PortfolioCategory | "all">("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-10">
        <span className="glass-panel text-deduck-yellow px-6 py-2 text-sm font-medium tracking-widest uppercase">
          PORTFOLIO
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4 drop-shadow-md">
          ผลงานทั้งหมด
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          รวมผลงานคุณภาพจาก De Duck Agency ทั้งงานถ่ายภาพ เครื่องดื่ม อาหาร
          สินค้า และกราฟิกดีไซน์
        </p>
      </div>

      <div className="pb-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`filter-btn px-6 py-2 rounded-full text-gray-200 hover:text-deduck-yellow transition ${
                active === f.key ? "active" : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 max-w-[1400px] mx-auto w-full">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`portfolio-item ${
                active === "all" || active === item.category ? "" : "hide-item"
              } relative group rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]`}
              onClick={() => setLightbox(item.image_url)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title ?? "Portfolio"}
                className="w-full object-cover transform group-hover:scale-110 transition duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-wider uppercase border border-white/50 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                  View Project
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
