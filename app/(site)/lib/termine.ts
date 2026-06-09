import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import type { TerminEvent } from "../components/TermineView";

const TERMINE_QUERY = defineQuery(`*[_type == "termin"] | order(startDate asc) {
  title,
  type,
  startDate,
  endDate,
  startTime,
  endTime,
  "organizer": coalesce(organizer, ""),
  organizerUrl,
  location,
  address,
  "image": image.asset->url
}`);

export async function getTermine(): Promise<TerminEvent[]> {
  const { data } = await sanityFetch({ query: TERMINE_QUERY });
  return (data ?? []) as TerminEvent[];
}
