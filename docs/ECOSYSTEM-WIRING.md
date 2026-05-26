# Ecosystem Wiring

This site should stay simple until each integration is real. Use local hooks and clear data boundaries first, then swap in live services.

## Current Wiring

| Need | Current site implementation | Future TE-Code source |
|------|-----------------------------|-----------------------|
| Product catalog | `src/data/products.ts` | `openbazaar-ai` marketplace/funnel data model |
| Product visuals | Hero image in `public/images/` and generated color cards | `image-engine` generated product photos/mockups |
| Draft cart | React state in `src/components/Storefront.tsx`, mailto inquiry | Stripe/Square/Shopify or OpenBazaar flow |
| Guided shopping | Not wired yet | `conversos` mission/widget |
| Analytics | Not wired yet | AnalyticsOS or MarketingOS ingestion |
| Campaigns | Manual launch copy | `MarketingOS` brand/campaign config |
| Product ideas | Static product list | `TrendOS` signals, `ProductOS` prioritization |

## Event Contract

Future client-side events should use this shape:

```js
{
  type: "draft_cart_add",
  payload: { productId: "hero-snap", source: "card", funnel: "starter" },
  source: "nixx-storefront-site",
  at: "2026-05-26T00:00:00.000Z"
}
```

Recommended destinations:
- `window.dataLayer`
- `window.dispatchEvent(new CustomEvent("nixx:storefront-event"))`
- a first-party ingestion route if AnalyticsOS or MarketingOS is connected

## Next Practical Steps

1. Photograph each real print and replace repeated `hero-3d-toys.png` card imagery.
2. Keep product data in `src/data/products.ts` until a CMS or inventory source is real.
3. Add a parent-approved form endpoint before using paid ads or public campaigns.
4. Convert the guided picker into a Conversos mission after product categories are stable.
5. Add MarketingOS brand config only after contact email, safety policy, and product names are final.
