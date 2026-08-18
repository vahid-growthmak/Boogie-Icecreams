// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const saltedCaramel: Product = {
  slug: 'salted-caramel',
  name: 'Salted Caramel',
  strapline: 'Sugar taken to the edge of burnt, then pulled back with salt and cream.',
  description:
    'The caramel is cooked dark enough to turn slightly bitter, which is what keeps it from being sweet on top of sweet. Sea salt goes in at the end, by hand.',
  category: 'ice-cream',
  flavourNotes: ['Burnt sugar', 'Sea salt', 'Butter'],
  badges: [],
  variants: [
    { sku: 'BOOGIE-CRML-100', size: '100ml', volumeMl: 100, price: 14000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-CRML-500', size: '500ml', volumeMl: 500, price: 45000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-CRML-2400', size: '2.4L', volumeMl: 2400, price: 175000, inStock: true, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Fresh cow milk, cream, caramelised sugar, egg yolk, butter, sea salt.',
  allergens: ['Milk', 'Eggs'],
  nutritionPer100g: { energyKj: 967, energyKcal: 231, fat: 13.6, saturates: 8.7, carbohydrate: 24.3, sugars: 23.2, protein: 3.3, salt: 0.42 },
  featured: false,
  bestSeller: true,
  order: 30,
};
