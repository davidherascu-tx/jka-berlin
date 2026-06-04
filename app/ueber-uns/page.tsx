import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import DojoKunAudio from "../components/DojoKunAudio";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "JKA-Berlin – einer der drei von der JKA anerkannten Karate-Verbände in Deutschland. Geschichte, Philosophie und Karate-Do.",
};

const dojoKun = [
  {
    de: "Vervollkommne Deinen Charakter.",
    kanji: "一、人格完成に努むること",
    romaji: "hitotsu, jinkaku kansei ni tsutomuru koto",
  },
  {
    de: "Sei aufrichtig, loyal und zuverlässig.",
    kanji: "一、誠の道を守ること",
    romaji: "hitotsu, makoto no michi o mamoru koto",
  },
  {
    de: "Strenge Dich bei allem maximal an.",
    kanji: "一、努力の精神を養うこと",
    romaji: "hitotsu, doryoku no seishin o yashinau koto",
  },
  {
    de: "Sei höflich und respektiere andere.",
    kanji: "一、礼儀を重んずること",
    romaji: "hitotsu, reigi o omonzuru koto",
  },
  {
    de: "Lerne, Dich zu beherrschen.",
    kanji: "一、血気の勇を戒むること",
    romaji: "hitotsu, kekki no yū o imashimuru koto",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über JKA-Berlin"
        title="Über uns"
        subtitle="Offiziell anerkannter Verband der Japan Karate Association in Deutschland."
        image="/ueber_uns_banner.jpg"
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[2px] w-12 bg-red-600" />
            <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">
              Unsere Geschichte
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 mb-12">
            Honbu-Dojo {"„Leiden-kan“"}
          </h2>

          <div className="space-y-8 text-lg text-zinc-600 leading-[2]">
            <p>
              JKA-Berlin ist einer der drei von der Japan Karate Association (JKA) offiziell für Deutschland anerkannten Karate-Verbände. Obwohl der Name auf Berlin verweist, ist unser Verband nicht auf die Hauptstadt beschränkt – wir vertreten die JKA und ihre Werte bundesweit. Unser Honbu-Dojo {"„Leiden-kan”"} in Berlin-Pankow bildet dabei das Zentrum unserer Arbeit: Hier trainieren wir, richten Lehrgänge aus und empfangen internationale Senseis.
            </p>
            <p>
              Die Japan Karate Association (JKA), {"„The Keeper of Karate's Highest Tradition”"}, wurde 1949 mit dem Ziel gegründet, Karate und seine Werte in Japan und der Welt zu verbreiten. Hierzu baute die JKA ihr berühmtes Instructorprogramm auf, um {"„Vollzeit”"}-Karatelehrer auszubilden. Der erste Chief-Instructor der JKA war Gichin Funakoshi, der {"„Vater des modernen Karate”"}.
            </p>
            <p>
              Nach Funakoshi Senseis Tod 1957 wurde im April 1958 Masatoshi Nakayama zum Chief-Instructor ernannt. Unter seiner Führung erlangte die JKA weltweite Bedeutung; er schickte einige der besten JKA-Instructoren ins Ausland, um dort Karate zu lehren.
            </p>
            <p>
              Einer von ihnen war Keinosuke Enoeda, der von Mitte der 60er Jahre bis zu seinem Tod 2003 in England lebte und Karate lehrte. Wir hatten das Glück und die Ehre, Enoeda Sensei 1991 beim traditionellen Summer Course in London kennenzulernen. Seit diesem Zeitpunkt konnten wir Enoeda Sensei regelmäßig zu Lehrgängen und internationalen Turnieren in Berlin begrüßen und legten unsere Dan-Prüfungen in London ab.
            </p>
            <p>
              Nach seinem Tod in 2003 übernahm sein langjähriger Assistent Yoshinobu Ohta das Amt des Chief-Instructors der JKA in England. Ganz in der Tradition seines Meisters steht uns auch Ohta Sensei regelmäßig in Berlin mit fachlichem und persönlichem Rat zur Seite.
            </p>
            <p>
              Darüber hinaus stehen wir in engem Kontakt zu den erfahrenen Instructoren des Honbu Dojos in Tokio, wie Imura und Shiina Sensei, die wir beide regelmäßig in unserem eigenen Dojo in Berlin-Pankow begrüßen dürfen. Regelmäßig nehmen wir an internationalen Lehrgängen, u.a. an der Instructorausbildung in Tokio, teil und sind stolz, den Weg des Karate-Do in Berlin beschreiten zu können.
            </p>
            <p>
              Wir bieten unseren Mitgliedern Training nach den Standards der JKA sowie eine qualifizierte Instruktoren- und Kampfrichterausbildung mit der Möglichkeit, internationale JKA-Lizenzen zu erwerben. Darüber hinaus finden in Berlin regelmäßig JKA-Danprüfungen unter der Leitung von Senseis aus dem JKA Headquarters statt.
            </p>
          </div>
        </div>
      </section>

      {/* Dojo Kun - compact */}
      <section className="relative bg-zinc-900 py-16 lg:py-20 overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-6 top-1/2 -translate-y-1/2 text-[22vw] leading-none font-black text-white/[0.03]"
        >
          {"道場訓"}
        </span>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-10 bg-red-600" />
            <span className="text-red-500 text-xs font-bold tracking-[0.4em] uppercase">
              Tradition
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-8">
            {"Dōjō Kun"}
          </h2>

          <ol className="grid gap-x-12 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            {dojoKun.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 items-start border-l-2 border-red-600/50 pl-4"
              >
                <span className="text-red-600 font-black text-lg leading-none mt-0.5 shrink-0">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-white leading-snug">
                    {item.de}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 italic">
                    {item.romaji}
                  </p>
                  <p lang="ja" className="mt-1 text-sm font-semibold text-white/50">
                    {item.kanji}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 max-w-sm">
            <DojoKunAudio />
          </div>
        </div>
      </section>
    </>
  );
}
