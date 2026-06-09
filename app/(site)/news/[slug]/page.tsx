import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getNewsItem, formatDate } from "../../lib/news";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const item = await getNewsItem(slug);
  return {
    title: item?.title ?? "News",
    description: item?.excerpt,
  };
}

function IconDownload() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

export default async function NewsDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const item = await getNewsItem(slug);

  if (!item) notFound();

  const hasBody = Array.isArray(item.body) && item.body.length > 0;

  return (
    <article className="bg-white pt-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-24">
        {/* ── Two-column layout: image left, content right ── */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">

          {/* Image – full, uncropped */}
          <div className="w-full lg:w-[45%] shrink-0">
            {item.imageUrl ? (
              <div className="rounded-xl overflow-hidden shadow-lg bg-zinc-50">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt ?? item.title}
                  width={1200}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-xl bg-zinc-100 flex items-center justify-center">
                <span className="text-8xl font-black text-zinc-200">空</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-10 bg-red-600" />
              <span className="bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                {item.category}
              </span>
              <time className="text-sm text-zinc-500 tracking-wide">
                {formatDate(item.date)}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-zinc-900 leading-tight mb-6">
              {item.title}
            </h1>

            {/* Excerpt */}
            {item.excerpt && (
              <p className="text-lg text-zinc-600 leading-relaxed">
                {item.excerpt}
              </p>
            )}

            {/* Body (Rich Text aus dem Studio) */}
            {hasBody && (
              <div className="mt-6 prose prose-zinc max-w-none prose-headings:font-black prose-headings:text-zinc-900 prose-a:text-red-600 prose-img:rounded-xl text-zinc-700 leading-relaxed space-y-4">
                <PortableText value={item.body!} />
              </div>
            )}

            {/* PDF download */}
            {item.pdfUrl && (
              <div className="mt-8 p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-0.5">
                    Dokument
                  </p>
                  <p className="font-bold text-zinc-900 text-sm">{item.title}</p>
                </div>
                <a
                  href={item.pdfUrl}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded transition-colors shrink-0"
                >
                  <IconDownload />
                  PDF herunterladen
                </a>
              </div>
            )}

            {/* Back link */}
            <div className="mt-10 pt-8 border-t border-zinc-200">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-zinc-900 hover:text-red-600 transition-colors"
              >
                <span>←</span> Zurück zu den News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
