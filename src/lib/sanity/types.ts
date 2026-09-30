export type ContentStatus = 'OWNER_APPROVED' | 'DEVELOPMENT_SAMPLE' | 'UNRESOLVED';

export interface SanityImageResult {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface SiteSettingsResult {
  contentStatus: ContentStatus;
  businessName: string;
  shortName: string;
  tagline: string;
  publicEmail?: string;
  publicPhone?: string;
  serviceAreas: Array<{ placeName: string; placeType: 'city' | 'region' | 'state' }>;
  socialLinks: Array<{ platform: string; url: string }>;
  bookingAvailability?: {
    contentStatus: ContentStatus;
    eyebrow: string;
    status: 'open' | 'limited' | 'waitlist' | 'closed';
    headline: string;
    detail?: string;
    years: number[];
    lastReviewedAt: string;
  };
  experienceStats: Array<{
    contentStatus: ContentStatus;
    value: string;
    label: string;
    lastReviewedAt?: string;
  }>;
  brandRecognition?: {
    contentStatus: ContentStatus;
    text: string;
  };
  previewLocation?: {
    contentStatus: ContentStatus;
    name: string;
    locality: string;
    region: string;
  };
  inquiryIntro?: string;
  responseTime?: string;
  investmentNote?: string;
}

export interface PackageResult {
  contentStatus: ContentStatus;
  name: string;
  slug: string;
  summary: string;
  startingPrice: number;
  price: string;
  currency: string;
  priceQualifier: string;
  partySize: string;
  features: string[];
  includesSecondArtist: boolean;
}

export interface AddonResult {
  contentStatus: ContentStatus;
  name: string;
  description: string;
  pricingType: 'fixed' | 'startingAt' | 'customQuote';
  price: string;
  numericPrice?: number;
  currency: string;
  displayQualifier?: string;
}

export interface TestimonialResult {
  contentStatus: ContentStatus;
  quote: string;
  clientName: string;
  venue?: string;
  location?: string;
  source?: string;
  sourceUrl?: string;
  publicationPermission: boolean;
  featured: boolean;
}

export interface GalleryItemResult {
  contentStatus: ContentStatus;
  image: SanityImageResult;
  caption?: string;
  styleCategory: string;
  venue?: string;
  location?: string;
  photographerName?: string;
  photographerUrl?: string;
  publicationPermission: boolean;
}

export interface FaqResult {
  contentStatus: ContentStatus;
  question: string;
  answer: string;
  category: 'booking' | 'services' | 'preview' | 'travel' | 'weddingDay';
  sortOrder: number;
  ownerDecisionKey?: string;
}

export interface BlogPostResult {
  contentStatus: ContentStatus;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  featuredImage: SanityImageResult;
  body: Array<
    | { type: 'heading'; level: 2 | 3; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'image'; image: SanityImageResult; alt: string; caption?: string }
  >;
  relatedSlugs: string[];
  isDevelopmentSample: false;
}
