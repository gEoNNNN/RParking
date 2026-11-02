import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { readMessages } from '../app/lib/content';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Messages are read from ./messages/<locale>.json through the fs-backed
  // content store, so text edits saved in the admin panel go live after
  // revalidation instead of requiring a rebuild.
  return {
    locale,
    messages: readMessages(locale),
  };
});
