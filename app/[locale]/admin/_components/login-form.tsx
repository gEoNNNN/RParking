'use client';

import { useState } from 'react';
import { LuShieldCheck } from 'react-icons/lu';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const body = await r.json().catch(() => ({}));
      if (r.ok) {
        window.location.href = '/admin';
        return;
      }
      setError(body?.error || 'Conectare esuata.');
    } catch {
      setError('Eroare de retea.');
    } finally {
      setBusy(false);
      setPassword('');
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/25">
            <LuShieldCheck className="h-6 w-6" />
          </span>
          <h1 className="text-xl font-black text-gray-900">
            RParking <span className="text-green-600">Admin</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">Conectare la panoul de continut</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600" htmlFor="pw">
            Parola
          </label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Parola de admin"
            className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
          />
          {error ? (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={busy || !password}
            className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-green-600/25 transition hover:bg-green-500 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? 'Se conecteaza…' : 'Conectare'}
          </button>
          <p className="mt-4 text-center text-[11px] leading-snug text-gray-400">
            Parola este inclusa in aplicatie, nu in fisiere de configurare.
          </p>
        </form>
      </div>
    </main>
  );
}
