import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, formatDate } from "../../lib/news";

export function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/news/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getNews().find((n) => n.slug === slug);
  return {
    title: item?.title ?? "News",
    description: item?.excerpt,
  };
}

export default async function NewsDetailPage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const item = getNews().find((n) => n.slug === slug);

  if (!item) notFound();

  return (
    <article className="bg-white">
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-black pt-20">
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 lg:px-10 pb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1">
              {item.category}
            </span>
            <time className="text-sm text-white/70 tracking-wide">
              {formatDate(item.date)}
            </time>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            {item.title}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-20">
        <p className="text-xl text-zinc-700 leading-relaxed font-medium">
          {item.excerpt}
        </p>
        <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
          Der vollständige Artikel wird in Kürze ergänzt. Die News-Inhalte
          werden später über das Sanity-CMS gepflegt und an dieser Stelle
          ausgespielt.
        </p>

        <div className="mt-12 border-t border-zinc-200 pt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-zinc-900 hover:text-red-600 transition-colors"
          >
            <span>←</span> Zurück zu den News
          </Link>
        </div>
      </div>
    </article>
  );
}
