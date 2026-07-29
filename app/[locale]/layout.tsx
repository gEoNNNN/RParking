import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "../../i18n/routing";
import "../globals.css";
import ScrollAnimations from "../components/ScrollAnimations";
import Chatbot from "../components/Chatbot";
import { SITE_URL, SITE_NAME, COMPANY_NAME, SITE_PHONE, SITE_EMAIL, COMPANY_ADDRESS, DEFAULT_OG_IMAGE, GLOBAL_KEYWORDS } from "../lib/seo";

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
    default: "RParking – Sisteme de Parcare Automatizată în Moldova | Chișinău",
    template: "%s | RParking Moldova",
  },
  description:
    "Producător de sisteme inteligente de parcare în Republica Moldova. Bariere automate, control acces, terminal plată card/cash, ANPR, software BackOffice. Instalări în centre comerciale, business centre și complexe rezidențiale din Chișinău.",
  keywords: [
    ...GLOBAL_KEYWORDS,
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
    "parcare Chișinău",
    "software parcare",
    "automatizare parcare",
    "Entry Point parcare",
    "Exit Point parcare",
    "Pay Point parcare",
    "BackOffice parcare",
    "ANPR parcare",
    "parcare QR code",
    "parcare NFC",
    "RTi Systems Moldova",
    "sistem acces auto Chișinău",
    "parcare centru comercial Moldova",
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "ro": `${SITE_URL}/ro`,
      "ru": `${SITE_URL}/ru`,
      "en": `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ro_RO",
    alternateLocale: ["ru_RU", "en_US"],
    title: "RParking – Sisteme de Parcare Automatizată în Moldova",
    description:
      "Producător moldovean de sisteme inteligente de parcare. Control acces, bariere automate, plăți card/cash, monitorizare în timp real. Centre comerciale, business centre, complexe rezidențiale.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "RParking – Sistem inteligent de parcare automatizată Moldova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RParking – Sisteme de Parcare Automatizată în Moldova",
    description:
      "Producător moldovean de sisteme inteligente de parcare. Control acces, bariere automate, plăți automate, ANPR.",
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
      { url: "/img/tablogo.png", sizes: "any", type: "image/png" },
      { url: "/img/tablogo.png", sizes: "192x192", type: "image/png" },
      { url: "/img/tablogo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/img/tablogo.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/img/tablogo.png", type: "image/png" }],
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
      alternateName: [SITE_NAME, "RTi", "RParking Moldova", "RTi Systems Moldova"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/img/logo.png`,
        width: 210,
        height: 80,
        caption: SITE_NAME,
      },
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/homepage.bg.png`,
        width: 1200,
        height: 630,
      },
      description:
        "Producător moldovean de sisteme inteligente de parcare: echipamente hardware și software dezvoltate în Republica Moldova. Entry Point, Exit Point, Pay Point, bariere automate, BackOffice, RAccess WC, RChange.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MD",
        addressLocality: "Chișinău",
        addressRegion: "Chișinău",
        streetAddress: "Chișinău, Republica Moldova",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: SITE_PHONE,
          contactType: "sales",
          areaServed: "MD",
          availableLanguage: ["Romanian", "Russian", "English"],
        },
        {
          "@type": "ContactPoint",
          email: SITE_EMAIL,
          contactType: "customer support",
          availableLanguage: ["Romanian", "Russian"],
        },
      ],
      foundingLocation: {
        "@type": "Place",
        name: "Chișinău, Republica Moldova",
      },
      areaServed: [
        { "@type": "Country", name: "Moldova" },
      ],
      knowsAbout: [
        "Sisteme de parcare automate",
        "Control acces auto",
        "Bariere automate",
        "Terminale de plată",
        "Software management parcare",
        "ANPR",
      ],
      sameAs: [
        `${SITE_URL}`,
      ],
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#localbusiness`,
      name: COMPANY_NAME,
      alternateName: SITE_NAME,
      url: SITE_URL,
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      image: `${SITE_URL}/img/logo.png`,
      priceRange: "$$",
      currenciesAccepted: "MDL",
      paymentAccepted: "Cash, Card",
      description:
        "Producător și instalator de sisteme automate de parcare în Republica Moldova. Centre comerciale, business centre, complexe rezidențiale. Control acces, bariere automate, plăți cash și card, monitorizare în timp real.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chișinău",
        addressLocality: "Chișinău",
        addressRegion: "Chișinău",
        addressCountry: "MD",
        postalCode: "MD-2000",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.0105,
        longitude: 28.8638,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      areaServed: {
        "@type": "Country",
        name: "Moldova",
        sameAs: "https://www.wikidata.org/wiki/Q217",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Sisteme de parcare RParking",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Entry Point – Terminal intrare parcare" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Exit Point – Terminal ieșire parcare" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Pay Point – Terminal plată parcare" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "BackOffice – Software management parcare" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "RAccess WC – Control acces WC" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "RChange – Terminal schimb valutar" } },
        ],
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
