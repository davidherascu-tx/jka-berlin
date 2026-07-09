import { NextResponse } from 'next/server';
import { getTerminById } from '@/app/(site)/lib/termine';
import { buildIcsForTermin } from '@/app/(site)/lib/ics';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = await getTerminById(id);

  if (!event) {
    return NextResponse.json({ error: 'Termin nicht gefunden' }, { status: 404 });
  }

  const ics = buildIcsForTermin(event);
  const filename = `${event.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.ics`;

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
