// TODO: Replace with Sanity CMS query once integrated
// e.g.: export async function getNews(): Promise<NewsItem[]> { return sanityClient.fetch(groq`*[_type=="news"]|order(date desc)`) }

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;       // ISO 8601 e.g. "2026-04-24"
  image?: string;     // path relative to /public
  pdf?: string;       // filename inside /public/downloads/
};

export const news: NewsItem[] = [
  {
    slug: "brandenburger-sommerlager-2026",
    title: "Brandenburger Sommerlager 2026",
    excerpt:
      "Auch dieses Jahr findet wieder unser beliebtes Sommerlager statt. Alle Informationen und die Anmeldung gibt es im Download-Bereich.",
    category: "Lehrgang",
    date: "2026-04-24",
    image: "/2026_JKA_brandenburger_sommerlager.jpg",
    pdf: "2026_JKA_brandenburger_sommerlager.pdf",
  },
  {
    slug: "ostergrue-2026",
    title: "Ostergrüße",
    excerpt:
      "Das gesamte JKA-Berlin-Team wünscht allen Mitgliedern, Freunden und Förderern frohe Ostern und erholsame Feiertage.",
    category: "Aktuelles",
    date: "2026-04-04",
    image: "/pezibear-egg-1234723_1920.jpg",
  },
  {
    slug: "spring-camp-mit-ohta-sensei",
    title: "Spring Camp 2026",
    excerpt:
      "Ein intensives Wochenende mit Ohta Sensei – Kihon, Kata und Kumite auf höchstem Niveau im Honbu-Dojo.",
    category: "Lehrgang",
    date: "2026-02-16",
    image: "/Ohta_Sensei.jpg",
    pdf: "2026_Spring_Camp.pdf",
  },
];

export function getNews(): NewsItem[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
