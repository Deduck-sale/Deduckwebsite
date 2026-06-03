/**
 * UI string dictionaries — switched at runtime by LanguageContext.
 *
 * Database content (package names, portfolio titles, reel captions) stays
 * in its original language because translations live in the data layer,
 * not here. Add a `name_en` / `caption_en` column to the relevant Supabase
 * tables later if bilingual data is needed.
 */

export type Locale = "th" | "en";

export const messages = {
  th: {
    nav: {
      home: "หน้าแรก",
      services: "บริการของเรา",
      portfolio: "ผลงานทั้งหมด",
      pricing: "รายละเอียดราคา",
      contact: "ติดต่อเรา",
      toggle_label: "เปลี่ยนภาษา",
    },
    hero: {
      pronunciation: "เดอ-ดัค-เอ-เจน-ซี่",
      tagline: "ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ",
      cta_portfolio: "ดูผลงานของเรา",
      cta_pricing: "ดูแพ็กเกจราคา",
    },
    services: {
      eyebrow: "Our Services",
      title: "บริการของเรา",
      subtitle:
        "De Duck Agency พร้อมให้บริการแบบครบวงจร เพื่อผลักดันธุรกิจของคุณให้เติบโตอย่างยั่งยืน",
      items: {
        social: {
          title: "Social Media Marketing",
          desc: "วางแผนกลยุทธ์ ดูแลเพจ และจัดการคอนเทนต์บนโซเชียลมีเดียให้ตรงกลุ่มเป้าหมาย",
        },
        production: {
          title: "Production",
          desc: "ทีมโปรดักชั่นคุณภาพ รับถ่ายทำวิดีโอ ตัดต่อ ถ่ายภาพสินค้า อาหาร และบริการอย่างมืออาชีพ",
        },
        branding: {
          title: "Branding",
          desc: "สร้างตัวตนของแบรนด์ให้แข็งแกร่ง โดดเด่น เป็นที่จดจำ พร้อมสำหรับการแข่งขันในตลาด",
        },
      },
    },
    reels: {
      eyebrow: "Shorts & Reels",
      title: "ผลงานวิดีโอแนวตั้ง",
      description_prefix: "เลื่อนซ้าย-ขวา เพื่อ",
      description: "รับชมผลงานตัดต่อวิดีโอสั้นสำหรับ Social Media ของเรา",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "ผลงานทั้งหมด",
      subtitle:
        "รวมผลงานคุณภาพจาก De Duck Agency ทั้งงานถ่ายภาพ เครื่องดื่ม อาหาร อสังหา และงานสัมมนา",
      filters: {
        all: "ทั้งหมด (All)",
        beverage: "เครื่องดื่ม (Beverage)",
        food: "อาหาร (Food)",
        product: "อสังหา (Real Estate)",
        graphic: "งานสัมมนา (Event)",
      },
      view_project: "ดูผลงาน",
    },
    pricing: {
      eyebrow: "Pricing",
      title: "รายละเอียดราคา",
      subtitle: "Enhance YOUR BUSINESS เติบโตไปกับเราด้วยแพ็กเกจที่คุ้มค่า",
      marketing_label: "Marketing Packages",
      production_eyebrow: "Production Packages",
      production_title: "Production Price",
      production_subtitle:
        "แพ็กเกจผลิตสื่อวิดีโอและภาพนิ่ง (Production & Photography)",
      details: "รายละเอียด Service ที่ได้รับ",
      channels: "ช่องทางการดูแล",
      currency_label: "เสนอให้ราคา",
      currency_unit: "บาท",
      recommended: "RECOMMENDED",
      footer: "* เงื่อนไขเป็นไปตามที่บริษัทกำหนด | Deduck Agency Co.,Ltd.",
    },
    footer: {
      tagline_top: "Digital Marketing Agency",
      tagline_bottom: "ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ",
      heading: "ติดต่อเรา (Contact Us)",
      phone_label: "โทรศัพท์",
      copyright: "All rights reserved.",
      enhance: "Enhance",
      enhance_yellow: "YOUR BUSINESS",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      pricing: "Pricing",
      contact: "Contact",
      toggle_label: "Switch language",
    },
    hero: {
      pronunciation: "De-Duck Agency",
      tagline: "Ready team. Heartfelt service. Every memory captured.",
      cta_portfolio: "View Our Work",
      cta_pricing: "See Pricing",
    },
    services: {
      eyebrow: "Our Services",
      title: "Our Services",
      subtitle:
        "De Duck Agency offers full-service marketing to help your business grow sustainably.",
      items: {
        social: {
          title: "Social Media Marketing",
          desc: "Strategy, page management, and on-target content for every social platform.",
        },
        production: {
          title: "Production",
          desc: "A professional production crew for video, editing, product, food, and service shoots.",
        },
        branding: {
          title: "Branding",
          desc: "Build a distinctive, memorable brand identity ready to win in your market.",
        },
      },
    },
    reels: {
      eyebrow: "Shorts & Reels",
      title: "Vertical Video Portfolio",
      description_prefix: "Scroll horizontally to ",
      description: "watch our short-form edits made for social media.",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "All Works",
      subtitle:
        "Quality work from De Duck Agency — photography, beverage, food, real estate, and events.",
      filters: {
        all: "All",
        beverage: "Beverage",
        food: "Food",
        product: "Real Estate",
        graphic: "Event",
      },
      view_project: "View Project",
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Pricing",
      subtitle: "Enhance YOUR BUSINESS — grow with our value-packed packages.",
      marketing_label: "Marketing Packages",
      production_eyebrow: "Production Packages",
      production_title: "Production Price",
      production_subtitle: "Video & photography production packages.",
      details: "What's included",
      channels: "Channels covered",
      currency_label: "Special price",
      currency_unit: "THB",
      recommended: "RECOMMENDED",
      footer: "* Terms apply | Deduck Agency Co.,Ltd.",
    },
    footer: {
      tagline_top: "Digital Marketing Agency",
      tagline_bottom: "Ready team. Heartfelt service. Every memory captured.",
      heading: "Contact Us",
      phone_label: "Phone",
      copyright: "All rights reserved.",
      enhance: "Enhance",
      enhance_yellow: "YOUR BUSINESS",
    },
  },
} as const;

export type Messages = (typeof messages)[Locale];
