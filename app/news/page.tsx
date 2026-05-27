import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import { getNews, formatDate } from "../lib/news";

export const metadata: Metadata = {
  title: "News",
  description: "Aktuelles, Lehrgänge und Neuigkeiten aus der JKA Berlin.",
};

export default function NewsPage() {
  const items = getNews();

  return (
    <>
      <PageHero
        eyebrow="Aktuelles"
        title="News"
        subtitle="Neuigkeiten, Lehrgänge und Berichte aus unserem Dojo."
        image="/slider_7.jpg"
      />

      <section className="bg-zinc-950 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.slug}
                className="group relative flex flex-col overflow-hidden rounded-lg bg-zinc-900 border border-white/5 hover:border-red-600/40 transition-colors"
              >
                <Link
                  href={`/news/${item.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1">
                    {item.category}
                  </span>
                </Link>
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
                </div>
              </article>
            ))}
          </div>
          <p className="mt-12 text-sm text-zinc-600">
            (Platzhalter-Inhalte – die News werden später über Sanity gepflegt.)
          </p>
        </div>
      </section>
    </>
  );
}
