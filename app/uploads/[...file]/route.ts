// Serve /uploads/* from disk at request time.
// Next.js caches the list of public/ files at startup, so a file uploaded by
// the admin panel after boot would 404 until a restart. This route bypasses
// that cache and also makes uploads independent from the build output.
import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { UPLOADS_DIR } from '../../lib/content';

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string[] }> },
) {
  const { file } = await params;
  const rel = (file || []).join('/');
  const target = path.resolve(UPLOADS_DIR, rel);
  // never escape the uploads folder
  if (!target.startsWith(UPLOADS_DIR + path.sep)) {
    return new NextResponse('Not found', { status: 404 });
  }
  let stat: fs.Stats;
  try {
    stat = fs.statSync(target);
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
  if (!stat.isFile()) return new NextResponse('Not found', { status: 404 });

  const bytes = fs.readFileSync(target);
  const ext = path.extname(target).toLowerCase();
  return new NextResponse(bytes, {
    headers: {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': String(stat.size),
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
