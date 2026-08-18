/**
 * Generates placeholder product renders and editorial imagery as SVG.
 *
 * PRD §10 names missing product photography as the top risk and requires that
 * "placeholder renders must match final aspect ratios exactly". These do:
 * products are 1200×1500 (4:5), editorial blocks carry the ratios the blueprint
 * sections need. Every file is a few KB, so the performance budget stays honest
 * until real cut-out renders replace them file-for-file.
 *
 * Run: npm run gen:images
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC = join(process.cwd(), 'public', 'images');

type Palette = { base: string; deep: string; accent: string };

const PRODUCTS: Record<string, Palette> = {
  'strawberries-and-cream': { base: '#F2C9CE', deep: '#C4526B', accent: '#7C1F45' },
  'madagascan-vanilla': { base: '#F6EBD2', deep: '#D8BE86', accent: '#8A6A34' },
  'salted-caramel': { base: '#E8C089', deep: '#B87536', accent: '#6E3F16' },
  'dark-chocolate-orange': { base: '#8C5A3C', deep: '#4A2A1C', accent: '#D2782A' },
  'pistachio-and-rose': { base: '#CBD8A9', deep: '#7E9153', accent: '#B4657F' },
  honeycomb: { base: '#F0D493', deep: '#C79A3A', accent: '#7A5316' },
  'alphonso-mango-sorbet': { base: '#F6C96A', deep: '#DE8F1E', accent: '#A85C0B' },
  'blood-orange-sorbet': { base: '#F0A277', deep: '#C4462A', accent: '#7C1F1F' },
  'raspberry-sorbet': { base: '#E9A0B4', deep: '#B22E52', accent: '#6E1330' },
  'coconut-and-lime': { base: '#F1EFE2', deep: '#BFC9A0', accent: '#5E7A3E' },
  'dark-chocolate-oat': { base: '#A78B6E', deep: '#4E3524', accent: '#2C1C12' },
  'sticky-toffee-pot': { base: '#D9AE7E', deep: '#8A5628', accent: '#4A2C10' },
};

const GOLD = '#D2A65A';
const PAPER = '#F5F1E8';
const SAND = '#E9E2D3';
const INK = '#3F1330';
const MULBERRY = '#7C1F45';

/* ------------------------------------------------------------------ tubs -- */

/** A tub, three-quarter view, cut out on transparency. 1200×1500. */
function tub(p: Palette, variant: 'hero' | 'scoop' | 'open'): string {
  const scoops =
    variant === 'scoop'
      ? `<g>
      <circle cx="600" cy="360" r="150" fill="${p.base}"/>
      <circle cx="512" cy="424" r="112" fill="${p.deep}" opacity="0.55"/>
      <circle cx="688" cy="430" r="104" fill="${p.accent}" opacity="0.35"/>
      <circle cx="600" cy="360" r="150" fill="url(#sheen)"/>
    </g>`
      : '';

  const openLid =
    variant === 'open'
      ? `<ellipse cx="600" cy="620" rx="256" ry="76" fill="${p.base}"/>
       <ellipse cx="600" cy="612" rx="196" ry="52" fill="${p.deep}" opacity="0.5"/>
       <ellipse cx="540" cy="606" rx="64" ry="24" fill="${p.accent}" opacity="0.35"/>`
      : `<ellipse cx="600" cy="596" rx="262" ry="60" fill="${p.deep}"/>
       <ellipse cx="600" cy="580" rx="262" ry="60" fill="${GOLD}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" width="1200" height="1500" role="img">
  <defs>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${p.deep}"/>
      <stop offset="0.42" stop-color="${p.base}"/>
      <stop offset="1" stop-color="${p.accent}"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  ${scoops}
  <g>
    <path d="M338 600 L862 600 L806 1330 Q800 1392 740 1400 L460 1400 Q400 1392 394 1330 Z" fill="url(#body)"/>
    <path d="M338 600 L862 600 L806 1330 Q800 1392 740 1400 L460 1400 Q400 1392 394 1330 Z" fill="url(#sheen)"/>
    <rect x="360" y="800" width="480" height="286" fill="${INK}" opacity="0.82"/>
    <rect x="360" y="800" width="480" height="6" fill="${GOLD}"/>
    <rect x="360" y="1080" width="480" height="6" fill="${GOLD}"/>
    <text x="600" y="912" text-anchor="middle" font-family="Georgia, serif" font-size="86" fill="${PAPER}" font-style="italic">boogie</text>
    <text x="600" y="1006" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="34" letter-spacing="9" fill="${GOLD}">SMALL BATCH</text>
    ${openLid}
  </g>
</svg>`;
}

/* ------------------------------------------------------------ editorial -- */

/** Abstract editorial block — a stand-in for lifestyle photography. */
function editorial(w: number, h: number, ground: string, ink: string, motif: 'bowl' | 'churn' | 'tiles'): string {
  const cx = w / 2;
  const cy = h / 2;

  const shapes =
    motif === 'bowl'
      ? `<ellipse cx="${cx}" cy="${cy + h * 0.08}" rx="${w * 0.3}" ry="${h * 0.16}" fill="${ink}" opacity="0.16"/>
       <circle cx="${cx - w * 0.1}" cy="${cy - h * 0.02}" r="${w * 0.1}" fill="${ink}" opacity="0.3"/>
       <circle cx="${cx + w * 0.09}" cy="${cy - h * 0.04}" r="${w * 0.085}" fill="${ink}" opacity="0.22"/>
       <circle cx="${cx}" cy="${cy - h * 0.11}" r="${w * 0.07}" fill="${ink}" opacity="0.38"/>`
      : motif === 'churn'
        ? `<rect x="${w * 0.28}" y="${h * 0.24}" width="${w * 0.44}" height="${h * 0.52}" fill="${ink}" opacity="0.18"/>
       <circle cx="${cx}" cy="${cy}" r="${Math.min(w, h) * 0.16}" fill="${ink}" opacity="0.3"/>
       <path d="M${w * 0.2} ${h * 0.82} Q${cx} ${h * 0.66} ${w * 0.8} ${h * 0.82}" stroke="${ink}" stroke-width="${h * 0.012}" fill="none" opacity="0.35"/>`
        : `<rect x="${w * 0.08}" y="${h * 0.14}" width="${w * 0.36}" height="${h * 0.72}" fill="${ink}" opacity="0.2"/>
       <rect x="${w * 0.52}" y="${h * 0.24}" width="${w * 0.4}" height="${h * 0.52}" fill="${ink}" opacity="0.3"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <rect width="${w}" height="${h}" fill="${ground}"/>
  ${shapes}
  <circle cx="${w * 0.86}" cy="${h * 0.14}" r="${Math.min(w, h) * 0.05}" fill="${GOLD}" opacity="0.5"/>
</svg>`;
}

/* ----------------------------------------------------------------- run --- */

mkdirSync(join(PUBLIC, 'products'), { recursive: true });
mkdirSync(join(PUBLIC, 'editorial'), { recursive: true });

let count = 0;
for (const [slug, palette] of Object.entries(PRODUCTS)) {
  for (const variant of ['hero', 'scoop', 'open'] as const) {
    writeFileSync(join(PUBLIC, 'products', `${slug}-${variant}.svg`), tub(palette, variant));
    count++;
  }
}

const EDITORIAL: Array<[string, number, number, string, string, 'bowl' | 'churn' | 'tiles']> = [
  ['story', 1200, 1400, SAND, MULBERRY, 'bowl'],
  ['passion', 1400, 1000, PAPER, INK, 'churn'],
  ['heaven', 1200, 1000, SAND, MULBERRY, 'bowl'],
  ['trade', 1200, 1000, PAPER, INK, 'tiles'],
  ['tile-take-home', 1000, 1200, SAND, MULBERRY, 'bowl'],
  ['tile-parties', 1000, 1200, PAPER, INK, 'bowl'],
  ['tile-trade', 1000, 1200, SAND, INK, 'tiles'],
];

for (const [name, w, h, ground, ink, motif] of EDITORIAL) {
  writeFileSync(join(PUBLIC, 'editorial', `${name}.svg`), editorial(w, h, ground, ink, motif));
  count++;
}

console.log(`Wrote ${count} placeholder images to public/images/`);
console.log('These are placeholders. Replace file-for-file with real renders — PRD §10.');
