import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "../../i18n/routing";
import "../globals.css";
import ScrollAnimations from "../components/ScrollAnimations";
import Chatbot from "../components/Chatbot";
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
    "bariera parcare automata",
    "control acces parcare",
    "terminal plată parcare",
    "echipament parcare",
    "echipamente parcare automatizata",
    "statie intrare parcare",
    "statie iesire parcare",
    "tichete parcare automat",
    "sistem parcare Moldova",
    "parcare Chișinău",
    "echipamente parcare",
    "software parcare",
    "automatizare parcare",
    "Entry Point parcare",
    "Exit Point parcare",
    "Pay Point parcare",
    "BackOffice parcare",
    "ANPR parcare",
    "parcare QR code",
    "parcare NFC",
    "RParking",
    "RTi Systems",
    "RTi Systems Moldova",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/img/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/img/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/img/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.webmanifest",
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY_NAME,
      alternateName: [SITE_NAME, "RTi", "RParking Moldova"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/logo.png`,
        width: 210,
        height: 80,
      },
      image: `${SITE_URL}/img/homepage.bg.png`,
      description:
        "Producător de sisteme inteligente de parcare: echipamente hardware și software dezvoltate în Republica Moldova. Entry Point, Exit Point, Pay Point, bariere automate, BackOffice.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MD",
        addressLocality: "Chișinău",
        addressRegion: "Chișinău",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_PHONE,
        contactType: "sales",
        availableLanguage: ["Romanian", "Russian", "English"],
      },
      sameAs: [
        `${SITE_URL}`,
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: COMPANY_NAME,
      alternateName: SITE_NAME,
      url: SITE_URL,
      telephone: SITE_PHONE,
      image: `${SITE_URL}/img/logo.png`,
      priceRange: "$$",
      description:
        "Sisteme automate de parcare pentru centre comerciale, business centre și parcări rezidențiale. Control acces, bariere automate, plăți cash și card.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chișinău",
        addressLocality: "Chișinău",
        addressRegion: "Chișinău",
        addressCountry: "MD",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.0105,
        longitude: 28.8638,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      areaServed: {
        "@type": "Country",
        name: "Moldova",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Sistem complet de automatizare a parcărilor. Echipamente: Entry Point, Exit Point, Pay Point, bariere automate, BackOffice.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/ro/products?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["ro", "ru", "en"],
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <NextIntlClientProvider>
          <ScrollAnimations />
          {children}
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
