// @ts-check
import cloudflare from '@astrojs/cloudflare';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL;
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const showJournal = process.env.PUBLIC_SHOW_JOURNAL === 'true';

export default defineConfig({
  site,
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  session: false,
  integrations: [
    ...(site
      ? [
          sitemap({
            filter: (page) => showJournal || !page.includes('/journal/'),
          }),
        ]
      : []),
    ...(projectId
      ? [
          sanity({
            projectId,
            dataset,
            apiVersion: '2026-09-29',
            useCdn: false,
          }),
        ]
      : []),
  ],
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
