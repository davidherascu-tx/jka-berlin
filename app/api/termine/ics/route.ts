import { NextResponse } from 'next/server';
import { getTermine } from '@/app/(site)/lib/termine';
import { buildIcsForTermine } from '@/app/(site)/lib/ics';

export const dynamic = 'force-dynamic';

export async function GET() {
  const events = await getTermine();
  const ics = buildIcsForTermine(events);

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="jka-berlin-termine.ics"',
    },
  });
}
