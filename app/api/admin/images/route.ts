import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '../../../lib/admin/guard';
import { deleteUpload, listImages, sanitizeUploadName, saveUpload } from '../../../lib/content';

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i;

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(listImages());
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return jsonError('Body invalid (multipart expected).');
  }

  const files = form.getAll('files').filter((f): f is File => f instanceof File);
  if (files.length === 0) return jsonError('Niciun fișier primit.');

  const saved: { path: string; name: string; size: number }[] = [];
  const rejected: string[] = [];

  for (const file of files) {
    if (!ALLOWED_EXT.test(file.name)) {
      rejected.push(`${file.name}: tip fișier nu e permis`);
      continue;
    }
    if (file.size === 0 || file.size > MAX_BYTES) {
      rejected.push(`${file.name}: dimensiune invalidă (max 10MB)`);
      continue;
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const name = sanitizeUploadName(file.name);
    const webPath = saveUpload(name, bytes);
    saved.push({ path: webPath, name, size: file.size });
  }

  if (saved.length === 0 && rejected.length > 0) {
    return jsonError(rejected.join('; '), 422);
  }
  return NextResponse.json({ saved, rejected });
}

export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const path = new URL(req.url).searchParams.get('path') || '';
  if (!path.startsWith('/uploads/')) return jsonError('Se pot șterge doar fișierele din /uploads.');
  try {
    deleteUpload(path);
  } catch (e) {
    return jsonError(e instanceof Error ? e.message : 'Ștergere eșuată.');
  }
  return NextResponse.json({ ok: true });
}
