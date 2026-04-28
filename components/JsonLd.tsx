const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduck.th";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "De Duck Agency",
        alternateName: "Deduck Agency Co.,Ltd.",
        url: SITE_URL,
        description:
          "Digital Marketing Agency รับทำการตลาดออนไลน์ Social Media, Production, Branding ครบวงจร",
        sameAs: [
          "https://www.facebook.com/deduck.th",
          "https://www.instagram.com/deduck.th",
        ],
        slogan: "ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "De Duck Agency",
        inLanguage: "th-TH",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        name: "De Duck Agency",
        url: SITE_URL,
        areaServed: { "@type": "Country", name: "Thailand" },
        serviceType: [
          "Social Media Marketing",
          "Video Production",
          "Photography",
          "Branding",
          "Digital Marketing",
        ],
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
