# Nixx Storefront Site

Next.js storefront starter for Nixx 3D Printing, optimized for GitHub and Vercel.

## What It Does
- Shows a personal business homepage for Phoenix's 3D printed toys.
- Lists starter products with prices and statuses.
- Provides category filters.
- Lets visitors build a local draft cart.
- Uses inquiry checkout instead of collecting money.

## Files
| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage route |
| `src/components/Storefront.tsx` | Product filters, draft cart, inquiry summary |
| `src/data/products.ts` | Product catalog data |
| `src/content/brand.ts` | Brand/contact data |
| `src/app/globals.css` | Responsive design system and layout |
| `DESIGN.md` | Design source of truth |
| `public/images/hero-3d-toys.png` | Generated hero/product image |
| `public/images/phoenix-logo.png` | Existing Nix/Phoenix logo asset |

## Local Development
```powershell
npm install
npm run dev
```

Production check:

```powershell
npm run lint
npm run build
```

## Deployment
This project is set up for Vercel with `framework: nextjs` in `vercel.json`. Pushes to the GitHub default branch should auto-deploy after the Vercel project is connected.

## Before Launch
- Replace starter product data with real inventory.
- Add real product photos.
- Choose checkout path: inquiry only, Stripe Payment Links, Square, Shopify, or another provider.
- Add shipping, pickup, returns, and safety policies.
- Set the final domain and Open Graph URL.
