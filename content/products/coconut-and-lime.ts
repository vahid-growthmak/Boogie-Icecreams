// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const coconutAndLime: Product = {
  slug: 'coconut-and-lime',
  name: 'Coconut & Lime',
  strapline: 'Made on coconut milk, and not pretending to be dairy.',
  description:
    'A dairy-free base built on coconut milk rather than a substitute for cream. Lime zest keeps it from turning heavy.',
  story: 'This started as the dairy-free option and is now ordered by people who could have had either.',
  category: 'dairy-free',
  flavourNotes: ['Coconut', 'Lime zest'],
  badges: ['vegan'],
  variants: [
    { sku: 'BOOGIE-CCLM-100', size: '100ml', volumeMl: 100, price: 14000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-CCLM-500', size: '500ml', volumeMl: 500, price: 46000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-CCLM-2400', size: '2.4L', volumeMl: 2400, price: 176000, inStock: true, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Coconut milk (62%), sugar, water, lime zest, lime juice.',
  allergens: [],
  nutritionPer100g: { energyKj: 754, energyKcal: 181, fat: 11.2, saturates: 9.8, carbohydrate: 18.4, sugars: 16.9, protein: 1.2, salt: 0.04 },
  featured: false,
  bestSeller: true,
  order: 100,
};
