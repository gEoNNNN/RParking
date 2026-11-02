import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, verifySessionToken } from '../../../lib/admin/auth';
import AdminShell from '../_components/shell';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin – RParking',
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  if (!verifySessionToken(store.get(ADMIN_COOKIE)?.value)) {
    redirect('/admin/login');
  }
  return <AdminShell>{children}</AdminShell>;
}
