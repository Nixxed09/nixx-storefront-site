# Ecosystem Wiring

This site should stay simple until each integration is real. Use local hooks and clear data boundaries first, then swap in live services.

## Current Wiring

| Need | Current site implementation | Future TE-Code source |
|------|-----------------------------|-----------------------|
| Product catalog | `src/data/products.ts` plus WordPress catalog lane chips | `openbazaar-ai` marketplace/funnel data model or WooCommerce export |
| Product visuals | Optimized local photos in `public/images/products/` | `image-engine` generated product photos/mockups when local photos are missing |
| Draft cart | React state in `src/components/Storefront.tsx`, mailto inquiry | Stripe/Square/Shopify or OpenBazaar flow |
| Guided shopping | Local picker in `Storefront.tsx` | `conversos` mission/widget |
| Analytics | LocalStorage, `window.dataLayer`, and `nixx:storefront-event` | AnalyticsOS or MarketingOS ingestion |
| Campaigns | Manual launch copy and Nix Games brand bridge | `MarketingOS` brand/campaign config |
| Product ideas | Static product list | `TrendOS` signals, `ProductOS` prioritization |
| Phoenix brand | Local `D:\Phoenix\nix-code\nix-games-site` palette/type/world cues | Shared Phoenix/Nix brand package later |

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

## Local Asset Sources Added

| Source | Use | App destination |
|--------|-----|-----------------|
| `D:\Phoenix\3D Print\Pictures\Dummy 13 - 5.5.25\Dummy-13` | Real Dummy 13 product photography | `public/images/products/` optimized JPGs |
| `D:\Phoenix\logo\favicon_io` | Browser icons and manifest | `public/favicon.ico`, `public/apple-touch-icon.png`, `public/android-chrome-*.png`, `public/site.webmanifest` |

Original product photos are 7-21 MB each, so do not serve them directly. Create web-sized derivatives around 1600px wide/high and keep them under roughly 250 KB where possible.

Current optimized image mapping:

| App image | Source photo |
|-----------|--------------|
| `hero-action.jpg` | `Nix-d13-13.jpg` |
| `guardian-mint.jpg` | `Nix-d13-01.jpg` |
| `sports-skate.jpg` | `Nix-d13-08.jpg` |
| `shadow-squad.jpg` | `Nix-d13-24.jpg` |
| `starter-squad.jpg` | `Nix-d13-40.jpg` |
| `accessory-pack.jpg` | `Nix-d13-10.jpg` |
