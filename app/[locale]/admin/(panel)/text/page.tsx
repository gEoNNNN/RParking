'use client';

import { useAdminData } from '../../_components/use-store';
import TextEditor from '../../_components/text-editor';
import { Skeleton } from '../../_components/ui';

export default function AdminTextPage() {
  const { store, error, setLocaleMessages } = useAdminData();

  if (error) {
    return <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>;
  }
  if (!store) return <Skeleton lines={8} />;

  return <TextEditor initial={store.messages} onSaved={setLocaleMessages} />;
}
