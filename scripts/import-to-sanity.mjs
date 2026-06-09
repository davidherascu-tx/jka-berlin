#!/usr/bin/env node
/**
 * One-shot Importer: schreibt die hartkodierten News/Termine/Downloads
 * aus dem Code in das Sanity-Dataset.
 *
 * Benoetigt SANITY_API_TOKEN (Editor- oder Write-Berechtigung).
 * Idempotent: existierende Dokumente werden uebersprungen (nicht ueberschrieben),
 * ausser --replace wird mitgegeben.
 *
 *   node scripts/import-to-sanity.mjs           # nur was noch nicht existiert
 *   node scripts/import-to-sanity.mjs --replace # alles neu schreiben (Vorsicht!)
 */

import {createClient} from '@sanity/client'
import {createReadStream, existsSync, readdirSync} from 'node:fs'
import {readFile} from 'node:fs/promises'
import {basename, join} from 'node:path'

// ───── ENV laden (ohne dotenv-Dependency) ────────────────────────────────
async function loadDotenv(file) {
  const path = join(process.cwd(), file)
  if (!existsSync(path)) return
  const content = await readFile(path, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(.*))\s*$/)
    if (!m) continue
    const [, key, dq, sq, raw] = m
    if (process.env[key] === undefined) {
      process.env[key] = dq ?? sq ?? raw ?? ''
    }
  }
}
await loadDotenv('.env.local')
await loadDotenv('.env')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('FEHLER: NEXT_PUBLIC_SANITY_PROJECT_ID fehlt in .env.local')
  process.exit(1)
}
if (!token) {
  console.error(
    'FEHLER: SANITY_API_TOKEN fehlt in .env.local.\n' +
      `  → Token mit Editor-/Write-Berechtigung erstellen auf:\n` +
      `    https://www.sanity.io/manage/project/${projectId}/api#tokens\n` +
      `  → dann in .env.local eintragen: SANITY_API_TOKEN="sk..."`,
  )
  process.exit(1)
}

const REPLACE = process.argv.includes('--replace')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-09',
  token,
  useCdn: false,
})

const PUBLIC = join(process.cwd(), 'public')

// ───── Asset-Upload mit Cache ────────────────────────────────────────────
const assetCache = new Map() // absoluter Pfad -> {_type, asset: {_ref}}

// Findet eine Datei in `dir` robust gegen Unicode-Normalisierung (NFC vs NFD).
// Windows/macOS speichern Umlaute teils zerlegt (u + ¨), unsere Strings als ü.
function findInDir(dir, filename) {
  const direct = join(dir, filename)
  if (existsSync(direct)) return direct
  if (!existsSync(dir)) return null
  const wanted = filename.normalize('NFC')
  for (const entry of readdirSync(dir)) {
    if (entry.normalize('NFC') === wanted) return join(dir, entry)
  }
  return null
}

function resolveImage(publicPath) {
  if (!publicPath) return null
  const rel = publicPath.replace(/^\//, '')
  return findInDir(PUBLIC, rel)
}

function resolvePdf(filename) {
  if (!filename) return null
  // erst /public/downloads/, dann /public/ direkt
  return findInDir(join(PUBLIC, 'downloads'), filename) ?? findInDir(PUBLIC, filename)
}

async function uploadAsset(kind /* 'image' | 'file' */, fullPath) {
  if (!fullPath) return undefined
  const cacheKey = `${kind}::${fullPath}`
  if (assetCache.has(cacheKey)) return assetCache.get(cacheKey)
  process.stdout.write(`    ↑ ${kind} hochladen: ${basename(fullPath)} ... `)
  const asset = await client.assets.upload(kind, createReadStream(fullPath), {
    filename: basename(fullPath),
  })
  console.log('ok')
  const ref = {
    _type: kind,
    asset: {_type: 'reference', _ref: asset._id},
  }
  assetCache.set(cacheKey, ref)
  return ref
}

// ───── Quelldaten (1:1 aus dem Frontend uebernommen) ─────────────────────

const NEWS = [
  {
    slug: 'brandenburger-sommerlager-2026',
    title: 'Brandenburger Sommerlager 2026',
    excerpt:
      'Auch dieses Jahr findet wieder unser beliebtes Sommerlager statt. Alle Informationen und die Anmeldung gibt es im Download-Bereich.',
    category: 'Lehrgang',
    date: '2026-04-24',
    image: '/2026_JKA_brandenburger_sommerlager.jpg',
    pdf: '2026_JKA_brandenburger_sommerlager.pdf',
  },
  {
    slug: 'ostergrue-2026',
    title: 'Ostergrüße',
    excerpt:
      'Das gesamte JKA-Berlin-Team wünscht allen Mitgliedern, Freunden und Förderern frohe Ostern und erholsame Feiertage.',
    category: 'Aktuelles',
    date: '2026-04-04',
    image: '/pezibear-egg-1234723_1920.jpg',
  },
  {
    slug: 'spring-camp-mit-ohta-sensei',
    title: 'Spring Camp 2026',
    excerpt:
      'Ein intensives Wochenende mit Ohta Sensei – Kihon, Kata und Kumite auf höchstem Niveau im Honbu-Dojo.',
    category: 'Lehrgang',
    date: '2026-02-16',
    image: '/Ohta_Sensei.jpg',
    pdf: '2026_Spring_Camp.pdf',
  },
]

const TERMINE = [
  {
    title: 'Summer Camp',
    startDate: '2026-06-06',
    startTime: '10:00',
    endTime: '15:00',
    type: 'Lehrgang',
    organizer: 'Nintaikan',
    organizerUrl: 'https://www.nintaikan.de/',
    location: 'Handewitt',
    address: 'Alter Kirchenweg 38, 24983 Handewitt',
    image: null,
  },
  {
    title: 'Kampfrichterausbildung',
    startDate: '2026-06-26',
    startTime: '18:00',
    endTime: '20:00',
    type: 'Ausbildung',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Honbu Dojo Leidenkan',
    image: null,
  },
  {
    title: 'Brandenburger Sommerlager',
    startDate: '2026-06-27',
    endDate: '2026-06-28',
    startTime: '10:00',
    endTime: '11:30',
    type: 'Lehrgang',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Basdorf',
    address: '16348 Basdorf',
    image: '/2026_JKA_brandenburger_sommerlager.jpg',
  },
  {
    title: 'Kyu-Prüfungen',
    startDate: '2026-06-28',
    startTime: '11:45',
    endTime: '15:00',
    type: 'Lehrgang',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Basdorf',
    address: '16348 Basdorf',
    image: null,
  },
  {
    title: 'Autumn Camp mit Imura Sensei und Shiina Sensei',
    startDate: '2026-09-18',
    endDate: '2026-09-20',
    startTime: '19:00',
    endTime: '11:30',
    type: 'Lehrgang',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Berlin-Buch',
    address: 'Ernst-Busch-Straße 27, 13125 Berlin',
    image: '/2026_JKA_Autumn_Camp.png',
  },
  {
    title: 'Dan- und Lizenzprüfungen',
    startDate: '2026-09-20',
    startTime: '13:30',
    endTime: '16:30',
    type: 'Lehrgang',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Honbu Dojo Leidenkan',
    image: '/2026_Dan_Lizenzprüfungen.jpg',
  },
  {
    title: 'Lubusz Cup',
    startDate: '2026-10-10',
    type: 'Turnier',
    organizer: 'Karate Kontra Zary',
    organizerUrl: 'https://karatekontra.pl/',
    location: 'Zary / Polen',
    image: '/2026_Lubusz_Cup.jpg',
  },
  {
    title: 'Autumn Camp mit Ohta Sensei',
    startDate: '2026-11-14',
    startTime: '10:00',
    endTime: '17:00',
    type: 'Lehrgang',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Berlin-Pankow',
    address: 'Brixener Ecke Dolomitenstraße, 13187 Berlin',
    image: '/2026_Autumn_Camp_Nov.jpg',
  },
  {
    title: 'Kampfrichterausbildung',
    startDate: '2026-12-04',
    startTime: '18:00',
    endTime: '20:00',
    type: 'Ausbildung',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Honbu Dojo Leidenkan',
    image: null,
  },
  {
    title: 'Nikolauscup',
    startDate: '2026-12-05',
    type: 'Turnier',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Berlin-Buch',
    address: 'Ernst-Busch-Straße 27, 13125 Berlin',
    image: '/2026_Nikolauscup.jpg',
  },
  {
    title: 'Dezemberlehrgang',
    startDate: '2026-12-06',
    startTime: '10:00',
    endTime: '13:00',
    type: 'Lehrgang',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Berlin-Buch',
    address: 'Ernst-Busch-Straße 27, 13125 Berlin',
    image: '/2026_Dezemberlehrgang.jpg',
  },
  {
    title: 'Kyuprüfungen',
    startDate: '2026-12-06',
    startTime: '13:00',
    endTime: '16:00',
    type: 'Lehrgang',
    organizer: 'JKA Berlin',
    organizerUrl: 'https://www.jka-berlin.de/',
    location: 'Berlin-Buch',
    address: 'Ernst-Busch-Straße 27, 13125 Berlin',
    image: '/2026_Kyuprüfungen.jpg',
  },
]

const DOWNLOADS = [
  {id: 'brandenburger-sommerlager', title: 'Brandenburger Sommerlager', category: 'Lehrgang', updatedAt: '2026-04-24', file: '2026_JKA_brandenburger_sommerlager.pdf'},
  {id: 'spring-camp-2026', title: 'Spring Camp 2026', category: 'Lehrgang', updatedAt: '2026-02-16', file: '2026_JKA_Springcamp_Ohta_info.pdf'},
  {id: 'jahresplanung-2026', title: 'Jahresplanung 2026', category: 'Allgemeine', updatedAt: '2025-11-23', file: '2026_Terminplanung.pdf'},
  {id: 'pruefungsordnung-kyupruefung', title: 'Prüfungsordnung / Kyuprüfung', category: 'Technisches', updatedAt: '2025-06-19', file: '2018_Pruefungsordnung_Kyupruefungen_JKA_Berlin.pdf'},
  {id: 'antrag-lizenzpruefungen', title: 'Antrag Lizenzprüfungen', category: 'Prüfungen', updatedAt: '2025-02-13', file: 'Antrag-Lizenzpruefungen.pdf'},
  {id: 'antrag-danpruefung', title: 'Antrag Danprüfung', category: 'Prüfungen', updatedAt: '2025-02-13', file: 'Antrag-Danpruefung.pdf'},
  {id: 'dojo-kun', title: 'Dojo Kun', category: 'Allgemeine', updatedAt: '2019-03-27', file: 'dojokun.pdf'},
  {id: 'jka-wettkampfordnung-aktuell', title: 'JKA Wettkampfordnung aktuell', category: 'Technisches', updatedAt: '2019-04-24', file: '2015_Tournament-Rules-Regulations.pdf'},
  {id: 'jka-wettkampfordnung-vor-2015', title: 'JKA Wettkampfordnung vor 2015', category: 'Technisches', updatedAt: '2019-03-27', file: '2015_tournament_rule_regulations.pdf'},
  {id: 'kata', title: 'Kata', category: 'Technisches', updatedAt: '2019-03-27', file: 'Kata.pdf'},
  {id: 'antrag-kyupruefungen', title: 'Antrag Kyuprüfungen', category: 'Prüfungen', updatedAt: '2019-03-27', file: 'Prüfungsbogen JKA Berlin.pdf'},
  {id: 'technical-manual-instructor', title: 'Technical Manual for the Instructor', category: 'Technisches', updatedAt: '2019-03-27', file: 'tech_manual_instructor.pdf'},
]

// ───── Slug-Helfer ───────────────────────────────────────────────────────
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// ───── Import-Logik ──────────────────────────────────────────────────────
async function shouldWrite(_id) {
  if (REPLACE) return true
  const existing = await client.fetch('*[_id == $id][0]._id', {id: _id})
  return !existing
}

async function writeDoc(doc) {
  if (REPLACE) {
    await client.createOrReplace(doc)
  } else {
    await client.createIfNotExists(doc)
  }
}

async function importNews() {
  console.log(`\n━━━ Aktuelles (${NEWS.length}) ━━━`)
  for (const n of NEWS) {
    const _id = `news-${n.slug}`
    if (!(await shouldWrite(_id))) {
      console.log(`  – ${n.title} (existiert bereits, übersprungen)`)
      continue
    }
    console.log(`  • ${n.title}`)
    const image = await uploadAsset('image', resolveImage(n.image))
    const pdf = await uploadAsset('file', resolvePdf(n.pdf))
    await writeDoc({
      _id,
      _type: 'news',
      title: n.title,
      slug: {_type: 'slug', current: n.slug},
      category: n.category,
      date: n.date,
      excerpt: n.excerpt,
      ...(image ? {image} : {}),
      ...(pdf ? {pdf} : {}),
    })
  }
}

async function importTermine() {
  console.log(`\n━━━ Termine (${TERMINE.length}) ━━━`)
  for (const t of TERMINE) {
    const key = `${t.startDate}-${slugify(t.title)}`
    const _id = `termin-${key}`
    if (!(await shouldWrite(_id))) {
      console.log(`  – ${t.startDate} ${t.title} (existiert bereits, übersprungen)`)
      continue
    }
    console.log(`  • ${t.startDate} ${t.title}`)
    const image = await uploadAsset('image', resolveImage(t.image))
    await writeDoc({
      _id,
      _type: 'termin',
      title: t.title,
      type: t.type,
      startDate: t.startDate,
      ...(t.endDate ? {endDate: t.endDate} : {}),
      ...(t.startTime ? {startTime: t.startTime} : {}),
      ...(t.endTime ? {endTime: t.endTime} : {}),
      ...(t.organizer ? {organizer: t.organizer} : {}),
      ...(t.organizerUrl ? {organizerUrl: t.organizerUrl} : {}),
      ...(t.location ? {location: t.location} : {}),
      ...(t.address ? {address: t.address} : {}),
      ...(image ? {image} : {}),
    })
  }
}

async function importDownloads() {
  console.log(`\n━━━ Downloads (${DOWNLOADS.length}) ━━━`)
  for (const d of DOWNLOADS) {
    const _id = `download-${d.id}`
    if (!(await shouldWrite(_id))) {
      console.log(`  – ${d.title} (existiert bereits, übersprungen)`)
      continue
    }
    console.log(`  • ${d.title}`)
    const file = await uploadAsset('file', resolvePdf(d.file))
    if (!file) {
      console.warn(`    ⚠ Datei nicht gefunden, überspringe Datensatz`)
      continue
    }
    await writeDoc({
      _id,
      _type: 'download',
      title: d.title,
      category: d.category,
      updatedAt: d.updatedAt,
      file,
    })
  }
}

// ───── Main ──────────────────────────────────────────────────────────────
console.log(`Sanity-Import → project=${projectId} dataset=${dataset} mode=${REPLACE ? 'REPLACE' : 'createIfNotExists'}`)
try {
  await importNews()
  await importTermine()
  await importDownloads()
  console.log('\n✓ Import abgeschlossen.')
} catch (err) {
  console.error('\n✗ Import fehlgeschlagen:', err.message || err)
  process.exit(1)
}
