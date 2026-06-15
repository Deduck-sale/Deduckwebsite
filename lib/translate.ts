/**
 * Machine translation helper for the admin "🪄 auto-translate" buttons.
 *
 * Uses MyMemory's free public API — no API key, ~50,000 chars/day per
 * verified email. Quality is fine for marketing copy as a starting
 * point; the admin is expected to review/edit afterwards. If we ever
 * outgrow MyMemory, swap the implementation here for Claude/DeepL/etc.
 * — the call sites only know about translateText() and translateArray().
 */

const ENDPOINT = "https://api.mymemory.translated.net/get";
// Identifying email raises the daily quota from 5k → 50k chars/day.
const QUOTA_EMAIL = "admin@deduck.agency";

async function call(text: string, from: string, to: string): Promise<string> {
  if (!text || !text.trim()) return "";

  const url = new URL(ENDPOINT);
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `${from}|${to}`);
  url.searchParams.set("de", QUOTA_EMAIL);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return text;
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (typeof translated !== "string") return text;
    // MyMemory sometimes returns the source verbatim wrapped in MT NOTES
    // or "PLEASE SELECT TWO DISTINCT LANGUAGES" — defend against both.
    if (
      translated.includes("PLEASE SELECT") ||
      translated.includes("MYMEMORY WARNING")
    ) {
      return text;
    }
    return translated;
  } catch {
    return text;
  }
}

export async function translateText(
  text: string,
  from: "th" | "en" = "th",
  to: "en" | "th" = "en"
): Promise<string> {
  return call(text, from, to);
}

export async function translateArray(
  texts: string[],
  from: "th" | "en" = "th",
  to: "en" | "th" = "en"
): Promise<string[]> {
  // Run in parallel but cap concurrency at 5 so we don't hammer the API.
  const results: string[] = new Array(texts.length);
  const queue = texts.map((t, i) => ({ t, i }));
  const workers: Promise<void>[] = [];
  for (let w = 0; w < Math.min(5, queue.length); w++) {
    workers.push(
      (async () => {
        for (;;) {
          const next = queue.shift();
          if (!next) break;
          results[next.i] = await call(next.t, from, to);
        }
      })()
    );
  }
  await Promise.all(workers);
  return results;
}
