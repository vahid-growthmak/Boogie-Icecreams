# Antigravity Skills — Boogie Ice Creams

Twelve workspace skills. Drop the `.agents/` folder and `AGENTS.md` at the root of the Next.js repo, restart the agent session, and confirm detection in the Agent panel (or `/skills` in the Antigravity CLI).

```
boogie-ice-creams/
├── AGENTS.md
└── .agents/
    └── skills/
        ├── boogie-design-system/
        │   ├── SKILL.md
        │   └── resources/tokens.css
        ├── boogie-page-blueprints/SKILL.md
        ├── boogie-component-authoring/SKILL.md
        ├── nextjs-app-router-conventions/SKILL.md
        ├── boogie-product-catalog/
        │   ├── SKILL.md
        │   └── examples/strawberry.ts
        ├── boogie-cart-and-checkout/SKILL.md
        ├── boogie-brand-voice/SKILL.md
        ├── boogie-motion/SKILL.md
        ├── boogie-seo-schema/SKILL.md
        ├── boogie-accessibility/SKILL.md
        ├── boogie-visual-qa/SKILL.md
        └── boogie-performance-budget/
            ├── SKILL.md
            └── scripts/check-budget.sh
```

Global alternative: `~/.gemini/antigravity/skills/` if you want them across every workspace. Workspace scope is correct here — these are project-specific.

| # | Skill | Fires when | Owns |
|---|---|---|---|
| 1 | `boogie-design-system` | Any colour, type, spacing or radius decision | The nine colour tokens, the type scale, the grid, the zero-radius rule, the gold petal |
| 2 | `boogie-page-blueprints` | Composing or reordering a page section | Section-by-section recipes for all three templates, taken from the Berry's reference |
| 3 | `boogie-component-authoring` | Creating or refactoring a component | File placement, naming, server/client boundary, prop design, definition of done |
| 4 | `nextjs-app-router-conventions` | Any file under `app/` | Routing, rendering strategy, `searchParams`, metadata, route handlers, error boundaries |
| 5 | `boogie-product-catalog` | Adding a flavour or touching product data | Zod contract, integer pricing, allergen and nutrition rules, catalog query API |
| 6 | `boogie-cart-and-checkout` | Cart, drawer, checkout, webhooks | Store shape (SKUs only), hydration, price integrity, provider abstraction |
| 7 | `boogie-brand-voice` | Any user-facing string | Tone, banned words, button labels, error and empty states, alt text |
| 8 | `boogie-motion` | Any animation or transition | The only four permitted motions, reduced-motion compliance, no-CLS rule |
| 9 | `boogie-seo-schema` | Metadata or structured data | Per-route metadata, JSON-LD types, OG images, sitemap and robots |
| 10 | `boogie-accessibility` | Any interactive component | WCAG 2.2 AA patterns per component, verification loop, merge blockers |
| 11 | `boogie-visual-qa` | Finishing a UI milestone | Browser-driven screenshot rubric at four breakpoints |
| 12 | `boogie-performance-budget` | Adding a dependency, or anything slow | CWV and bundle gates, image pipeline, font loading, measurement procedure |

## Which skills each milestone pulls in

| Milestone | Skills |
|---|---|
| M0 setup and tokens | 1, 3, 4 |
| M1 layout shell | 1, 2, 3, 10 |
| M2 catalog | 5, 7 |
| M3 Home | 1, 2, 3, 7, 8, 11 |
| M4 Products listing | 2, 4, 5, 11 |
| M5 Product detail | 2, 5, 9, 10, 11 |
| M6 Cart drawer | 6, 8, 10 |
| M7 Checkout | 4, 6 |
| M8 SEO and analytics | 9, 7 |
| M9 A11y and performance | 10, 12, 11 |

## Notes on authoring more

Skills are semantically triggered by the `description` field, so descriptions are written in third person with the trigger words a request would actually contain. Each skill does one thing — that is why there are twelve rather than one large one. When the agent gets something wrong twice, the fix belongs in the SKILL.md, not in the code.
