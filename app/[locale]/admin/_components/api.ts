'use client';

async function handle<T>(r: Response): Promise<T> {
  if (r.status === 401) {
    window.location.href = '/admin/login';
    throw new Error('Neautentificat.');
  }
  if (!r.ok) {
    let msg = `${r.status} ${r.statusText}`;
    try {
      const body = await r.json();
      if (body?.error) msg = String(body.error);
    } catch {
      /* keep status text */
    }
    throw new Error(msg);
  }
  return (await r.json()) as T;
}

export function apiGet<T = unknown>(url: string): Promise<T> {
  return fetch(url, { cache: 'no-store' }).then((r) => handle<T>(r));
}

export function apiPut<T = unknown>(url: string, body: unknown): Promise<T> {
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => handle<T>(r));
}

export function apiPost<T = unknown>(url: string, body?: unknown): Promise<T> {
  return fetch(url, {
    method: 'POST',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  }).then((r) => handle<T>(r));
}

export function apiDelete<T = unknown>(url: string): Promise<T> {
  return fetch(url, { method: 'DELETE' }).then((r) => handle<T>(r));
}

export function slugify(input: string): string {
  return (input || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[șş]/g, 's')
    .replace(/[țţ]/g, 't')
    .replace(/[ăâ]/g, 'a')
    .replace(/[îıi̇]/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'item';
}

export function uniqueSlug(base: string, taken: Set<string>): string {
  let s = base;
  let n = 2;
  while (taken.has(s)) s = `${base}-${n++}`;
  return s;
}

// ─── deep path helpers over message trees ───
export type MsgTree = Record<string, unknown>;

export function getPath(obj: unknown, path: string[]): unknown {
  let cur: unknown = obj;
  for (const p of path) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

export function setPath(obj: MsgTree, path: string[], value: unknown): MsgTree {
  if (path.length === 0) return obj;
  const root = { ...obj };
  let cur: Record<string, unknown> = root;
  for (let i = 0; i < path.length - 1; i++) {
    const next = cur[path[i]];
    const clone: Record<string, unknown> =
      next != null && typeof next === 'object' ? { ...(next as MsgTree) } : {};
    cur[path[i]] = clone;
    cur = clone;
  }
  cur[path[path.length - 1]] = value;
  return root;
}

export function delPath(obj: MsgTree, path: string[]): MsgTree {
  if (path.length === 0) return obj;
  const root = { ...obj };
  let cur: Record<string, unknown> = root;
  for (let i = 0; i < path.length - 1; i++) {
    const next = cur[path[i]];
    if (next == null || typeof next !== 'object') return root;
    const clone: Record<string, unknown> = { ...(next as MsgTree) };
    cur[path[i]] = clone;
    cur = clone;
  }
  delete cur[path[path.length - 1]];
  return root;
}
