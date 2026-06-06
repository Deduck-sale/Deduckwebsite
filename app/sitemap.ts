import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduckwebsite.vercel.app";

const SERVICES = ["social-media", "production", "branding"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Build alternate-language hint map shared by every route. Search engines
  // honour this even when the same content is mirrored at /xx, which is what
  // we do — both /services/x and /en/services/x return the same component
  // tree, just with locale resolved differently by the provider.
  const altLangs = (paths: { th: string; en: string }) => ({
    languages: {
      th: `${SITE_URL}${paths.th}`,
      en: `${SITE_URL}${paths.en}`,
      "x-default": `${SITE_URL}${paths.th}`,
    },
  });

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: altLangs({ th: "/", en: "/en" }),
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: altLangs({ th: "/", en: "/en" }),
    },
  ];

  for (const slug of SERVICES) {
    entries.push(
      {
        url: `${SITE_URL}/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: altLangs({
          th: `/services/${slug}`,
          en: `/en/services/${slug}`,
        }),
      },
      {
        url: `${SITE_URL}/en/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: altLangs({
          th: `/services/${slug}`,
          en: `/en/services/${slug}`,
        }),
      }
    );
  }

  return entries;
}
