import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { instagramLink, isPublishableVideo } from '../src/lib/videos';

test('video publication requires real media, rights, approval, and audio accessibility', () => {
  const approved = {
    id: 'test',
    title: 'A finished style',
    description: 'A rear view of a textured updo.',
    poster: {
      url: 'https://cdn.example.com/poster.webp',
      width: 720,
      height: 1280,
      alt: 'Textured updo from behind',
    },
    videoUrl: 'https://cdn.example.com/owned.mp4',
    hasSpeech: false,
    contentStatus: 'OWNER_APPROVED' as const,
    publicationPermission: true,
    websiteUsageRights: true,
    sortOrder: 0,
  };
  expect(isPublishableVideo(approved)).toBe(true);
  for (const overrides of [
    { contentStatus: 'DEVELOPMENT_SAMPLE' as const },
    { publicationPermission: false },
    { websiteUsageRights: false },
    { videoUrl: undefined },
    { videoUrl: 'javascript:alert(1)' },
    { videoUrl: '//untrusted.example/video.mp4' },
    { hasSpeech: true },
    { hasSpeech: true, captionsUrl: '/captions.vtt' },
  ])
    expect(isPublishableVideo({ ...approved, ...overrides })).toBe(false);
  expect(
    isPublishableVideo({
      ...approved,
      hasSpeech: true,
      captionsUrl: '/captions.vtt',
      transcript: 'Spoken instructions.',
    }),
  ).toBe(true);
  expect(instagramLink('https://www.instagram.com/reel/approved_id/')).toBeTruthy();
  expect(instagramLink('https://instagram.com.evil.example/reel/anything/')).toBeUndefined();
});

test('Home leads with finished work and hides the empty video collection', async ({ page }) => {
  const mediaRequests: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'media' || /instagram.com/.test(request.url()))
      mediaRequests.push(request.url());
  });
  await page.goto('/');
  const sections = await page
    .locator('main > section')
    .evaluateAll((items) => items.map((item) => item.className));
  expect(sections[0]).toBe('hero');
  expect(sections[1]).toContain('work');
  await expect(page.locator('.hero img')).toHaveAttribute('alt', /Finished half-up/);
  await expect(page.locator('.editorial-grid figure')).toHaveCount(6);
  await expect(page.locator('[data-video-showcase]')).toHaveCount(0);
  await expect(page.locator('.proof figure')).toHaveCount(2);
  await expect(page.locator('#trust-signals')).toContainText('300+');
  await expect(page.locator('#trust-signals')).toHaveAttribute('data-content-status', 'UNRESOLVED');
  await expect(page.locator('.package-list')).toContainText('$1,750');
  const business = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .evaluate((element) => JSON.parse(element.textContent || '{}'));
  expect(business['@type']).toContain('LocalBusiness');
  expect(business.name).toBe("Em's Bridal Hair");
  expect(mediaRequests).toEqual([]);
});

for (const route of ['/', '/portfolio/']) {
  test(`all photographs load and low-resolution sources are not upscaled on ${route}`, async ({
    page,
  }) => {
    await page.goto(route);
    const images = page.locator('main img');
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(async (element: HTMLImageElement) => {
        await element.decode();
      });
      expect(
        await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      ).toBeGreaterThan(0);
    }
    const smallSource = page.locator('img[alt*="Long blonde waves"]').first();
    const candidates = (await smallSource.getAttribute('srcset')) || '';
    expect(candidates).not.toMatch(/(?:768|960|1080|1280|1440|1920)w/);
  });
}

test('development video layout is labeled, deferred, playable, and keyboard accessible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/dev/video-showcase/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  await expect(page.getByRole('note')).toContainText("not Emily's Reels");
  const player = page.locator('video');
  await expect(player).not.toHaveAttribute('src');
  const button = page.getByRole('button', { name: 'Preview player: Layout demo 01', exact: true });
  await button.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close video' })).toBeFocused();
  await expect
    .poll(() => player.evaluate((video: HTMLVideoElement) => video.currentTime))
    .toBeGreaterThan(0);
  await expect(player).toHaveAttribute('controls', '');
  await expect(player).toHaveAttribute('playsinline', '');
  const violations = (
    await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
  ).violations;
  expect(violations.filter((item) => ['serious', 'critical'].includes(item.impact || ''))).toEqual(
    [],
  );
  expect((await dialog.boundingBox())!.width).toBeLessThan(390);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(button).toBeFocused();
  await expect(player).not.toHaveAttribute('src');
  await button.click();
  await player.evaluate((video: HTMLVideoElement) => {
    video.src = 'data:video/mp4;base64,invalid';
    video.load();
  });
  await expect(page.locator('[data-video-status]')).toContainText('temporarily unavailable');
  await page.getByRole('button', { name: 'Close video' }).click();
  await expect(button).toBeFocused();
});

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`video preview reflows at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/dev/video-showcase/');
    await expect(page.locator('.video-grid figure')).toHaveCount(6);
    const dimensions = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
  });
}
