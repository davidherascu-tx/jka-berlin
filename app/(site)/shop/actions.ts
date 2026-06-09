"use server";

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Resend } from "resend";
import { getProduct, getPriceForSize, parsePrice, fmt } from "./shop-data";

export type OrderItemInput = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

export type OrderAddress = {
  name: string;
  email: string;
  phone: string;
  strasse: string;
  plz: string;
  ort: string;
  message: string;
};

export type OrderPayload = {
  items: OrderItemInput[];
  address: OrderAddress;
};

export type OrderResult = {
  ok: boolean;
  error?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ORDERS_PATH = join(process.cwd(), "data", "shop-orders.json");

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Liest eine Env-Variable und entfernt versehentliche umschliessende
// Anführungszeichen + Whitespace (haeufiger Fehler bei der Netlify-Eingabe).
function envStr(name: string): string {
  const v = process.env[name];
  if (!v) return "";
  return v.trim().replace(/^['"]+|['"]+$/g, "").trim();
}

function saveLocal(entry: Record<string, unknown>): void {
  try {
    const dir = join(process.cwd(), "data");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    let list: unknown[] = [];
    if (existsSync(ORDERS_PATH)) {
      try {
        list = JSON.parse(readFileSync(ORDERS_PATH, "utf-8")) as unknown[];
      } catch {
        list = [];
      }
    }
    list.push(entry);
    writeFileSync(ORDERS_PATH, JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // Filesystem writes fail on serverless – best effort
  }
}

type ResolvedLine = {
  name: string;
  details: string;
  quantity: number;
  unitPrice: string | null;
  lineTotal: number;
};

function resolveItems(items: OrderItemInput[]): {
  lines: ResolvedLine[];
  total: number;
} {
  const lines: ResolvedLine[] = [];
  let total = 0;

  for (const item of items) {
    const product = getProduct(item.productId);
    if (!product) continue;
    const qty = Math.max(1, Math.min(50, Math.floor(Number(item.quantity) || 1)));
    const size = String(item.size ?? "");
    const color = String(item.color ?? "");
    const unitPrice = getPriceForSize(product, size);
    const lineTotal = unitPrice ? parsePrice(unitPrice) * qty : 0;
    total += lineTotal;
    lines.push({
      name: product.name,
      details: [size && `Gr. ${size}`, color].filter(Boolean).join(", "),
      quantity: qty,
      unitPrice,
      lineTotal,
    });
  }

  return { lines, total };
}

function buildEmail(
  lines: ResolvedLine[],
  total: number,
  a: OrderAddress
): { subject: string; html: string; text: string } {
  const subject = `Shop-Bestellung – ${a.name}`;

  const itemRows = lines
    .map(
      (l) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #eee">${escapeHtml(l.name)}${
          l.details ? ` <span style="color:#888">(${escapeHtml(l.details)})</span>` : ""
        }</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center">${l.quantity}×</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right">${
            l.unitPrice ? escapeHtml(l.unitPrice) : "—"
          }</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:bold">${
            l.lineTotal > 0 ? fmt(l.lineTotal) : "—"
          }</td>
        </tr>`
    )
    .join("");

  const html = `
    <h2 style="margin:0 0 8px">Neue Shop-Bestellung</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px;font-size:14px">
      <thead>
        <tr style="text-align:left;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.05em">
          <th style="padding:6px 12px">Artikel</th>
          <th style="padding:6px 12px;text-align:center">Menge</th>
          <th style="padding:6px 12px;text-align:right">Einzel</th>
          <th style="padding:6px 12px;text-align:right">Summe</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:10px 12px;text-align:right;font-weight:bold">Gesamt</td>
          <td style="padding:10px 12px;text-align:right;font-weight:bold;font-size:16px">${fmt(total)}</td>
        </tr>
      </tfoot>
    </table>

    <h3 style="margin:20px 0 6px">Lieferadresse</h3>
    <table style="border-collapse:collapse;font-size:14px">
      <tr><td style="padding:4px 12px;font-weight:bold">Name</td><td style="padding:4px 12px">${escapeHtml(a.name)}</td></tr>
      <tr><td style="padding:4px 12px;font-weight:bold">Straße & Nr.</td><td style="padding:4px 12px">${escapeHtml(a.strasse)}</td></tr>
      <tr><td style="padding:4px 12px;font-weight:bold">PLZ / Ort</td><td style="padding:4px 12px">${escapeHtml(a.plz)} ${escapeHtml(a.ort)}</td></tr>
      <tr><td style="padding:4px 12px;font-weight:bold">E-Mail</td><td style="padding:4px 12px">${escapeHtml(a.email)}</td></tr>
      <tr><td style="padding:4px 12px;font-weight:bold">Telefon</td><td style="padding:4px 12px">${escapeHtml(a.phone)}</td></tr>
    </table>
    ${
      a.message
        ? `<h3 style="margin:20px 0 6px">Anmerkungen</h3><p style="font-size:14px;white-space:pre-wrap">${escapeHtml(
            a.message
          ).replace(/\n/g, "<br>")}</p>`
        : ""
    }
  `;

  const textLines = [
    "=== SHOP-BESTELLUNG ===",
    "",
    ...lines.map(
      (l) =>
        `• ${l.name}${l.details ? ` (${l.details})` : ""} × ${l.quantity}${
          l.lineTotal > 0 ? ` = ${fmt(l.lineTotal)}` : ""
        }`
    ),
    "",
    `Gesamt: ${fmt(total)}`,
    "",
    "=== LIEFERADRESSE ===",
    `Name: ${a.name}`,
    `Straße & Nr.: ${a.strasse}`,
    `PLZ / Ort: ${a.plz} ${a.ort}`,
    `E-Mail: ${a.email}`,
    `Telefon: ${a.phone}`,
    ...(a.message ? ["", "Anmerkungen:", a.message] : []),
  ];

  return { subject, html, text: textLines.join("\n") };
}

export async function submitOrder(payload: OrderPayload): Promise<OrderResult> {
  const a: OrderAddress = {
    name: String(payload?.address?.name ?? "").trim(),
    email: String(payload?.address?.email ?? "").trim(),
    phone: String(payload?.address?.phone ?? "").trim(),
    strasse: String(payload?.address?.strasse ?? "").trim(),
    plz: String(payload?.address?.plz ?? "").trim(),
    ort: String(payload?.address?.ort ?? "").trim(),
    message: String(payload?.address?.message ?? "").trim(),
  };

  const { lines, total } = resolveItems(
    Array.isArray(payload?.items) ? payload.items : []
  );

  // ── Validierung ──
  if (lines.length === 0) {
    return { ok: false, error: "Der Warenkorb ist leer." };
  }
  if (!a.name || !a.email || !a.phone || !a.strasse || !a.plz || !a.ort) {
    return { ok: false, error: "Bitte fülle alle Pflichtfelder aus." };
  }
  if (!EMAIL_RE.test(a.email)) {
    return { ok: false, error: "Bitte gib eine gültige E-Mail-Adresse an." };
  }
  if (!/^\d{4,5}$/.test(a.plz)) {
    return { ok: false, error: "Bitte gib eine gültige PLZ an." };
  }

  const { subject, html, text } = buildEmail(lines, total, a);

  // Best-effort: lokal sichern, damit keine Bestellung verloren geht.
  saveLocal({
    submittedAt: new Date().toISOString(),
    total,
    items: lines,
    address: a,
  });

  const apiKey = process.env.RESEND_API_KEY;
  let to = envStr("SHOP_MAIL_TO");
  if (!to.includes("@")) to = "honbu@jka-berlin.de";
  let from = envStr("SHOP_MAIL_FROM") || envStr("MITGLIED_MAIL_FROM");
  if (!from.includes("@")) from = "JKA-Berlin <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[shop] RESEND_API_KEY nicht gesetzt – Bestellung wurde lokal gespeichert."
    );
    return {
      ok: false,
      error:
        "Der Versand ist derzeit nicht möglich. Bitte kontaktiere uns direkt unter honbu@jka-berlin.de.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: a.email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[shop] Resend error:", error);
      return {
        ok: false,
        error:
          "Die Bestellung konnte nicht versendet werden. Bitte versuche es erneut.",
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("[shop] Resend exception:", err);
    return {
      ok: false,
      error:
        "Die Bestellung konnte nicht versendet werden. Bitte versuche es erneut.",
    };
  }
}
