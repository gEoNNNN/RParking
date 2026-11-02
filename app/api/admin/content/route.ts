import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '../../../lib/admin/guard';
import { readAllCollections, writeCollection } from '../../../lib/content';
import type { CollectionName } from '../../../lib/content-types';

const NAMES: CollectionName[] = [
  'shop-products',
  'ecosystem-cards',
  'catalog-cards',
  'rti-solutions',
  'solutii-domains',
  'gallery',
];

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json({ collections: readAllCollections() });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { collection?: unknown; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonError('Body invalid (nu e JSON).');
  }
  const collection = body.collection as CollectionName;
  if (!NAMES.includes(collection)) return jsonError('Colecție necunoscută.');
  try {
    writeCollection(collection, body.data);
  } catch (e) {
    return jsonError(e instanceof Error ? e.message : 'Eroare la salvare.', 422);
  }
  return NextResponse.json({ ok: true });
}
