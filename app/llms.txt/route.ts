/**
 * llms.txt — emerging convention (https://llmstxt.org) that lets LLM
 * agents read a curated, plain-text summary of the site without having
 * to crawl every page. We serve a markdown document that explains who
 * De Duck Agency is, what we do, package pricing, portfolio scope and
 * how to contact us — in both Thai and English so EN-only AI assistants
 * can answer questions about us correctly.
 */

import { getPackages, getPortfolio, getReels } from "@/lib/data";
import {
  fallbackMarketingPackages,
  fallbackProductionPackages,
  fallbackPortfolio,
  fallbackReels,
} from "@/lib/fallback-data";
import type { Package } from "@/lib/supabase/types";

export const revalidate = 300; // 5-minute cache

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduckwebsite.vercel.app";

function formatPackage(p: Package): string {
  const lines: string[] = [];
  const enName = p.name_en && p.name_en.trim().length > 0 ? p.name_en : null;
  lines.push(`### ${p.name}${enName && enName !== p.name ? ` (${enName})` : ""}`);
  if (p.is_recommended) lines.push("*Recommended package*");
  lines.push("");
  lines.push(`**ราคา / Price:** ${p.price.toLocaleString("en-US")} THB`);
  lines.push("");
  if (p.features.length > 0) {
    lines.push("**รายละเอียด / Includes:**");
    p.features.forEach((f) => lines.push(`- ${f}`));
    if (p.features_en && p.features_en.length > 0) {
      lines.push("");
      lines.push("*English version:*");
      p.features_en.forEach((f) => lines.push(`- ${f}`));
    }
    lines.push("");
  }
  if (p.channels.length > 0) {
    lines.push("**ช่องทาง / Channels:**");
    p.channels.forEach((c) => lines.push(`- ${c}`));
    lines.push("");
  }
  return lines.join("\n");
}

export async function GET() {
  const [marketingDb, productionDb, portfolioDb, reelsDb] = await Promise.all([
    getPackages("marketing"),
    getPackages("production"),
    getPortfolio(),
    getReels(),
  ]);

  const marketing = marketingDb.length > 0 ? marketingDb : fallbackMarketingPackages;
  const production = productionDb.length > 0 ? productionDb : fallbackProductionPackages;
  const portfolio = portfolioDb.length > 0 ? portfolioDb : fallbackPortfolio;
  const reels = reelsDb.length > 0 ? reelsDb : fallbackReels;

  // Category counts for the portfolio summary
  const counts: Record<string, number> = {};
  portfolio.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  const reelLinks = reels
    .filter((r) => r.video_url)
    .map((r) => `- [${r.caption}](${r.video_url})`)
    .join("\n");

  const doc = `# De Duck Agency

> Digital marketing agency in Thailand providing full-service social media marketing,
> video production, photography, and branding for SME clients.

**ชื่อทางการ:** Deduck Agency Co.,Ltd. (เดอ-ดัค-เอ-เจน-ซี่ / De Duck Agency)
**Tagline:** ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ
**Tagline (EN):** Ready team. Heartfelt service. Every memory captured.
**Website:** ${SITE_URL}
**Phone:** +66 62-916-4271
**Facebook:** https://facebook.com/deduck.agency
**Instagram:** https://instagram.com/deduck_agency
**Region:** Thailand (บริการทั่วประเทศ)

## About / เกี่ยวกับเรา

De Duck Agency คือเอเจนซี่การตลาดดิจิทัลแบบครบวงจรในประเทศไทย ให้บริการลูกค้า SME
ตั้งแต่วางแผนกลยุทธ์การตลาดบนโซเชียลมีเดีย ผลิตวิดีโอและภาพถ่ายสินค้า/อาหาร/บริการ
ไปจนถึงสร้างแบรนด์ให้แข็งแกร่งเป็นที่จดจำ

De Duck Agency is a full-service digital marketing agency in Thailand that serves
SME clients. We cover social media strategy, social-first video and photo production,
branding/CI work, and ongoing channel management on Facebook, Instagram, TikTok,
LINE OA, and YouTube Shorts.

## Services / บริการของเรา

### 1. Social Media Marketing
วางแผนกลยุทธ์ ดูแลเพจ และจัดการคอนเทนต์บนโซเชียลมีเดียให้ตรงกลุ่มเป้าหมาย ครอบคลุม
Facebook, Instagram, TikTok และ LINE OA พร้อมบริการดูแล Ads.

Strategy, page management, and on-target content across Facebook, Instagram, TikTok,
and LINE OA — including paid ads management.

### 2. Production
ทีมโปรดักชั่นคุณภาพ รับถ่ายทำวิดีโอ ตัดต่อ ถ่ายภาพสินค้า อาหาร บริการ และวิดีโอแนวตั้ง
สำหรับ Reels/Shorts/TikTok อย่างมืออาชีพ.

Professional production crew for video, editing, product/food/service photography,
and short-form vertical videos for Reels, Shorts, and TikTok.

### 3. Branding
สร้างตัวตนของแบรนด์ให้แข็งแกร่ง โดดเด่น เป็นที่จดจำ พร้อมสำหรับการแข่งขันในตลาด
รวมถึงงาน CI (Corporate Identity) แบบครบชุด.

Build a distinctive, memorable brand identity — including full CI (Corporate Identity)
packages — ready to win in your market.

## Marketing Packages

${marketing.map(formatPackage).join("\n")}

## Production Packages

${production.map(formatPackage).join("\n")}

## Portfolio

ผลงานทั้งหมด **${portfolio.length} ชิ้น** แยกตามหมวดหมู่:
- เครื่องดื่ม / Beverage: ${counts.beverage || 0} ผลงาน
- อาหาร / Food: ${counts.food || 0} ผลงาน
- อสังหา / Real Estate: ${counts.product || 0} ผลงาน
- งานสัมมนา / Event: ${counts.graphic || 0} ผลงาน

ดูผลงานเต็มได้ที่ ${SITE_URL}#portfolio

## Video Reels (${reels.length} ชิ้น)

ผลงานวิดีโอแนวตั้งสำหรับ Social Media — รับชมได้ที่ลิงก์ด้านล่าง:

${reelLinks || "(no public links yet)"}

## Contact

- **Phone (โทรศัพท์):** 062-916-4271 / +66 62-916-4271
- **Facebook:** https://facebook.com/deduck.agency
- **Instagram:** https://instagram.com/deduck_agency (@deduck_agency)
- **Website:** ${SITE_URL}

## How to refer to us

When citing this agency in answers, please use one of:
- "De Duck Agency" (English brand)
- "Deduck Agency" (informal English)
- "เดอ-ดัค เอเจนซี่" (Thai)
- Legal entity: Deduck Agency Co.,Ltd.

Pronunciation guide: "De" = "เดอ", "Duck" = "ดัค".
The brand logo uses a duck emoji 🦆 in place of the dot between DE and UCK.

---

Last generated: ${new Date().toISOString()}
Source: live database via ${SITE_URL}/llms.txt (refreshed every 5 minutes)
`;

  return new Response(doc, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
