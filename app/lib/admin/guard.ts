// Shared guard for admin API routes. Returns a 401/429-style response when the
// request is not authenticated, otherwise null.
import { NextResponse } from 'next/server';
import { isAdminRequest } from './auth';

export async function requireAdmin(): Promise<NextResponse | null> {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Neautentificat.' }, { status: 401 });
  }
  return null;
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
