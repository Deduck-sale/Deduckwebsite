import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduckwebsite.vercel.app";

/**
 * Explicit allow-lists for major AI crawlers so that LLM-powered search
 * tools (ChatGPT, Claude, Perplexity, Gemini, Copilot, Meta AI) can index
 * us. Without these entries some AI companies treat us as opt-out by
 * default. /admin is blocked from everyone.
 */
const AI_BOTS = [
  "GPTBot",            // OpenAI training crawler
  "ChatGPT-User",      // ChatGPT browsing tool
  "OAI-SearchBot",     // OpenAI search
  "ClaudeBot",         // Anthropic Claude
  "Claude-Web",        // Anthropic browsing
  "anthropic-ai",      // Older Anthropic UA
  "PerplexityBot",     // Perplexity AI
  "Perplexity-User",   // Perplexity Pro browsing
  "Google-Extended",   // Gemini training
  "Applebot-Extended", // Apple Intelligence
  "Bytespider",        // ByteDance/Doubao
  "Amazonbot",         // Amazon Q / Alexa+
  "Meta-ExternalAgent",// Meta AI
  "FacebookBot",
  "CCBot",             // Common Crawl (used by many AI labs)
  "Diffbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default for traditional search engines + anyone unlisted
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*"],
      },
      // Explicit allow for AI crawlers (helps AIEO discoverability)
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/admin", "/admin/*"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
