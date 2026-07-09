import type { TerminEvent } from "../components/TermineView";

const CRLF = "\r\n";
const DEFAULT_DURATION_MINUTES = 60;

function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Faltet Zeilen nach RFC 5545 (max. 75 Oktette pro Zeile).
function foldLine(line: string): string {
  const bytes = Buffer.from(line, "utf-8");
  if (bytes.length <= 75) return line;

  const chunks: string[] = [];
  let start = 0;
  let limit = 75;
  while (start < bytes.length) {
    let end = Math.min(start + limit, bytes.length);
    // Nicht mitten in einem Mehrbyte-Zeichen trennen.
    while (end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    chunks.push(bytes.subarray(start, end).toString("utf-8"));
    start = end;
    limit = 74; // Fortsetzungszeilen beginnen mit einem Leerzeichen
  }
  return chunks.join(CRLF + " ");
}

function toDateOnly(iso: string): string {
  return iso.replace(/-/g, "");
}

function addOneDay(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

function addMinutes(iso: string, time: string, minutes: number): { date: string; time: string } {
  const d = new Date(`${iso}T${time}:00`);
  d.setMinutes(d.getMinutes() + minutes);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

function localDateTime(iso: string, time: string): string {
  return `${toDateOnly(iso)}T${time.replace(":", "")}00`;
}

function nowUtcStamp(): string {
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildVEvent(event: TerminEvent): string[] {
  const lines: string[] = ["BEGIN:VEVENT"];

  lines.push(`UID:${event.id}@jka-berlin.de`);
  lines.push(`DTSTAMP:${nowUtcStamp()}`);

  if (event.startTime) {
    const endDate = event.endDate ?? event.startDate;
    let endTime = event.endTime;
    if (!endTime) {
      if (event.endDate && event.endDate !== event.startDate) {
        endTime = event.startTime;
      } else {
        const computed = addMinutes(event.startDate, event.startTime, DEFAULT_DURATION_MINUTES);
        endTime = computed.time;
      }
    }
    lines.push(`DTSTART;TZID=Europe/Berlin:${localDateTime(event.startDate, event.startTime)}`);
    lines.push(`DTEND;TZID=Europe/Berlin:${localDateTime(endDate, endTime)}`);
  } else {
    lines.push(`DTSTART;VALUE=DATE:${toDateOnly(event.startDate)}`);
    lines.push(`DTEND;VALUE=DATE:${addOneDay(event.endDate ?? event.startDate)}`);
  }

  lines.push(`SUMMARY:${escapeText(event.title)}`);

  const location = [event.location, event.address].filter(Boolean).join(", ");
  if (location) lines.push(`LOCATION:${escapeText(location)}`);

  const descriptionParts = [event.type, event.organizer && `Veranstalter: ${event.organizer}`].filter(Boolean);
  if (descriptionParts.length) lines.push(`DESCRIPTION:${escapeText(descriptionParts.join("\\n"))}`);

  if (event.organizerUrl) lines.push(`URL:${escapeText(event.organizerUrl)}`);

  lines.push("END:VEVENT");
  return lines;
}

// Standard-Zeitzonendefinition für Europe/Berlin (EU-Sommerzeitregeln).
// Ohne diesen Block interpretieren manche Clients (v. a. Google Calendar,
// Outlook) das TZID nicht zuverlässig und verschieben die Uhrzeit.
const VTIMEZONE_EUROPE_BERLIN = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/Berlin",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

function buildCalendar(events: (TerminEvent)[], calendarName: string): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//JKA Berlin//Termine//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(calendarName)}`,
    "X-WR-TIMEZONE:Europe/Berlin",
  ];

  if (events.some((event) => event.startTime)) {
    lines.push(...VTIMEZONE_EUROPE_BERLIN);
  }

  for (const event of events) {
    lines.push(...buildVEvent(event));
  }

  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join(CRLF) + CRLF;
}

export function buildIcsForTermin(event: TerminEvent): string {
  return buildCalendar([event], event.title);
}

export function buildIcsForTermine(events: (TerminEvent)[]): string {
  return buildCalendar(events, "JKA Berlin – Termine");
}
