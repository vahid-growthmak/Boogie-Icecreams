import Image from 'next/image';
import Link from 'next/link';

import { Reveal } from '@/components/ui/Reveal';

/**
 * From Sandra: three equal, edge-to-edge image tiles with a white label overlaid
 * bottom-left and a one-line subtitle under it.
 */

const TILES = [
  {
    href: '/products',
    label: 'Take home',
    note: 'Tubs for the freezer',
    image: '/images/editorial/tile-take-home.webp',
    alt: 'A stack of tubs on a kitchen counter beside two spoons',
  },
  {
    href: '/products?category=dessert',
    label: 'Parties',
    note: 'Pots and desserts by the tray',
    image: '/images/editorial/tile-parties.webp',
    alt: 'Small single-serve pots laid out on a table for a gathering',
  },
  {
    href: '/#trade',
    label: 'Trade',
    note: '2.4L and 5L for kitchens',
    image: '/images/editorial/tile-trade.webp',
    alt: 'A large catering tub open on a stainless steel counter',
  },
];

export function CategoryTiles() {
  return (
    <section className="section-y-sm">
      <ul className="grid list-none grid-cols-1 gap-1 sm:grid-cols-3">
        {TILES.map((tile, i) => (
          <Reveal as="li" key={tile.label} delayIndex={i}>
            <Link href={tile.href} className="group relative block aspect-5/6 overflow-hidden sm:aspect-4/5">
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(min-width:640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-103"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-ink-plum/35" />
              <span className="absolute bottom-8 left-8 text-left">
                <span className="block font-display text-h2 text-white">{tile.label}</span>
                <span className="mt-1 block text-caption text-white/85">{tile.note}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
