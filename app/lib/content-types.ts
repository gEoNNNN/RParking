// Shared content data types. Safe to import from both server and client code
// (no fs / next imports here).

export type ShopProduct = {
  key: string;
  category: string;
  type: 'hardware' | 'software';
  usage: string[]; // 'parking' | 'access' | 'payment'
  price: number;
  inStock: boolean;
  image: string;
  contain: boolean;
  href: string | null;
  icon: string;
};

export type ShopCategory = { key: string; icon: string };

export type ShopData = {
  waNumber: string;
  categories: ShopCategory[];
  items: ShopProduct[];
};

export type EcosystemCard = {
  title: string;
  descKey: string;
  link: string;
  image: string | null;
  isPhoto: boolean;
  cover?: boolean;
};

export type EcosystemData = { items: EcosystemCard[] };

export type CatalogCard = {
  key: string;
  title: string;
  href: string;
  image: string | null;
  icon: string;
};

export type CatalogData = { items: CatalogCard[] };

export type RtiCard = {
  title: string;
  descKey: string;
  image: string;
  href: string;
  imageWidth: number;
  imageHeight: number;
};

export type RtiData = { items: RtiCard[] };

export type SolDomain = {
  key: string;
  image: string;
  icon: string;
};

export type SolDomainData = { items: SolDomain[] };

export type GalleryData = { items: string[] };

export type CollectionName =
  | 'shop-products'
  | 'ecosystem-cards'
  | 'catalog-cards'
  | 'rti-solutions'
  | 'solutii-domains'
  | 'gallery';

export const LOCALES = ['ro', 'en', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];
