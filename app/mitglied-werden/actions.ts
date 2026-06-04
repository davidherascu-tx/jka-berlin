"use server";

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export type Mitgliedstyp = "einzel" | "verein";

export type MitgliedFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
  mitgliedstyp?: Mitgliedstyp;
};

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

async function sendViaResend(
  typ: Mitgliedstyp,
  data: Record<string, string>
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MITGLIED_MAIL_TO ?? "honbu@jka-berlin.de";
  const from = process.env.MITGLIED_MAIL_FROM ?? "JKA-Berlin <noreply@jka-berlin.de>";
  if (!apiKey) return false;
  const { html, text, subject } = buildEmailBody(typ, data);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        html,
        text,
      }),
    });
    return res.ok;
  } catch {
    return false;
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

  const emailed = await sendViaResend(typ, data);

  if (!emailed && !process.env.RESEND_API_KEY) {
    console.warn(
      "[mitglied-werden] RESEND_API_KEY nicht gesetzt – Anfrage wurde lokal gespeichert unter data/mitglied-submissions.json."
    );
  } else if (!emailed) {
    console.error("[mitglied-werden] E-Mail-Versand fehlgeschlagen.");
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

export const initialMitgliedState: MitgliedFormState = {
  status: "idle",
  message: "",
};
