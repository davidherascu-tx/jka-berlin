export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
};

// Platzhalter-Daten. Wird später durch Sanity-Abfragen ersetzt.
// z. B.: export async function getNews(): Promise<NewsItem[]> { return sanityClient.fetch(...) }
export const news: NewsItem[] = [
  {
    slug: "brandenburger-sommerlager-2026",
    title: "Brandenburger Sommerlager 2026",
    excerpt:
      "Auch dieses Jahr findet wieder unser beliebtes Sommerlager statt. Alle Informationen und die Anmeldung gibt es im Download-Bereich.",
    category: "Lehrgang",
    date: "2026-04-12",
    image: "/slider_7.jpg",
  },
  {
    slug: "spring-camp-mit-ohta-sensei",
    title: "Spring Camp mit Ohta Sensei",
    excerpt:
      "Ein intensives Wochenende mit Ohta Sensei – Kihon, Kata und Kumite auf höchstem Niveau im Honbu-Dojo.",
    category: "Seminar",
    date: "2026-03-08",
    image: "/ohta_slider_v2.jpg",
  },
  {
    slug: "angepasste-trainingszeiten-ostern",
    title: "Angepasste Trainingszeiten zu Ostern",
    excerpt:
      "Über die Osterfeiertage gelten geänderte Trainingszeiten. Bitte beachtet den Aushang im Dojo und unsere Social-Media-Kanäle.",
    category: "Aktuelles",
    date: "2026-03-28",
    image: "/shiina_slider.jpg",
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
