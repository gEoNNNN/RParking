import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "../../i18n/routing";
import "../globals.css";
import ScrollAnimations from "../components/ScrollAnimations";
import { SITE_URL, SITE_NAME, COMPANY_NAME, SITE_PHONE, DEFAULT_OG_IMAGE } from "../lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const OG_LOCALES: Record<string, string> = {
  ro: "ro_RO",
  ru: "ru_RU",
  en: "en_US",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RParking – Sistem inteligent de parcare automatizată | Moldova",
    template: "%s | RParking",
  },
  description:
    "Sistem complet de automatizare a parcărilor dezvoltat în Republica Moldova: control acces, bariere automate, plăți cash și card, monitorizare în timp real. Hardware și software propriu RTi.",
  keywords: [
    "sistem parcare",
    "parcare automatizată",
    "parcare inteligentă",
    "management parcare",
    "bariere automate parcare",
    "control acces parcare",
    "terminal plată parcare",
    "sistem parcare Moldova",
    "parcare Chișinău",
    "echipamente parcare",
    "software parcare",
    "RParking",
    "RTi Systems",
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "RParking – Sistem inteligent de parcare automatizată",
    description:
      "Soluție completă pentru parcări moderne: control acces, plăți automate, monitorizare în timp real. Dezvoltat și produs în Republica Moldova.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "RParking – Sistem inteligent de parcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RParking – Sistem inteligent de parcare automatizată",
    description:
      "Soluție completă pentru parcări moderne: control acces, plăți automate, monitorizare în timp real.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/img/logo.png", sizes: "any", type: "image/png" }],
    apple: [{ url: "/img/logo.png", sizes: "180x180", type: "image/png" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  description:
    "Producător de sisteme inteligente de parcare: hardware și software dezvoltate în Republica Moldova.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MD",
    addressLocality: "Chișinău",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_PHONE,
    contactType: "sales",
    availableLanguage: ["Romanian", "Russian", "English"],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${inter.variable} antialiased`}
    >
      <body className={`min-h-screen ${inter.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...organizationSchema, inLanguage: OG_LOCALES[locale] ?? "ro_RO" }) }}
        />
        <NextIntlClientProvider>
          <ScrollAnimations />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
