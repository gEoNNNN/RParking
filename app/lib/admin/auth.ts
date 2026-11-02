// Server-only admin authentication: HMAC-signed session cookie + a small
// in-memory login rate limiter. The admin password lives in the ADMIN_PASSWORD
// env var (see .env.local). Change it before deploying.
import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'rp_admin_session';
const SESSION_MAX_AGE_SEC = 7 * 24 * 60 * 60; // 7 days
const DEFAULT_PASSWORD = 'parc-admin-2026';

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function usingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD === DEFAULT_PASSWORD;
}

function secretBytes(): Buffer {
  const s =
    process.env.ADMIN_SECRET ||
    crypto.createHash('sha256').update(`${adminPassword()}::rp-admin-v1`).digest('hex');
  return Buffer.from(s, 'hex');
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

export function sessionCookieOptions(): {
  httpOnly: true;
  sameSite: 'lax';
  path: '/';
  maxAge: number;
  secure: boolean;
} {
  return {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
    secure: process.env.NODE_ENV === 'production' && process.env.ADMIN_COOKIE_INSECURE !== '1',
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
  const a = crypto.createHash('sha256').update(candidate ?? '').digest();
  const b = crypto.createHash('sha256').update(adminPassword()).digest();
  return crypto.timingSafeEqual(a, b);
}
