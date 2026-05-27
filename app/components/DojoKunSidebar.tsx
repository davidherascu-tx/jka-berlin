const dojoKun = [
  {
    de: "Vervollkommne Deinen Charakter.",
    kanji: "一、人格完成に努むること",
  },
  {
    de: "Sei aufrichtig, loyal und zuverlässig.",
    kanji: "一、誠の道を守ること",
  },
  {
    de: "Strenge Dich bei allem maximal an.",
    kanji: "一、努力の精神を養うこと",
  },
  {
    de: "Sei höflich und respektiere andere.",
    kanji: "一、礼儀を重んずること",
  },
  {
    de: "Lerne, Dich zu beherrschen.",
    kanji: "一、血気の勇を戒むること",
  },
];

export default function DojoKunSidebar() {
  return (
    <div className="sticky top-24">
      <div className="relative overflow-hidden bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-3 top-1/2 -translate-y-1/2 text-[8rem] leading-none font-black text-zinc-100"
        >
          {"道場訓"}
        </span>

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-red-600" />
            <span className="text-red-600 text-[10px] font-bold tracking-[0.4em] uppercase">
              Tradition
            </span>
          </div>
          <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-5">
            {"Dōjō Kun"}
          </h3>

          <ol className="space-y-4">
            {dojoKun.map((item, i) => (
              <li
                key={i}
                className="flex gap-2.5 items-start border-l-2 border-red-600/40 pl-3"
              >
                <span className="text-red-600 font-black text-sm leading-none mt-0.5 shrink-0">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-zinc-900 leading-snug">
                    {item.de}
                  </p>
                  <p
                    lang="ja"
                    className="mt-0.5 text-sm font-bold text-zinc-500 leading-snug"
                  >
                    {item.kanji}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
