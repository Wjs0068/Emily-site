import { createClient } from '@sanity/client';

import {
  addons as fallbackAddons,
  faqCategories as fallbackFaqCategories,
  journalPosts as fallbackBlogPosts,
  packages as fallbackPackages,
  testimonials as fallbackTestimonials,
} from '@/lib/content';
import { isProductionContent, publicEnv } from '@/lib/env';

import { sanityQueries } from './queries';
import type {
  AddonResult,
  BlogPostResult,
  FaqResult,
  GalleryItemResult,
  PackageResult,
  SiteSettingsResult,
  TestimonialResult,
} from './types';

const client = publicEnv.PUBLIC_SANITY_PROJECT_ID
  ? createClient({
      projectId: publicEnv.PUBLIC_SANITY_PROJECT_ID,
      dataset: publicEnv.PUBLIC_SANITY_DATASET,
      apiVersion: '2026-09-29',
      useCdn: false,
    })
  : undefined;

async function fetchRequired<T>(label: string, query: string): Promise<T> {
  if (!client) {
    throw new Error(`${label} requires PUBLIC_SANITY_PROJECT_ID in production content mode.`);
  }

  const value = await client.fetch<T>(query);
  if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
    throw new Error(`Production content validation failed: no owner-approved ${label} found.`);
  }
  return value;
}

export async function getSiteSettings(): Promise<SiteSettingsResult | undefined> {
  if (isProductionContent) {
    const settings = await fetchRequired<SiteSettingsResult>(
      'site settings',
      sanityQueries.siteSettings,
    );
    const missing = [
      !settings.businessName && 'businessName',
      !settings.publicEmail && 'publicEmail',
      !settings.bookingAvailability && 'bookingAvailability',
      !settings.responseTime && 'responseTime',
      !settings.investmentNote && 'investmentNote',
      settings.serviceAreas.length === 0 && 'serviceAreas',
    ].filter(Boolean);
    if (missing.length > 0) {
      throw new Error(`Production site settings are incomplete: ${missing.join(', ')}.`);
    }
    return settings;
  }
  if (client) return client.fetch<SiteSettingsResult | undefined>(sanityQueries.siteSettings);
  return undefined;
}

export async function getPackages(): Promise<PackageResult[]> {
  const formatPackages = (items: Array<Omit<PackageResult, 'price'>>) =>
    items.map((item) => ({
      ...item,
      price: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: item.currency,
        maximumFractionDigits: 0,
      }).format(item.startingPrice),
    }));
  if (isProductionContent) {
    return formatPackages(await fetchRequired('packages', sanityQueries.packages));
  }
  if (client) {
    return formatPackages(
      await client.fetch<Array<Omit<PackageResult, 'price'>>>(sanityQueries.packages),
    );
  }
  return fallbackPackages.map((item) => ({
    ...item,
    contentStatus: 'UNRESOLVED',
    slug: item.name
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    startingPrice: Number(item.price.replaceAll(/[^0-9]/g, '')),
    currency: 'USD',
    priceQualifier: 'Starting at',
    features: [...item.features],
    includesSecondArtist: item.features.some((feature) => feature === 'Second artist included'),
  }));
}

export async function getAddons(): Promise<AddonResult[]> {
  const formatAddons = (
    items: Array<Omit<AddonResult, 'price'> & { price?: number }>,
  ): AddonResult[] =>
    items.map((item) => ({
      ...item,
      numericPrice: item.price,
      price:
        item.pricingType === 'customQuote'
          ? item.displayQualifier || 'Custom quote'
          : new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: item.currency,
              maximumFractionDigits: 0,
            }).format(item.price || 0),
    }));
  if (isProductionContent) {
    return formatAddons(await fetchRequired('add-ons', sanityQueries.addons));
  }
  if (client) {
    return formatAddons(
      await client.fetch<Array<Omit<AddonResult, 'price'> & { price?: number }>>(
        sanityQueries.addons,
      ),
    );
  }
  return fallbackAddons.map((item) => ({
    ...item,
    contentStatus: 'UNRESOLVED',
    pricingType: item.price === 'Custom quote' ? 'customQuote' : 'fixed',
    numericPrice:
      item.price === 'Custom quote' ? undefined : Number(item.price.replaceAll(/[^0-9]/g, '')),
    currency: 'USD',
    displayQualifier: item.price,
  }));
}

export async function getTestimonials(): Promise<TestimonialResult[]> {
  if (isProductionContent)
    return fetchRequired('approved testimonials', sanityQueries.testimonials);
  if (client) return client.fetch<TestimonialResult[]>(sanityQueries.testimonials);
  return fallbackTestimonials.map((item) => ({
    ...item,
    contentStatus: 'UNRESOLVED',
    publicationPermission: false,
  }));
}

export async function getGalleryItems(): Promise<GalleryItemResult[]> {
  if (isProductionContent) return fetchRequired('gallery items', sanityQueries.galleryItems);
  if (client) return client.fetch<GalleryItemResult[]>(sanityQueries.galleryItems);
  return [];
}

export async function getFaqs(): Promise<FaqResult[]> {
  if (isProductionContent) return fetchRequired('FAQ entries', sanityQueries.faq);
  if (client) return client.fetch<FaqResult[]>(sanityQueries.faq);
  const categoryKeys = ['booking', 'services', 'preview', 'travel', 'weddingDay'] as const;
  return fallbackFaqCategories.flatMap((category, categoryIndex) =>
    category.items.map((item, itemIndex) => ({
      contentStatus: item.needsOwnerConfirmation
        ? ('UNRESOLVED' as const)
        : ('DEVELOPMENT_SAMPLE' as const),
      question: item.question,
      answer: item.answer,
      category: categoryKeys[categoryIndex],
      sortOrder: categoryIndex * 100 + itemIndex,
    })),
  );
}

export async function getBlogPosts(): Promise<
  Array<BlogPostResult | (typeof fallbackBlogPosts)[number]>
> {
  if (isProductionContent) {
    if (publicEnv.PUBLIC_SHOW_JOURNAL !== 'true') return [];
    return fetchRequired('journal posts', sanityQueries.blogPosts);
  }
  if (client) return client.fetch<BlogPostResult[]>(sanityQueries.blogPosts);
  return fallbackBlogPosts;
}
