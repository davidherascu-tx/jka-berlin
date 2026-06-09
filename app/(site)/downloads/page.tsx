import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import DownloadsClient from "./DownloadsClient";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Formulare, Anmeldungen und technische Unterlagen der JKA Berlin zum Herunterladen.",
};

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title="Downloads"
        subtitle="Formulare, Anmeldungen und technische Unterlagen zum Herunterladen."
        image="/slider_8.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <DownloadsClient />
        </div>
      </section>
    </>
  );
}
