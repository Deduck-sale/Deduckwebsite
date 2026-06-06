const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduckwebsite.vercel.app";

/**
 * JSON-LD structured data — the most reliable channel for telling both
 * search engines AND AI assistants who we are. This is rendered as a
 * <script> tag in the page <body> so any crawler reading the static HTML
 * picks it up, including LLM-powered tools that only see first-paint
 * content.
 *
 * The graph models: the company (Organization + ProfessionalService),
 * the website (WebSite with search action), and the three service
 * offerings (Service). Contact info, area served, social profiles, and
 * pricing range all live here so an LLM can answer factual questions
 * about the agency without having to extract them from prose.
 */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "De Duck Agency",
        legalName: "Deduck Agency Co.,Ltd.",
        alternateName: ["Deduck", "เดอดัค", "เดอ-ดัค เอเจนซี่"],
        url: SITE_URL,
        logo: `${SITE_URL}/opengraph-image`,
        image: `${SITE_URL}/opengraph-image`,
        description:
          "Digital Marketing Agency รับทำการตลาดออนไลน์ Social Media, Production, Branding ครบวงจร",
        slogan: "ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ",
        sameAs: [
          "https://www.facebook.com/deduck.agency",
          "https://www.instagram.com/deduck_agency",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+66-62-916-4271",
          contactType: "sales",
          areaServed: "TH",
          availableLanguage: ["Thai", "English"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "TH",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "De Duck Agency",
        inLanguage: ["th-TH", "en-US"],
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "De Duck Agency",
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        telephone: "+66-62-916-4271",
        priceRange: "฿฿",
        areaServed: { "@type": "Country", name: "Thailand" },
        serviceType: [
          "Social Media Marketing",
          "Video Production",
          "Photography",
          "Branding",
          "Digital Marketing",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Service Packages",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Social Media Marketing",
                description:
                  "วางแผนกลยุทธ์ ดูแลเพจ และจัดการคอนเทนต์บนโซเชียลมีเดียให้ตรงกลุ่มเป้าหมาย — Strategy, page management, and on-target content across Facebook, Instagram, TikTok, and LINE OA.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Production",
                description:
                  "ทีมโปรดักชั่นคุณภาพ รับถ่ายทำวิดีโอ ตัดต่อ ถ่ายภาพสินค้า อาหาร และบริการ — Professional production crew for video, editing, product/food/service photography.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Branding",
                description:
                  "สร้างตัวตนของแบรนด์ให้แข็งแกร่ง โดดเด่น เป็นที่จดจำ — Build a distinctive, memorable brand identity including full CI packages.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
