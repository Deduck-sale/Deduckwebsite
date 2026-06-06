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
      faq: "คำถามที่พบบ่อย",
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
      marketing_eyebrow: "Marketing Retainer",
      marketing_title: "ดูแลรายเดือน",
      marketing_subtitle: "ดูแลครบทุกช่อง — เพจ คอนเทนต์ Ads LINE OA ในแพ็กเกจเดียว",
      marketing_label: "Marketing Retainer",
      production_eyebrow: "Production Project",
      production_title: "ผลิตเป็นโปรเจกต์",
      production_subtitle:
        "ถ่ายทำ ตัดต่อ Branding คิดเป็นชิ้นงาน — เลือกเฉพาะที่ต้องการ",
      details: "รายละเอียด Service ที่ได้รับ",
      channels: "ช่องทางการดูแล",
      best_fit: "เหมาะกับใคร",
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
      line_label: "LINE OA",
      copyright: "All rights reserved.",
      enhance: "Enhance",
      enhance_yellow: "YOUR BUSINESS",
    },
    faq: {
      eyebrow: "FAQ",
      title: "คำถามที่พบบ่อย",
      subtitle: "คำถามที่ลูกค้าถามเข้ามาบ่อยๆ — ถ้าไม่เจอที่อยากรู้ ทักหาเราใน LINE ได้เลย",
      items: [
        {
          q: "ราคาเริ่มต้นเท่าไหร่?",
          a: "แพ็กเกจเริ่มต้นที่ 5,500 บาท (Package A — Edit Only) สำหรับงานตัดต่อล้วน หากต้องการครบทั้ง Production + ดูแล Social Media แนะนำ Package B 19,900 บาท/เดือน",
        },
        {
          q: "มีสัญญาขั้นต่ำกี่เดือน?",
          a: "ไม่บังคับ — ลูกค้าใหม่เริ่มได้แบบรายเดือน เลิกเมื่อไหร่ก็ได้ ถ้าต้องการส่วนลดสามารถทำสัญญา 3-6 เดือนได้",
        },
        {
          q: "รับงานต่างจังหวัดไหม?",
          a: "รับครับ ทีมเดินทางได้ทั่วประเทศ ค่าเดินทาง + ที่พักคิดตามจริง ลูกค้าหลักของเรามีทั้งกรุงเทพ, ภูเก็ต, เชียงใหม่, หัวหิน",
        },
        {
          q: "ใช้เวลาผลิตวิดีโอกี่วัน?",
          a: "Reels ปกติส่งภายใน 5-7 วันทำการหลังถ่ายเสร็จ งานเร่งด่วน (Rush) ส่งใน 48 ชม. คิดค่า rush เพิ่ม 30%",
        },
        {
          q: "ดูแลแอด (Facebook/TikTok Ads) ด้วยไหม?",
          a: "ดูแลครับ รวมอยู่ใน Package Standard และ Premium งบยิงแอดเป็นส่วนของลูกค้า ทีมเป็นคนวางแผน + ปรับ optimize",
        },
        {
          q: "ทำเว็บไซต์ + รับ Branding/CI ไหม?",
          a: "ทำครับ — รวมอยู่ใน Pack C: All In One หรือคิดเป็น project แยกได้ ราคาเริ่มต้น 25,000 บาท สำหรับ Branding CI พื้นฐาน",
        },
        {
          q: "ขอดู Case Study เพิ่มเติมได้ไหม?",
          a: "ได้ครับ ทักทาง LINE หรือโทร 062-916-4271 ทีมจะส่ง portfolio พร้อมตัวเลขผลลัพธ์ของลูกค้ารายอุตสาหกรรมที่ใกล้กับคุณให้ดู",
        },
        {
          q: "ชำระเงินยังไง?",
          a: "Package รายเดือนชำระล่วงหน้าต้นเดือน, Project งานเดี่ยวแบ่ง 50% ก่อนเริ่ม + 50% ตอนส่งงาน รับโอนผ่านบัญชีบริษัทและออกใบกำกับภาษีได้",
        },
      ],
    },
    services_page: {
      back: "← กลับหน้าหลัก",
      contact_cta: "ปรึกษาฟรี ติดต่อทีม",
      related_packages: "แพ็กเกจที่เกี่ยวข้อง",
      related_works: "ตัวอย่างผลงาน",
      not_found: "ไม่พบบริการนี้",
      items: {
        "social-media": {
          name: "Social Media Marketing",
          tagline: "วางแผน ดูแลเพจ และคอนเทนต์ครบทุกแพลตฟอร์ม",
          description:
            "ทีมงานวางกลยุทธ์โซเชียลมีเดียระยะยาว ตั้งแต่ค้นคว้าคู่แข่ง ตั้ง KPI วาง Content Pillar รายเดือน คุมโทนเสียงแบรนด์ จัดตารางโพสต์ ตอบ inbox/comment และวัดผลทุกเดือน ครอบคลุม Facebook Page, Instagram, TikTok, Line OA และ YouTube Shorts",
          sub_services: [
            "วางแผน Content Strategy รายเดือน + Calendar",
            "ออกแบบรูป Post + Caption + Hashtag",
            "ตัด Reels / TikTok แนวตั้ง",
            "ดูแล Inbox + Comment ตอบลูกค้า",
            "ยิง Ads + Optimize ทุกสัปดาห์",
            "Monthly Report + แนะนำการปรับ",
          ],
        },
        production: {
          name: "Production",
          tagline: "ถ่าย-ตัด วิดีโอและภาพนิ่งคุณภาพมืออาชีพ",
          description:
            "ทีมโปรดักชั่นมือถือกล้อง 4K, lighting set, ทีมงาน Director/Editor มืออาชีพ รับถ่ายในสตูดิโอและ on-location ทั่วประเทศ ตั้งแต่ภาพสินค้า อาหาร อสังหา ไปจนถึงงานสัมมนาขนาดใหญ่และวิดีโอ Reels/Shorts สำหรับ Social Media",
          sub_services: [
            "ถ่ายภาพสินค้า / อาหาร / Beverage (สตูดิโอ + on-location)",
            "ถ่ายวิดีโอ Reels / Shorts / TikTok แนวตั้ง 9:16",
            "ถ่ายวิดีโอ Long-form / Brand Story 16:9",
            "ถ่ายงาน Event / Seminar / Wedding (multi-cam)",
            "ตัดต่อ + Color Grading + Sound Design",
            "Drone Aerial Shot (เมื่อจำเป็น)",
          ],
        },
        branding: {
          name: "Branding",
          tagline: "สร้างตัวตนแบรนด์ที่จดจำได้และพร้อมขาย",
          description:
            "บริการงาน Branding และ Corporate Identity (CI) ครบชุด ตั้งแต่วาง Brand Strategy, ออกแบบ Logo, Color Palette, Typography, Brand Voice ไปจนถึง Brand Guideline เล่มสมบูรณ์ที่ทีมการตลาดและเอเจนซี่อื่นนำไปใช้ต่อได้",
          sub_services: [
            "Brand Strategy + Positioning Workshop",
            "Logo Design + Variations",
            "Color Palette + Typography System",
            "Brand Guideline (PDF เล่มสมบูรณ์)",
            "Stationery (นามบัตร / Letterhead / Envelope)",
            "Packaging Design",
          ],
        },
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      pricing: "Pricing",
      faq: "FAQ",
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
      marketing_eyebrow: "Marketing Retainer",
      marketing_title: "Monthly retainer",
      marketing_subtitle:
        "Full-channel management — page, content, ads, LINE OA in one package.",
      marketing_label: "Marketing Retainer",
      production_eyebrow: "Production Project",
      production_title: "Project-based production",
      production_subtitle:
        "Shoot, edit, branding by the project — pick exactly what you need.",
      details: "What's included",
      channels: "Channels covered",
      best_fit: "Best for",
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
      line_label: "LINE OA",
      copyright: "All rights reserved.",
      enhance: "Enhance",
      enhance_yellow: "YOUR BUSINESS",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      subtitle:
        "Answers to what clients ask most. Can't find what you need? Message us on LINE.",
      items: [
        {
          q: "What's the entry price?",
          a: "Packages start at 5,500 THB (Package A — Edit Only) for editing only. For a full production + social media management bundle, Package B at 19,900 THB/month is recommended.",
        },
        {
          q: "Is there a minimum contract term?",
          a: "No — new clients can start month-to-month and cancel anytime. Sign a 3–6 month commitment for a discount.",
        },
        {
          q: "Do you work outside Bangkok?",
          a: "Yes. Our team travels nationwide. Travel and accommodation are charged at cost. We currently serve clients in Bangkok, Phuket, Chiang Mai, and Hua Hin.",
        },
        {
          q: "How long until a video is delivered?",
          a: "Reels normally ship in 5–7 working days after the shoot. Rush jobs ship within 48 hours for a 30% rush fee.",
        },
        {
          q: "Do you manage Facebook/TikTok ads?",
          a: "Yes — included in Standard and Premium packages. The ad spend is paid by the client; our team builds the plan and continuously optimizes.",
        },
        {
          q: "Do you do websites and full branding/CI?",
          a: "Yes — included in Pack C: All In One, or quoted separately as a project. Base branding CI starts at 25,000 THB.",
        },
        {
          q: "Can I see more case studies?",
          a: "Of course. Message us on LINE or call 062-916-4271 — we'll send portfolio and results from clients close to your industry.",
        },
        {
          q: "How do payments work?",
          a: "Monthly packages bill at the start of each month. Standalone projects are 50% upfront and 50% on delivery. We accept company bank transfer and issue tax invoices.",
        },
      ],
    },
    services_page: {
      back: "← Back to home",
      contact_cta: "Free consultation — talk to us",
      related_packages: "Related packages",
      related_works: "Related work",
      not_found: "Service not found",
      items: {
        "social-media": {
          name: "Social Media Marketing",
          tagline: "Strategy, page management, and content across every platform.",
          description:
            "We build long-term social strategy: competitor research, KPI setup, monthly content pillars, brand voice control, posting schedule, inbox/comment management, and monthly reporting. Coverage spans Facebook Page, Instagram, TikTok, LINE OA, and YouTube Shorts.",
          sub_services: [
            "Monthly content strategy + posting calendar",
            "Post design + caption + hashtags",
            "Reels / TikTok vertical edits",
            "Inbox + comment management",
            "Paid ads + weekly optimization",
            "Monthly report + recommendations",
          ],
        },
        production: {
          name: "Production",
          tagline: "Professional video and stills production end-to-end.",
          description:
            "A production crew with 4K cameras, full lighting kit, and professional Director/Editor team. We shoot in-studio and on-location across Thailand — product, food, real estate, large seminars, and vertical Reels/Shorts for social media.",
          sub_services: [
            "Product / food / beverage photography (studio + on-location)",
            "Vertical Reels / Shorts / TikTok 9:16 video",
            "Long-form / brand story 16:9 video",
            "Event / seminar / wedding multi-cam shoots",
            "Editing + color grading + sound design",
            "Aerial drone shots when needed",
          ],
        },
        branding: {
          name: "Branding",
          tagline: "Build a brand that's recognized and ready to sell.",
          description:
            "Full Branding and Corporate Identity (CI) packages — brand strategy, logo design, color palette, typography, brand voice, and a complete brand guideline that internal teams and other agencies can use downstream.",
          sub_services: [
            "Brand strategy + positioning workshop",
            "Logo design + variations",
            "Color palette + typography system",
            "Complete brand guideline (PDF)",
            "Stationery (business card / letterhead / envelope)",
            "Packaging design",
          ],
        },
      },
    },
  },
} as const;

export type Messages = (typeof messages)[Locale];
