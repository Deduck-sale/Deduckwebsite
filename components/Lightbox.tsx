"use client";

import { useEffect } from "react";

interface Props {
  src: string | null;
  onClose: () => void;
}

export default function Lightbox({ src, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [src, onClose]);

  if (!src) return null;

  const isVideo = /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white hover:text-deduck-yellow transition p-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {isVideo ? (
        <video
          src={src}
          controls
          autoPlay
          className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl object-contain border border-white/20"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Portfolio Fullscreen"
          className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl object-contain border border-white/20"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}
