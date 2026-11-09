// Server-only admin authentication: HMAC-signed session cookie + a small
// in-memory login rate limiter.
//
// The admin password is embedded in the application (NOT read from an env file),
// so a repository-only deploy works out of the box. It is stored as a SHA-256
// hash, never in clear text, so nobody reading the repository can recover it.
//
// To change the built-in password:
//   1. pick the new password (single line, no spaces around it)
//   2. run:
//        node -e "console.log(require('crypto').createHash('sha256').update('PAROLA_NOUA').digest('hex'))"
//   3. replace BUILTIN_PASSWORD_SHA256 below with the printed hash
//   4. restart the server
//
// ADMIN_PASSWORD still works as an optional env override (if the host provides
// one), so the built-in value is only used when the env var is absent.
import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'rp_admin_session';
const SESSION_MAX_AGE_SEC = 7 * 24 * 60 * 60; // 7 days

// sha256("parc-admin-2026") - the built-in password, stored only as a hash.
const BUILTIN_PASSWORD_SHA256 =
  'e7f6b28cdcc61cbe52194ef38f08b17f022bba73ae6b32ac8d17d74c410c490d';

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

// Hex hash of the active password: env override if present, built-in otherwise.
export function adminPasswordHash(): string {
  const fromEnv = process.env.ADMIN_PASSWORD;
  return fromEnv ? sha256(fromEnv) : BUILTIN_PASSWORD_SHA256;
}

export function usingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD;
}

function secretBytes(): Buffer {
  const source = process.env.ADMIN_SECRET || adminPasswordHash();
  return crypto.createHash('sha256').update(source).digest();
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secretBytes()).update(payload).digest('hex');
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_MAX_AGE_SEC * 1000;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expected, 'utf8'))) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

export function sessionCookieOptions(secureOverride?: boolean): {
  httpOnly: true;
  sameSite: 'lax';
  path: '/';
  maxAge: number;
  secure: boolean;
} {
  const secure =
    secureOverride ??
    (process.env.NODE_ENV === 'production' && process.env.ADMIN_COOKIE_INSECURE !== '1');
  return {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
    secure,
  };
}

// ─── login rate limiting (per IP, in-memory) ───
type Bucket = { count: number; first: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

export function tooManyAttempts(key: string): boolean {
  const b = buckets.get(key);
  if (!b) return false;
  if (Date.now() - b.first > WINDOW_MS) {
    buckets.delete(key);
    return false;
  }
  return b.count >= MAX_ATTEMPTS;
}

export function registerFailedAttempt(key: string) {
  const b = buckets.get(key);
  if (!b || Date.now() - b.first > WINDOW_MS) buckets.set(key, { count: 1, first: Date.now() });
  else b.count += 1;
}

export function resetAttempts(key: string) {
  buckets.delete(key);
}

export function passwordMatches(candidate: string): boolean {
  const a = Buffer.from(sha256(candidate ?? ''), 'hex');
  const b = Buffer.from(adminPasswordHash(), 'hex');
  return crypto.timingSafeEqual(a, b);
}
