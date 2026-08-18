// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const bloodOrangeSorbet: Product = {
  slug: 'blood-orange-sorbet',
  name: 'Blood Orange Sorbet',
  strapline: 'Sharp, deep red, and colder-tasting than it has any right to be.',
  description:
    'Pressed blood orange with a little of the peel left in the base, which is where the bitterness at the back comes from.',
  category: 'sorbet',
  flavourNotes: ['Blood orange', 'Bitter peel'],
  badges: ['vegan'],
  variants: [
    { sku: 'BOOGIE-BLOR-100', size: '100ml', volumeMl: 100, price: 13000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-BLOR-500', size: '500ml', volumeMl: 500, price: 43000, inStock: true, tradeOnly: false },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Blood orange juice (68%), sugar, water, blood orange peel.',
  allergens: [],
  nutritionPer100g: { energyKj: 508, energyKcal: 120, fat: 0.1, saturates: 0, carbohydrate: 29.6, sugars: 28.4, protein: 0.6, salt: 0.01 },
  featured: false,
  bestSeller: false,
  order: 80,
};
