import type { APIRoute } from 'astro';

import { publicEnv } from '@/lib/env';

export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /'];

  if (publicEnv.PUBLIC_SHOW_JOURNAL !== 'true') {
    lines.push('Disallow: /journal/');
  }
  if (publicEnv.PUBLIC_SITE_URL) {
    lines.push(`Sitemap: ${new URL('/sitemap-index.xml', publicEnv.PUBLIC_SITE_URL).toString()}`);
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
