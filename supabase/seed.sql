-- =============================================================
-- De Duck Agency — Seed Data
-- รันหลัง schema.sql เพื่อใส่ข้อมูลเริ่มต้น (จากเว็บเดิม)
-- =============================================================

-- ล้างข้อมูลเก่า (ปลอดภัยสำหรับ seed ครั้งแรก — ระวังถ้ามีข้อมูลจริงแล้ว)
truncate table public.packages restart identity cascade;
truncate table public.portfolio restart identity cascade;
truncate table public.reels restart identity cascade;

-- Marketing Packages
insert into public.packages (section, name, price, features, channels, is_recommended, sort_order) values
('marketing', 'Marketing Start', 12500,
  array['3 Video Clips + Caption', '3 Social Media Post + Caption', 'Cover page Update'],
  array['Facebook, IG, Tiktok', 'บริการดูแล Ads'],
  false, 1),
('marketing', 'Marketing Standard', 25000,
  array['4 Video Clips + Caption', '10 Social Media Post + Caption', 'Cover Page Update', 'Rich Menu (Line OA)', 'Marketing Plan'],
  array['Facebook, IG, Line OA, Tiktok', 'บริการดูแล Ads'],
  true, 2),
('marketing', 'Marketing Premium', 35000,
  array['8 Video Clips + Caption', '20 Social Media Post + Caption', 'Marketing For SME', 'Cover Page Update', 'Rich Menu (Line OA)'],
  array['Facebook, IG, Line OA, Tiktok', 'บริการดูแล Ads'],
  false, 3);

-- Production Packages
insert into public.packages (section, name, price, features, channels, is_recommended, sort_order) values
('production', 'Pack A : SME PACK', 7990,
  array['5 Reels with Editing', '60 Photo', '1-2 Production day'],
  array[]::text[],
  false, 1),
('production', 'Pack B : Monthly SME', 45000,
  array['10 Reels', '5 Artwork', 'Unlimit Photo', '4 Day per month for Production'],
  array[]::text[],
  true, 2),
('production', 'Pack C : All In One', 120000,
  array['Marketing Plan Monthly', '5 Production Day', 'Unlimit Photo', '15 Reels', '15 Art work', 'Branding CI'],
  array[]::text[],
  false, 3);

-- Portfolio
insert into public.portfolio (title, category, image_url, sort_order) values
('Beverage', 'beverage', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 1),
('Food', 'food', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 2),
('Graphic Ad', 'graphic', 'https://images.unsplash.com/photo-1621505963574-8b6eb063b5db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 3),
('Product', 'product', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 4),
('Beverage 2', 'beverage', 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 5),
('Graphic Ad Main', 'graphic', 'https://images.unsplash.com/photo-1559132578-838eb04fb870?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 6),
('Japanese Food', 'food', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 7),
('Beverage 3', 'beverage', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 8),
('Bakery Product', 'product', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 9),
('Graphic Promo', 'graphic', 'https://images.unsplash.com/photo-1588612140660-f138804918ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 10),
('Food Delivery', 'food', 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 11),
('Coffee', 'beverage', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 12);

-- Reels
insert into public.reels (caption, audio_text, image_url, views, likes, shares, sort_order) values
('วิดีโอรีวิวสินค้าสไตล์ Tiktok ดึงดูดสายตา #production #review', 'Original Audio - De Duck Agency Production Team', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 12500, 3400, 128, 1),
('พรีเซนต์เมนูอาหาร ให้น่าทานมากยิ่งขึ้น #Foody', 'Trending Audio - Food Vibe', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 8900, 2100, 85, 2),
('เก็บภาพบรรยากาศงาน Corporate ให้ดูพรีเมียม #Event', 'Corporate Background Music', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 15000, 4200, 310, 3),
('เบื้องหลังการทำงานทีมโปรดักชั่น #BTS', 'Original Audio - De Duck Agency Production Team', 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 9200, 1800, 45, 4),
('เทคนิคการถ่ายภาพสินค้าให้ปัง #Photography', 'Viral Beat - Top Trend', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 11300, 2500, 150, 5),
('แฟชั่นวิดีโอ โปรโมทเสื้อผ้าแบรนด์ดัง #FashionShoot', 'Pop Style - Make it shine', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 32100, 8900, 620, 6),
('มุมคาเฟ่ชิลๆ Vibe ดีม๊ากกก #CafeHopping', 'Chill Lofi Beats - Morning Coffee', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 7500, 1100, 32, 7),
('เซ็ตอัพไฟสตูดิโอแบบโปร จัดแสงให้สวยกริบ #Studio', 'Original Audio - De Duck Agency Production Team', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 14200, 3600, 215, 8),
('มุมมองใหม่ด้วยโดรน สุดอลังการ #DroneView', 'Epic Cinematic Drone Sound', 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 18500, 5600, 480, 9),
('พอดแคสต์สัมภาษณ์สุด Exclusive ภาพคมเสียงชัด #Podcast', 'Original Audio - De Duck Agency Production Team', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 24800, 6200, 890, 10);
