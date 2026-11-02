'use client';

import { useEffect, useState } from 'react';
import { Icon, ICON_NAMES } from '../../../lib/icon-registry';
import { LuX } from 'react-icons/lu';

export const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition';

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs leading-snug text-gray-500">{hint}</span> : null}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type="text"
      className={inputClass}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      className={inputClass + ' leading-relaxed'}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
          checked ? 'bg-green-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}

export function CheckGroup({
  values,
  onChange,
  options,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((o) => {
        const on = values.includes(o.value);
        return (
          <label key={o.value} className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={on}
              onChange={() => onChange(on ? values.filter((v) => v !== o.value) : [...values, o.value])}
              className="h-4 w-4 rounded border-gray-300 accent-green-600"
            />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

export function Btn({
  children,
  onClick,
  kind = 'primary',
  disabled,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: 'primary' | 'ghost' | 'danger' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  const styles: Record<string, string> = {
    primary:
      'bg-green-600 text-white hover:bg-green-500 shadow-sm shadow-green-600/20 hover:shadow-md active:scale-[.98]',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:border-green-400 hover:text-green-700 active:scale-[.98]',
    ghost: 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 active:scale-[.98]',
    danger: 'border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 active:scale-[.98]',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${styles[kind]}`}
    >
      {children}
    </button>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4" onClick={onClose}>
      <div
        className={`w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[88vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-lg font-extrabold text-gray-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="Inchide">
            <LuX className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const names = ICON_NAMES.filter((n) => n.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700">
          <Icon name={value} className="w-5 h-5" />
        </span>
        <span className="flex-1 truncate font-mono text-xs text-gray-600">{value || '—'}</span>
        <Btn kind="outline" onClick={() => setOpen(true)}>
          Alege pictograma
        </Btn>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Alege pictograma" wide>
        <input
          className={inputClass + ' mb-3'}
          placeholder="Cauta (ex: Shield, Car, Ticket)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {names.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                onChange(n);
                setOpen(false);
              }}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-2.5 transition ${
                value === n
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 text-gray-600 hover:border-green-300 hover:bg-gray-50'
              }`}
            >
              <Icon name={n} className="w-5 h-5" />
              <span className="w-full truncate text-center font-mono text-[9px] leading-tight">{n}</span>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export function StatusLine({ status }: { status: { kind: 'idle' | 'saving' | 'saved' | 'error'; msg?: string } }) {
  if (status.kind === 'idle') return null;
  const map = {
    saving: { text: 'Se salveaza…', cls: 'text-gray-500 bg-gray-100 border-gray-200' },
    saved: { text: status.msg || 'Salvat. Site-ul se actualizeaza in cateva secunde.', cls: 'text-green-700 bg-green-50 border-green-200' },
    error: { text: status.msg || 'Eroare la salvare.', cls: 'text-red-700 bg-red-50 border-red-200' },
  } as const;
  const m = map[status.kind];
  return (
    <span className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold ${m.cls}`}>
      {m.text}
    </span>
  );
}

export function Skeleton({ lines = 6 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="h-10 rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}

export function confirmDanger(message: string): boolean {
  return window.confirm(message);
}
