import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import MitgliedForm from "./MitgliedForm";

export const metadata: Metadata = {
  title: "Jetzt Mitglied werden",
  description:
    "Werde Mitglied bei JKA-Berlin – Training nach JKA-Standards, internationale Lizenzen und Danprüfungen unter Leitung von Senseis aus dem JKA Headquarters.",
};

const benefits = [
  {
    title: "Training nach JKA-Standards",
    text: "Regelmäßiges Training in unserem Honbu-Dojo „Leiden-kan” in Berlin-Pankow nach den offiziellen Richtlinien der Japan Karate Association.",
  },
  {
    title: "Internationale Lizenzen",
    text: "Qualifizierte Instruktoren- und Kampfrichterausbildung mit der Möglichkeit, anerkannte JKA-Lizenzen zu erwerben.",
  },
  {
    title: "Danprüfungen mit Honbu-Senseis",
    text: "JKA-Danprüfungen finden in Berlin unter der Leitung von Senseis aus dem JKA Headquarters in Tokio statt.",
  },
  {
    title: "Internationale Lehrgänge",
    text: "Zugang zu Lehrgängen mit Top-Instructoren aus Japan und der ganzen Welt – inklusive der Instructorausbildung in Tokio.",
  },
];

export default function MitgliedWerdenPage() {
  return (
    <>
      <PageHero
        eyebrow="Werde Teil von JKA-Berlin"
        title="Jetzt Mitglied werden"
        subtitle="Karate-Do auf höchstem Niveau – direkt aus der Tradition der Japan Karate Association."
        image="/ueber_uns_banner.jpg"
      />

      <section className="bg-zinc-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[2px] w-12 bg-red-600" />
            <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">
              Warum JKA-Berlin
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 mb-12 max-w-3xl">
            Karate aus erster Hand – aus dem Honbu Dojo Tokio nach Berlin.
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white border-l-2 border-red-600 p-6 lg:p-8 shadow-sm"
              >
                <h3 className="text-lg font-black text-zinc-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[2px] w-12 bg-red-600" />
            <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">
              Antrag
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 mb-6">
            Mitgliedschaftsanfrage
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-12">
            Egal ob als Einzelperson oder als Verein – fülle das passende
            Formular aus und wir melden uns persönlich mit allen Informationen
            zu Trainingszeiten, Beitrag und nächsten Schritten. Wir freuen uns
            auf euch.
          </p>

          <MitgliedForm />
        </div>
      </section>

      <section className="bg-zinc-900 py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
            Noch Fragen?
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-8">
            Schreib uns direkt eine E-Mail oder ruf uns an – wir beraten dich
            gerne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:honbu@jka-berlin.de"
              className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 hover:bg-red-600 hover:text-white font-bold tracking-wider uppercase text-sm px-6 py-3 rounded-md transition-colors"
            >
              honbu@jka-berlin.de
            </a>
            <a
              href="tel:+493048638161"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-zinc-900 font-bold tracking-wider uppercase text-sm px-6 py-3 rounded-md transition-colors"
            >
              +49 (030) 48 63 81 61
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
