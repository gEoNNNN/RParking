import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '../../../lib/admin/guard';
import { isValidLocale, readMessages, writeMessages } from '../../../lib/content';

export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const locale = new URL(req.url).searchParams.get('locale') || '';
  if (!isValidLocale(locale)) return jsonError('Locale invalida.', 400);
  try {
    return NextResponse.json({ locale, messages: readMessages(locale) });
  } catch (e) {
    return jsonError(e instanceof Error ? e.message : 'Citire esuata.', 500);
  }
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { locale?: unknown; messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonError('Body invalid (nu e JSON).');
  }
  const locale = String(body.locale || '');
  if (!isValidLocale(locale)) return jsonError('Locale invalida.');
  if (body.messages === undefined) return jsonError('Lipsesc mesajele.');
  try {
    writeMessages(locale, body.messages);
  } catch (e) {
    return jsonError(e instanceof Error ? e.message : 'Eroare la salvare.', 422);
  }
  return NextResponse.json({ ok: true });
}
