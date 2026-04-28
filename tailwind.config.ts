import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-prompt)", "Prompt", "sans-serif"],
      },
      colors: {
        "deduck-dark": "#040d0a",
        "deduck-green": "#1b4332",
        "deduck-yellow": "#ffd000",
      },
    },
  },
  plugins: [],
};

export default config;
