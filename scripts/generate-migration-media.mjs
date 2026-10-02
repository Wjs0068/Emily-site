import { mkdir, readFile } from 'node:fs/promises';

import { chromium } from 'playwright';
import sharp from 'sharp';

// Preserve all Wix originals. This crop removes only the lower 173 pixels,
// including the video mute badge; no pixels are invented or retouched.
await mkdir('src/assets/derived', { recursive: true });
await sharp('src/assets/source/08-caley-wedding.jpg')
  .extract({ left: 0, top: 0, width: 1290, height: 1540 })
  .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
  .toFile('src/assets/derived/08-caley-wedding-cropped.jpg');

// Existing Services branding photograph, cropped proportionately for sharing.
const photo = await sharp('src/assets/source/02-branding-3944.jpg')
  .extract({ left: 0, top: 390, width: 2477, height: 2601 })
  .resize(600, 630)
  .jpeg({ quality: 95 })
  .toBuffer();
const font = await readFile(
  'node_modules/@fontsource/fahkwang/files/fahkwang-latin-400-normal.woff2',
);
await mkdir('public/images/social', { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
    @font-face { font-family: Fahkwang; src: url(data:font/woff2;base64,${font.toString('base64')}) format('woff2'); }
    * { box-sizing: border-box; }
    body { margin: 0; width: 1200px; height: 630px; display: flex; background: #f5ece3; color: #5c4033; font-family: Fahkwang, sans-serif; }
    .copy { width: 600px; padding: 66px 54px; display: flex; flex-direction: column; justify-content: center; }
    .brand { margin: 0 0 48px; font-size: 20px; letter-spacing: 2px; }
    h1 { margin: 0; font-size: 51px; font-weight: 400; line-height: 1.2; }
    .location { margin: 48px 0 0; font-size: 17px; letter-spacing: 2px; }
    img { display: block; width: 600px; height: 630px; }
  </style></head><body><div class="copy"><p class="brand">Em's Bridal Hair</p><h1>Romantic shape.<br>Soft movement.</h1><p class="location">DENVER + COLORADO</p></div><img alt="Emily refining a bridal hairstyle" src="data:image/jpeg;base64,${photo.toString('base64')}"></body></html>`);
  await page.evaluate(async () => {
    await globalThis.document.fonts.ready;
    await Promise.all(Array.from(globalThis.document.images, (image) => image.decode()));
  });
  await page.screenshot({
    path: 'public/images/social/emily-bridal-hair-og.jpg',
    type: 'jpeg',
    quality: 92,
  });
} finally {
  await browser.close();
}
console.log('Created Caley crop (1290×1540) and social-sharing image (1200×630).');
