/**
 * content/products/strawberries-and-cream.ts
 *
 * Reference shape for every flavour file. Copy this, change the values, run
 * `pnpm validate:catalog`.
 *
 * Note what is NOT here: no award it hasn't won, no certification it doesn't hold,
 * no origin story invented to fill the field. Unknown values are marked TODO(copy):
 * so they fail review rather than shipping as fiction.
 */

import type { Product } from '@/lib/schema';

export const strawberriesAndCream: Product = {
  slug: 'strawberries-and-cream',
  name: 'Strawberries & Cream',
  strapline: 'Whole strawberries folded through sweet cream, nothing else asked for.',
  description:
    'Fruit picked in season, crushed the same day and folded through a cream base '
    + 'churned slow enough to stay dense. It tastes like the fruit because most of it is.',
  story:
    'We make this one in the six weeks the fruit is actually worth making it in. '
    + 'The rest of the year the churn does something else.',

  category: 'ice-cream',
  flavourNotes: ['Ripe strawberry', 'Fresh cream', 'Vanilla'],
  badges: ['seasonal'],

  variants: [
    {
      sku: 'BOOGIE-STRW-100',
      size: '100ml',
      volumeMl: 100,
      price: 14000,          // ₹140.00 — minor units, integer, always
      inStock: true,
      tradeOnly: false,
    },
    {
      sku: 'BOOGIE-STRW-500',
      size: '500ml',
      volumeMl: 500,
      price: 45000,          // ₹450.00 — the D2C default variant
      compareAtPrice: 49000,
      inStock: true,
      tradeOnly: false,
    },
    {
      sku: 'BOOGIE-STRW-2400',
      size: '2.4L',
      volumeMl: 2400,
      price: 175000,
      inStock: true,
      tradeOnly: true,       // hidden from the D2C grid, visible to trade
    },
  ],

  images: [
    {
      src: '/images/products/strawberries-and-cream-tub.png',
      alt: 'A 500ml tub of Boogie Strawberries & Cream, tilted, with a scoop of pale pink ice cream above it',
      width: 1200,
      height: 1500,
    },
    {
      src: '/images/products/strawberries-and-cream-scoop.png',
      alt: 'Close scoop of Strawberries & Cream showing whole pieces of fruit through the cream',
      width: 1200,
      height: 1500,
    },
    {
      src: '/images/products/strawberries-and-cream-open.png',
      alt: 'The open tub from above, surface swirled with crushed strawberry',
      width: 1200,
      height: 1500,
    },
  ],

  ingredients:
    'Fresh cow milk, cream, strawberries (24%), sugar, egg yolk, natural vanilla.',
  allergens: ['Milk', 'Eggs'],

  nutritionPer100g: {
    energyKj: 892,
    energyKcal: 213,
    fat: 12.4,
    saturates: 7.8,
    carbohydrate: 22.1,
    sugars: 20.6,
    protein: 3.4,
    salt: 0.11,
  },

  featured: true,
  bestSeller: true,
  order: 10,
};
