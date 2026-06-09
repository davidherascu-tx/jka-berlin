"use client";

import Image from "next/image";
import { useState } from "react";

export interface TerminEvent {
  title: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  type: string;
  organizer: string;
  organizerUrl?: string;
  location?: string;
  address?: string;
  image?: string | null;
}

/* ── Helpers ───────────────────────────────────────── */

const MONTH_SHORT = [
  "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
];

const MONTH_NAMES = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

const DAY_NAMES = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function parseDate(iso: string) {
  return new Date(iso + "T00:00:00");
}

function dayNum(iso: string): string {
  return String(parseDate(iso).getDate()).padStart(2, "0");
}

function monthShort(iso: string): string {
  return MONTH_SHORT[parseDate(iso).getMonth()];
}

function formatDateLong(iso: string): string {
  const d = parseDate(iso);
  return d.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatRangeCompact(ev: TerminEvent): string {
  if (ev.endDate && ev.endDate !== ev.startDate) {
    const a = parseDate(ev.startDate);
    const b = parseDate(ev.endDate);
    if (a.getMonth() === b.getMonth()) {
      return `${a.getDate()}.–${b.getDate()}.`;
    }
    return `${a.getDate()}. ${MONTH_NAMES[a.getMonth()]} – ${b.getDate()}. ${MONTH_NAMES[b.getMonth()]}`;
  }
  return "";
}

function monthFull(iso: string): string {
  return MONTH_NAMES[parseDate(iso).getMonth()];
}

function yearStr(iso: string): string {
  return String(parseDate(iso).getFullYear());
}

function formatRangeLong(ev: TerminEvent): string {
  if (ev.endDate && ev.endDate !== ev.startDate) {
    return `${formatDateLong(ev.startDate)} – ${formatDateLong(ev.endDate)}`;
  }
  return formatDateLong(ev.startDate);
}

function formatTime(ev: TerminEvent): string | null {
  if (!ev.startTime) return null;
  if (ev.endTime) return `${ev.startTime} – ${ev.endTime} Uhr`;
  return `${ev.startTime} Uhr`;
}

/* ── Calendar helpers ──────────────────────────────── */

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function getEventMonths(events: TerminEvent[]): number[] {
  const months = new Set<number>();
  for (const ev of events) months.add(parseDate(ev.startDate).getMonth());
  return Array.from(months).sort((a, b) => a - b);
}

function eventsOnDay(
  events: TerminEvent[],
  year: number,
  month: number,
  day: number
): TerminEvent[] {
  const target = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return events.filter((ev) => {
    if (ev.endDate) return target >= ev.startDate && target <= ev.endDate;
    return ev.startDate === target;
  });
}

/* ── Expanded Detail ───────────────────────────────── */

function EventDetail({ event }: { event: TerminEvent }) {
  return (
    <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 overflow-hidden">
      {event.image && (
        <Image
          src={event.image}
          alt={event.title}
          width={800}
          height={400}
          sizes="(max-width: 768px) 100vw, 600px"
          className="w-full h-auto"
        />
      )}

      <div className="p-4 sm:p-5 grid gap-4 sm:grid-cols-3">
        <div className="flex gap-3">
          <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Datum</p>
            <p className="text-sm font-semibold text-zinc-900 mt-0.5">{formatRangeLong(event)}</p>
            {formatTime(event) && <p className="text-sm text-zinc-500">{formatTime(event)}</p>}
          </div>
        </div>

        {event.location && (
          <div className="flex gap-3">
            <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Ort</p>
              <p className="text-sm font-semibold text-zinc-900 mt-0.5">{event.location}</p>
              {event.address && <p className="text-sm text-zinc-500">{event.address}</p>}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Veranstalter</p>
            {event.organizerUrl ? (
              <a href={event.organizerUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors mt-0.5 inline-block">
                {event.organizer} &rarr;
              </a>
            ) : (
              <p className="text-sm font-semibold text-zinc-900 mt-0.5">{event.organizer}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ListView ──────────────────────────────────────── */

function ListView({ events }: { events: TerminEvent[] }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <ul className="divide-y divide-zinc-200">
      {events.map((ev, i) => {
        const isOpen = expandedIdx === i;
        const isMultiDay = ev.endDate && ev.endDate !== ev.startDate;

        return (
          <li key={i} className="py-4 first:pt-0">
            {/* Desktop row */}
            <div className="hidden sm:flex items-center gap-5">
              {/* Date block */}
              <div className="w-32 shrink-0">
                {isMultiDay ? (
                  <>
                    <p className="text-2xl font-black text-zinc-900 leading-none">
                      {formatRangeCompact(ev)}
                    </p>
                    <p className="text-xs font-semibold text-zinc-400 mt-1">
                      {monthFull(ev.startDate)} {yearStr(ev.startDate)}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-black text-zinc-900 leading-none">
                      {dayNum(ev.startDate)}.
                    </p>
                    <p className="text-xs font-semibold text-zinc-400 mt-1">
                      {monthFull(ev.startDate)} {yearStr(ev.startDate)}
                    </p>
                  </>
                )}
              </div>

              {/* Divider */}
              <span className="h-12 w-px bg-zinc-200 shrink-0" />

              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className="text-xl font-black text-zinc-900 leading-tight">
                  {ev.title}
                </p>
              </div>

              {/* Category */}
              <span className="shrink-0 text-sm text-zinc-400 w-28 text-right">
                {ev.type}
              </span>

              {/* Details button */}
              <button
                onClick={() => setExpandedIdx(isOpen ? null : i)}
                className={`shrink-0 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors ${
                  isOpen
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-900 border border-zinc-300 hover:border-zinc-900"
                }`}
              >
                {isOpen ? "Schliessen" : "Details"}
              </button>
            </div>

            {/* Mobile stacked layout */}
            <div className="sm:hidden">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <span className="text-red-600">
                  {isMultiDay
                    ? `${formatRangeCompact(ev)} ${monthFull(ev.startDate)}`
                    : `${dayNum(ev.startDate)}. ${monthFull(ev.startDate)}`}{" "}
                  {yearStr(ev.startDate)}
                </span>
                <span>·</span>
                <span>{ev.type}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <p className="flex-1 min-w-0 text-lg font-black text-zinc-900 leading-tight">
                  {ev.title}
                </p>
                <button
                  onClick={() => setExpandedIdx(isOpen ? null : i)}
                  className={`shrink-0 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors ${
                    isOpen
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-900 border border-zinc-300 hover:border-zinc-900"
                  }`}
                >
                  {isOpen ? "Schliessen" : "Details"}
                </button>
              </div>
            </div>

            {/* Expanded */}
            {isOpen && <EventDetail event={ev} />}
          </li>
        );
      })}
    </ul>
  );
}

/* ── CalendarView ──────────────────────────────────── */

function CalendarView({
  events,
  year,
}: {
  events: TerminEvent[];
  year: number;
}) {
  const months = getEventMonths(events);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="space-y-10">
      {months.map((month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfWeek(year, month);

        return (
          <div key={month}>
            <h3 className="text-lg font-black text-zinc-900 tracking-tight mb-4">
              {MONTH_NAMES[month]} {year}
            </h3>

            <div className="border border-zinc-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 bg-zinc-50 border-b border-zinc-200">
                {DAY_NAMES.map((d) => (
                  <div key={d} className="text-center text-[10px] font-bold text-zinc-400 uppercase py-2 border-r border-zinc-200 last:border-r-0">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[80px] border-r border-b border-zinc-100 last:border-r-0 bg-zinc-50/50" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = eventsOnDay(events, year, month, day);
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <div key={day} className={`min-h-[80px] border-r border-b border-zinc-100 last:border-r-0 p-1 ${hasEvents ? "bg-white" : "bg-zinc-50/30"}`}>
                      <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs ${hasEvents ? "font-bold text-zinc-900" : "text-zinc-300"}`}>
                        {day}
                      </span>
                      {dayEvents.map((ev, j) => {
                        const idx = events.indexOf(ev);
                        return (
                          <button
                            key={j}
                            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                            className="mt-0.5 block w-full text-left text-[10px] font-semibold leading-tight px-1.5 py-1 rounded truncate bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
                            title={ev.title}
                          >
                            {ev.title}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {expandedIdx !== null &&
              events[expandedIdx] &&
              parseDate(events[expandedIdx].startDate).getMonth() === month && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-zinc-900">{events[expandedIdx].title}</h4>
                    <button onClick={() => setExpandedIdx(null)} className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors">
                      Schliessen
                    </button>
                  </div>
                  <EventDetail event={events[expandedIdx]} />
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Component ────────────────────────────────── */

export default function TermineView({ events }: { events: TerminEvent[] }) {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-12 bg-red-600" />
          <span className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase">
            {events.length} Termine
          </span>
        </div>

        <div className="flex bg-zinc-100 rounded-lg p-1">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
              view === "list" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 4h12v1H2zm0 3.5h12v1H2zm0 3.5h12v1H2z" />
            </svg>
            Liste
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
              view === "calendar" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 0v1H1.5A1.5 1.5 0 000 2.5v12A1.5 1.5 0 001.5 16h13a1.5 1.5 0 001.5-1.5v-12A1.5 1.5 0 0014.5 1H12V0h-1v1H5V0zm10.5 2a.5.5 0 01.5.5V4H1V2.5a.5.5 0 01.5-.5zM1 5h14v9.5a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5z" />
            </svg>
            Kalender
          </button>
        </div>
      </div>

      {view === "list" ? (
        <ListView events={events} />
      ) : (
        <CalendarView events={events} year={2026} />
      )}
    </div>
  );
}
