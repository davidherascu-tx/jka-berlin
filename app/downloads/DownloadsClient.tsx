'use client';

import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterKey = 'Alle' | 'Allgemeine' | 'Technisches' | 'Prüfungen' | 'Videos';

type DownloadEntry = {
  id: string;
  title: string;
  category: 'Allgemeine' | 'Technisches' | 'Prüfungen' | '';
  updatedAt: string;
  file: string;
  initialCount: number;
};

type VideoEntry = {
  id: string;
  title: string;
  url: string;
  vol: number;
};

// ─── Data (TODO: replace with Sanity CMS query) ───────────────────────────────

const downloads: DownloadEntry[] = [
  {
    id: 'brandenburger-sommerlager',
    title: 'Brandenburger Sommerlager',
    category: '',
    updatedAt: '24. April 2026',
    file: '2026_JKA_brandenburger_sommerlager.pdf',
    initialCount: 7,
  },
  {
    id: 'spring-camp-2026',
    title: 'Spring Camp 2026',
    category: 'Allgemeine',
    updatedAt: '16. Februar 2026',
    file: '2026_JKA_Springcamp_Ohta_info.pdf',
    initialCount: 92,
  },
  {
    id: 'jahresplanung-2026',
    title: 'Jahresplanung 2026',
    category: 'Allgemeine',
    updatedAt: '23. November 2025',
    file: '2026_Terminplanung.pdf',
    initialCount: 180,
  },
  {
    id: 'pruefungsordnung-kyupruefung',
    title: 'Prüfungsordnung / Kyuprüfung',
    category: 'Technisches',
    updatedAt: '19. Juni 2025',
    file: '2018_Pruefungsordnung_Kyupruefungen_JKA_Berlin.pdf',
    initialCount: 131,
  },
  {
    id: 'antrag-lizenzpruefungen',
    title: 'Antrag Lizenzprüfungen',
    category: 'Prüfungen',
    updatedAt: '13. Februar 2025',
    file: 'Antrag-Lizenzpruefungen.pdf',
    initialCount: 55,
  },
  {
    id: 'antrag-danpruefung',
    title: 'Antrag Danprüfung',
    category: 'Prüfungen',
    updatedAt: '13. Februar 2025',
    file: 'Antrag-Danpruefung.pdf',
    initialCount: 87,
  },
  {
    id: 'dojo-kun',
    title: 'Dojo Kun',
    category: 'Allgemeine',
    updatedAt: '27. März 2019',
    file: 'dojokun.pdf',
    initialCount: 251,
  },
  {
    id: 'jka-wettkampfordnung-aktuell',
    title: 'JKA Wettkampfordnung aktuell',
    category: 'Technisches',
    updatedAt: '24. April 2019',
    file: '2015_Tournament-Rules-Regulations.pdf',
    initialCount: 352,
  },
  {
    id: 'jka-wettkampfordnung-vor-2015',
    title: 'JKA Wettkampfordnung vor 2015',
    category: 'Technisches',
    updatedAt: '27. März 2019',
    file: '2015_tournament_rule_regulations.pdf',
    initialCount: 69,
  },
  {
    id: 'kata',
    title: 'Kata',
    category: 'Technisches',
    updatedAt: '27. März 2019',
    file: 'Kata.pdf',
    initialCount: 399,
  },
  {
    id: 'antrag-kyupruefungen',
    title: 'Antrag Kyuprüfungen',
    category: 'Prüfungen',
    updatedAt: '27. März 2019',
    file: 'Prüfungsbogen JKA Berlin.pdf',
    initialCount: 191,
  },
  {
    id: 'technical-manual-instructor',
    title: 'Technical Manual for the Instructor',
    category: 'Technisches',
    updatedAt: '27. März 2019',
    file: 'tech_manual_instructor.pdf',
    initialCount: 202,
  },
];

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

const FILTERS: FilterKey[] = ['Alle', 'Allgemeine', 'Technisches', 'Prüfungen', 'Videos'];

const catStyle: Record<string, { bg: string; text: string }> = {
  Allgemeine:  { bg: 'bg-zinc-100',  text: 'text-zinc-600' },
  Technisches: { bg: 'bg-blue-50',   text: 'text-blue-700' },
  Prüfungen:   { bg: 'bg-red-50',    text: 'text-red-600'  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconDownload() {
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
    <span className="h-3.5 w-3.5 shrink-0 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const s = catStyle[category];
  if (!s) return <span className="text-zinc-300 text-sm">—</span>;
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${s.bg} ${s.text}`}>
      {category}
    </span>
  );
}

function DownloadButton({
  entry,
  loading,
  onClick,
}: {
  entry: DownloadEntry;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold px-3 py-1.5 rounded transition-colors whitespace-nowrap"
    >
      {loading ? <Spinner /> : <IconDownload />}
      PDF
    </button>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function DownloadsClient() {
  const [filter, setFilter] = useState<FilterKey>('Alle');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/download')
      .then((r) => r.json())
      .then((data: Record<string, number>) => setCounts(data))
      .catch(() => {});
  }, []);

  const getCount = (id: string, initial: number) => counts[id] ?? initial;

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
      // count update failed — download proceeds anyway
    }
    const a = document.createElement('a');
    a.href = `/downloads/${encodeURIComponent(entry.file)}`;
    a.download = `${entry.title}.pdf`;
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
          {/* Desktop table */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="text-left px-5 py-3 text-[11px] font-bold tracking-[0.12em] uppercase text-zinc-500 w-[40%]">
                    Titel
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold tracking-[0.12em] uppercase text-zinc-500">
                    Kategorie
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold tracking-[0.12em] uppercase text-zinc-500">
                    Aktualisiert
                  </th>
                  <th className="text-center px-4 py-3 text-[11px] font-bold tracking-[0.12em] uppercase text-zinc-500">
                    Downloads
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredDownloads.map((entry) => (
                  <tr key={entry.id} className="hover:bg-zinc-50 transition-colors group">
                    <td className="px-5 py-3.5 font-semibold text-zinc-900">
                      {entry.title}
                    </td>
                    <td className="px-4 py-3.5">
                      <CategoryBadge category={entry.category} />
                    </td>
                    <td className="px-4 py-3.5 text-zinc-500 text-sm">
                      {entry.updatedAt}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="font-bold text-zinc-800">
                        {getCount(entry.id, entry.initialCount)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <DownloadButton
                        entry={entry}
                        loading={loading === entry.id}
                        onClick={() => handleDownload(entry)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="md:hidden space-y-3">
            {filteredDownloads.map((entry) => (
              <li
                key={entry.id}
                className="border border-zinc-200 rounded-xl p-4 bg-white"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <p className="font-bold text-zinc-900 leading-snug">{entry.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {entry.category && (
                        <CategoryBadge category={entry.category} />
                      )}
                      <span className="text-xs text-zinc-500">{entry.updatedAt}</span>
                    </div>
                  </div>
                  <DownloadButton
                    entry={entry}
                    loading={loading === entry.id}
                    onClick={() => handleDownload(entry)}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  <span className="font-bold text-zinc-700">
                    {getCount(entry.id, entry.initialCount)}
                  </span>{' '}
                  Downloads
                </p>
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
