// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const honeycomb: Product = {
  slug: 'honeycomb',
  name: 'Honeycomb',
  strapline: 'Shards of honeycomb stirred in late so they stay crisp.',
  description:
    'Honeycomb is made in the kitchen the morning it goes in, broken by hand and folded through at the end of the churn. Any earlier and it dissolves.',
  category: 'ice-cream',
  flavourNotes: ['Honeycomb', 'Toffee', 'Cream'],
  badges: [],
  variants: [
    { sku: 'BOOGIE-HNCB-100', size: '100ml', volumeMl: 100, price: 14000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-HNCB-500', size: '500ml', volumeMl: 500, price: 46000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-HNCB-2400', size: '2.4L', volumeMl: 2400, price: 178000, inStock: true, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Fresh cow milk, cream, sugar, egg yolk, honeycomb pieces (8%) (sugar, glucose syrup, bicarbonate of soda), honey.',
  allergens: ['Milk', 'Eggs'],
  nutritionPer100g: { energyKj: 984, energyKcal: 235, fat: 12.9, saturates: 8.1, carbohydrate: 27.4, sugars: 26.1, protein: 3.2, salt: 0.16 },
  featured: false,
  bestSeller: true,
  order: 40,
};
