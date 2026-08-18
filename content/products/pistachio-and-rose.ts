// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const pistachioAndRose: Product = {
  slug: 'pistachio-and-rose',
  name: 'Pistachio & Rose',
  strapline: 'Ground pistachio with just enough rose to notice on the second spoon.',
  description:
    'Pistachios are roasted and ground in-house, which is why the colour is dull green rather than bright. Rose water goes in by the drop.',
  category: 'ice-cream',
  flavourNotes: ['Roasted pistachio', 'Rose', 'Cream'],
  badges: [],
  variants: [
    { sku: 'BOOGIE-PSRO-100', size: '100ml', volumeMl: 100, price: 16000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-PSRO-500', size: '500ml', volumeMl: 500, price: 52000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-PSRO-2400', size: '2.4L', volumeMl: 2400, price: 198000, inStock: true, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Fresh cow milk, cream, pistachios (14%), sugar, egg yolk, rose water.',
  allergens: ['Milk', 'Eggs', 'Nuts'],
  nutritionPer100g: { energyKj: 1043, energyKcal: 249, fat: 16.2, saturates: 8.4, carbohydrate: 20.7, sugars: 19.1, protein: 5.2, salt: 0.12 },
  featured: false,
  bestSeller: false,
  order: 60,
};
