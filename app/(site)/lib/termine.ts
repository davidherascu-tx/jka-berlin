import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import type { TerminEvent } from "../components/TermineView";

const TERMINE_QUERY = defineQuery(`*[_type == "termin"] | order(startDate asc) {
  "id": _id,
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

const TERMIN_BY_ID_QUERY = defineQuery(`*[_type == "termin" && _id == $id][0] {
  "id": _id,
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

export async function getTerminById(id: string): Promise<TerminEvent | null> {
  const { data } = await sanityFetch({ query: TERMIN_BY_ID_QUERY, params: { id } });
  return (data ?? null) as TerminEvent | null;
}
