"use client";

import { useEffect, useRef, useState } from "react";
import Lightbox from "./Lightbox";
import type { Reel } from "@/lib/supabase/types";

interface Props {
  reels: Reel[];
}

interface ReelDisplay extends Reel {
  uniqueKey: string;
}

interface LiveCounts {
  views: number;
  likes: number;
  shares: number;
}

const REACTION_ICONS = ["❤️", "👍", "❤️", "🔥", "🦆", "✨"];

function formatNumber(num: number): string {
  return num >= 1000 ? (num / 1000).toFixed(1) + "k" : String(num);
}

export default function Reels({ reels }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [displayReels, setDisplayReels] = useState<ReelDisplay[]>([]);
  const [liveCounts, setLiveCounts] = useState<Record<string, LiveCounts>>({});
  const initialScrolledRef = useRef(false);
  const reactionContainerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Build looped track ONCE per reels prop change (5 copies for infinite loop illusion)
  useEffect(() => {
    if (reels.length === 0) return;
    const copies: ReelDisplay[] = [];
    const counts: Record<string, LiveCounts> = {};
    for (let copy = 0; copy < 5; copy++) {
      reels.forEach((r) => {
        const uniqueKey = `${r.id}-${copy}`;
        copies.push({ ...r, uniqueKey });
        counts[uniqueKey] = { views: r.views, likes: r.likes, shares: r.shares };
      });
    }
    setDisplayReels(copies);
    setLiveCounts(counts);
    initialScrolledRef.current = false;
  }, [reels]);

  // Initial scroll to middle segment — runs ONCE per displayReels rebuild,
  // not on every live counter tick.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || displayReels.length === 0 || initialScrolledRef.current)
      return;
    const t = setTimeout(() => {
      const totalWidth = container.scrollWidth;
      container.scrollLeft = (totalWidth / 5) * 2;
      updateActive();
      initialScrolledRef.current = true;
    }, 300);
    return () => clearTimeout(t);
  }, [displayReels]);

  const updateActive = () => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLDivElement>("[data-reel-card]");
    const center = container.getBoundingClientRect().left + container.offsetWidth / 2;
    let closest: HTMLDivElement | null = null;
    let closestDist = Infinity;
    cards.forEach((c) => {
      const cc = c.getBoundingClientRect().left + c.offsetWidth / 2;
      const d = Math.abs(center - cc);
      if (d < closestDist) {
        closestDist = d;
        closest = c;
      }
    });
    if (closest) {
      const key = (closest as HTMLDivElement).getAttribute("data-reel-key");
      if (key) setActiveKey(key);
    }
  };

  // Scroll handler — infinite loop reset + active detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const totalWidth = container.scrollWidth;
        const segment = totalWidth / 5;
        if (container.scrollLeft < segment) {
          container.style.scrollBehavior = "auto";
          container.scrollLeft += segment * 2;
          container.style.scrollBehavior = "smooth";
        } else if (container.scrollLeft > segment * 3) {
          container.style.scrollBehavior = "auto";
          container.scrollLeft -= segment * 2;
          container.style.scrollBehavior = "smooth";
        }
        updateActive();
      });
    };
    container.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateActive);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Live counter ticking — only updates liveCounts so displayReels stays stable
  // (otherwise the initial-scroll effect would re-fire on every tick).
  useEffect(() => {
    const t = setInterval(() => {
      setLiveCounts((prev) => {
        const next: Record<string, LiveCounts> = {};
        const inc = (chance: number, max: number) =>
          Math.random() > chance ? Math.floor(Math.random() * max) + 1 : 0;
        for (const key in prev) {
          const c = prev[key];
          next[key] = {
            views: c.views + inc(0.4, 12),
            likes: c.likes + inc(0.4, 5),
            shares: c.shares + inc(0.4, 1),
          };
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(t);
  }, []);

  // Floating reactions on active card
  useEffect(() => {
    const t = setInterval(() => {
      if (!activeKey) return;
      const node = reactionContainerRefs.current.get(activeKey);
      if (!node || Math.random() < 0.3) return;
      const icon = document.createElement("div");
      icon.className = "reaction-icon";
      icon.innerText =
        REACTION_ICONS[Math.floor(Math.random() * REACTION_ICONS.length)];
      icon.style.left = Math.random() * 30 - 5 + "px";
      node.appendChild(icon);
      setTimeout(() => icon.remove(), 2500);
    }, 500);
    return () => clearInterval(t);
  }, [activeKey]);

  const handleClick = (reel: ReelDisplay, e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const target = e.currentTarget as HTMLDivElement;
    if (reel.uniqueKey !== activeKey) {
      e.preventDefault();
      const scrollPos =
        target.offsetLeft - container.offsetWidth / 2 + target.offsetWidth / 2;
      container.scrollTo({ left: scrollPos, behavior: "smooth" });
    } else {
      setLightbox(reel.image_url);
    }
  };

  if (reels.length === 0) return null;

  return (
    <section
      id="reels"
      className="py-16 relative z-10 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <span className="glass-panel text-deduck-yellow px-6 py-2 text-sm font-medium tracking-widest uppercase shadow-lg">
            Shorts &amp; Reels
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 drop-shadow-md">
            ผลงานวิดีโอแนวตั้ง
          </h2>
        </div>
        <p className="text-gray-400 mt-4 md:mt-0 max-w-sm text-sm font-light">
          <span className="hidden md:inline">เลื่อนซ้าย-ขวา เพื่อ</span>
          รับชมผลงานตัดต่อวิดีโอสั้นสำหรับ Social Media ของเรา
        </p>
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-x-auto pb-24 pt-12 snap-x snap-mandatory hide-scrollbar flex gap-6 md:gap-8 items-center reels-pad relative"
        style={{ scrollBehavior: "smooth" }}
      >
        {displayReels.map((reel) => {
          const counts = liveCounts[reel.uniqueKey] ?? {
            views: reel.views,
            likes: reel.likes,
            shares: reel.shares,
          };
          return (
          <div
            key={reel.uniqueKey}
            data-reel-card
            data-reel-key={reel.uniqueKey}
            className={`reel-card shrink-0 w-[240px] md:w-[280px] aspect-[9/16] glass-card !rounded-[2rem] relative overflow-hidden snap-center cursor-pointer group ${
              reel.uniqueKey === activeKey ? "is-active" : ""
            }`}
            onClick={(e) => handleClick(reel, e)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={reel.image_url}
              alt={reel.caption}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />

            <div className="absolute right-3 bottom-8 flex flex-col items-center space-y-5 z-20 pointer-events-none">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                </div>
                <span className="text-white text-[11px] mt-1 font-bold drop-shadow-md">
                  {formatNumber(counts.views)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-red-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="text-white text-[11px] mt-1 font-bold drop-shadow-md">
                  {formatNumber(counts.likes)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </div>
                <span className="text-white text-[11px] mt-1 font-bold drop-shadow-md">
                  {formatNumber(counts.shares)}
                </span>
              </div>
            </div>

            <div className="absolute bottom-6 left-4 right-16 z-20 pointer-events-none text-left">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-deduck-dark border border-deduck-yellow/50 overflow-hidden mr-2 flex items-center justify-center text-sm">
                  🦆
                </div>
                <span className="text-white font-bold text-sm drop-shadow-md">
                  Deduck.th
                </span>
                <span className="ml-2 px-2 py-0.5 rounded border border-white/50 text-[10px] text-white backdrop-blur">
                  ติดตาม
                </span>
              </div>
              <p className="text-white font-medium text-xs line-clamp-2 leading-snug mb-2 drop-shadow-md">
                {reel.caption}
              </p>
              <div className="flex items-center overflow-hidden w-full text-[10px] text-gray-200 bg-black/20 rounded-full px-2 py-1 backdrop-blur-sm border border-white/10">
                <svg
                  className="w-3 h-3 mr-1 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
                <span className="whitespace-nowrap animate-marquee">
                  {reel.audio_text}
                </span>
              </div>
            </div>

            <div
              ref={(el) => {
                if (el) reactionContainerRefs.current.set(reel.uniqueKey, el);
                else reactionContainerRefs.current.delete(reel.uniqueKey);
              }}
              className="reaction-container"
            />
          </div>
          );
        })}
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
