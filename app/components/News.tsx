import Image from "next/image";
import Link from "next/link";
import { getNews, formatDate } from "../lib/news";

export default function News() {
  const items = getNews();

  return (
    <section id="news" className="relative bg-zinc-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-red-600" />
              <span className="text-red-500 text-xs font-bold tracking-[0.4em] uppercase">
                Aktuelles
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
              News &amp; Termine
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white hover:text-red-500 transition-colors"
          >
            Alle News
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-xl bg-zinc-900 border border-white/5 hover:border-red-600/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Full image — object-contain, no crop */}
              <Link
                href={`/news/${item.slug}`}
                className="relative block aspect-[4/3] overflow-hidden bg-zinc-800"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1">
                  {item.category}
                </span>
              </Link>

              {/* Text */}
              <div className="flex flex-1 flex-col p-6">
                <time className="text-xs text-zinc-500 tracking-wider uppercase mb-3">
                  {formatDate(item.date)}
                </time>
                <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-red-500 transition-colors">
                  <Link href={`/news/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                  {item.excerpt}
                </p>
                <Link
                  href={`/news/${item.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-red-500 transition-colors"
                >
                  Weiterlesen
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
