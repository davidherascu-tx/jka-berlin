import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// TODO: Replace with Sanity CMS mutation once integrated
const countsPath = join(process.cwd(), 'data', 'download-counts.json');

function readCounts(): Record<string, number> {
  try {
    return JSON.parse(readFileSync(countsPath, 'utf-8'));
  } catch {
    return {};
  }
}

function writeCounts(counts: Record<string, number>): void {
  try {
    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(countsPath, JSON.stringify(counts, null, 2), 'utf-8');
  } catch {
    // Filesystem writes fail on serverless — will be replaced by Sanity
  }
}

export async function GET() {
  return NextResponse.json(readCounts());
}

export async function POST(req: NextRequest) {
  const { id } = (await req.json()) as { id: string };
  const counts = readCounts();
  counts[id] = (counts[id] ?? 0) + 1;
  writeCounts(counts);
  return NextResponse.json({ count: counts[id] });
}
