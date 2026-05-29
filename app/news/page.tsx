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

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.slug}
                className="group relative flex flex-col overflow-hidden rounded-lg bg-white border border-zinc-200 hover:border-red-500 hover:shadow-lg transition-all duration-300"
              >
                <Link
                  href={`/news/${item.slug}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-zinc-100"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1">
                    {item.category}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <time className="text-xs text-zinc-500 tracking-wider uppercase mb-3">
                    {formatDate(item.date)}
                  </time>
                  <h3 className="text-xl font-bold text-zinc-900 leading-snug mb-3 group-hover:text-red-600 transition-colors">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed flex-1">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-red-600 transition-colors"
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
    </>
  );
}
