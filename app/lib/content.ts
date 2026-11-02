// Server-only content store: reads/writes the JSON files that back the site's
// structured data (products, cards, gallery) and the next-intl message files.
// The admin panel mutates these through /api/admin/*, then calls
// revalidateSite() so published pages regenerate with the new content.
// Never import this file from a client component.
import fs from 'node:fs';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import type {
  CatalogData,
  CollectionName,
  EcosystemData,
  GalleryData,
  Locale,
  RtiData,
  ShopData,
  SolDomainData,
} from './content-types';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'data', 'content');
const BACKUP_DIR = path.join(ROOT, 'data', 'backup');
const MESSAGES_DIR = path.join(ROOT, 'messages');

// ─── tiny mtime-based cache so hot fs reads stay cheap during SSR ───
const cache = new Map<string, { mtimeMs: number; data: unknown }>();

function readJsonCached<T>(file: string): T {
  const st = fs.statSync(file);
  const hit = cache.get(file);
  if (hit && hit.mtimeMs === st.mtimeMs) return hit.data as T;
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  cache.set(file, { mtimeMs: st.mtimeMs, data });
  return data;
}

function writeJsonAtomic(file: string, data: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n', 'utf8');
  fs.renameSync(tmp, file);
  try {
    cache.delete(file);
  } catch {
    /* noop */
  }
}

function backup(file: string) {
  if (!fs.existsSync(file)) return;
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const name = path.basename(file, '.json');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.copyFileSync(file, path.join(BACKUP_DIR, `${name}.${stamp}.json`));
  // keep the latest 40 backups per collection
  const siblings = fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.startsWith(`${name}.`) && f.endsWith('.json'))
    .sort();
  for (const old of siblings.slice(0, Math.max(0, siblings.length - 40))) {
    try {
      fs.unlinkSync(path.join(BACKUP_DIR, old));
    } catch {
      /* noop */
    }
  }
}

// ─── validators ───
const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === 'string';
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isBool = (v: unknown): v is boolean => typeof v === 'boolean';

function fail(what: string): never {
  throw new Error(`Invalid content: ${what}`);
}

function validateCollection(name: CollectionName, data: unknown): void {
  if (!isObj(data)) fail(`${name}: root must be an object`);
  const items = (data as { items?: unknown }).items;
  if (!Array.isArray(items)) fail(`${name}: "items" must be an array`);

  if (name === 'shop-products') {
    const d = data as ShopData;
    if (!isStr(d.waNumber)) fail('shop-products.waNumber must be a string');
    if (!Array.isArray(d.categories)) fail('shop-products.categories must be an array');
    for (const c of d.categories) {
      if (!isObj(c) || !isStr(c.key) || !isStr(c.icon)) fail('shop-products category shape');
    }
    const keys = new Set<string>();
    for (const it of d.items) {
      if (!isObj(it)) fail('shop-products item must be an object');
      const p = it as Record<string, unknown>;
      if (!isStr(p.key) || !p.key) fail('shop-products item needs a key');
      if (keys.has(p.key)) fail(`duplicate product key "${p.key}"`);
      keys.add(p.key);
      if (!isStr(p.category)) fail(`product ${p.key}: category`);
      if (p.type !== 'hardware' && p.type !== 'software') fail(`product ${p.key}: type`);
      if (!Array.isArray(p.usage) || !p.usage.every(isStr)) fail(`product ${p.key}: usage`);
      if (!isNum(p.price)) fail(`product ${p.key}: price must be a number`);
      if (!isBool(p.inStock)) fail(`product ${p.key}: inStock`);
      if (!isStr(p.image)) fail(`product ${p.key}: image`);
      if (!isBool(p.contain)) fail(`product ${p.key}: contain`);
      if (!(p.href === null || isStr(p.href))) fail(`product ${p.key}: href`);
      if (!isStr(p.icon)) fail(`product ${p.key}: icon`);
    }
  }

  if (name === 'ecosystem-cards') {
    for (const it of items) {
      const c = it as EcosystemData['items'][number];
      if (!isObj(c) || !isStr(c.title) || !isStr(c.descKey) || !isStr(c.link))
        fail('ecosystem-cards item shape');
      if (!(c.image === null || isStr(c.image)) || !isBool(c.isPhoto))
        fail('ecosystem-cards image/isPhoto');
    }
  }

  if (name === 'catalog-cards') {
    const keys = new Set<string>();
    for (const it of items) {
      const c = it as CatalogData['items'][number];
      if (!isObj(c) || !isStr(c.key) || !isStr(c.title) || !isStr(c.href) || !isStr(c.icon))
        fail('catalog-cards item shape');
      if (keys.has(c.key)) fail(`duplicate catalog card key "${c.key}"`);
      keys.add(c.key);
      if (!(c.image === null || isStr(c.image))) fail('catalog-cards image');
    }
  }

  if (name === 'rti-solutions') {
    for (const it of items) {
      const c = it as RtiData['items'][number];
      if (
        !isObj(c) || !isStr(c.title) || !isStr(c.descKey) || !isStr(c.image) || !isStr(c.href) ||
        !isNum(c.imageWidth) || !isNum(c.imageHeight)
      )
        fail('rti-solutions item shape');
    }
  }

  if (name === 'solutii-domains') {
    const keys = new Set<string>();
    for (const it of items) {
      const c = it as SolDomainData['items'][number];
      if (!isObj(c) || !isStr(c.key) || !isStr(c.image) || !isStr(c.icon))
        fail('solutii-domains item shape');
      if (keys.has(c.key)) fail(`duplicate domain key "${c.key}"`);
      keys.add(c.key);
    }
  }

  if (name === 'gallery') {
    for (const it of items) {
      if (!isStr(it) || !it) fail('gallery entries must be non-empty strings');
    }
  }
}

// ─── collections ───
export type CollectionDataMap = {
  'shop-products': ShopData;
  'ecosystem-cards': EcosystemData;
  'catalog-cards': CatalogData;
  'rti-solutions': RtiData;
  'solutii-domains': SolDomainData;
  'gallery': GalleryData;
};

export function readCollection<K extends CollectionName>(name: K): CollectionDataMap[K] {
  const file = path.join(CONTENT_DIR, `${name}.json`);
  return readJsonCached<CollectionDataMap[K]>(file);
}

export function writeCollection(name: CollectionName, data: unknown) {
  validateCollection(name, data);
  const file = path.join(CONTENT_DIR, `${name}.json`);
  backup(file);
  writeJsonAtomic(file, data);
  revalidateSite();
}

export function readAllCollections(): Record<CollectionName, unknown> {
  const names: CollectionName[] = [
    'shop-products',
    'ecosystem-cards',
    'catalog-cards',
    'rti-solutions',
    'solutii-domains',
    'gallery',
  ];
  const out: Record<string, unknown> = {};
  for (const n of names) out[n] = readCollection(n);
  return out as Record<CollectionName, unknown>;
}

// ─── messages (site texts, next-intl JSONs) ───
export function isValidLocale(locale: string): locale is Locale {
  return locale === 'ro' || locale === 'en' || locale === 'ru';
}

export function readMessages(locale: Locale): Record<string, unknown> {
  return readJsonCached(path.join(MESSAGES_DIR, `${locale}.json`));
}

function validateMessagesTree(obj: unknown, depth = 0, ctx = { size: 0 }): void {
  if (depth > 8) fail('messages tree too deep (max 8 levels)');
  if (Array.isArray(obj)) {
    for (const v of obj) validateMessagesTree(v, depth + 1, ctx);
    return;
  }
  if (isObj(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      if (k === '__proto__' || k === 'constructor') fail(`forbidden key "${k}"`);
      validateMessagesTree(v, depth + 1, ctx);
    }
    return;
  }
  if (isStr(obj)) {
    ctx.size += obj.length;
    if (obj.length > 60_000) fail('a single message exceeds 60k characters');
    return;
  }
  if (isNum(obj) || isBool(obj) || obj === null) return;
  fail(`unsupported message leaf type: ${typeof obj}`);
}

export function writeMessages(locale: Locale, messages: unknown) {
  if (!isObj(messages)) fail('messages root must be an object');
  const ctx = { size: 0 };
  validateMessagesTree(messages, 0, ctx);
  if (ctx.size > 4_000_000) fail('messages file too large (>4MB of text)');
  const file = path.join(MESSAGES_DIR, `${locale}.json`);
  backup(file);
  writeJsonAtomic(file, messages);
  revalidateSite();
}

// ─── image helpers (public/img is read-only, public/uploads is writable) ───
export const UPLOADS_DIR = path.join(ROOT, 'public', 'uploads');
const PUBLIC_DIR = path.join(ROOT, 'public');

function walkImages(sub: string): { path: string; size: number }[] {
  const out: { path: string; size: number }[] = [];
  const abs = path.join(PUBLIC_DIR, sub);
  if (!fs.existsSync(abs)) return out;
  const stack = [abs];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(entry.name)) {
        const webPath = `/${sub}/${path.relative(abs, full).split(path.sep).join('/')}`;
        out.push({ path: webPath, size: fs.statSync(full).size });
      }
    }
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

export function listImages() {
  return {
    uploads: walkImages('uploads'),
    assets: walkImages('img'),
  };
}

export function sanitizeUploadName(originalName: string): string {
  const extMatch = /\.([a-z0-9]+)$/i.exec(originalName);
  const ext = (extMatch?.[1] || 'png').toLowerCase().slice(0, 5);
  const stem = (originalName.replace(/\.[^.]+$/, '') || 'image')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 48) || 'image';
  const rand = Math.random().toString(36).slice(2, 6);
  return `${Date.now().toString(36)}-${rand}-${stem}.${ext}`;
}

export function saveUpload(fileName: string, bytes: Buffer) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  const target = path.join(UPLOADS_DIR, fileName);
  if (!target.startsWith(UPLOADS_DIR + path.sep)) fail('upload path escape');
  fs.writeFileSync(target, bytes);
  return `/uploads/${fileName}`;
}

export function deleteUpload(uploadedPath: string) {
  const rel = uploadedPath.replace(/^\/?uploads\/?/, '');
  const target = path.resolve(UPLOADS_DIR, rel);
  if (!target.startsWith(UPLOADS_DIR + path.sep)) fail('delete path escape');
  if (!fs.existsSync(target)) fail('file not found');
  fs.unlinkSync(target);
}

export function revalidateSite() {
  try {
    revalidatePath('/', 'layout');
  } catch (e) {
    console.error('[content] revalidate failed', e);
  }
}
