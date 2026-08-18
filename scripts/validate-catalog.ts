/**
 * Catalog gate. Schema-validates every product and asserts the invariants the
 * rest of the app relies on. Run: npm run validate:catalog [-- --strict]
 *
 * --strict additionally fails while any record is awaiting client sign-off.
 * That is what CI runs on the staging branch (PRD §10).
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { products } from '../content/products/index';
import { ProductSchema } from '../lib/schema';

const strict = process.argv.includes('--strict');
const root = process.cwd();

const errors: string[] = [];
const warnings: string[] = [];

/* ---- schema ------------------------------------------------------------- */

for (const product of products) {
  const result = ProductSchema.safeParse(product);
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`${product.slug ?? '<no slug>'}: ${issue.path.join('.')} — ${issue.message}`);
    }
  }
}

/* ---- uniqueness --------------------------------------------------------- */

const slugs = new Set<string>();
const skus = new Set<string>();

for (const product of products) {
  if (slugs.has(product.slug)) errors.push(`duplicate slug: ${product.slug}`);
  slugs.add(product.slug);

  for (const variant of product.variants) {
    if (skus.has(variant.sku)) errors.push(`duplicate SKU: ${variant.sku}`);
    skus.add(variant.sku);
  }
}

/* ---- invariants --------------------------------------------------------- */

for (const product of products) {
  const consumer = product.variants.filter((v) => !v.tradeOnly);

  if (consumer.length === 0) {
    errors.push(`${product.slug}: every product needs at least one non-trade variant`);
  }

  // Anything in the D2C grid must have a buyable default. lib/catalog.ts prefers
  // 500ml; desserts are single-size by design, so only flag a missing 500ml when
  // the product has more than one consumer size.
  if (consumer.length > 1 && !consumer.some((v) => v.size === '500ml')) {
    errors.push(`${product.slug}: multi-size products must offer 500ml`);
  }

  for (const variant of product.variants) {
    if (variant.compareAtPrice !== undefined && variant.compareAtPrice <= variant.price) {
      errors.push(`${variant.sku}: compareAtPrice must be greater than price, or omitted`);
    }
    if (!Number.isInteger(variant.price)) {
      errors.push(`${variant.sku}: price must be an integer in paise`);
    }
    const expected = variant.size.endsWith('L')
      ? Math.round(parseFloat(variant.size) * 1000)
      : parseInt(variant.size, 10);
    if (variant.volumeMl !== expected) {
      errors.push(`${variant.sku}: volumeMl ${variant.volumeMl} does not match size ${variant.size}`);
    }
    if (!variant.sku.endsWith(`-${variant.volumeMl}`)) {
      errors.push(`${variant.sku}: SKU must end with the volume in ml`);
    }
  }

  for (const image of product.images) {
    if (!existsSync(join(root, 'public', image.src))) {
      errors.push(`${product.slug}: missing image ${image.src} — run npm run gen:images`);
    }
    if (image.alt.toLowerCase().includes(product.name.toLowerCase().slice(0, 6)) === false) {
      // Not fatal; alt should describe the flavour, and usually names it.
    }
    if (/\.(png|jpe?g|svg|webp|avif)$/i.test(image.alt)) {
      errors.push(`${product.slug}: alt text looks like a filename`);
    }
  }

  const text = [product.strapline, product.description, product.story ?? '', product.ingredients].join(' ');
  if (text.includes('TODO(copy):')) {
    if (product.featured || product.bestSeller) {
      errors.push(`${product.slug}: TODO(copy): in a featured or best-selling product`);
    } else {
      warnings.push(`${product.slug}: TODO(copy): still present`);
    }
  }

  if (product.allergens.length === 0 && product.category !== 'sorbet') {
    warnings.push(`${product.slug}: empty allergen list — confirm this is correct, not unfilled`);
  }
}

/* ---- sign-off ----------------------------------------------------------- */

type Signoff = { records: Record<string, { signedOff: boolean }> };
const signoff = JSON.parse(
  readFileSync(join(root, 'content/products/signoff.json'), 'utf8'),
) as Signoff;

const unsigned = products
  .filter((p) => signoff.records[p.slug]?.signedOff !== true)
  .map((p) => p.slug);

const untracked = products.filter((p) => !(p.slug in signoff.records)).map((p) => p.slug);
for (const slug of untracked) errors.push(`${slug}: not listed in content/products/signoff.json`);

/* ---- report ------------------------------------------------------------- */

const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;

console.log(`Validated ${products.length} products, ${skus.size} SKUs.`);

for (const w of warnings) console.log(yellow(`!  ${w}`));
for (const e of errors) console.log(red(`✗  ${e}`));

if (unsigned.length) {
  const msg = `${unsigned.length} record(s) awaiting client sign-off: ${unsigned.join(', ')}`;
  console.log(strict ? red(`✗  ${msg}`) : yellow(`!  ${msg}`));
}

if (errors.length || (strict && unsigned.length)) {
  console.log(red('\nCatalog INVALID'));
  process.exit(1);
}

console.log(green('\nCatalog valid'));
