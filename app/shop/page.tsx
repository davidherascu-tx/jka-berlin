import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Shop",
  description: "Karate-Gi, Ausrüstung und JKA-Berlin-Merchandise.",
};

const products = [
  { name: "JKA Karate-Gi", price: "ab 49 €", note: "Trainingsanzug" },
  { name: "Obi (Gürtel)", price: "ab 9 €", note: "Alle Graduierungen" },
  { name: "Dojo T-Shirt", price: "19 €", note: "JKA Berlin Edition" },
  { name: "Faustschutz", price: "ab 24 €", note: "Kumite-Ausrüstung" },
];

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Ausrüstung"
        title="Shop"
        subtitle="Karate-Gi, Gürtel und Ausrüstung für dein Training."
        image="/slider_6.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <article
                key={i}
                className="group rounded-lg border border-zinc-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex aspect-square items-center justify-center bg-zinc-100 text-6xl font-black text-zinc-300">
                  空
                </div>
                <div className="p-5">
                  <p className="font-bold text-zinc-900">{p.name}</p>
                  <p className="text-sm text-zinc-500">{p.note}</p>
                  <p className="mt-3 font-bold text-red-600">{p.price}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-sm text-zinc-400">
            (Platzhalter – der Shop wird zu einem späteren Zeitpunkt umgesetzt.)
          </p>
        </div>
      </section>
    </>
  );
}
