# Design reference

Full-page captures of the three sites used as the visual blueprint for this
build. They are referenced by name throughout the components — "the Berry's
blueprint" in the original section order, the Novella trust band, the Sandra
category tiles — so they are kept in the repo rather than left on one machine.

| File | Site | What it was used for |
| --- | --- | --- |
| `award-winning-luxury-ice-cream-berrys-luxury-ice-cream.webp` | Berry's Luxury Ice Cream | Section order, centred-wordmark header bar, best-seller strip |
| `novella.webp` | Novella | Full-bleed trust band, gold circular seals |
| `home-sandra.webp` | Sandra | Edge-to-edge category tiles with overlaid labels |

These informed the **D2C storefront** that preceded the Boogies sitemap rebuild.
They are no longer the target design — the site is now a distributor-acquisition
property per `Sitemap/` — but they explain why the earlier structure looked the
way it did, and several tokens in `app/globals.css` still derive from them.

## Format

Converted from the original PNG captures to WebP at quality 90. Same pixel
dimensions (3360px wide), visually indistinguishable at 1:1 including body text,
and 3.8MB in total rather than 50MB. The 50MB originals stay on disk and remain
git-ignored; nothing is lost by regenerating them from source if ever needed.
