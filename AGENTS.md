# AGENTS.md — Boogie Ice Creams

Operating rules for any agent working in this repository. Read this before your first edit.

## What this is
A Next.js 15 ecommerce site for Boogie Ice Creams: small-batch ice cream, sorbet and frozen desserts. Three page templates — Home, Products listing, Product detail — plus a global cart drawer and hosted checkout. The full brief is in `PRD-Boogie-Ice-Creams.md`.

## Skills
Twelve workspace skills live in `.agents/skills/`. They are the project's standards, not suggestions. Before writing code, check whether a skill covers what you are about to do:

| Doing this | Read this |
|---|---|
| Any styling, colour, type, spacing | `boogie-design-system` |
| Composing a page section | `boogie-page-blueprints` |
| Writing a component | `boogie-component-authoring` |
| Anything under `app/` | `nextjs-app-router-conventions` |
| Product data | `boogie-product-catalog` |
| Cart or checkout | `boogie-cart-and-checkout` |
| Any user-facing text | `boogie-brand-voice` |
| Any animation | `boogie-motion` |
| Metadata or JSON-LD | `boogie-seo-schema` |
| Any interactive component | `boogie-accessibility` |
| Finishing a UI milestone | `boogie-visual-qa` |
| Adding a dependency, or anything slow | `boogie-performance-budget` |

## Standing rules

1. **Server components by default.** `'use client'` is an exception you justify.
2. **Money is integers in minor units.** No floats touch a price.
3. **Prices are re-read on the server at checkout.** Client-supplied prices are ignored.
4. **No design values outside the token system.** No stray hex, no improvised spacing, no border radius.
5. **No invented content.** Never write a plausible-sounding award, certification, ingredient origin, or nutrition figure. Mark gaps `TODO(copy):` so they fail review.
6. **Accessibility is built in, not audited in.** Keyboard, focus, semantics, contrast — as you write the component.
7. **Screenshots or it didn't happen.** UI work is not done until `boogie-visual-qa` has run at 360 / 768 / 1024 / 1440.

## Working method in Antigravity

- One milestone per agent session. Long sessions drift from the blueprint.
- Produce an Implementation Plan artifact before code, and stop for review.
- Use the Browser tool and attach a Screenshots artifact for every UI milestone.
- When something is wrong twice, fix the SKILL.md rather than the symptom, then re-run.

## Commands

The repo is on **npm** (pnpm is not installed on the build machine).

```bash
npm run dev              # dev server
npm run build            # production build, prints First Load JS per route
npm run validate:catalog # Zod validation + invariants + client sign-off status
npm run typecheck        # tsc --noEmit
npm test                 # Vitest
npm run test:e2e         # Playwright: axe gate + screenshots at 4 breakpoints
npm run check:budget     # Core Web Vitals / bundle gate
npm run gen:images       # regenerate placeholder product renders
```

## Definition of done for any milestone
Types clean · catalog validates · budgets in `boogie-performance-budget` met · axe reports zero critical or serious · screenshots attached at four breakpoints · no `TODO(copy):` remaining in shipped routes.
