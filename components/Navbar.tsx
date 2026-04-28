"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "หน้าแรก" },
  { href: "#services", label: "บริการของเรา" },
  { href: "#portfolio", label: "ผลงานทั้งหมด" },
  { href: "#pricing", label: "รายละเอียดราคา" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : ""
      }`}
      style={{
        background: scrolled
          ? "rgba(4, 13, 10, 0.7)"
          : "rgba(4, 13, 10, 0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#home"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <div className="font-bold text-2xl tracking-wider text-white flex items-center">
              DE
              <span className="text-deduck-yellow text-3xl leading-none mx-1">
                🦆
              </span>
              UCK
            </div>
            <div className="text-[10px] uppercase text-gray-400 leading-tight hidden sm:block border-l border-gray-600 pl-2">
              Digital
              <br />
              Marketing Agency
            </div>
          </a>

          <nav className="hidden md:flex space-x-8 items-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-gray-300 hover:text-deduck-yellow transition font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 bg-deduck-yellow text-deduck-dark font-bold rounded-full hover:bg-yellow-400 transition transform hover:scale-105 shadow-[0_0_15px_rgba(255,208,0,0.3)]"
            >
              ติดต่อเรา
            </a>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-nav border-t border-white/10 absolute w-full left-0 top-20 shadow-xl">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-deduck-yellow hover:bg-white/5 rounded-md"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 mt-4 text-base font-bold text-deduck-dark bg-deduck-yellow rounded-md text-center"
            >
              ติดต่อเรา
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
