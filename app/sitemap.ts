import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITE_URL, STATIC_ROUTES } from "./(site)/lib/site";

// News kommen aus Sanity – Sitemap stuendlich neu erzeugen.
export const revalidate = 3600;

type NewsSitemapEntry = { slug: string; updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await client
    .fetch<NewsSitemapEntry[]>(
      `*[_type == "news" && defined(slug.current)] | order(date desc) {
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    )
    .catch(() => [] as NewsSitemapEntry[]);

  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...news.map((item) => ({
      url: `${SITE_URL}/news/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
