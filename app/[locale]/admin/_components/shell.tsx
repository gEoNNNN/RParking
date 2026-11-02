'use client';

import { usePathname } from 'next/navigation';
import {
  LuLayoutDashboard, LuShoppingBag, LuLayers, LuType, LuImage,
  LuExternalLink, LuLogOut, LuShieldCheck,
} from 'react-icons/lu';

const NAV = [
  { href: '/admin', label: 'Panou', icon: LuLayoutDashboard },
  { href: '/admin/products', label: 'Produse', icon: LuShoppingBag },
  { href: '/admin/cards', label: 'Carduri & Galerie', icon: LuLayers },
  { href: '/admin/text', label: 'Text site', icon: LuType },
  { href: '/admin/images', label: 'Imagini', icon: LuImage },
];

function normalize(pathname: string): string {
  return pathname.replace(/^\/(ro|en|ru)(?=\/|$)/, '') || '/';
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = normalize(usePathname());

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => undefined);
    window.location.href = '/admin/login';
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
            <LuShieldCheck className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-gray-900">
              RParking <span className="text-green-600">Admin</span>
            </p>
            <p className="text-[10px] font-medium text-gray-500">panou de continut</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-green-700 transition"
            >
              <LuExternalLink className="h-3.5 w-3.5" />
              Vezi site-ul
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LuLogOut className="h-3.5 w-3.5" />
              Iesire
            </button>
          </div>
        </div>
        {/* Mobile / tablet nav */}
        <nav className="flex gap-1 overflow-x-auto border-t border-gray-100 px-2 py-1.5 lg:hidden">
          {NAV.map((n) => {
            const active = pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href));
            return (
              <a
                key={n.href}
                href={n.href}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  active ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-48 shrink-0 lg:block">
          <nav className="sticky top-20 space-y-1">
            {NAV.map((n) => {
              const active = pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href));
              return (
                <a
                  key={n.href}
                  href={n.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-bold transition ${
                    active
                      ? 'bg-green-600 text-white shadow-sm shadow-green-600/25'
                      : 'text-gray-600 hover:bg-white hover:text-green-700'
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </a>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 pb-24">{children}</main>
      </div>
    </div>
  );
}
