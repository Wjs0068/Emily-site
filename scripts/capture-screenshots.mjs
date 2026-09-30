import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { chromium } from 'playwright';

const baseUrl = process.env.SCREENSHOT_BASE_URL ?? 'http://localhost:4321';
const outputDirectory = resolve('screenshots');
const captures = [
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
  { route: '/inquire/', width: 390, height: 844, name: 'inquire-mobile-390.png' },
  { route: '/inquire/', width: 1440, height: 900, name: 'inquire-desktop-1440.png' },
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

    await page.goto(new URL(capture.route, baseUrl).toString(), { waitUntil: 'networkidle' });
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
    await page.evaluate(() => scrollTo(0, 0));
    await page
      .locator('astro-dev-toolbar')
      .evaluate((toolbar) => toolbar.remove())
      .catch(() => {});
    await page.screenshot({
      path: resolve(outputDirectory, capture.name),
      fullPage: true,
    });

    console.log(`${capture.name}: ${capture.width}x${capture.height}`);
    await context.close();
  }
} finally {
  await browser.close();
}
