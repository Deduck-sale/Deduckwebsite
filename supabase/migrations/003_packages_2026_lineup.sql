-- =============================================================
-- Migration 003: New 2026 package lineup
-- รันใน Supabase → SQL Editor หลัง deploy โค้ดเวอร์ชันใหม่
--
-- ทำสามอย่าง:
--   1. เพิ่ม column best_fit + best_fit_en (สำหรับโชว์ "เหมาะกับใคร")
--   2. ปิด (archive) package ปัจจุบันทั้งหมด — ข้อมูลเก่ายังอยู่ใน DB
--      เผื่อต้องดูย้อนหลัง / ลูกค้าเดิมยังเห็นในระบบ
--   3. เพิ่ม 7 packages ใหม่: 4 Marketing Retainer + 3 Production Project
-- =============================================================

-- 1) Add columns
alter table public.packages
  add column if not exists best_fit text,
  add column if not exists best_fit_en text;

comment on column public.packages.best_fit is
  'Optional 1-line "เหมาะกับใคร" — shows below price as a small chip on the public site.';
comment on column public.packages.best_fit_en is
  'English version of best_fit (falls back to Thai when null).';

-- 2) Archive old packages
update public.packages
   set is_active = false,
       updated_at = now()
 where is_active = true;

-- 3) Insert new lineup
-- ---------- Marketing Retainer ----------

insert into public.packages (
  section, name, name_en, price,
  features, features_en, channels, channels_en,
  best_fit, best_fit_en,
  is_recommended, sort_order, is_active
) values
(
  'marketing',
  'STARTER SPARK — เพจสตาร์ทแบบมืออาชีพ',
  'Starter Spark — SME Page Kickstart',
  9900,
  array[
    'คอนเทนต์ 8 โพสต์/เดือน (กราฟิก + แคปชั่น 2 ภาษา TH/EN)',
    'Reels / TikTok / Shorts vertical video 2 คลิป/เดือน',
    'Content Plan รายเดือน + Hashtag/AIEO research',
    'ตั้งค่า Google Business Profile + AIEO meta (ครั้งเดียว)',
    'LINE OA broadcast template 2 ชุด/เดือน',
    'รายงานผล + insight ทุก 30 วัน',
    'ทีม chat support จันทร์-ศุกร์'
  ],
  array[
    '8 social posts/month (graphic + bilingual caption)',
    '2 vertical Reels/TikTok/Shorts per month',
    'Monthly content plan + Hashtag/AIEO research',
    'Google Business Profile + AIEO meta setup (one-time)',
    '2 LINE OA broadcast templates per month',
    'Monthly performance report + insight',
    'Chat support Mon–Fri'
  ],
  array['Facebook, IG, TikTok, LINE OA'],
  array['Facebook, IG, TikTok, LINE OA'],
  'SME ใหม่ — ร้านอาหาร คาเฟ่ ร้านเสริมสวย ที่ต้องการเพจดูเป็นมืออาชีพ',
  'New SMEs — restaurants, cafés, and salons that want a polished page',
  false,
  1,
  true
),
(
  'marketing',
  'GROWTH ENGINE — เร่งเครื่องโซเชียลครบช่อง',
  'Growth Engine — Multi-Channel Content + Ads',
  24900,
  array[
    'คอนเทนต์ 14 โพสต์/เดือน ครอบคลุม FB / IG / TikTok / LINE',
    'Reels / TikTok vertical video 5 คลิป/เดือน (in-house shoot 1 วัน)',
    'ถ่ายภาพ product / lifestyle 15 ภาพ/เดือน',
    'Ads management (FB + TikTok) — ไม่ markup ค่า media',
    'LINE OA broadcast 4 ครั้ง + Rich menu refresh',
    'AI Content Engine — template + prompt library ของ Deduck',
    'AIEO + SEO monthly tune-up',
    'Monthly dashboard + strategy call 30 นาที'
  ],
  array[
    '14 posts/month across FB / IG / TikTok / LINE',
    '5 Reels / TikTok vertical videos (1 in-house shoot day included)',
    '15 product / lifestyle photos per month',
    'Ads management on FB + TikTok (media cost unmarked)',
    '4 LINE OA broadcasts + Rich Menu refresh',
    'AI Content Engine — Deduck-built template + prompt library',
    'Monthly AIEO + SEO tune-up',
    'Monthly dashboard + 30-min strategy call'
  ],
  array['Facebook, IG, TikTok, LINE OA, Ads, AIEO'],
  array['Facebook, IG, TikTok, LINE OA, Ads, AIEO'],
  'SME ที่ยอดขายเดินแล้ว ต้องการ scale 2-3 ช่อง + ยิง Ads จริงจัง (F&B chain, beauty, e-commerce ระดับเริ่มต้น)',
  'Established SMEs ready to scale across 2-3 channels + serious paid ads (F&B chains, beauty, early-stage e-commerce)',
  true,
  2,
  true
),
(
  'marketing',
  'BRAND PRO — เอเจนซี่แบบครบทีม',
  'Brand Pro — Full-Stack Marketing Team',
  49900,
  array[
    'คอนเทนต์ 20+ โพสต์/เดือน ครบทุก primary channel',
    'Reels / TikTok / Shorts 10 คลิป + Long-form 1 ชิ้น (2-3 นาที)',
    'ถ่าย on-location 2 วัน/เดือน (รวม drone เมื่อเหมาะ)',
    'TikTok Shop / Live Commerce setup + 2 live session/เดือน',
    'Micro-Influencer activation 2 คน/เดือน (5k–50k followers)',
    'LINE OA automation flow + broadcast 6 ครั้ง',
    'AIEO + SEO + Google Business + Local SEO tune',
    'Bi-weekly strategy call + performance dashboard'
  ],
  array[
    '20+ posts/month across every primary channel',
    '10 Reels / TikTok / Shorts + 1 long-form video (2-3 min)',
    '2 on-location shoot days/month (incl. drone when fitting)',
    'TikTok Shop / Live Commerce setup + 2 live sessions/month',
    '2 Micro-Influencer activations/month (5k–50k followers)',
    'LINE OA automation flow + 6 broadcasts',
    'AIEO + SEO + Google Business + Local SEO tune-up',
    'Bi-weekly strategy call + performance dashboard'
  ],
  array['Facebook, IG, TikTok Shop, LINE OA, Google Business, Influencer'],
  array['Facebook, IG, TikTok Shop, LINE OA, Google Business, Influencer'],
  'SME ขนาดกลาง — Real Estate developer, F&B group, beauty brand ที่ต้องการทีมการตลาดข้างนอกแทน in-house',
  'Mid-size SMEs — real estate developers, F&B groups, beauty brands that need an outsourced marketing team',
  false,
  3,
  true
),
(
  'marketing',
  'BRAND POWERHOUSE — ผู้นำในหมวด',
  'Brand Powerhouse — Category Leader Retainer',
  89900,
  array[
    'เนื้อหา 30+ ชิ้น/เดือน ทุก format ทุก channel',
    'Production shoot 4 วัน/เดือน (drone + studio + on-location)',
    'Long-form video 2 ชิ้น/เดือน (3-5 นาที) + cutdown 8-12 คลิป',
    'TikTok Shop full ops — script + 4 live sessions + creator network 4-5 คน',
    'LINE OA CRM ครบ funnel (acquisition → retention → win-back)',
    'Mid-tier Influencer 1 คน + Micro 3 คน/เดือน',
    'Brand strategy + quarterly campaign concept',
    'Dedicated Account Director + weekly call',
    'AIEO + SEO + Local + Google Ads setup'
  ],
  array[
    '30+ pieces/month across every format and channel',
    '4 production shoot days/month (drone + studio + on-location)',
    '2 long-form videos/month (3-5 min) + 8-12 cutdown clips',
    'TikTok Shop full ops — script + 4 live sessions + 4-5 creators',
    'Full-funnel LINE OA CRM (acquisition → retention → win-back)',
    '1 mid-tier influencer + 3 micro creators activated monthly',
    'Brand strategy + quarterly campaign concept',
    'Dedicated Account Director + weekly call',
    'AIEO + SEO + Local + Google Ads setup'
  ],
  array['ครบทุก channel + Influencer network + Google Ads + LINE CRM'],
  array['Every major channel + Influencer network + Google Ads + LINE CRM'],
  'Brand ระดับภูมิภาค / chain หลายสาขา / property project / luxury hotel ที่ต้องการ marketing partner ระยะยาว',
  'Regional brands / multi-location chains / property projects / luxury hotels that need a long-term marketing partner',
  false,
  4,
  true
);

-- ---------- Production Project ----------

insert into public.packages (
  section, name, name_en, price,
  features, features_en, channels, channels_en,
  best_fit, best_fit_en,
  is_recommended, sort_order, is_active
) values
(
  'production',
  'CONTENT BURST — ชุดวิดีโอเร่งด่วน',
  'Content Burst — Vertical Video Pack',
  19900,
  array[
    '1 วัน shoot (ทีม in-house 2 คน + กล้อง 4K)',
    '8 vertical clips (Reels / TikTok / Shorts) ตัดสำเร็จ + แคปชั่น',
    '30 ภาพ product / lifestyle retouched',
    'ส่งไฟล์พร้อมโพสต์ + brief วันโพสต์ที่เหมาะสม',
    'ส่งมอบใน 7-10 วัน'
  ],
  array[
    '1 shoot day (2-person in-house crew + 4K camera)',
    '8 ready-to-post vertical clips (Reels / TikTok / Shorts) + captions',
    '30 retouched product / lifestyle photos',
    'Delivery files + recommended posting brief',
    'Turnaround: 7-10 days'
  ],
  array[]::text[],
  array[]::text[],
  'ลูกค้าที่ดูแลเพจเอง แต่ขาดวิดีโอคุณภาพ / brand ที่จะลง campaign / restock content รายไตรมาส',
  'Brands that manage their own page but lack quality video / campaign restock / quarterly content refresh',
  false,
  1,
  true
),
(
  'production',
  'CI & BRAND IDENTITY KIT — วางรากแบรนด์',
  'CI & Brand Identity Kit',
  29900,
  array[
    'Brand workshop 1 รอบ',
    'Logo system + secondary mark + lockup',
    'Color palette + typography system',
    'Brand guideline PDF เล่มสมบูรณ์',
    'Social media template (FB / IG / TikTok / LINE Rich Menu)',
    'Stationery: นามบัตร / menu / signage template',
    'ส่งมอบเป็น Figma + AI/PSD source',
    'ระยะเวลา 4-5 สัปดาห์'
  ],
  array[
    '1 brand workshop session',
    'Logo system + secondary mark + lockup',
    'Color palette + typography system',
    'Complete brand guideline PDF',
    'Social templates (FB / IG / TikTok / LINE Rich Menu)',
    'Stationery: business card / menu / signage template',
    'Delivered as Figma + AI/PSD source files',
    'Timeline: 4-5 weeks'
  ],
  array[]::text[],
  array[]::text[],
  'ร้านใหม่ / brand rebrand / startup ที่กำลังเข้าตลาด',
  'New shops / brand refreshes / startups entering the market',
  true,
  2,
  true
),
(
  'production',
  'BRAND STORY FILM — หนังโฆษณาแบรนด์',
  'Brand Story Film — Hero Video Production',
  59900,
  array[
    'Pre-production: concept + script + storyboard',
    '2 วัน shoot (4K + drone + lighting + audio team)',
    '1 hero video 60-90 วินาที + 3 cut-down (15s / 30s / vertical)',
    '20 behind-the-scene photos',
    'Voiceover TH/EN + sound design + color grade',
    'Master file + delivery 3 platforms',
    'ระยะเวลา 3-4 สัปดาห์'
  ],
  array[
    'Pre-production: concept + script + storyboard',
    '2 shoot days (4K + drone + lighting + audio team)',
    '1 hero video 60-90s + 3 cut-downs (15s / 30s / vertical)',
    '20 behind-the-scenes photos',
    'TH/EN voiceover + sound design + color grade',
    'Master file + delivery for 3 platforms',
    'Timeline: 3-4 weeks'
  ],
  array[]::text[],
  array[]::text[],
  'Brand launch / property project / hotel grand opening / brand refresh ที่ต้องการ hero film',
  'Brand launches / property projects / hotel grand openings / refreshes that need a hero film',
  false,
  3,
  true
);
