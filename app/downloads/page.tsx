import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import DojoKunSidebar from "../components/DojoKunSidebar";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Formulare, Anmeldungen und Informationen der JKA Berlin zum Herunterladen.",
};

const files = [
  { name: "Aufnahmeantrag", desc: "Mitgliedsantrag zum Ausdrucken", type: "PDF" },
  { name: "Anmeldung Sommerlager 2026", desc: "Brandenburger Sommerlager", type: "PDF" },
  { name: "Prüfungsordnung", desc: "Gürtelprüfungen & Anforderungen", type: "PDF" },
  { name: "Dojo-Etikette", desc: "Verhaltensregeln im Training", type: "PDF" },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title="Downloads"
        subtitle="Formulare, Anmeldungen und Informationen zum Herunterladen."
        image="/slider_8.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <ul className="grid gap-4 sm:grid-cols-2">
                {files.map((f, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="group flex items-center gap-4 rounded-lg border border-zinc-200 p-5 hover:border-red-600 hover:bg-zinc-50 transition-colors"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-red-600 text-white text-xs font-bold tracking-wider">
                        {f.type}
                      </span>
                      <span className="flex-1">
                        <span className="block font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                          {f.name}
                        </span>
                        <span className="block text-sm text-zinc-500">{f.desc}</span>
                      </span>
                      <span className="text-zinc-400 group-hover:text-red-600 transition-colors">
                        {"↓"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-sm text-zinc-400">
                {"(Platzhalter – die Dateien werden später verlinkt.)"}
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
