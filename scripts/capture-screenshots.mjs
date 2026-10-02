import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { chromium } from 'playwright';

const baseUrl = process.env.SCREENSHOT_BASE_URL ?? 'http://localhost:4321';
const outputDirectory = resolve('screenshots');
const captures = [
  {
    route: '/',
    width: 1440,
    height: 900,
    name: 'home-desktop-sticky-1440.png',
    scrollSelector: '#trust-signals',
    fullPage: false,
  },
  {
    route: '/',
    width: 390,
    height: 844,
    name: 'home-mobile-sticky-390.png',
    scrollSelector: '#trust-signals',
    fullPage: false,
  },
  {
    route: '/about/',
    width: 1440,
    height: 900,
    name: 'about-desktop-sticky-1440.png',
    scrollSelector: '#story',
    fullPage: false,
  },
  { route: '/privacy/', width: 1440, height: 900, name: 'privacy-desktop-1440.png' },
  { route: '/privacy/', width: 390, height: 844, name: 'privacy-mobile-390.png' },
  { route: '/', width: 1440, height: 900, name: 'home-hero-desktop-1440.png', fullPage: false },
  { route: '/', width: 390, height: 844, name: 'home-hero-mobile-390.png', fullPage: false },
  {
    route: '/services/',
    width: 1440,
    height: 900,
    name: 'services-hero-desktop-1440.png',
    fullPage: false,
  },
  {
    route: '/services/',
    width: 390,
    height: 844,
    name: 'services-hero-mobile-390.png',
    fullPage: false,
  },
  { route: '/', width: 390, height: 844, name: 'home-mobile-390.png' },
  { route: '/', width: 768, height: 1024, name: 'home-tablet-768.png' },
  { route: '/', width: 1440, height: 900, name: 'home-desktop-1440.png' },
  { route: '/services/', width: 390, height: 844, name: 'services-mobile-390.png' },
  { route: '/services/', width: 1440, height: 900, name: 'services-desktop-1440.png' },
  { route: '/about/', width: 390, height: 844, name: 'about-mobile-390.png' },
  { route: '/about/', width: 1440, height: 900, name: 'about-desktop-1440.png' },
  { route: '/portfolio/', width: 390, height: 844, name: 'portfolio-mobile-390.png' },
  { route: '/portfolio/', width: 1440, height: 900, name: 'portfolio-desktop-1440.png' },
  { route: '/faq/', width: 390, height: 844, name: 'faq-mobile-390.png' },
  { route: '/faq/', width: 1440, height: 900, name: 'faq-desktop-1440.png' },
  { route: '/journal/', width: 390, height: 844, name: 'journal-mobile-390.png' },
  { route: '/journal/', width: 1440, height: 900, name: 'journal-desktop-1440.png' },
  {
    route: '/inquire/',
    width: 390,
    height: 844,
    name: 'inquire-mobile-390.png',
    scrollSelector: '#wedding-inquiry',
    fullPage: false,
  },
  {
    route: '/inquire/',
    width: 1440,
    height: 900,
    name: 'inquire-desktop-1440.png',
    scrollSelector: '#wedding-inquiry',
    fullPage: false,
  },
  {
    route: '/journal/planning-a-calm-wedding-morning/',
    width: 1440,
    height: 900,
    name: 'journal-article-desktop-1440.png',
  },
];
const requestedNames = new Set(
  (process.env.SCREENSHOT_NAMES ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean),
);
const selectedCaptures =
  requestedNames.size > 0
    ? captures.filter((capture) => requestedNames.has(capture.name))
    : captures;

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch();

try {
  for (const capture of selectedCaptures) {
    const context = await browser.newContext({
      viewport: { width: capture.width, height: capture.height },
    });
    const page = await context.newPage();

    await page.goto(new URL(capture.route, baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
    if (capture.route === '/inquire/') {
      const configuredFormUrl = await page
        .locator('[data-inquiry-provider]')
        .getAttribute('data-form-url');
      if (configuredFormUrl) {
        await page
          .frameLocator('iframe[title="Wedding hair inquiry form"]')
          .getByText('Full name', { exact: false })
          .waitFor({ timeout: 60_000 });
      }
    }
    const images = page.locator('img');
    for (let index = 0; index < (await images.count()); index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(
        (element) =>
          new Promise((resolveImage, rejectImage) => {
            if (element.complete && element.naturalWidth > 0) {
              resolveImage();
              return;
            }
            element.addEventListener('load', resolveImage, { once: true });
            element.addEventListener('error', rejectImage, { once: true });
          }),
      );
      await image.screenshot();
    }
    if (capture.scrollSelector) {
      await page.locator(capture.scrollSelector).evaluate((element) => {
        globalThis.scrollTo(0, globalThis.scrollY + element.getBoundingClientRect().top);
      });
    } else {
      await page.evaluate((scrollY) => scrollTo(0, scrollY), capture.scrollY ?? 0);
    }
    if (capture.scrollY || capture.scrollSelector) await page.waitForTimeout(200);
    if (capture.route === '/inquire/' && capture.scrollSelector) {
      await page.locator(capture.scrollSelector).evaluate((element) => {
        globalThis.scrollTo(0, globalThis.scrollY + element.getBoundingClientRect().top);
      });
      await page.waitForTimeout(500);
    }
    await page
      .locator('astro-dev-toolbar')
      .evaluate((toolbar) => toolbar.remove())
      .catch(() => {});
    await page.screenshot({
      path: resolve(outputDirectory, capture.name),
      fullPage: capture.fullPage ?? true,
    });

    console.log(`${capture.name}: ${capture.width}x${capture.height}`);
    await context.close();
  }
} finally {
  await browser.close();
}
