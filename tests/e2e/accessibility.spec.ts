import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * WCAG 2.2 AA gate. Zero critical and zero serious findings is a merge blocker
 * (PRD §7, boogie-accessibility). Run: npm run test:e2e
 */

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/products', name: 'products' },
  { path: '/products/strawberries-and-cream', name: 'pdp' },
];

/**
 * Scroll the page so every scroll reveal has fired before scanning.
 *
 * Reveals start at opacity 0, and axe's color-contrast rule cannot reason about
 * a transient alpha — it reports every un-revealed heading and button as a
 * contrast failure. The state worth auditing is the settled one. Under
 * prefers-reduced-motion the reveal never applies and content is always opaque,
 * which is the path this stands in for.
 */
async function settleReveals(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

async function scan(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const blocking = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  );

  return { results, blocking };
}

for (const route of ROUTES) {
  test(`${route.name} has no critical or serious axe violations`, async ({ page }) => {
    await page.goto(route.path);
    await settleReveals(page);
    const { blocking } = await scan(page);
    expect(
      blocking.map((v) => `${v.id}: ${v.nodes[0]?.target.join(' ')}`),
      `axe blocking violations on ${route.path}`,
    ).toEqual([]);
  });
}

test('cart drawer is accessible, traps focus and returns it', async ({ page }) => {
  await page.goto('/products/strawberries-and-cream');

  const addToCart = page.getByRole('button', { name: 'Add to cart' });
  await addToCart.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your cart' })).toBeVisible();

  const { blocking } = await scan(page);
  expect(blocking.map((v) => v.id), 'axe blocking violations with drawer open').toEqual([]);

  // Esc closes and focus returns to the trigger that opened it.
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(addToCart).toBeFocused();
});

test('skip link is the first focusable element', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
});

test('out-of-stock size is disabled with a visible reason, not hidden', async ({ page }) => {
  // Dark Chocolate Orange is out of stock in 500ml in the seed catalog.
  await page.goto('/products/dark-chocolate-orange');
  const size = page.getByRole('radio', { name: '500ml' });
  await expect(size).toBeVisible();
  await expect(size).toBeDisabled();
  await expect(page.getByText(/Sold out in 500ml/)).toBeVisible();
});

test('unknown category renders the empty state, not an error', async ({ page }) => {
  const response = await page.goto('/products?category=llama');
  expect(response?.status()).toBe(200);
  await expect(page.getByText('No flavours match that combination yet.')).toBeVisible();
});

test('unknown product slug returns a styled 404', async ({ page }) => {
  const response = await page.goto('/products/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /That flavour isn/ })).toBeVisible();
});

test('allergen block is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/products/strawberries-and-cream');
  await expect(page.getByText(/Contains milk, eggs/)).toBeVisible();
  await context.close();
});
