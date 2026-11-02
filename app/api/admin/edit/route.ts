// Targeted single-leaf editing used by the "editare directa pe site" layer:
// PATCH { file: "messages:ro" | "content:<colectie>", path: "items.2.title",
// value: "..." }. Only strings (and null image fields) can be changed here;
// anything structural (add/remove cards, numbers, prices) stays in /admin.
// Saving goes through the same writeMessages/writeCollection functions as the
// admin panel, so validation, backups and revalidation all apply.
import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '../../../lib/admin/guard';
import {
  isValidLocale,
  readCollection,
  readMessages,
  writeCollection,
  writeMessages,
} from '../../../lib/content';
import type { CollectionName, Locale } from '../../../lib/content-types';

const COLLECTIONS = new Set<CollectionName>([
  'shop-products',
  'ecosystem-cards',
  'catalog-cards',
  'rti-solutions',
  'solutii-domains',
  'gallery',
]);

const FORBIDDEN = new Set(['__proto__', 'constructor', 'prototype']);
// Identifier / structural fields inside content collections: patching them
// changes rendering keys or behaviour (e.g. items.<key> drives the message
// lookup on /products), and they are never visible page text, so the direct
// edit layer must never touch them. Visible/hidden split: title, name, desc,
// image, features... vs key, icon, category, href...
const DENIED_FIELDS = new Set(['key', 'icon', 'descKey', 'waNumber', 'category', 'type', 'href', 'link']);
const isIndex = (seg: string) => /^(0|[1-9]\d*)$/.test(seg);

class EditError extends Error {}

type Target = {
  container: Record<string, unknown> | unknown[];
  key: string | number;
  current: unknown;
};

function stepInto(cur: unknown, seg: string): unknown {
  const next = Array.isArray(cur)
    ? cur[Number(seg)]
    : (cur as Record<string, unknown>)?.[seg];
  if (next === undefined) throw new EditError(`Cale inexistenta: "${seg}".`);
  return next;
}

function resolveTarget(root: unknown, path: string): Target {
  const segs = path.split('.').filter(Boolean);
  if (segs.length === 0 || segs.length > 12) throw new EditError('Cale invalida.');
  for (const s of segs) {
    if (!/^[A-Za-z0-9_$-]+$/.test(s) || FORBIDDEN.has(s.toLowerCase())) {
      throw new EditError(`Segment de cale invalid: "${s}".`);
    }
  }
  let cur: unknown = root;
  for (let i = 0; i < segs.length - 1; i++) cur = stepInto(cur, segs[i]);

  const last = segs[segs.length - 1];
  if (isIndex(last)) {
    if (!Array.isArray(cur) || Number(last) >= cur.length) {
      throw new EditError('Index inexistent.');
    }
    const idx = Number(last);
    return { container: cur, key: idx, current: cur[idx] };
  }
  if (!cur || Array.isArray(cur) || typeof cur !== 'object') {
    throw new EditError('Cale inexistenta.');
  }
  const obj = cur as Record<string, unknown>;
  if (!(last in obj)) throw new EditError(`Cheie inexistenta: "${last}".`);
  return { container: obj, key: last, current: obj[last] };
}

function setLeaf(t: Target, value: string) {
  if (Array.isArray(t.container)) {
    (t.container as unknown[])[t.key as number] = value;
  } else {
    (t.container as Record<string, unknown>)[t.key as string] = value;
  }
}

export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { file?: unknown; path?: unknown; value?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonError('Body invalid (nu e JSON).');
  }

  const file = String(body.file || '');
  const path = String(body.path || '');
  const value = body.value;

  if (typeof value !== 'string') {
    return jsonError(
      'Valoarea trebuie sa fie text. (Numerele, preturile si structurile se editeaza din panoul /admin.)',
    );
  }
  if (value.length > 60_000) return jsonError('Text prea lung (max 60k caractere).');

  try {
    if (file.startsWith('messages:')) {
      const locale = file.slice('messages:'.length);
      if (!isValidLocale(locale)) return jsonError('Locale invalida.');
      const data = readMessages(locale as Locale);
      const t = resolveTarget(data, path);
      if (typeof t.current !== 'string') {
        throw new EditError('Aici pot fi editate doar valori text.');
      }
      setLeaf(t, value);
      writeMessages(locale as Locale, data);
    } else if (file.startsWith('content:')) {
      const name = file.slice('content:'.length) as CollectionName;
      if (!COLLECTIONS.has(name)) return jsonError('Colectie necunoscuta.');
      const lastField = path.split('.').filter(Boolean).pop() || '';
      if (DENIED_FIELDS.has(lastField)) {
        return jsonError(
          `Campul "${lastField}" este un identificator intern si nu poate fi editat aici; foloseste panoul /admin.`,
        );
      }
      const data = readCollection(name);
      const t = resolveTarget(data, path);
      if (typeof t.current !== 'string' && t.current !== null) {
        throw new EditError('Aici pot fi editate doar texte si imagini.');
      }
      setLeaf(t, value);
      writeCollection(name, data);
    } else {
      return jsonError('Fisier necunoscut.');
    }
  } catch (e) {
    return jsonError(
      e instanceof Error ? e.message : 'Eroare la salvare.', 
      e instanceof EditError ? 400 : 422,
    );
  }
  return NextResponse.json({ ok: true });
}
