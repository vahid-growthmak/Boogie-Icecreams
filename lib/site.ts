/**
 * The single source of structural truth for the Boogies site, transcribed from
 * Sitemap/boogies-ice-cream-sitemap.csv and the paired strategy document
 * (Growthmak, v1.0, 17 Aug 2026).
 *
 * RULE, inherited from the sitemap's own notes and from PRD §10: a value that
 * the client has not supplied is `null`, and every block that depends on it
 * omits itself. Nothing here is estimated, rounded or inferred. Sections 1.4 and
 * 1.7 of the sitemap state this explicitly ("OMITTED rather than estimated",
 * "Omits counts entirely if data is incomplete") and it is applied throughout.
 */

/* ------------------------------------------------------------ navigation -- */

/** Six slots. Decision 3, strategy §3.1. Partner With Us carries the dropdown. */
export const NAV = [
  { href: '/products', label: 'Products' },
  { href: '/plant', label: 'The Plant' },
  { href: '/find-boogies', label: 'Find Boogies' },
  { href: '/partners', label: 'Partner With Us', menu: 'partners' as const },
  { href: '/company', label: 'Company' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * The five-way router. Order is load-bearing: the sitemap requires the
 * distributor journey listed first and visually weighted (§1.1 note), because it
 * is the highest-value journey and the one the whole architecture is built for.
 */
export const PARTNER_JOURNEYS = [
  {
    href: '/partners/distributor',
    label: 'Become a Distributor',
    blurb: 'Territory rights, margin ladder and route economics.',
    weighted: true,
  },
  {
    href: '/partners/retailer',
    label: 'Stock Boogies',
    blurb: 'A freezer, a margin and reliable delivery.',
    weighted: false,
  },
  {
    href: '/partners/van-route',
    label: 'Run a Van Route',
    blurb: 'Start with one van and a route of your own.',
    weighted: false,
  },
  {
    href: '/partners/franchise',
    label: 'Boogie Woogie Franchise',
    blurb: 'An outlet with a line competitors cannot stock.',
    weighted: false,
  },
  {
    href: '/partners/bulk-events',
    label: 'Bulk & Events',
    blurb: 'Party packs and large orders, delivered.',
    weighted: false,
  },
] as const;

/* ------------------------------------------------------------- the range -- */

/**
 * Six format tiers. The sitemap is explicit that the catalogue is presented by
 * what fills a cabinet, not by flavour — "a trade buyer navigates by what fills
 * a cabinet, not by flavour" (page 2, Tier navigation).
 *
 * `role` is the shelf/margin consequence the sitemap demands in §1.5: "Translate
 * every product fact into a shelf or margin consequence."
 */
export const TIERS = [
  {
    href: '/products/carry-homes',
    label: 'Carry homes',
    role: 'The family purchase. Highest basket value, slowest rotation.',
  },
  {
    href: '/products/paper-packs',
    label: 'Paper packs',
    role: 'Entry price point. The line that keeps a cabinet turning over.',
  },
  {
    href: '/products/bulk-party-packs',
    label: 'Bulk & party packs',
    role: 'Volume per delivery. Where the bulk price ladder lives.',
  },
  {
    href: '/products/novelties',
    label: 'Novelties',
    role: 'Impulse at the counter. Fastest rotation, smallest footprint.',
  },
  {
    href: '/products/boogie-woogie',
    label: 'Boogie Woogie',
    role: 'The exclusive line. Stocked only through Boogies outlets.',
  },
  {
    href: '/products/trade-supply',
    label: 'Trade supply',
    role: 'Vans, cones and ghee — the lines that are invisible today.',
  },
] as const;

/* ---------------------------------------------------------------- proof --- */

/**
 * Sitemap §1.4: "Real verified figures only (4.7 / 126 at time of research). If
 * the figure is not current at build, the block is OMITTED rather than
 * estimated."
 *
 * These are the researched figures, carried with the date they were true. The
 * proof bar renders only while `rating` is non-null — set it to null and the
 * whole section disappears rather than showing a stale number.
 *
 * TODO(client): re-verify against the Google Business Profile before launch and
 * update `verifiedOn`. A figure a distributor can check must actually check out.
 */
export const PROOF: {
  rating: number | null;
  reviews: number | null;
  verifiedOn: string;
  profileUrl: string | null;
} = {
  rating: 4.7,
  reviews: 126,
  verifiedOn: '2026-08-17',
  // Not supplied in the sitemap pack. Until it is, the figure is stated but not
  // linked out — an unlinked verified figure is honest; a wrong link is not.
  profileUrl: null,
};

/* ------------------------------------------------------------- footprint -- */

/**
 * Sitemap §1.7: "Renders live outlet counts from the CMS. Omits counts entirely
 * if data is incomplete."
 *
 * The strategy document establishes seventeen named towns across two states but
 * does NOT name them ("published as unstructured text with no addresses, no map
 * and no locator"). So the count of towns is a supplied fact; the town list and
 * the per-district outlet counts are not. `districts` stays empty until the CMS
 * supplies it, and the section renders the states-and-towns fact without
 * inventing a single place name.
 */
export const FOOTPRINT: {
  towns: number | null;
  states: string[];
  districts: { name: string; slug: string; outlets: number | null }[];
} = {
  towns: 17,
  states: ['Kerala', 'Tamil Nadu'],
  districts: [],
};

/* ----------------------------------------------------------------- plant -- */

export const PLANT = {
  place: 'Kannamangalam, Malappuram',
  state: 'Kerala',
  /** Google classifies the listing as a manufacturer, open 24 hours. */
  hours: 'Open 24 hours',
  /** No plant film has been supplied. §1.6 is video-led; until a real tour
   *  exists the section renders as a still-led invitation rather than a fake
   *  player. "Real footage of the actual facility and staff." */
  tourVideo: null as string | null,
};

/* --------------------------------------------------------------- company -- */

export const ENTITIES = [
  { name: 'Icehome Foods Private Limited', state: 'Kerala' },
  { name: 'Mountbell Foods Private Limited', state: 'Tamil Nadu' },
] as const;

/**
 * Sitemap §1.13: a single phone number sitewide — "current estate publishes two
 * different numbers." Neither is in the supplied pack, so `phone` is null and
 * the pinned call/WhatsApp rail (§1.12) does not render. Set it once here and
 * both the rail and the footer pick it up.
 */
export const CONTACT: { partnerEmail: string; phone: string | null; whatsapp: string | null } = {
  // Marked [CONFIRM] in the sitemap. Published because the sitemap requires the
  // partner email on nine sitewide surfaces; confirm before launch.
  partnerEmail: 'partners@boogies.in',
  phone: null,
  whatsapp: null,
};

/* ---------------------------------------------------------------- footer -- */

/** §1.13 locked template: Explore | Products | Partner With Us | Contact & Legal. */
export const FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { href: '/', label: 'Home' },
      { href: '/company', label: 'Company' },
      { href: '/plant', label: 'The Plant' },
      { href: '/find-boogies', label: 'Find Boogies' },
      { href: '/resources', label: 'Resources' },
    ],
  },
  { heading: 'Products', links: TIERS.map((t) => ({ href: t.href, label: t.label })) },
  {
    heading: 'Partner With Us',
    links: PARTNER_JOURNEYS.map((j) => ({ href: j.href, label: j.label })),
  },
] as const;
