// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const alphonsoMangoSorbet: Product = {
  slug: 'alphonso-mango-sorbet',
  name: 'Alphonso Mango Sorbet',
  strapline: 'Alphonso pulp, sugar, water. The list ends there.',
  description:
    'A sorbet at the highest fruit percentage the churn will hold together. No dairy, no stabiliser, nothing to soften the edge of the fruit.',
  story: 'Made only while the season lasts, then gone until it comes back.',
  category: 'sorbet',
  flavourNotes: ['Alphonso mango', 'Lime'],
  badges: ['seasonal', 'vegan'],
  variants: [
    { sku: 'BOOGIE-MNGO-100', size: '100ml', volumeMl: 100, price: 13000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-MNGO-500', size: '500ml', volumeMl: 500, price: 43000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-MNGO-2400', size: '2.4L', volumeMl: 2400, price: 168000, inStock: true, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Alphonso mango pulp (72%), sugar, water, lime juice.',
  allergens: [],
  nutritionPer100g: { energyKj: 542, energyKcal: 128, fat: 0.2, saturates: 0.1, carbohydrate: 31.4, sugars: 29.8, protein: 0.5, salt: 0.02 },
  featured: false,
  bestSeller: true,
  order: 70,
};
