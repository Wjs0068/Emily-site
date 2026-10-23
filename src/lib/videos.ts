import type { ImageMetadata } from 'astro';

import type { VideoItemResult } from '@/lib/sanity/types';

export interface ShowcaseVideo extends Omit<VideoItemResult, 'poster'> {
  poster: Omit<VideoItemResult['poster'], 'url'> & { url: string | ImageMetadata };
}

export function isSafeMediaUrl(value: string | undefined): boolean {
  if (!value) return false;
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch {
    return false;
  }
}

// A single gate shared by the CMS loader and renderer. A permalink alone never
// grants native playback, and development samples cannot pass this gate.
export function isPublishableVideo(item: ShowcaseVideo): boolean {
  return (
    item.contentStatus === 'OWNER_APPROVED' &&
    item.publicationPermission === true &&
    item.websiteUsageRights === true &&
    Boolean(item.title?.trim() && item.description?.trim() && item.poster?.alt?.trim()) &&
    typeof item.poster?.url === 'string' &&
    isSafeMediaUrl(item.poster.url) &&
    item.poster.width > 0 &&
    item.poster.height > 0 &&
    typeof item.hasSpeech === 'boolean' &&
    isSafeMediaUrl(item.videoUrl) &&
    (!item.hasSpeech || (isSafeMediaUrl(item.captionsUrl) && Boolean(item.transcript?.trim())))
  );
}

export function instagramLink(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      ['instagram.com', 'www.instagram.com'].includes(url.hostname) &&
      /^\/reel\/[\w-]+\/?$/.test(url.pathname)
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
