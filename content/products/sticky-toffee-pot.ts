// PLACEHOLDER RECORD — not client signed-off. See content/products/README.md.
import type { Product } from '@/lib/schema';

export const stickyToffeePot: Product = {
  slug: 'sticky-toffee-pot',
  name: 'Sticky Toffee Pot',
  strapline: 'Sponge, toffee sauce and ice cream layered in a pot to be eaten cold.',
  description:
    'A dessert rather than a flavour: date sponge at the bottom, toffee sauce through the middle, cream ice on top. It is assembled by hand, which is why it comes in one size.',
  category: 'dessert',
  flavourNotes: ['Date sponge', 'Toffee', 'Cream'],
  badges: [],
  variants: [
    { sku: 'BOOGIE-STCK-100', size: '100ml', volumeMl: 100, price: 18000, inStock: true, tradeOnly: false },
  ],
  images: [
    { src: '/images/products/tub-hero.webp', alt: 'A Boogie tub, tilted, gold lid band and deep plum label on a cream body', width: 1200, height: 1500 },
    { src: '/images/products/tub-scoop.webp', alt: 'A single dense scoop of pale cream ice cream', width: 1200, height: 1500 },
    { src: '/images/products/tub-open.webp', alt: 'An open Boogie tub seen from above, smooth pale cream surface', width: 1200, height: 1500 },
  ],
  ingredients: 'Fresh cow milk, cream, dates, wheat flour, sugar, butter, egg, treacle, bicarbonate of soda.',
  allergens: ['Milk', 'Eggs', 'Gluten'],
  nutritionPer100g: { energyKj: 1104, energyKcal: 264, fat: 14.2, saturates: 8.9, carbohydrate: 31.6, sugars: 26.4, protein: 4.0, salt: 0.38 },
  featured: false,
  bestSeller: false,
  order: 120,
};
