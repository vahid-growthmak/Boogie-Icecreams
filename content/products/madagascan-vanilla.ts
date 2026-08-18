// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const madagascanVanilla: Product = {
  slug: 'madagascan-vanilla',
  name: 'Madagascan Vanilla',
  strapline: 'Vanilla seeds through a custard base, and the confidence to stop there.',
  description:
    'A slow-cooked egg custard, chilled overnight, then churned with whole vanilla seed. The flecks are the pod, not the flavouring.',
  story:
    'The one every other flavour is judged against in the kitchen. If the vanilla is off, the batch is off.',
  category: 'ice-cream',
  flavourNotes: ['Vanilla pod', 'Egg custard', 'Fresh cream'],
  badges: [],
  variants: [
    { sku: 'BOOGIE-VNLA-100', size: '100ml', volumeMl: 100, price: 13000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-VNLA-500', size: '500ml', volumeMl: 500, price: 42000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-VNLA-2400', size: '2.4L', volumeMl: 2400, price: 165000, inStock: true, tradeOnly: true },
    { sku: 'BOOGIE-VNLA-5000', size: '5L', volumeMl: 5000, price: 310000, inStock: true, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Fresh cow milk, cream, sugar, egg yolk, vanilla pod extract, vanilla seeds.',
  allergens: ['Milk', 'Eggs'],
  nutritionPer100g: { energyKj: 921, energyKcal: 220, fat: 13.1, saturates: 8.2, carbohydrate: 21.4, sugars: 20.1, protein: 3.6, salt: 0.1 },
  featured: false,
  bestSeller: true,
  order: 20,
};
