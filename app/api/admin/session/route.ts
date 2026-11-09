import { NextResponse } from 'next/server';
import path from 'node:path';
import os from 'node:os';
import { isAdminRequest, usingDefaultPassword } from '../../../lib/admin/auth';

export async function GET() {
  const authed = await isAdminRequest();
  const dataRoot = process.env.RP_DATA_DIR || path.join(process.cwd(), 'storage');
  return NextResponse.json({
    authenticated: authed,
    usingDefaultPassword: usingDefaultPassword(),
    ...(authed
      ? {
          storage: {
            cwd: process.cwd(),
            dataRoot,
            pid: process.pid,
            hostname: os.hostname(),
          },
        }
      : {}),
  });
}
