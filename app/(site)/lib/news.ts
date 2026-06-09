import type { PortableTextBlock } from "@portabletext/types";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO 8601 e.g. "2026-04-24"
  imageUrl: string | null;
  imageAlt: string | null;
  pdfUrl: string | null;
  body: PortableTextBlock[] | null;
};

const NEWS_PROJECTION = /* groq */ `{
  "slug": slug.current,
  title,
  excerpt,
  category,
  date,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  "pdfUrl": pdf.asset->url,
  body
}`;

const NEWS_LIST_QUERY = defineQuery(
  `*[_type == "news" && defined(slug.current)] | order(date desc) ${NEWS_PROJECTION}`
);

const NEWS_ITEM_QUERY = defineQuery(
  `*[_type == "news" && slug.current == $slug][0] ${NEWS_PROJECTION}`
);

export async function getNews(): Promise<NewsItem[]> {
  const { data } = await sanityFetch({ query: NEWS_LIST_QUERY });
  return (data ?? []) as NewsItem[];
}

export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const { data } = await sanityFetch({
    query: NEWS_ITEM_QUERY,
    params: { slug },
  });
  return (data ?? null) as NewsItem | null;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
