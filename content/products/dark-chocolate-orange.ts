// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const darkChocolateOrange: Product = {
  slug: 'dark-chocolate-orange',
  name: 'Dark Chocolate Orange',
  strapline: 'Bitter chocolate and orange zest, made for the end of a long dinner.',
  description:
    'Dark chocolate melted into the hot base rather than stirred in cold, so it sets smooth. Orange zest is grated in at the last minute and left in.',
  category: 'ice-cream',
  flavourNotes: ['Dark chocolate', 'Orange zest', 'Cocoa'],
  badges: ['seasonal'],
  variants: [
    { sku: 'BOOGIE-DCOR-100', size: '100ml', volumeMl: 100, price: 15000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-DCOR-500', size: '500ml', volumeMl: 500, price: 48000, inStock: false, tradeOnly: false },
    { sku: 'BOOGIE-DCOR-2400', size: '2.4L', volumeMl: 2400, price: 185000, inStock: true, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Fresh cow milk, cream, dark chocolate (18%) (cocoa mass, sugar, cocoa butter, soya lecithin), sugar, egg yolk, orange zest, cocoa powder.',
  allergens: ['Milk', 'Eggs', 'Soya'],
  nutritionPer100g: { energyKj: 1012, energyKcal: 242, fat: 14.8, saturates: 9.4, carbohydrate: 23.6, sugars: 21.8, protein: 4.1, salt: 0.09 },
  featured: false,
  bestSeller: false,
  order: 50,
};
