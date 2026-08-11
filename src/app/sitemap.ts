import type { MetadataRoute } from "next";
import { BRANCHES, SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...BRANCHES.map((branch) => ({
      url: `${SITE.url}/sedes/${branch.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
