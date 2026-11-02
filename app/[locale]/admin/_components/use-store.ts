'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiGet } from './api';
import type { MsgTree } from './api';
import type { CollectionName, Locale } from '../../../lib/content-types';

export type AdminStore = {
  collections: Record<string, unknown>;
  messages: Record<Locale, MsgTree>;
  loading: boolean;
  error: string;
};

/** Loads every content collection + all three message trees once. */
export function useAdminData(): {
  store: AdminStore | null;
  error: string;
  setCollection: (name: CollectionName, data: unknown) => void;
  setLocaleMessages: (locale: Locale, tree: MsgTree) => void;
  reload: () => void;
} {
  const [store, setStore] = useState<AdminStore | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    Promise.all([
      apiGet<{ collections: Record<string, unknown> }>('/api/admin/content'),
      apiGet<{ messages: MsgTree }>('/api/admin/messages?locale=ro'),
      apiGet<{ messages: MsgTree }>('/api/admin/messages?locale=en'),
      apiGet<{ messages: MsgTree }>('/api/admin/messages?locale=ru'),
    ])
      .then(([content, ro, en, ru]) => {
        setStore({
          collections: content.collections,
          messages: { ro: ro.messages, en: en.messages, ru: ru.messages },
          loading: false,
          error: '',
        });
        setError('');
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Incarcare esuata.'));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setCollection = useCallback((name: CollectionName, data: unknown) => {
    setStore((s) => (s ? { ...s, collections: { ...s.collections, [name]: data } } : s));
  }, []);

  const setLocaleMessages = useCallback((locale: Locale, tree: MsgTree) => {
    setStore((s) => (s ? { ...s, messages: { ...s.messages, [locale]: tree } } : s));
  }, []);

  return { store, error: error || store?.error || '', setCollection, setLocaleMessages, reload: load };
}
