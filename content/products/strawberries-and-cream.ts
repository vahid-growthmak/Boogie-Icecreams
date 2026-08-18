// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const strawberriesAndCream: Product = {
  slug: 'strawberries-and-cream',
  name: 'Strawberries & Cream',
  strapline: 'Whole strawberries folded through sweet cream, nothing else asked for.',
  description:
    'Fruit crushed the same day it arrives and folded through a cream base churned slow enough to stay dense. It tastes like the fruit because most of it is.',
  story:
    'We make this one in the six weeks the fruit is actually worth making it in. The rest of the year the churn does something else.',
  category: 'ice-cream',
  flavourNotes: ['Ripe strawberry', 'Fresh cream', 'Vanilla'],
  badges: ['seasonal'],
  variants: [
    { sku: 'BOOGIE-STRW-100', size: '100ml', volumeMl: 100, price: 14000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-STRW-500', size: '500ml', volumeMl: 500, price: 45000, compareAtPrice: 49000, inStock: true, tradeOnly: false },
    { sku: 'BOOGIE-STRW-2400', size: '2.4L', volumeMl: 2400, price: 175000, inStock: true, tradeOnly: true },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Fresh cow milk, cream, strawberries (24%), sugar, egg yolk, natural vanilla.',
  allergens: ['Milk', 'Eggs'],
  nutritionPer100g: { energyKj: 892, energyKcal: 213, fat: 12.4, saturates: 7.8, carbohydrate: 22.1, sugars: 20.6, protein: 3.4, salt: 0.11 },
  featured: true,
  bestSeller: true,
  order: 10,
};
