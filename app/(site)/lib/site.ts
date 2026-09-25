/**
 * Zentrale Angaben fuer SEO (Canonical-URLs, Sitemap, Open Graph, JSON-LD).
 * Kanonische Domain ist https://jka-berlin.de (www leitet per 301 dorthin um).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jka-berlin.de"
).replace(/\/+$/, "");

export const SITE_NAME = "JKA Berlin";

export const SITE_DESCRIPTION =
  "Shotokan-Karate der Japan Karate Association im Honbu-Dojo „Leiden-kan” in Berlin-Pankow. Training für Kinder und Erwachsene, Lehrgänge, Prüfungen und News.";

export const DEFAULT_OG_IMAGE = {
  url: "/ohta_slider_v2.jpg",
  width: 1200,
  height: 600,
  alt: "JKA Berlin – Karate-Dō im Honbu-Dojo „Leiden-kan”",
};

/** Statische Seiten fuer die Sitemap. */
export const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/news", priority: 0.9, changeFrequency: "daily" },
  { path: "/termine", priority: 0.9, changeFrequency: "weekly" },
  { path: "/mitglied-werden", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ueber-uns", priority: 0.7, changeFrequency: "yearly" },
  { path: "/trainerteam", priority: 0.7, changeFrequency: "yearly" },
  { path: "/downloads", priority: 0.6, changeFrequency: "monthly" },
  { path: "/shop", priority: 0.5, changeFrequency: "monthly" },
  { path: "/impressum", priority: 0.2, changeFrequency: "yearly" },
  { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" },
] as const;

/** Strukturierte Daten (schema.org) fuer den Verein – erscheint auf der Startseite. */
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  "@id": `${SITE_URL}/#organization`,
  name: "JKA Berlin e.V.",
  alternateName: "Honbu-Dojo „Leiden-kan”",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/jka-berlin-logo.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
  sport: "Karate",
  email: "honbu@jka-berlin.de",
  telephone: "+49 30 48638161",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Neue Schönholzer Straße 32",
    postalCode: "13187",
    addressLocality: "Berlin",
    addressRegion: "Berlin",
    addressCountry: "DE",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "16:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "18:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "16:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "18:00", closes: "21:00" },
  ],
  sameAs: [
    "https://www.instagram.com/jkaberlin",
    "https://www.facebook.com/jkaberlin",
  ],
};

/** Serialisiert JSON-LD sicher fuer ein <script>-Tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
