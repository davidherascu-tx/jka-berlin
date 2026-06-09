'use client';

import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterKey = 'Alle' | 'Lehrgang' | 'Allgemeine' | 'Technisches' | 'Prüfungen' | 'Videos';

export type DownloadEntry = {
  id: string;
  title: string;
  category: 'Lehrgang' | 'Allgemeine' | 'Technisches' | 'Prüfungen' | '';
  updatedAt: string;
  fileUrl: string;
  fileName: string;
};

type VideoEntry = {
  id: string;
  title: string;
  url: string;
  vol: number;
};

// ─── Data ───────────────────────────────────────────────────────────────────
// Die Downloads kommen jetzt aus Sanity (via Props). Videos bleiben statisch,
// da es sich um externe JKA-Links handelt (keine Datei-Assets).

const videos: VideoEntry[] = [
  {
    id: 'jka-judge-manual-1',
    title: 'JKA Judge Manual Vol. 1',
    url: 'https://www.jka.or.jp/en/movie/judge_manual_vol_1_en/',
    vol: 1,
  },
  {
    id: 'jka-judge-manual-2',
    title: 'JKA Judge Manual Vol. 2',
    url: 'https://www.jka.or.jp/en/movie/judge_manual_vol_2_en/',
    vol: 2,
  },
  {
    id: 'jka-judge-manual-3',
    title: 'JKA Judge Manual Vol. 3',
    url: 'https://www.jka.or.jp/en/movie/judge_manual_vol_1_en/',
    vol: 3,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FILTERS: FilterKey[] = ['Alle', 'Lehrgang', 'Allgemeine', 'Technisches', 'Prüfungen', 'Videos'];

function getFileType(filename: string): 'pdf' | 'excel' | 'file' {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  if (ext === 'pdf') return 'pdf';
  if (['xlsx', 'xls', 'csv'].includes(ext)) return 'excel';
  return 'file';
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconPdf() {
  return (
    <svg className="h-9 w-9" viewBox="0 0 32 32" fill="none">
      <path d="M6 2h14l6 6v20a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.5" />
      <path d="M20 2v6h6" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" />
      <rect x="3" y="14" width="18" height="10" rx="1.5" fill="#dc2626" />
      <path d="M7.2 21v-5h1.9c.5 0 .9.1 1.2.4.3.3.4.6.4 1s-.1.8-.4 1c-.3.3-.7.4-1.2.4H8.3V21h-1zm1.1-3.2h.7c.2 0 .4 0 .5-.2.1-.1.2-.2.2-.4s-.1-.3-.2-.4c-.1-.1-.3-.2-.5-.2h-.7v1.2zm3.2 3.2v-5h1.7c.7 0 1.3.2 1.7.7.4.4.6 1 .6 1.8s-.2 1.4-.6 1.8c-.4.5-1 .7-1.7.7h-1.7zm1.1-1h.5c.4 0 .7-.1.9-.4.2-.3.3-.6.3-1.1 0-.5-.1-.8-.3-1.1-.2-.3-.5-.4-.9-.4h-.5v3zm3.6 1v-5H19v1h-1.8v1.2h1.6v.9h-1.6V21h-1z" fill="white" />
    </svg>
  );
}

function IconExcel() {
  return (
    <svg className="h-9 w-9" viewBox="0 0 32 32" fill="none">
      <path d="M6 2h14l6 6v20a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.5" />
      <path d="M20 2v6h6" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" />
      <rect x="3" y="14" width="18" height="10" rx="1.5" fill="#16a34a" />
      <path d="M7.5 21l1.4-2.5L7.6 16h1.2l.8 1.6.8-1.6h1.2l-1.4 2.5L11.6 21h-1.2l-.9-1.7-.9 1.7H7.5zm5 0v-5h1v4h2.2v1H12.5zm4.8 0v-5h2.8v.9h-1.8v1.1h1.6v.9h-1.6v1.1h1.8v1h-2.8z" fill="white" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg className="h-9 w-9" viewBox="0 0 32 32" fill="none">
      <path d="M6 2h14l6 6v20a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.5" />
      <path d="M20 2v6h6" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" />
      <line x1="10" y1="16" x2="22" y2="16" stroke="#d1d5db" strokeWidth="1" />
      <line x1="10" y1="19" x2="22" y2="19" stroke="#d1d5db" strokeWidth="1" />
      <line x1="10" y1="22" x2="18" y2="22" stroke="#d1d5db" strokeWidth="1" />
    </svg>
  );
}

function FileIcon({ filename }: { filename: string }) {
  const type = getFileType(filename);
  if (type === 'pdf') return <IconPdf />;
  if (type === 'excel') return <IconExcel />;
  return <IconFile />;
}

function IconDownloadSmall() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function Spinner() {
  return (
    <span className="h-4 w-4 shrink-0 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function DownloadsClient({ downloads }: { downloads: DownloadEntry[] }) {
  const [filter, setFilter] = useState<FilterKey>('Alle');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/download')
      .then((r) => r.json())
      .then((data: Record<string, number>) => setCounts(data))
      .catch(() => {});
  }, []);

  const getCount = (id: string) => counts[id] ?? 0;

  const handleDownload = async (entry: DownloadEntry) => {
    setLoading(entry.id);
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry.id }),
      });
      if (res.ok) {
        const { count } = (await res.json()) as { count: number };
        setCounts((prev) => ({ ...prev, [entry.id]: count }));
      }
    } catch {
      // count update failed
    }
    // Sanity-Asset-URL; "?dl=" erzwingt den Download mit Originaldateinamen.
    const sep = entry.fileUrl.includes('?') ? '&' : '?';
    const a = document.createElement('a');
    a.href = `${entry.fileUrl}${sep}dl=${encodeURIComponent(entry.fileName)}`;
    a.download = entry.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setLoading(null);
  };

  const showPDFs = filter !== 'Videos';
  const showVideos = filter === 'Alle' || filter === 'Videos';

  const filteredDownloads =
    filter === 'Alle' || filter === 'Videos'
      ? downloads
      : downloads.filter((d) => d.category === filter);

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm font-bold rounded-full border transition-colors ${
              filter === f
                ? 'bg-zinc-900 border-zinc-900 text-white'
                : 'border-zinc-200 text-zinc-600 hover:border-zinc-500 hover:text-zinc-900'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── PDF Downloads ── */}
      {showPDFs && filteredDownloads.length > 0 && (
        <div className="mb-14">
          {/* Table header (desktop) */}
          <div className="hidden sm:grid sm:grid-cols-[auto_1fr_7rem_7rem_auto] gap-5 items-center px-1 pb-3 border-b-2 border-zinc-200">
            <span className="w-9" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Titel</span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Kategorie</span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Aktualisiert</span>
            <span className="w-[120px]" />
          </div>

          <ul className="divide-y divide-zinc-100">
            {filteredDownloads.map((entry) => (
              <li key={entry.id} className="py-4">
                {/* Desktop row */}
                <div className="hidden sm:grid sm:grid-cols-[auto_1fr_7rem_7rem_auto] gap-5 items-center px-1">
                  <div className="shrink-0">
                    <FileIcon filename={entry.fileName} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-lg font-black text-zinc-900 leading-tight truncate">
                      {entry.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-zinc-400">
                      <IconDownloadSmall />
                      <span className="text-xs">
                        <span className="font-bold text-zinc-500">{getCount(entry.id)}</span>
                        {' '}Downloads
                      </span>
                    </div>
                  </div>

                  <span className="text-sm text-zinc-400">
                    {entry.category || '—'}
                  </span>

                  <span className="text-sm text-zinc-400">
                    {entry.updatedAt}
                  </span>

                  <button
                    onClick={() => handleDownload(entry)}
                    disabled={loading === entry.id}
                    className="w-[120px] inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded border border-zinc-300 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading === entry.id ? <Spinner /> : <IconDownloadSmall />}
                    Download
                  </button>
                </div>

                {/* Mobile row */}
                <div className="sm:hidden flex items-center gap-4">
                  <div className="shrink-0">
                    <FileIcon filename={entry.fileName} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-black text-zinc-900 leading-tight">
                      {entry.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                      {entry.category && <span>{entry.category}</span>}
                      <span>{entry.updatedAt}</span>
                      <span className="flex items-center gap-1">
                        <IconDownloadSmall />
                        <span className="font-bold text-zinc-500">{getCount(entry.id)}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(entry)}
                    disabled={loading === entry.id}
                    className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-zinc-300 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading === entry.id ? <Spinner /> : <IconDownloadSmall />}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Videos ── */}
      {showVideos && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-10 bg-red-600" />
            <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">
              Videos
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {videos.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-red-600 transition-all duration-200"
              >
                <div className="flex-1 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 mb-4 group-hover:bg-red-700 transition-colors">
                    <IconPlay />
                  </div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-red-500 mb-1">
                    Vol. {v.vol}
                  </p>
                  <p className="font-black text-white leading-snug">{v.title}</p>
                </div>
                <div className="border-t border-white/10 px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">JKA Official</span>
                  <span className="flex items-center gap-1 text-xs text-zinc-400 group-hover:text-red-400 transition-colors">
                    Ansehen <IconExternal />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
