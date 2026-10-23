import type { ImageMetadata } from 'astro';

import looseUpdo from '@/assets/derived/08-caley-wedding-cropped.jpg';
import waves from '@/assets/refresh/blonde-waves.webp';
import field from '@/assets/refresh/bride-in-field.webp';
import turning from '@/assets/refresh/bride-turning.webp';
import monochrome from '@/assets/refresh/textured-hair-monochrome.webp';
import reception from '@/assets/refresh/textured-hair-reception.webp';
import horseback from '@/assets/refresh/wedding-on-horseback.webp';
import finishing from '@/assets/source/02-branding-3944.jpg';
import party from '@/assets/source/03-img-1190.jpg';
import halfUp from '@/assets/source/04-bride-015a0371.jpg';
import curls from '@/assets/source/05-lauren.jpeg';
import type { GalleryItemResult } from '@/lib/sanity/types';

export interface GalleryImage {
  image: ImageMetadata | string;
  alt: string;
  styleCategory: string;
  width?: number;
  height?: number;
  position?: string;
  caption?: string;
  photographerName?: string;
  photographerUrl?: string;
  featured?: boolean;
  compact?: boolean;
  homeOrder?: number;
  homeScale?: number;
  homePosition?: string;
}

// Local review selection; never substitutes for approved production Sanity records.
// All six owner-supplied files remain untouched in the repository root.
export const localGallery: GalleryImage[] = [
  {
    image: monochrome,
    alt: 'Textured cascading bridal hair with pearl accents, photographed from behind in black and white',
    styleCategory: 'Romantic texture',
    featured: true,
    position: '60% 42%',
    homeOrder: 1,
    homeScale: 1.08,
    homePosition: '60% 34%',
  },
  {
    image: waves,
    alt: 'Long blonde waves down the back of a bride holding out her lace dress',
    styleCategory: 'Soft waves',
    featured: true,
    compact: true,
    position: '50% 42%',
    homeOrder: 4,
    homeScale: 1.35,
    homePosition: '50% 52%',
  },
  {
    image: halfUp,
    alt: 'Bride wearing long half-up curls beside her partner outdoors',
    styleCategory: 'Romantic half-up',
    position: '52% 30%',
  },
  {
    image: turning,
    alt: 'Bride turning outdoors with softly pinned hair and loose lengths',
    styleCategory: 'A wedding-day moment',
    compact: true,
    position: '54% 42%',
    featured: true,
    homeOrder: 5,
  },
  {
    image: looseUpdo,
    alt: 'Bride wearing a loose updo and holding a bouquet outdoors',
    styleCategory: 'Loose updo',
    featured: true,
    position: '50% 28%',
    homeOrder: 2,
    homeScale: 1.3,
    homePosition: '50% 28%',
  },
  {
    image: horseback,
    alt: 'Bride with loose blonde waves seated on a horse beside her partner',
    styleCategory: 'Wedding portraits',
    compact: true,
  },
  {
    image: reception,
    alt: 'Rear view of textured bridal hair with decorative accents during an outdoor reception',
    styleCategory: 'Textured lengths',
    position: '46% 40%',
  },
  {
    image: curls,
    alt: 'Bride turning to show long, softly curled hair',
    styleCategory: 'Loose curls',
    featured: true,
    compact: true,
    position: '50% 38%',
    homeOrder: 3,
    homeScale: 1.1,
    homePosition: '38% 48%',
  },
  {
    image: field,
    alt: 'Bride with long blonde waves turning in an open field',
    styleCategory: 'Wedding portraits',
    compact: true,
  },
  {
    image: party,
    alt: 'Bride and wedding party gathered outdoors beneath tall trees',
    styleCategory: 'Bridal party',
    featured: true,
    position: '50% 66%',
    homeOrder: 6,
  },
  {
    image: finishing,
    alt: "Emily applying finishing spray to a client's textured updo",
    styleCategory: 'Behind the style',
    compact: true,
    position: '50% 48%',
  },
];

const categoryLabels: Record<string, string> = {
  updo: 'Updos',
  halfUp: 'Half-up',
  down: 'Waves & curls',
  short: 'Short hair',
  other: 'Bridal hair',
};

export function galleryImages(items: GalleryItemResult[]): GalleryImage[] {
  if (items.length === 0) return localGallery;
  return items.map((item) => ({
    image: item.image.url,
    width: item.image.width,
    height: item.image.height,
    alt: item.image.alt,
    position: item.image.hotspot
      ? `${item.image.hotspot.x * 100}% ${item.image.hotspot.y * 100}%`
      : undefined,
    styleCategory: categoryLabels[item.styleCategory] || item.styleCategory,
    caption: item.caption,
    photographerName: item.photographerName,
    photographerUrl: item.photographerUrl,
    featured: item.featured,
    compact: item.image.width < 800,
  }));
}

export function homeGallery(items: GalleryImage[]): GalleryImage[] {
  const featured = items.filter((item) => item.featured);
  return [...(featured.length ? featured : items)]
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0))
    .slice(0, 6);
}
