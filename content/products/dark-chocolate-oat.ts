// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const darkChocolateOat: Product = {
  slug: 'dark-chocolate-oat',
  name: 'Dark Chocolate Oat',
  strapline: 'An oat base carrying more chocolate than a dairy one could.',
  description:
    'Oat milk takes chocolate further than cream does before it turns cloying, so this is the darkest thing we make.',
  category: 'dairy-free',
  flavourNotes: ['Dark chocolate', 'Oat', 'Cocoa'],
  badges: ['vegan', 'new'],
  variants: [
    { sku: 'BOOGIE-DCOT-100', size: '100ml', volumeMl: 100, price: 14000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-DCOT-500', size: '500ml', volumeMl: 500, price: 47000, inStock: true, tradeOnly: false },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Oat drink (58%) (water, oats), dark chocolate (20%) (cocoa mass, sugar, cocoa butter), sugar, cocoa powder.',
  allergens: ['Gluten'],
  nutritionPer100g: { energyKj: 826, energyKcal: 198, fat: 9.4, saturates: 5.6, carbohydrate: 25.8, sugars: 21.4, protein: 2.8, salt: 0.06 },
  featured: false,
  bestSeller: false,
  order: 110,
};
