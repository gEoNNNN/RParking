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
    return NextResponse.json({ error: 'Prea multe incercari.asteapta 15 minute.' }, { status: 429 });
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
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions());
  return res;
}
