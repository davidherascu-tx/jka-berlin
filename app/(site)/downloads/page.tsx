import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import DownloadsClient from "./DownloadsClient";
import type { DownloadEntry } from "./DownloadsClient";
import { getDownloads } from "../lib/downloads";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Formulare, Anmeldungen und technische Unterlagen der JKA Berlin zum Herunterladen.",
};

export const dynamic = "force-dynamic";

export default async function DownloadsPage() {
  const raw = await getDownloads();

  const downloads: DownloadEntry[] = raw
    .filter((d) => d.fileUrl)
    .map((d) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      updatedAt: d.updatedAt
        ? new Date(d.updatedAt).toLocaleDateString("de-DE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "",
      fileUrl: d.fileUrl as string,
      fileName: d.fileName ?? d.title,
    }));

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
          <DownloadsClient downloads={downloads} />
        </div>
      </section>
    </>
  );
}
