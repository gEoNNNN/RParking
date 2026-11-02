import { NextResponse } from 'next/server';
import { isAdminRequest, usingDefaultPassword } from '../../../lib/admin/auth';

export async function GET() {
  return NextResponse.json({
    authenticated: await isAdminRequest(),
    usingDefaultPassword: usingDefaultPassword(),
  });
}
