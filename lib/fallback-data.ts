import type { Package, PortfolioItem, Reel } from "@/lib/supabase/types";

// Used when Supabase has no data yet (first deploy / preview without env vars).
// The seed.sql file inserts the same data into the DB.

export const fallbackMarketingPackages: Package[] = [
  {
    id: "fallback-m1",
    section: "marketing",
    name: "Marketing Start",
    subtitle: null,
    price: 12500,
    features: [
      "3 Video Clips + Caption",
      "3 Social Media Post + Caption",
      "Cover page Update",
    ],
    channels: ["Facebook, IG, Tiktok", "บริการดูแล Ads"],
    is_recommended: false,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "fallback-m2",
    section: "marketing",
    name: "Marketing Standard",
    subtitle: null,
    price: 25000,
    features: [
      "4 Video Clips + Caption",
      "10 Social Media Post + Caption",
      "Cover Page Update",
      "Rich Menu (Line OA)",
      "Marketing Plan",
    ],
    channels: ["Facebook, IG, Line OA, Tiktok", "บริการดูแล Ads"],
    is_recommended: true,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "fallback-m3",
    section: "marketing",
    name: "Marketing Premium",
    subtitle: null,
    price: 35000,
    features: [
      "8 Video Clips + Caption",
      "20 Social Media Post + Caption",
      "Marketing For SME",
      "Cover Page Update",
      "Rich Menu (Line OA)",
    ],
    channels: ["Facebook, IG, Line OA, Tiktok", "บริการดูแล Ads"],
    is_recommended: false,
    sort_order: 3,
    is_active: true,
  },
];

export const fallbackProductionPackages: Package[] = [
  {
    id: "fallback-p1",
    section: "production",
    name: "Pack A : SME PACK",
    subtitle: null,
    price: 7990,
    features: ["5 Reels with Editing", "60 Photo", "1-2 Production day"],
    channels: [],
    is_recommended: false,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "fallback-p2",
    section: "production",
    name: "Pack B : Monthly SME",
    subtitle: null,
    price: 45000,
    features: [
      "10 Reels",
      "5 Artwork",
      "Unlimit Photo",
      "4 Day per month for Production",
    ],
    channels: [],
    is_recommended: true,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "fallback-p3",
    section: "production",
    name: "Pack C : All In One",
    subtitle: null,
    price: 120000,
    features: [
      "Marketing Plan Monthly",
      "5 Production Day",
      "Unlimit Photo",
      "15 Reels",
      "15 Art work",
      "Branding CI",
    ],
    channels: [],
    is_recommended: false,
    sort_order: 3,
    is_active: true,
  },
];

export const fallbackPortfolio: PortfolioItem[] = [
  { id: "fb-1", title: "Beverage", category: "beverage", image_url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 1, is_active: true },
  { id: "fb-2", title: "Food", category: "food", image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 2, is_active: true },
  { id: "fb-3", title: "Graphic Ad", category: "graphic", image_url: "https://images.unsplash.com/photo-1621505963574-8b6eb063b5db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 3, is_active: true },
  { id: "fb-4", title: "Product", category: "product", image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 4, is_active: true },
  { id: "fb-5", title: "Beverage 2", category: "beverage", image_url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 5, is_active: true },
  { id: "fb-6", title: "Graphic Ad Main", category: "graphic", image_url: "https://images.unsplash.com/photo-1559132578-838eb04fb870?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 6, is_active: true },
  { id: "fb-7", title: "Japanese Food", category: "food", image_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 7, is_active: true },
  { id: "fb-8", title: "Beverage 3", category: "beverage", image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 8, is_active: true },
  { id: "fb-9", title: "Bakery Product", category: "product", image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 9, is_active: true },
  { id: "fb-10", title: "Graphic Promo", category: "graphic", image_url: "https://images.unsplash.com/photo-1588612140660-f138804918ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 10, is_active: true },
  { id: "fb-11", title: "Food Delivery", category: "food", image_url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 11, is_active: true },
  { id: "fb-12", title: "Coffee", category: "beverage", image_url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", sort_order: 12, is_active: true },
];

export const fallbackReels: Reel[] = [
  { id: "fr-1", caption: "วิดีโอรีวิวสินค้าสไตล์ Tiktok ดึงดูดสายตา #production #review", audio_text: "Original Audio - De Duck Agency Production Team", image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 12500, likes: 3400, shares: 128, sort_order: 1, is_active: true },
  { id: "fr-2", caption: "พรีเซนต์เมนูอาหาร ให้น่าทานมากยิ่งขึ้น #Foody", audio_text: "Trending Audio - Food Vibe", image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 8900, likes: 2100, shares: 85, sort_order: 2, is_active: true },
  { id: "fr-3", caption: "เก็บภาพบรรยากาศงาน Corporate ให้ดูพรีเมียม #Event", audio_text: "Corporate Background Music", image_url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 15000, likes: 4200, shares: 310, sort_order: 3, is_active: true },
  { id: "fr-4", caption: "เบื้องหลังการทำงานทีมโปรดักชั่น #BTS", audio_text: "Original Audio - De Duck Agency Production Team", image_url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 9200, likes: 1800, shares: 45, sort_order: 4, is_active: true },
  { id: "fr-5", caption: "เทคนิคการถ่ายภาพสินค้าให้ปัง #Photography", audio_text: "Viral Beat - Top Trend", image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 11300, likes: 2500, shares: 150, sort_order: 5, is_active: true },
  { id: "fr-6", caption: "แฟชั่นวิดีโอ โปรโมทเสื้อผ้าแบรนด์ดัง #FashionShoot", audio_text: "Pop Style - Make it shine", image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 32100, likes: 8900, shares: 620, sort_order: 6, is_active: true },
  { id: "fr-7", caption: "มุมคาเฟ่ชิลๆ Vibe ดีม๊ากกก #CafeHopping", audio_text: "Chill Lofi Beats - Morning Coffee", image_url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 7500, likes: 1100, shares: 32, sort_order: 7, is_active: true },
  { id: "fr-8", caption: "เซ็ตอัพไฟสตูดิโอแบบโปร จัดแสงให้สวยกริบ #Studio", audio_text: "Original Audio - De Duck Agency Production Team", image_url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 14200, likes: 3600, shares: 215, sort_order: 8, is_active: true },
  { id: "fr-9", caption: "มุมมองใหม่ด้วยโดรน สุดอลังการ #DroneView", audio_text: "Epic Cinematic Drone Sound", image_url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 18500, likes: 5600, shares: 480, sort_order: 9, is_active: true },
  { id: "fr-10", caption: "พอดแคสต์สัมภาษณ์สุด Exclusive ภาพคมเสียงชัด #Podcast", audio_text: "Original Audio - De Duck Agency Production Team", image_url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", views: 24800, likes: 6200, shares: 890, sort_order: 10, is_active: true },
];
