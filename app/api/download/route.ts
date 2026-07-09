import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

export async function POST(req: NextRequest) {
  const { id } = (await req.json()) as { id: string };
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const updated = await writeClient
    .patch(id)
    .setIfMissing({ downloadCount: 0 })
    .inc({ downloadCount: 1 })
    .commit<{ downloadCount: number }>();

  return NextResponse.json({ count: updated.downloadCount });
}
