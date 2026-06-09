import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Angaben der JKA Berlin e.V.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-[2px] w-8 bg-red-600 shrink-0" />
        <h2 className="text-lg font-black text-zinc-900 tracking-tight">{title}</h2>
      </div>
      <div className="pl-[2.75rem] space-y-2 text-zinc-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        image="/tori.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">

          <Section title="Angaben gemäß § 5 TMG">
            <p className="font-bold text-zinc-900">JKA Berlin e.V.</p>
            <p>Neue Schönholzer Straße 32</p>
            <p>13187 Berlin-Pankow</p>
          </Section>

          <Section title="Kontakt">
            <p>
              <span className="font-semibold text-zinc-700">Telefon:</span>{" "}
              <a href="tel:+493048638161" className="hover:text-red-600 transition-colors">
                (030) 48 63 81 61
              </a>
            </p>
            <p>
              <span className="font-semibold text-zinc-700">Postadresse:</span>{" "}
              Neue Schönholzer Straße 32, 13187 Berlin-Pankow
            </p>
            <p>
              <span className="font-semibold text-zinc-700">E-Mail:</span>{" "}
              <a href="mailto:honbu@jka-berlin.de" className="hover:text-red-600 transition-colors">
                honbu@jka-berlin.de
              </a>
            </p>
          </Section>

          <Section title="Vertreten durch">
            <div className="space-y-1">
              <p>
                <span className="font-semibold text-zinc-800">Pierre Leiding</span>
                <span className="text-zinc-500"> – Vorsitzender</span>
              </p>
              <p>
                <span className="font-semibold text-zinc-800">Dirk Leiding</span>
                <span className="text-zinc-500"> – stellv. Vorsitzender</span>
              </p>
              <p>
                <span className="font-semibold text-zinc-800">Jan Seeger</span>
                <span className="text-zinc-500"> – Kassenwart</span>
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-100 space-y-1 text-sm">
              <p>Neue Schönholzer Straße 32, 13187 Berlin-Pankow</p>
              <p>
                Telefon:{" "}
                <a href="tel:+493048638161" className="hover:text-red-600 transition-colors">
                  +49 (030) 48 63 81 61
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a href="mailto:honbu@jka-berlin.de" className="hover:text-red-600 transition-colors">
                  honbu@jka-berlin.de
                </a>
              </p>
            </div>
          </Section>

          <Section title="Vereinsregister">
            <p>
              Registriert beim{" "}
              <span className="font-semibold text-zinc-800">Amtsgericht Charlottenburg</span>
            </p>
            <p>
              <span className="font-semibold text-zinc-700">Registernummer:</span> 22129 Nz
            </p>
          </Section>

          <Section title="Bildrechte">
            <p>
              <a
                href="https://www.pixabay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                www.pixabay.com
              </a>{" "}
              – Freie kommerzielle Nutzung
            </p>
          </Section>

        </div>
      </section>
    </>
  );
}
