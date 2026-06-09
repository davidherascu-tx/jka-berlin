import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

export type DownloadItem = {
  id: string;
  title: string;
  category: "Lehrgang" | "Allgemeine" | "Technisches" | "Prüfungen" | "";
  updatedAt: string | null; // ISO date "YYYY-MM-DD"
  fileUrl: string | null;
  fileName: string | null;
};

const DOWNLOADS_QUERY = defineQuery(`*[_type == "download" && defined(file.asset)] | order(updatedAt desc) {
  "id": _id,
  title,
  "category": coalesce(category, ""),
  updatedAt,
  "fileUrl": file.asset->url,
  "fileName": file.asset->originalFilename
}`);

export async function getDownloads(): Promise<DownloadItem[]> {
  const { data } = await sanityFetch({ query: DOWNLOADS_QUERY });
  return (data ?? []) as DownloadItem[];
}
