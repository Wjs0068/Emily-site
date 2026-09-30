import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/services/',
  '/about/',
  '/portfolio/',
  '/faq/',
  '/journal/',
  '/journal/planning-a-calm-wedding-morning/',
  '/inquire/',
  '/privacy/',
];
const viewports = [
  { name: 'mobile-320', width: 320, height: 700 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
];

for (const route of routes) {
  test.describe(route, () => {
    for (const viewport of viewports) {
      test(`has no horizontal overflow at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(route);

        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));

        expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
      });
    }

    test('has semantic structure and stable images', async ({ page }) => {
      await page.goto(route);

      const main = page.locator('main');
      await expect(main.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(main).toHaveCount(1);
      await expect(page.getByRole('banner')).toHaveCount(1);
      await expect(page.getByRole('contentinfo')).toHaveCount(1);
      await expect(page.locator('img[width][height]')).toHaveCount(
        await page.locator('img').count(),
      );
      const imageCount = await page.locator('img').count();
      await expect(page.locator('img[loading="eager"]')).toHaveCount(imageCount > 0 ? 1 : 0);
    });

    test('has no serious or critical axe violations', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const highImpact = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      );

      expect(highImpact).toEqual([]);
    });
  });
}

test('mobile navigation manages focus and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.evaluate(() => scrollTo(0, 700));

  const toggle = page.locator('[data-menu-toggle]');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveClass(/menu-open/);
  await expect(page.locator('[data-header]')).toHaveAttribute('data-scrolled', '');
  await expect(
    page.getByRole('navigation', { name: 'Primary' }).getByRole('link').first(),
  ).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/menu-open/);
});

for (const route of ['/', '/services/']) {
  test(`overlay sticky navigation becomes readable while scrolling on ${route}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route);

    const header = page.locator('[data-header]');
    await expect(header).not.toHaveAttribute('data-scrolled', '');
    await expect(header).toHaveCSS('position', 'sticky');

    await page.evaluate(() => scrollTo(0, 700));
    await expect(header).toHaveAttribute('data-scrolled', '');
    await expect.poll(async () => Math.round((await header.boundingBox())?.y ?? -1)).toBe(0);

    const colors = await header.evaluate((element) => {
      const style = getComputedStyle(element);
      const navigationLink = element.querySelector('nav a');
      return {
        background: style.backgroundColor,
        color: style.color,
        navigationColor: navigationLink ? getComputedStyle(navigationLink).color : '',
      };
    });
    expect(colors.background).not.toBe('rgba(0, 0, 0, 0)');
    expect(colors.color).toBe('rgb(92, 64, 51)');
    expect(colors.navigationColor).toBe('rgb(92, 64, 51)');
  });
}

test('interior light header is sticky and readable immediately', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/about/');

  const header = page.locator('[data-header]');
  await expect(header).toHaveCSS('position', 'sticky');
  await expect(header).toHaveCSS('color', 'rgb(92, 64, 51)');
  await expect(header.locator('nav a').first()).toHaveCSS('color', 'rgb(92, 64, 51)');
  expect(await header.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(
    'rgba(0, 0, 0, 0)',
  );
});

test('sticky header leaves anchored inquiry content visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/inquire/#wedding-inquiry');

  const header = page.locator('[data-header]');
  const target = page.locator('#wedding-inquiry');
  await expect
    .poll(async () => {
      const headerBox = await header.boundingBox();
      const targetBox = await target.boundingBox();
      return (targetBox?.y ?? 0) - (headerBox?.height ?? 0);
    })
    .toBeGreaterThanOrEqual(0);
});

test('privacy route is draft-gated and linked from the footer', async ({ page }) => {
  await page.goto('/privacy/');
  await expect(page.getByRole('heading', { level: 1, name: 'Privacy policy' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  await expect(page.getByRole('note')).toContainText('owner / legal review required');

  await page.goto('/');
  await expect(
    page.getByRole('contentinfo').getByRole('link', { name: 'Privacy' }),
  ).toHaveAttribute('href', '/privacy/');
});

test('HoneyBook resources are isolated to the inquiry route', async ({ page }) => {
  const thirdPartyRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (!['localhost', '127.0.0.1'].includes(url.hostname)) thirdPartyRequests.push(request.url());
  });

  for (const route of ['/', '/services/', '/portfolio/', '/about/', '/faq/', '/journal/']) {
    await page.goto(route);
  }

  expect(thirdPartyRequests.filter((url) => /honeybook/i.test(url))).toEqual([]);
});

test('sample journal articles are not indexable and have no BlogPosting schema', async ({
  page,
}) => {
  await page.goto('/journal/planning-a-calm-wedding-morning/');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schemas.some((schema) => schema.includes('BlogPosting'))).toBe(false);
});
