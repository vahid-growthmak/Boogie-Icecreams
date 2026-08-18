import type { Product } from '@/lib/schema';

import { alphonsoMangoSorbet } from './alphonso-mango-sorbet';
import { bloodOrangeSorbet } from './blood-orange-sorbet';
import { coconutAndLime } from './coconut-and-lime';
import { darkChocolateOat } from './dark-chocolate-oat';
import { darkChocolateOrange } from './dark-chocolate-orange';
import { honeycomb } from './honeycomb';
import { madagascanVanilla } from './madagascan-vanilla';
import { pistachioAndRose } from './pistachio-and-rose';
import { raspberrySorbet } from './raspberry-sorbet';
import { saltedCaramel } from './salted-caramel';
import { stickyToffeePot } from './sticky-toffee-pot';
import { strawberriesAndCream } from './strawberries-and-cream';

/** Registry. Read only through lib/catalog.ts — never imported by a component. */
export const products: Product[] = [
  strawberriesAndCream,
  madagascanVanilla,
  saltedCaramel,
  honeycomb,
  darkChocolateOrange,
  pistachioAndRose,
  alphonsoMangoSorbet,
  bloodOrangeSorbet,
  raspberrySorbet,
  coconutAndLime,
  darkChocolateOat,
  stickyToffeePot,
];
