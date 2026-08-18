// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const raspberrySorbet: Product = {
  slug: 'raspberry-sorbet',
  name: 'Raspberry Sorbet',
  strapline: 'Raspberries pressed and sieved twice, so the seeds stay out of it.',
  description:
    'A sorbet made from fruit and very little else. Sieving twice costs us yield and is the difference between clean and gritty.',
  category: 'sorbet',
  flavourNotes: ['Raspberry', 'Lemon'],
  badges: ['vegan'],
  variants: [
    { sku: 'BOOGIE-RSPB-100', size: '100ml', volumeMl: 100, price: 13000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-RSPB-500', size: '500ml', volumeMl: 500, price: 44000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-RSPB-2400', size: '2.4L', volumeMl: 2400, price: 170000, inStock: false, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Raspberries (70%), sugar, water, lemon juice.',
  allergens: [],
  nutritionPer100g: { energyKj: 486, energyKcal: 115, fat: 0.3, saturates: 0.1, carbohydrate: 27.2, sugars: 25.9, protein: 0.8, salt: 0.01 },
  featured: false,
  bestSeller: false,
  order: 90,
};
