import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuShieldCheck,
  LuHouse,
  LuChevronRight,
  LuBuilding2,
  LuMail,
  LuPhone,
  LuFileText,
  LuCheck,
  LuExternalLink,
  LuCalendar,
  LuScale,
} from 'react-icons/lu';
import { privacyData } from '../../lib/privacy-policy-data';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../../lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRo = locale === 'ro';
  const isRu = locale === 'ru';

  const title = isRo
    ? 'Politica de Securitate și Confidențialitate – RParking | Plasma RTI SRL'
    : isRu
    ? 'Политика безопасности и конфиденциальности – RParking | Plasma RTI SRL'
    : 'Security and Privacy Policy – RParking | Plasma RTI SRL';

  const description = isRo
    ? 'Politica de securitate privind prelucrarea datelor cu caracter personal a S.R.L. Plasma RTI conform Legii nr. 195/2024 și GDPR.'
    : isRu
    ? 'Политика безопасности в отношении обработки персональных данных S.R.L. Plasma RTI в соответствии с Законом № 195/2024 и GDPR.'
    : 'Security policy regarding personal data processing by S.R.L. Plasma RTI in compliance with Law no. 195/2024 and GDPR.';

  return {
    title,
    description,
    alternates: {
      canonical: '/politica-de-confidentialitate',
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/politica-de-confidentialitate`,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'RParking Privacy Policy',
        },
      ],
    },
  };
}

export default async function PoliticaConfidentialitatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const currentLocale = (locale === 'ru' || locale === 'en' ? locale : 'ro') as 'ro' | 'ru' | 'en';
  const data = privacyData[currentLocale] || privacyData.ro;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        {/* Top bar + Navbar */}
        <div className="relative bg-white border-b border-gray-100">
          <Navbar />
          <Link
            href="/"
            className="absolute top-0 left-1/2 -translate-x-[38%] lg:left-20 lg:translate-x-0 z-50 h-20 flex items-center"
          >
            <Image
              src="/img/logo.png"
              alt="RTi Parking Logo"
              width={210}
              height={80}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Header Hero */}
        <section className="bg-white border-b border-gray-200/80 pt-28 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-green-600 transition-colors">
                <LuHouse className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <LuChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900">{data.documentTitle}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <LuShieldCheck className="w-4 h-4 text-green-600" />
              {data.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-3">
              {data.documentTitle}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium mb-6">
              {data.documentSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <LuCalendar className="w-4 h-4 text-gray-400" />
                <span>
                  {data.lastUpdatedLabel}:{' '}
                  <strong className="text-gray-900 font-semibold">{data.lastUpdatedDate}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuBuilding2 className="w-4 h-4 text-gray-400" />
                <span>
                  Operator: <strong className="text-gray-900 font-semibold">{data.operatorInfo.name}</strong> (IDNO{' '}
                  {data.operatorInfo.idno})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuScale className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">Legea nr. 195/2024 & GDPR</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Sidebar TOC */}
              <aside className="lg:col-span-4 sticky top-24 hidden lg:block">
                <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                    <LuFileText className="w-4 h-4 text-green-600" />
                    {data.tocTitle}
                  </h3>
                  <nav className="space-y-1.5 max-h-[calc(100vh-160px)] overflow-y-auto pr-1 text-xs">
                    {data.sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="block py-1.5 px-2.5 rounded-lg text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors leading-snug"
                      >
                        <span className="font-semibold text-gray-900 mr-1.5">{s.number}.</span>
                        {s.title.replace(/^\d+\.\s*/, '')}
                      </a>
                    ))}
                  </nav>

                  {/* DPO Quick Box in Sidebar */}
                  <div className="mt-6 pt-5 border-t border-gray-100 text-xs">
                    <p className="font-bold text-gray-900 mb-2">Responsabil Protecția Datelor (DPO)</p>
                    <p className="text-gray-600 mb-1">{data.operatorInfo.dpoName}</p>
                    <a
                      href={`mailto:${data.operatorInfo.dpoEmail}`}
                      className="text-green-600 hover:underline flex items-center gap-1 mb-1 font-medium"
                    >
                      <LuMail className="w-3.5 h-3.5" />
                      {data.operatorInfo.dpoEmail}
                    </a>
                    <a
                      href={`tel:${data.operatorInfo.dpoPhone.replace(/\s+/g, '')}`}
                      className="text-gray-600 hover:text-green-600 flex items-center gap-1 font-medium"
                    >
                      <LuPhone className="w-3.5 h-3.5" />
                      {data.operatorInfo.dpoPhone}
                    </a>
                  </div>
                </div>
              </aside>

              {/* Main Document Body */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-12 text-gray-700 leading-relaxed">
                {data.sections.map((section) => (
                  <article key={section.id} id={section.id} className="scroll-mt-28 border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-green-50 text-green-700 font-bold text-sm shrink-0">
                        {section.number}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>

                    {section.paragraphs?.map((p, idx) => (
                      <p key={idx} className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                        {p}
                      </p>
                    ))}

                    {/* Operator Details Box */}
                    {section.specialContent === 'operator' && (
                      <div className="my-6 p-5 rounded-xl bg-gray-50 border border-gray-200 text-sm">
                        <p className="font-bold text-gray-900 mb-3">Operatorul de date cu caracter personal:</p>
                        <div className="space-y-2 text-gray-700">
                          <p>
                            <strong className="text-gray-900">Entitatea din Republica Moldova:</strong>{' '}
                            {data.operatorInfo.name} (IDNO: {data.operatorInfo.idno})
                          </p>
                          <p>
                            <strong className="text-gray-900">Adresă:</strong> {data.operatorInfo.address}
                          </p>
                          <p>
                            <strong className="text-gray-900">Întrebări / exercitarea drepturilor:</strong>{' '}
                            <a href={`mailto:${data.operatorInfo.email}`} className="text-green-600 hover:underline font-semibold">
                              {data.operatorInfo.email}
                            </a>
                          </p>
                          <p>
                            <strong className="text-gray-900">Reprezentant desemnat:</strong> {data.operatorInfo.representative}
                          </p>
                          <p>
                            <strong className="text-gray-900">Responsabil protecția datelor (DPO):</strong>{' '}
                            {data.operatorInfo.dpoName} | e-mail:{' '}
                            <a href={`mailto:${data.operatorInfo.dpoEmail}`} className="text-green-600 hover:underline font-semibold">
                              {data.operatorInfo.dpoEmail}
                            </a>{' '}
                            | telefon:{' '}
                            <a href={`tel:${data.operatorInfo.dpoPhone.replace(/\s+/g, '')}`} className="text-gray-900 font-semibold hover:text-green-600">
                              {data.operatorInfo.dpoPhone}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Subsections (e.g. 4.1, 4.2...) */}
                    {section.subsections && (
                      <div className="grid grid-cols-1 gap-4 my-6">
                        {section.subsections.map((sub) => (
                          <div key={sub.id} className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/80 hover:border-green-200 transition-colors">
                            <h3 className="font-bold text-gray-900 text-sm mb-2">{sub.title}</h3>
                            {sub.categories && (
                              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                                <span className="font-semibold text-gray-700">Categorii de date:</span> {sub.categories}
                              </p>
                            )}
                            {sub.basis && (
                              <p className="text-xs sm:text-sm text-gray-600">
                                <span className="font-semibold text-gray-700">Temei juridic:</span>{' '}
                                <span className="text-green-700 font-medium">{sub.basis}</span>
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* List Items */}
                    {section.listItems && (
                      <ul className="space-y-3 my-4">
                        {section.listItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-600">
                            <span className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0 mt-0.5">
                              <LuCheck className="w-3 h-3 text-green-600" />
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Authority Box */}
                    {section.specialContent === 'authority' && (
                      <div className="my-6 p-5 rounded-xl bg-green-50/40 border border-green-200 text-sm">
                        <p className="font-bold text-gray-900 mb-2">{data.authorityInfo.country}:</p>
                        <p className="font-semibold text-green-800 text-base mb-1">{data.authorityInfo.name}</p>
                        <p className="text-gray-700 mb-1">Adresă: {data.authorityInfo.address}</p>
                        <p className="text-gray-700 mb-1">
                          E-mail:{' '}
                          <a href={`mailto:${data.authorityInfo.email}`} className="text-green-700 hover:underline font-semibold">
                            {data.authorityInfo.email}
                          </a>
                        </p>
                        <p className="text-gray-700 flex items-center gap-1">
                          Website:{' '}
                          <a
                            href={`https://${data.authorityInfo.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-700 hover:underline font-semibold inline-flex items-center gap-1"
                          >
                            {data.authorityInfo.website} <LuExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </p>
                      </div>
                    )}

                    {/* Footer Note */}
                    {section.footerNote && (
                      <p className="mt-4 p-3.5 rounded-lg bg-gray-50 text-xs sm:text-sm text-gray-500 italic border-l-2 border-green-500">
                        {section.footerNote}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
