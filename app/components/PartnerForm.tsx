'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LuArrowRight, LuShieldCheck, LuChevronDown } from 'react-icons/lu';

const WA_NUMBER = '37369116121';

type PartnerType = 'installer' | 'distributor' | 'integrator' | 'international';

export default function PartnerForm() {
  const t = useTranslations('PartnersPage');
  const [form, setForm] = useState({
    company: '',
    contact: '',
    phone: '',
    email: '',
    type: '' as '' | PartnerType,
    location: '',
    about: '',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      t('form.waIntro'),
      '',
      `${t('form.waCompany')}: ${form.company}`,
      `${t('form.waContact')}: ${form.contact}`,
      `${t('form.waPhone')}: ${form.phone}`,
      `${t('form.waEmail')}: ${form.email}`,
      `${t('form.waType')}: ${form.type ? t(`types.${form.type}.title`) : '-'}`,
      `${t('form.waLocation')}: ${form.location}`,
    ];
    if (form.about.trim()) lines.push(`${t('form.waAbout')}: ${form.about}`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  };

  const inputClass =
    'w-full rounded-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
      <h3 className="text-gray-900 font-extrabold text-xl mb-1.5">{t('formTitle')}</h3>
      <p className="text-gray-500 text-sm mb-6">{t('formDesc')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('form.company')}</label>
          <input required value={form.company} onChange={set('company')} placeholder={t('form.companyPh')} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('form.contact')}</label>
          <input required value={form.contact} onChange={set('contact')} placeholder={t('form.contactPh')} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('form.phone')}</label>
          <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="+373 60 123 456" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('form.email')}</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder={t('form.emailPh')} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('form.type')}</label>
          <div className="relative">
            <select required value={form.type} onChange={set('type')} className={`${inputClass} appearance-none ${form.type === '' ? 'text-gray-400' : ''}`}>
              <option value="" disabled>{t('form.typePh')}</option>
              <option value="installer">{t('types.installer.title')}</option>
              <option value="distributor">{t('types.distributor.title')}</option>
              <option value="integrator">{t('types.integrator.title')}</option>
              <option value="international">{t('types.international.title')}</option>
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('form.location')}</label>
          <input required value={form.location} onChange={set('location')} placeholder={t('form.locationPh')} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('form.about')}</label>
          <textarea rows={4} value={form.about} onChange={set('about')} placeholder={t('form.aboutPh')} className={`${inputClass} resize-none`} />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3.5 rounded-md transition-all duration-200 text-sm shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-600/40 hover:scale-[1.01] active:scale-95"
      >
        {t('form.submit')} <LuArrowRight className="w-4 h-4" />
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-gray-400 text-xs text-center">
        <LuShieldCheck className="w-3.5 h-3.5 shrink-0" />
        {t('form.privacy')}
      </p>
    </form>
  );
}
