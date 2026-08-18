import { expect, test } from '@playwright/test';

/**
 * boogie-visual-qa: full-page captures at every blueprint breakpoint, plus the
 * interaction states the rubric asks for. Screenshots land in tests/e2e/shots/.
 */

const BREAKPOINTS = [
  { name: '360', width: 360, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 1200 },
  { name: '1440', width: 1440, height: 1200 },
];

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/products', name: 'products' },
  { path: '/products/strawberries-and-cream', name: 'pdp' },
];

for (const bp of BREAKPOINTS) {
  for (const route of ROUTES) {
    test(`${route.name} at ${bp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(route.path);
      // Let scroll reveals settle so captures show the resting state.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(700);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      // No route may scroll horizontally at any width.
      //
      // Measured on body, and by attempting an actual scroll. documentElement is
      // the wrong probe here: the page's clip lives on body, so html.scrollWidth
      // reports the un-clipped width of legitimate inner scrollers — the
      // best-sellers strip is 1521px wide by design and scrolls within itself.
      const overflow = await page.evaluate(() => {
        window.scrollTo(9999, 0);
        const scrolledX = window.scrollX;
        window.scrollTo(0, 0);
        return {
          body: document.body.scrollWidth - document.body.clientWidth,
          scrolledX,
        };
      });
      expect(overflow.body, `body overflow at ${bp.name} on ${route.path}`).toBeLessThanOrEqual(0);
      expect(
        overflow.scrolledX,
        `page scrolled horizontally at ${bp.name} on ${route.path}`,
      ).toBe(0);

      await page.screenshot({
        path: `tests/e2e/shots/${route.name}-${bp.name}.png`,
        fullPage: true,
      });
    });
  }
}

test('cart drawer, filled and empty', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/products/strawberries-and-cream');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.screenshot({ path: 'tests/e2e/shots/cart-filled.png' });

  await page.getByRole('button', { name: /^Remove/ }).click();
  await page.screenshot({ path: 'tests/e2e/shots/cart-empty.png' });
});

test('products empty state and a filtered view', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/products?category=llama');
  await page.screenshot({ path: 'tests/e2e/shots/products-empty.png', fullPage: true });

  await page.goto('/products?category=sorbet&sort=price-asc');
  await page.screenshot({ path: 'tests/e2e/shots/products-filtered.png', fullPage: true });
});

test('header scrolled state shows paper background and gold hairline', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'tests/e2e/shots/header-scrolled.png', clip: { x: 0, y: 0, width: 1440, height: 160 } });
});
