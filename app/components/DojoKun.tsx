import DojoKunAudio from './DojoKunAudio';

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

export default function DojoKun() {
  return (
    <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-6 top-1/2 -translate-y-1/2 text-[28vw] leading-none font-black text-white/[0.03]"
      >
        道場訓
      </span>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-12 bg-red-600" />
          <span className="text-red-500 text-xs font-bold tracking-[0.4em] uppercase">
            Tradition
          </span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
          Dōjō Kun
        </h2>
        <p className="mt-4 max-w-xl text-lg text-zinc-400 leading-relaxed">
          Die fünf Leitsätze, die unser Training und unseren Charakter prägen.
        </p>

        <DojoKunAudio />

        <ol className="mt-8 border-t border-white/10">
          {dojoKun.map((item, i) => (
            <li
              key={i}
              className="grid gap-3 md:grid-cols-12 md:items-baseline border-b border-white/10 py-8"
            >
              <span className="md:col-span-1 text-red-600 font-black text-2xl leading-none">
                {i + 1}
              </span>
              <div className="md:col-span-7">
                <p className="text-xl lg:text-2xl font-bold text-white leading-snug">
                  {item.de}
                </p>
                <p className="mt-1.5 text-sm text-zinc-500 italic">
                  {item.romaji}
                </p>
              </div>
              <p
                lang="ja"
                className="md:col-span-4 text-2xl lg:text-[1.75rem] text-white/90 md:text-right leading-snug"
              >
                {item.kanji}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
