import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import DojoKunSidebar from "../components/DojoKunSidebar";

export const metadata: Metadata = {
  title: "Termine",
  description:
    "Lehrgänge, Prüfungen und Veranstaltungen der JKA Berlin im Überblick.",
};

const events = [
  {
    date: "08.03.2026",
    title: "Spring Camp mit Ohta Sensei",
    location: "Honbu-Dojo „Leiden-kan“, Berlin",
    type: "Seminar",
  },
  {
    date: "28.03.2026",
    title: "Angepasste Trainingszeiten zu Ostern",
    location: "Honbu-Dojo „Leiden-kan“, Berlin",
    type: "Hinweis",
  },
  {
    date: "12.04.2026",
    title: "Brandenburger Sommerlager 2026",
    location: "Brandenburg",
    type: "Lehrgang",
  },
];

export default function TerminePage() {
  return (
    <>
      <PageHero
        eyebrow="Kalender"
        title="Termine"
        subtitle="Lehrgänge, Prüfungen und Veranstaltungen auf einen Blick."
        image="/slider_7.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <ul className="divide-y divide-zinc-200">
                {events.map((e, i) => (
                  <li
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 group"
                  >
                    <div className="sm:w-32 shrink-0">
                      <span className="inline-block bg-zinc-900 text-white text-sm font-bold px-3 py-1 tracking-wide">
                        {e.date}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                        {e.title}
                      </p>
                      <p className="text-sm text-zinc-500">{e.location}</p>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase text-red-600">
                      {e.type}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-sm text-zinc-400">
                {"(Platzhalter-Termine – wird später dynamisch über Sanity gepflegt.)"}
              </p>
            </div>

            {/* Dojo Kun sidebar */}
            <div className="hidden lg:block w-72 shrink-0">
              <DojoKunSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
