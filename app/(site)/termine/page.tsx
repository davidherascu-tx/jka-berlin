import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import DojoKunSidebar from "../components/DojoKunSidebar";
import TermineView from "../components/TermineView";
import { getTermine } from "../lib/termine";

export const metadata: Metadata = {
  title: "Termine",
  description:
    "Termine, Turniere und Veranstaltungen der JKA Berlin im Überblick.",
};

export const dynamic = "force-dynamic";

export default async function TerminePage() {
  const events = await getTermine();

  return (
    <>
      <PageHero
        eyebrow="Kalender"
        title="Termine"
        subtitle="Turniere, Lehrgänge und Veranstaltungen auf einen Blick."
        image="/slider_7.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
            <div className="flex-1 min-w-0">
              <TermineView events={events} />
            </div>
            <div className="hidden lg:block w-72 shrink-0 self-start lg:sticky lg:top-24">
              <DojoKunSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
