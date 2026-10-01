import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  LuCookie,
  LuHouse,
  LuChevronRight,
  LuFileText,
  LuCheck,
  LuCalendar,
  LuScale,
  LuTag,
  LuArrowRight,
} from 'react-icons/lu';
import { cookiePolicyData } from '../../lib/cookie-policy-data';
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
    ? 'Politica Cookie-uri – RParking | Plasma RTI SRL'
    : isRu
    ? 'Политика использования cookie – RParking | Plasma RTI SRL'
    : 'Cookie Policy – RParking | Plasma RTI SRL';

  const description = isRo
    ? 'Politica privind cookie-urile și tehnologiile similare utilizate pe www.rparking.md de către S.R.L. Plasma RTI, conform Legii nr. 195/2024.'
    : isRu
    ? 'Политика использования файлов cookie и аналогичных технологий на www.rparking.md компанией S.R.L. Plasma RTI в соответствии с Законом № 195/2024.'
    : 'Policy on cookies and similar technologies used on www.rparking.md by S.R.L. Plasma RTI, in accordance with Law no. 195/2024.';

  return {
    title,
    description,
    alternates: {
      canonical: '/politica-cookies',
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/politica-cookies`,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'RParking Cookie Policy',
        },
      ],
    },
  };
}

export default async function PoliticaCookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const currentLocale = (locale === 'ru' || locale === 'en' ? locale : 'ro') as 'ro' | 'ru' | 'en';
  const data = cookiePolicyData[currentLocale] || cookiePolicyData.ro;

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
              <LuCookie className="w-4 h-4 text-green-600" />
              {data.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {data.documentTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <LuTag className="w-4 h-4 text-gray-400" />
                <span>
                  {data.versionLabel}{' '}
                  <strong className="text-gray-900 font-semibold">{data.versionNumber}</strong> —{' '}
                  <strong className="text-gray-900 font-semibold">{data.versionDate}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuCalendar className="w-4 h-4 text-gray-400" />
                <span>
                  {data.effectiveLabel}:{' '}
                  <strong className="text-gray-900 font-semibold">{data.effectiveDate}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuScale className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">Legea nr. 195/2024</span>
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
                        {s.title}
                      </a>
                    ))}
                  </nav>

                  {/* Related policy link */}
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <Link
                      href={data.relatedPolicyHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800 hover:underline"
                    >
                      {data.relatedPolicyLabel}
                      <LuArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Main Document Body */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 shadow-xs space-y-12 text-gray-700 leading-relaxed">
                {data.sections.map((section) => (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 border-b border-gray-100 pb-10 last:border-0 last:pb-0"
                  >
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-green-50 text-green-700 font-bold text-sm shrink-0">
                        {section.number}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{section.title}</h2>
                    </div>

                    {section.paragraphs?.map((p, idx) => (
                      <p key={idx} className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base last:mb-0">
                        {p}
                      </p>
                    ))}

                    {/* Cookie Categories grid */}
                    {section.categories && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                        {section.categories.map((c) => (
                          <div
                            key={c.name}
                            className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-green-200 transition-colors"
                          >
                            <h3 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                              <LuCookie className="w-4 h-4 text-green-600" />
                              {c.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cookie Inventory table */}
                    {section.inventory && (
                      <div className="my-2 rounded-xl border border-gray-200 overflow-hidden text-sm">
                        {section.inventory.map((row, i) => (
                          <div
                            key={i}
                            className={`grid sm:grid-cols-[160px_1fr] ${
                              i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                            }`}
                          >
                            <div className="px-4 py-3 font-semibold text-gray-900 border-b border-gray-100 sm:border-r">
                              {row.label}
                            </div>
                            <div className="px-4 py-3 text-gray-600 border-b border-gray-100 last:border-0">
                              {row.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Generic list items */}
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
