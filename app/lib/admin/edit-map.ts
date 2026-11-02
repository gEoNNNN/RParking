// Server-only helper for the "editare directa pe site" layer (SiteEditLayer).
// Flattens every editable string leaf (site texts + card/product data) into a
// { file -> [{ path, value }] } map so the browser overlay can match a clicked
// DOM element (by its text or image URL) back to the exact JSON path it came
// from. Never import this from a client component.
import { listImages, readAllCollections, readMessages } from '../content';
import type { Locale } from '../content-types';

export type FlatLeaf = { path: string; value: string };

export function flattenStrings(node: unknown, prefix = '', out: FlatLeaf[] = []): FlatLeaf[] {
  if (Array.isArray(node)) {
    node.forEach((v, i) => flattenStrings(v, `${prefix}.${i}`, out));
    return out;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      flattenStrings(v, prefix ? `${prefix}.${k}` : k, out);
    }
    return out;
  }
  if (typeof node === 'string' && node.length > 0) {
    out.push({ path: prefix, value: node });
  }
  return out;
}

export function buildEditMap(locale: Locale) {
  const files: Record<string, FlatLeaf[]> = {
    [`messages:${locale}`]: flattenStrings(readMessages(locale)),
  };
  const collections = readAllCollections() as Record<string, unknown>;
  for (const [name, data] of Object.entries(collections)) {
    files[`content:${name}`] = flattenStrings(data);
  }
  return { files, images: listImages() };
}
