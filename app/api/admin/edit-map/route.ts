import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '../../../lib/admin/guard';
import { isValidLocale } from '../../../lib/content';
import { buildEditMap } from '../../../lib/admin/edit-map';

export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const locale = new URL(req.url).searchParams.get('locale') || '';
  if (!isValidLocale(locale)) return jsonError('Locale invalida.');
  return NextResponse.json(buildEditMap(locale));
}
