import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Trainerteam",
  description:
    "Unser Trainerteam im Honbu-Dojo Leiden-kan - erfahrene Karate-Lehrer der JKA Berlin.",
};

const trainers = [
  {
    name: "Pierre Leiding",
    rank: "7. Dan (JKA)",
    image: "/pierre_leiding.jpg",
  },
  {
    name: "Dirk Leiding",
    rank: "6. Dan (JKA)",
    image: "/dirk_leiding.jpg",
  },
];

export default function TrainerteamPage() {
  return (
    <>
      <PageHero
        eyebrow="Über JKA-Berlin"
        title="Trainerteam"
        subtitle="Erfahrene Karateka, die ihr Wissen mit Leidenschaft weitergeben."
        image="/trainier_banner.jpg"
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {trainers.map((t) => (
              <article key={t.name} className="group">
                <div className="overflow-hidden rounded-lg bg-zinc-100">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={800}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5">
                  <h2 className="text-2xl lg:text-3xl font-black text-zinc-900">
                    {t.name}
                  </h2>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="h-[2px] w-8 bg-red-600" />
                    <span className="text-sm font-semibold text-red-600 tracking-wide">
                      {t.rank}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
