"use client";

/**
 * Floating LINE + Call buttons fixed to the bottom-right of the viewport.
 * Persists across the whole page so a visitor can convert from any scroll
 * position — Thai SME audience strongly prefers LINE over web forms.
 */
export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 print:hidden">
      <a
        href="https://line.me/R/ti/p/@deduck.agency"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ติดต่อทาง LINE OA"
        className="w-14 h-14 rounded-full bg-[#06C755] hover:bg-[#05a847] shadow-lg shadow-black/40 flex items-center justify-center transition transform hover:scale-110 ring-2 ring-white/10"
      >
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.963 8.898 9.422 9.605.385.083.91.254 1.042.593.118.303.038.777-.035 1.096-.089.387-.43 1.693-.526 2.05-.118.441-.184.887.26 1.066.445.179.914-.067 1.258-.293.435-.286 4.908-2.902 7.158-5.289 2.213-2.333 3.421-5.186 3.421-8.826z" />
        </svg>
      </a>
      <a
        href="tel:0629164271"
        aria-label="โทร 062-916-4271"
        className="w-14 h-14 rounded-full bg-deduck-yellow hover:bg-yellow-400 shadow-lg shadow-black/40 flex items-center justify-center transition transform hover:scale-110 ring-2 ring-white/10"
      >
        <svg
          className="w-6 h-6 text-deduck-dark"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
      </a>
    </div>
  );
}
