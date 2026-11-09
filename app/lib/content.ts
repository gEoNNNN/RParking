// Server-only content store.
//
// Layout (all paths are relative to the project root):
//   data/content/*.json      tracked SEED files (default content, shipped in git)
//   messages/*.json          tracked SEED files (default texts, shipped in git)
//   storage/content/*.json   LIVE content (written by the admin panel)
//   storage/messages/*.json  LIVE texts (written by the admin panel)
//   storage/backup/          automatic backups (last 40 per file)
//   public/uploads/          uploaded images
//
// Why two layers? The host may only receive the repository (no env file, no
// external volume). Writes go to ./storage, which is git-ignored, so a normal
// deploy (git pull / reset --hard) keeps every change made from the panel.
// On the very first read the live file is seeded from the tracked file, so an
// existing host keeps its current content when this layer is introduced.
//
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
// Optional override for unusual hosts; by default everything lives in ./storage.
const DATA_ROOT = process.env.RP_DATA_DIR
  ? path.resolve(process.env.RP_DATA_DIR)
  : path.join(ROOT, 'storage');

const LIVE_CONTENT_DIR = path.join(DATA_ROOT, 'content');
const LIVE_MESSAGES_DIR = path.join(DATA_ROOT, 'messages');
const BACKUP_DIR = path.join(DATA_ROOT, 'backup');

const SEED_CONTENT_DIR = path.join(ROOT, 'data', 'content');
const SEED_MESSAGES_DIR = path.join(ROOT, 'messages');

// ─── tiny mtime-based cache so hot fs reads stay cheap during SSR ───
const cache = new Map<string, { stamp: string; data: unknown }>();

function readJsonCached<T>(file: string): T {
  const st = fs.statSync(file);
  const stamp = `${st.mtimeMs}:${st.size}`;
  const hit = cache.get(file);
  if (hit && hit.stamp === stamp) return hit.data as T;
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  cache.set(file, { stamp, data });
  return data;
}

function writeJsonAtomic(file: string, data: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.${Math.random().toString(36).slice(2, 8)}.tmp`;
  const payload = JSON.stringify(data, null, 2) + '\n';
  // Write and fsync before the rename, so a crash cannot leave a half file.
  const fd = fs.openSync(tmp, 'w');
  try {
    fs.writeFileSync(fd, payload, 'utf8');
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
  fs.renameSync(tmp, file);
  // Read back: on read-only or overlay filesystems the write can silently fail.
  if (fs.readFileSync(file, 'utf8') !== payload) {
    throw new Error('Salvarea nu a putut fi confirmata pe disc.');
  }
  cache.delete(file);
}

// First run: copy the tracked seed into the live folder. This also migrates a
// host that already had content written into data/content or messages/.
function ensureLive(liveFile: string, seedFile: string): string {
  if (fs.existsSync(liveFile)) return liveFile;
  if (!fs.existsSync(seedFile)) {
    throw new Error(`Missing content file: ${path.relative(ROOT, seedFile)}`);
  }
  fs.mkdirSync(path.dirname(liveFile), { recursive: true });
  fs.copyFileSync(seedFile, liveFile);
  return liveFile;
}

function backup(file: string, fallbackSeed?: string) {
  const source = fs.existsSync(file) ? file : fallbackSeed;
  if (!source || !fs.existsSync(source)) return;
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const name = path.basename(file, '.json');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.copyFileSync(source, path.join(BACKUP_DIR, `${name}.${stamp}.json`));
  // keep the latest 40 backups per file
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

// Image references may be either a local path (/img/..., /uploads/...) or an
// absolute http(s) link. Anything else (javascript:, data:, empty) is rejected
// so a pasted link cannot inject a script URL into the pages.
export function isValidImageRef(value: unknown): value is string {
  if (!isStr(value)) return false;
  const s = value.trim();
  if (!s || s.length > 4096) return false;
  if (/^https?:\/\/[^\s]+$/i.test(s)) return true;
  if (s.startsWith('/')) return !s.startsWith('//');
  return false;
}

function imageRef(what: string, value: unknown, allowNull = false): void {
  if (allowNull && value === null) return;
  if (!isValidImageRef(value)) fail(`${what} (cale locala /img/... /uploads/... sau link http(s))`);
}

// Strip accidental whitespace around image references before validation/store.
function trimImageRefs(name: CollectionName, data: Record<string, unknown>): void {
  const items = data.items;
  if (!Array.isArray(items)) return;
  const trimAt = (obj: unknown, key: string) => {
    if (!isObj(obj)) return;
    const v = obj[key];
    if (typeof v === 'string') obj[key] = v.trim();
  };
  if (name === 'gallery') {
    for (let i = 0; i < items.length; i++) {
      if (typeof items[i] === 'string') items[i] = (items[i] as string).trim();
    }
    return;
  }
  for (const it of items) trimAt(it, 'image');
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
      imageRef(`product ${p.key}: image`, p.image);
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
      imageRef('ecosystem-cards image', c.image, true);
      if (!isBool(c.isPhoto)) fail('ecosystem-cards isPhoto');
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
      imageRef('catalog-cards image', c.image, true);
    }
  }

  if (name === 'rti-solutions') {
    for (const it of items) {
      const c = it as RtiData['items'][number];
      if (!isObj(c) || !isStr(c.title) || !isStr(c.descKey) || !isStr(c.href))
        fail('rti-solutions item shape');
      imageRef('rti-solutions image', c.image);
      if (!isNum(c.imageWidth) || !isNum(c.imageHeight)) fail('rti-solutions image size');
    }
  }

  if (name === 'solutii-domains') {
    const keys = new Set<string>();
    for (const it of items) {
      const c = it as SolDomainData['items'][number];
      if (!isObj(c) || !isStr(c.key) || !isStr(c.icon)) fail('solutii-domains item shape');
      if (keys.has(c.key)) fail(`duplicate domain key "${c.key}"`);
      keys.add(c.key);
      imageRef('solutii-domains image', c.image);
    }
  }

  if (name === 'gallery') {
    for (const it of items) {
      if (typeof it !== 'string' || !isValidImageRef(it)) {
        fail('gallery entries must be image paths or http(s) links');
      }
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

function liveContentFile(name: CollectionName): string {
  return path.join(LIVE_CONTENT_DIR, `${name}.json`);
}

export function readCollection<K extends CollectionName>(name: K): CollectionDataMap[K] {
  const file = ensureLive(liveContentFile(name), path.join(SEED_CONTENT_DIR, `${name}.json`));
  return readJsonCached<CollectionDataMap[K]>(file);
}

export function writeCollection(name: CollectionName, data: unknown) {
  if (!isObj(data)) fail(`${name}: root must be an object`);
  trimImageRefs(name, data);
  validateCollection(name, data);
  const file = liveContentFile(name);
  backup(file, path.join(SEED_CONTENT_DIR, `${name}.json`));
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

function liveMessagesFile(locale: Locale): string {
  return path.join(LIVE_MESSAGES_DIR, `${locale}.json`);
}

// Live texts win; keys that only exist in the tracked seed (new texts added by
// a deploy) are filled in so next-intl never reports a missing message.
function mergeMissing(live: unknown, seed: unknown): unknown {
  if (isObj(live) && isObj(seed)) {
    const out: Record<string, unknown> = { ...live };
    for (const [k, v] of Object.entries(seed)) {
      out[k] = k in out ? mergeMissing(out[k], v) : v;
    }
    return out;
  }
  return live === undefined ? seed : live;
}

export function readMessages(locale: Locale): Record<string, unknown> {
  const live = ensureLive(liveMessagesFile(locale), path.join(SEED_MESSAGES_DIR, `${locale}.json`));
  const data = readJsonCached<Record<string, unknown>>(live);
  const seed = readJsonCached<Record<string, unknown>>(
    path.join(SEED_MESSAGES_DIR, `${locale}.json`),
  );
  return mergeMissing(data, seed) as Record<string, unknown>;
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
  const file = liveMessagesFile(locale);
  backup(file, path.join(SEED_MESSAGES_DIR, `${locale}.json`));
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

// SVGs are served same-origin, so strip script-capable parts before writing.
export function sanitizeUploadBytes(fileName: string, bytes: Buffer): Buffer {
  if (!/\.svg$/i.test(fileName)) return bytes;
  const text = bytes
    .toString('utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|xlink:href)\s*=\s*("[^"]*"|'[^']*')/gi, (m) =>
      /javascript:/i.test(m) ? '' : m,
    );
  return Buffer.from(text, 'utf8');
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
    // The root layout covers every locale; the explicit locale paths are a
    // second safety net for cached ISR entries.
    revalidatePath('/', 'layout');
    for (const locale of ['ro', 'en', 'ru']) revalidatePath(`/${locale}`, 'layout');
  } catch (e) {
    console.error('[content] revalidate failed', e);
  }
}
