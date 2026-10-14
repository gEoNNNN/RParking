'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import {
  LuCookie,
  LuShieldCheck,
  LuFileText,
  LuSettings2,
  LuCheck,
  LuChevronDown,
  LuChevronUp,
} from 'react-icons/lu';

const STORAGE_KEY = 'rparking_cookie_consent_v1_1';
const POLICY_VERSION = '1.1';

interface ConsentPreferences {
  version: string;
  timestamp: string;
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsentBanner() {
  const t = useTranslations('CookieBanner');
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true,
    preferences: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      } else {
        const parsed: ConsentPreferences = JSON.parse(saved);
        if (parsed.version !== POLICY_VERSION) {
          setVisible(true);
        } else {
          setPrefs({
            necessary: true,
            preferences: Boolean(parsed.preferences),
            analytics: Boolean(parsed.analytics),
            marketing: Boolean(parsed.marketing),
          });
        }
      }
    } catch {
      setVisible(true);
    }

    const handleOpenSettings = () => {
      setVisible(true);
      setShowCustomize(true);
    };

    window.addEventListener('open-cookie-consent', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-consent', handleOpenSettings);
  }, []);

  const saveConsent = (selected: {
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => {
    const payload: ConsentPreferences = {
      version: POLICY_VERSION,
      timestamp: new Date().toISOString(),
      necessary: true,
      preferences: selected.preferences,
      analytics: selected.analytics,
      marketing: selected.marketing,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors in restricted environments
    }
    setPrefs({
      necessary: true,
      ...selected,
    });
    setVisible(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      preferences: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleNecessaryOnly = () => {
    saveConsent({
      preferences: false,
      analytics: false,
      marketing: false,
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      preferences: prefs.preferences,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
    });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('title')}
      className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-5 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto bg-white/98 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-5 sm:p-6 pointer-events-auto transition-all duration-300">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold uppercase tracking-wider">
              <LuCookie className="w-3.5 h-3.5 text-green-600" />
              {t('badge')} • v{POLICY_VERSION}
            </div>

            <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
              {t('title')}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t.rich('description', {
                privacy: (chunks) => (
                  <Link
                    href="/politica-de-confidentialitate"
                    className="text-green-700 font-semibold underline hover:text-green-800"
                  >
                    {chunks}
                  </Link>
                ),
                cookies: (chunks) => (
                  <Link
                    href="/politica-cookies"
                    className="text-green-700 font-semibold underline hover:text-green-800"
                  >
                    {chunks}
                  </Link>
                ),
                terms: (chunks) => (
                  <Link
                    href="/politica-de-confidentialitate"
                    className="text-green-700 font-semibold underline hover:text-green-800"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>

            {/* Quick Legal Links */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-gray-500">
              <Link
                href="/politica-de-confidentialitate"
                className="inline-flex items-center gap-1 hover:text-green-600 transition-colors"
              >
                <LuShieldCheck className="w-3.5 h-3.5 text-green-600" />
                {t('privacyLink')}
              </Link>
              <Link
                href="/politica-cookies"
                className="inline-flex items-center gap-1 hover:text-green-600 transition-colors"
              >
                <LuCookie className="w-3.5 h-3.5 text-green-600" />
                {t('cookieLink')}
              </Link>
              <Link
                href="/politica-de-confidentialitate"
                className="inline-flex items-center gap-1 hover:text-green-600 transition-colors"
              >
                <LuFileText className="w-3.5 h-3.5 text-green-600" />
                {t('termsLink')}
              </Link>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap sm:flex-nowrap lg:flex-col xl:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowCustomize((prev) => !prev)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <LuSettings2 className="w-4 h-4 text-gray-600" />
              <span>{showCustomize ? t('hideCustomize') : t('customize')}</span>
              {showCustomize ? (
                <LuChevronUp className="w-3.5 h-3.5" />
              ) : (
                <LuChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNecessaryOnly}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {t('necessaryOnly')}
            </button>

            <button
              type="button"
              onClick={handleAcceptAll}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-green-600/25 transition-all cursor-pointer"
            >
              <LuCheck className="w-4 h-4" />
              {t('acceptAll')}
            </button>
          </div>
        </div>

        {/* Expandable Category Customization */}
        {showCustomize && (
          <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Necessary (Always Active) */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">
                      {t('categories.necessary.title')}
                    </span>
                    <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
                      {t('alwaysActive')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {t('categories.necessary.desc')}
                  </p>
                </div>
              </div>

              {/* Preferences */}
              <label className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-green-200 transition-colors cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">
                      {t('categories.preferences.title')}
                    </span>
                    <input
                      type="checkbox"
                      checked={prefs.preferences}
                      onChange={(e) =>
                        setPrefs((p) => ({ ...p, preferences: e.target.checked }))
                      }
                      className="w-4 h-4 accent-green-600 rounded cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {t('categories.preferences.desc')}
                  </p>
                </div>
              </label>

              {/* Analytics */}
              <label className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-green-200 transition-colors cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">
                      {t('categories.analytics.title')}
                    </span>
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={(e) =>
                        setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                      }
                      className="w-4 h-4 accent-green-600 rounded cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {t('categories.analytics.desc')}
                  </p>
                </div>
              </label>

              {/* Marketing */}
              <label className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-green-200 transition-colors cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">
                      {t('categories.marketing.title')}
                    </span>
                    <input
                      type="checkbox"
                      checked={prefs.marketing}
                      onChange={(e) =>
                        setPrefs((p) => ({ ...p, marketing: e.target.checked }))
                      }
                      className="w-4 h-4 accent-green-600 rounded cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {t('categories.marketing.desc')}
                  </p>
                </div>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <LuCheck className="w-4 h-4" />
                {t('savePreferences')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
