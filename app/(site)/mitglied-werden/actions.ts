"use server";

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Resend } from "resend";
import type { Mitgliedstyp, MitgliedFormState } from "./form-state";

const EINZEL_FIELDS = [
  "vorname",
  "nachname",
  "geburtsdatum",
  "email",
  "telefon",
  "strasse",
  "plz",
  "ort",
  "dojo",
  "graduierung",
  "erfahrung",
  "nachricht",
  "datenschutz",
] as const;

const VEREIN_FIELDS = [
  "vereinsname",
  "mitgliederzahl",
  "verband",
  "strasse",
  "plz",
  "ort",
  "trainingsorte",
  "ansprech_vorname",
  "ansprech_nachname",
  "ansprech_funktion",
  "email",
  "telefon",
  "nachricht",
  "datenschutz",
] as const;

const EINZEL_REQUIRED: string[] = [
  "vorname",
  "nachname",
  "geburtsdatum",
  "email",
  "strasse",
  "plz",
  "ort",
  "datenschutz",
];

const VEREIN_REQUIRED: string[] = [
  "vereinsname",
  "strasse",
  "plz",
  "ort",
  "ansprech_vorname",
  "ansprech_nachname",
  "email",
  "datenschutz",
];

const FIELD_LABELS: Record<string, string> = {
  vorname: "Vorname",
  nachname: "Nachname",
  geburtsdatum: "Geburtsdatum",
  email: "E-Mail",
  telefon: "Telefon",
  strasse: "Straße & Hausnummer",
  plz: "PLZ",
  ort: "Ort",
  dojo: "Aktuelles/letztes Dojo",
  graduierung: "Graduierung",
  erfahrung: "Karate-Erfahrung",
  nachricht: "Nachricht",
  vereinsname: "Vereinsname",
  mitgliederzahl: "Anzahl aktiver Karateka",
  verband: "Aktuelle Verbandszugehörigkeit",
  trainingsorte: "Trainingsorte",
  ansprech_vorname: "Ansprechpartner – Vorname",
  ansprech_nachname: "Ansprechpartner – Nachname",
  ansprech_funktion: "Funktion im Verein",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMISSIONS_PATH = join(process.cwd(), "data", "mitglied-submissions.json");

function saveLocal(entry: Record<string, unknown>): void {
  try {
    const dir = join(process.cwd(), "data");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    let list: unknown[] = [];
    if (existsSync(SUBMISSIONS_PATH)) {
      try {
        list = JSON.parse(readFileSync(SUBMISSIONS_PATH, "utf-8")) as unknown[];
      } catch {
        list = [];
      }
    }
    list.push(entry);
    writeFileSync(SUBMISSIONS_PATH, JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // Filesystem writes fail on serverless – treat as best effort
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailBody(
  typ: Mitgliedstyp,
  data: Record<string, string>
): { html: string; text: string; subject: string } {
  const order = typ === "einzel" ? EINZEL_FIELDS : VEREIN_FIELDS;
  const rows: [string, string][] = order
    .filter((k) => k !== "datenschutz")
    .map((k) => [FIELD_LABELS[k] ?? k, data[k] ?? ""]);

  const heading =
    typ === "einzel"
      ? "Neue Mitgliedschaftsanfrage (Einzelperson)"
      : "Neue Mitgliedschaftsanfrage (Verein)";

  const subject =
    typ === "einzel"
      ? `Mitgliedschaftsanfrage: ${data.vorname} ${data.nachname}`
      : `Vereinsanfrage: ${data.vereinsname}`;

  const text = `${heading}\n\n${rows
    .filter(([, v]) => v && v.trim().length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}`;

  const html = `<h2>${escapeHtml(heading)}</h2><table style="border-collapse:collapse">${rows
    .filter(([, v]) => v && v.trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-weight:bold">${escapeHtml(
          k
        )}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${escapeHtml(
          v
        ).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("")}</table>`;

  return { html, text, subject };
}

// Liest eine Env-Variable und entfernt versehentliche umschliessende
// Anführungszeichen + Whitespace (haeufiger Fehler bei der Netlify-Eingabe).
function envStr(name: string): string {
  const v = process.env[name];
  if (!v) return "";
  return v.trim().replace(/^['"]+|['"]+$/g, "").trim();
}

const PLAIN_EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const NAMED_EMAIL_RE = /^.+<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/;

// Robuste Absender-Aufloesung: repariert ein fehlendes ">", validiert das
// Format und faellt bei Unbrauchbarem auf einen garantiert gueltigen Wert zurueck.
function resolveFrom(name: string, fallback: string): string {
  let v = envStr(name);
  if (v.includes("<") && !v.includes(">")) v += ">"; // fehlende Klammer ergaenzen
  return PLAIN_EMAIL_RE.test(v) || NAMED_EMAIL_RE.test(v) ? v : fallback;
}

function resolveEmail(name: string, fallback: string): string {
  const v = envStr(name);
  return PLAIN_EMAIL_RE.test(v) ? v : fallback;
}

async function sendViaResend(
  typ: Mitgliedstyp,
  data: Record<string, string>
): Promise<{ ok: boolean; detail: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = resolveEmail("MITGLIED_MAIL_TO", "honbu@jka-berlin.de");
  const from = resolveFrom("MITGLIED_MAIL_FROM", "JKA-Berlin <onboarding@resend.dev>");
  // TEMPORAERE Diagnose: zeigt, ob der Key zur Laufzeit ankommt (Wert wird NICHT geloggt).
  console.log(
    `[mitglied-werden] sendViaResend: RESEND_API_KEY=${
      apiKey ? `present(len ${apiKey.length})` : "MISSING"
    }, from="${from}", to="${to}"`
  );
  if (!apiKey) {
    return { ok: false, detail: `key=MISSING from="${from}" to="${to}"` };
  }
  const { html, text, subject } = buildEmailBody(typ, data);
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[mitglied-werden] Resend error:", error);
      const e = error as { name?: string; message?: string };
      return {
        ok: false,
        detail: `key=present(${apiKey.length}) from="${from}" resendError=${e.name ?? ""}:${
          e.message ?? JSON.stringify(error)
        }`,
      };
    }
    return { ok: true, detail: "ok" };
  } catch (err) {
    console.error("[mitglied-werden] Resend exception:", err);
    const m = err instanceof Error ? err.message : String(err);
    return { ok: false, detail: `key=present(${apiKey.length}) exception=${m}` };
  }
}

export async function submitMitgliedForm(
  _prev: MitgliedFormState,
  formData: FormData
): Promise<MitgliedFormState> {
  const typ: Mitgliedstyp =
    formData.get("mitgliedstyp") === "verein" ? "verein" : "einzel";
  const fields = typ === "einzel" ? EINZEL_FIELDS : VEREIN_FIELDS;
  const required = typ === "einzel" ? EINZEL_REQUIRED : VEREIN_REQUIRED;

  const data: Record<string, string> = {};
  for (const f of fields) {
    data[f] = String(formData.get(f) ?? "").trim();
  }

  const errors: Record<string, string> = {};
  for (const field of required) {
    if (!data[field]) {
      errors[field] =
        field === "datenschutz"
          ? "Bitte stimme der Datenschutzerklärung zu."
          : "Pflichtfeld";
    }
  }
  if (data.email && !EMAIL_RE.test(data.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse an.";
  }
  if (data.plz && !/^\d{4,5}$/.test(data.plz)) {
    errors.plz = "Bitte gib eine gültige PLZ an.";
  }
  if (data.geburtsdatum && !/^\d{2}\.\d{2}\.\d{4}$/.test(data.geburtsdatum)) {
    errors.geburtsdatum = "Bitte gib das Datum als TT.MM.JJJJ an.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Bitte prüfe die rot markierten Felder.",
      errors,
      values: data,
      mitgliedstyp: typ,
    };
  }

  const submittedAt = new Date().toISOString();
  saveLocal({ submittedAt, mitgliedstyp: typ, ...data });

  const sendResult = await sendViaResend(typ, data);

  if (!sendResult.ok) {
    console.error("[mitglied-werden] Versand fehlgeschlagen:", sendResult.detail);
    return {
      status: "error",
      message:
        "Deine Anfrage konnte momentan nicht gesendet werden. Bitte versuche es später erneut oder schreibe uns direkt an honbu@jka-berlin.de. " +
        `[Diagnose: ${sendResult.detail}]`,
      values: data,
      mitgliedstyp: typ,
    };
  }

  return {
    status: "success",
    message:
      typ === "verein"
        ? "Vielen Dank! Die Anfrage des Vereins ist bei uns eingegangen. Wir melden uns in Kürze bei euch."
        : "Vielen Dank! Deine Anfrage ist bei uns eingegangen. Wir melden uns in Kürze per E-Mail bei dir.",
    mitgliedstyp: typ,
  };
}
