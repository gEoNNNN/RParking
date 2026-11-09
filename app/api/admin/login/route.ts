import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  createSessionToken,
  passwordMatches,
  registerFailedAttempt,
  resetAttempts,
  sessionCookieOptions,
  tooManyAttempts,
} from '../../../lib/admin/auth';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (tooManyAttempts(ip)) {
    return NextResponse.json({ error: 'Prea multe incercari. Asteapta 15 minute.' }, { status: 429 });
  }

  let password = '';
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    /* treat as empty */
  }

  if (!passwordMatches(password)) {
    registerFailedAttempt(ip);
    return NextResponse.json({ error: 'Parola gresita.' }, { status: 401 });
  }

  resetAttempts(ip);
  const res = NextResponse.json({ ok: true });
  // Mark the cookie Secure only when the request really runs over HTTPS.
  // Otherwise HTTP-only hosts would silently fail to store the session.
  const forwardedProto = (req.headers.get('x-forwarded-proto') || '')
    .split(',')[0]
    .trim()
    .toLowerCase();
  let https = forwardedProto === 'https';
  try {
    https = https || new URL(req.url).protocol === 'https:';
  } catch {
    /* keep the header-based value */
  }
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions(https));
  return res;
}
