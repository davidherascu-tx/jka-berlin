"use client";

import { useEffect, useRef, useState } from "react";

const MONTHS_DE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
// Woche beginnt bewusst mit Montag (deutsche/europäische Konvention)
const WEEKDAYS_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function parseDE(s: string): { d: number; m: number; y: number } | null {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s.trim());
  if (!match) return null;
  const d = Number(match[1]);
  const m = Number(match[2]);
  const y = Number(match[3]);
  if (m < 1 || m > 12) return null;
  const daysInMonth = new Date(y, m, 0).getDate();
  if (d < 1 || d > daysInMonth) return null;
  return { d, m, y };
}

function formatDE(d: number, m: number, y: number): string {
  return `${pad(d)}.${pad(m)}.${y}`;
}

function CalendarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export default function DateFieldDE({
  id,
  name,
  defaultValue,
  className,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  className?: string;
}) {
  const now = new Date();
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const parsed = parseDE(value);
  const [viewYear, setViewYear] = useState(parsed?.y ?? now.getFullYear() - 20);
  const [viewMonth, setViewMonth] = useState((parsed?.m ?? 1) - 1); // 0-basiert

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openCalendar() {
    if (parsed) {
      setViewYear(parsed.y);
      setViewMonth(parsed.m - 1);
    }
    setOpen(true);
  }

  function handleType(e: React.ChangeEvent<HTMLInputElement>) {
    // Nur Ziffern übernehmen und automatisch als TT.MM.JJJJ formatieren
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let out = digits;
    if (digits.length > 4) {
      out = `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
    } else if (digits.length > 2) {
      out = `${digits.slice(0, 2)}.${digits.slice(2)}`;
    }
    setValue(out);
  }

  function pickDay(day: number) {
    setValue(formatDE(day, viewMonth + 1, viewYear));
    setOpen(false);
  }

  function shiftMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  }

  // Montag-basierter Wochentag des Monatsersten: getDay() 0=So..6=Sa
  const firstWeekday = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const years: number[] = [];
  for (let y = now.getFullYear(); y >= 1920; y--) years.push(y);

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          placeholder="TT.MM.JJJJ"
          value={value}
          onChange={handleType}
          onFocus={() => setOpen(true)}
          className={`${className ?? ""} pr-11`}
        />
        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openCalendar())}
          aria-label="Kalender öffnen"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded text-zinc-400 hover:text-red-600 hover:bg-zinc-100 transition-colors"
        >
          <CalendarIcon />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 z-30 mt-2 w-[20rem] max-w-[calc(100vw-3rem)] rounded-lg border border-zinc-200 bg-white p-3 shadow-xl">
          {/* Kopf: Monat/Jahr + Navigation */}
          <div className="flex items-center gap-1.5 mb-3">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="Vorheriger Monat"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-zinc-500 hover:bg-zinc-100 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <select
              value={viewMonth}
              onChange={(e) => setViewMonth(Number(e.target.value))}
              className="flex-1 min-w-0 rounded border border-zinc-200 bg-white px-2 py-1.5 text-sm text-zinc-800 focus:outline-none focus:border-red-600"
              aria-label="Monat"
            >
              {MONTHS_DE.map((mn, i) => (
                <option key={mn} value={i}>{mn}</option>
              ))}
            </select>
            <select
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
              className="w-[5.5rem] shrink-0 rounded border border-zinc-200 bg-white px-2 py-1.5 text-sm text-zinc-800 focus:outline-none focus:border-red-600"
              aria-label="Jahr"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Nächster Monat"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-zinc-500 hover:bg-zinc-100 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Wochentage (Mo–So) */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS_DE.map((w) => (
              <div key={w} className="text-center text-[11px] font-bold uppercase tracking-wide text-zinc-400 py-1">
                {w}
              </div>
            ))}
          </div>

          {/* Tage */}
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                parsed && parsed.d === day && parsed.m === viewMonth + 1 && parsed.y === viewYear;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => pickDay(day)}
                  className={`h-9 rounded text-sm transition-colors ${
                    isSelected
                      ? "bg-red-600 text-white font-bold"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
