import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "JKA", label: "Japan Karate Association" },
  { value: "4×", label: "Training pro Woche" },
  { value: "Honbu", label: "Dojo „Leiden-kan”" },
];

export default function Intro() {
  return (
    <section id="ueber" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-zinc-100 shadow-2xl shadow-black/30">
              <Image
                src="/background.png"
                alt="Karateka in Kampfstellung"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-left"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-red-600 text-white p-8 max-w-[220px]">
              <p className="text-3xl font-black leading-none">空手道</p>
              <p className="mt-2 text-xs tracking-[0.3em] uppercase">Karate-Dō</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-12 bg-red-600" />
              <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">
                Willkommen
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-[1.1]">
              Shotokan-Karate auf höchstem Niveau
            </h2>
            <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
              Im Honbu-Dojo „Leiden-kan” trainieren wir Karate-Dō im Stil der
              Japan Karate Association (JKA). Bei uns stehen Tradition,
              Disziplin und stetige Weiterentwicklung im Mittelpunkt – für
              engagierte Karateka bis zum Meistergrad.
            </p>
            <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
              Regelmäßige Lehrgänge mit internationalen Senseis bringen
              höchste Karate-Qualität direkt nach Berlin.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl lg:text-3xl font-black text-zinc-900">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/ueber-uns"
                className="inline-flex items-center justify-center bg-zinc-900 hover:bg-red-600 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors"
              >
                Mehr über uns
              </Link>
              <Link
                href="/trainerteam"
                className="inline-flex items-center justify-center border border-zinc-300 hover:border-zinc-900 text-zinc-900 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors"
              >
                Trainerteam
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
