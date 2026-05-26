# Nixx Storefront Site

Static storefront starter for Nixx 3D Printing, Phoenix's 3D printed toy shop.

## What It Does
- Shows a product-first homepage using Phoenix's toy image and logo.
- Lists starter products with prices, print notes, age/safety notes, and statuses.
- Provides category filters and a local guided picker.
- Lets visitors build a local draft cart.
- Uses inquiry checkout instead of collecting money.
- Emits local storefront events to `localStorage`, `window.dataLayer`, and `nixx:storefront-event` for future analytics wiring.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Static storefront page |
| `style.css` | Responsive design system and layout |
| `script.js` | Product catalog, filters, picker, draft cart, event hooks |
| `DESIGN.md` | Design source of truth |
| `assets/images/hero-3d-toys.png` | Hero/product image |
| `assets/images/phoenix-logo.png` | Nix/Phoenix logo asset |
| `docs/ECOSYSTEM-WIRING.md` | How TE-Code tools connect later |

## Local Development
Open `index.html` directly, or serve the folder:

```powershell
cd D:\Phoenix\nix-code\nixx-storefront-site
python -m http.server 4177
```

Then open `http://localhost:4177`.

## Ecosystem Path
- Product images and mockups: `D:\TE-Code\image-engine`
- Storefront/client-site patterns: `D:\TE-Code\clients\glacier-ice-cream`
- Funnel logic: `D:\TE-Code\openbazaar-ai`
- Campaigns and launches: `D:\TE-Code\MarketingOS`
- Guided assistant/chat: `D:\TE-Code\conversos`
- Idea pipeline: `D:\TE-Code\TrendOS` and `D:\TE-Code\ProductOS`

## Before Launch
- Replace starter product names with real product names.
- Add one photo per product.
- Set parent-approved contact email.
- Add pickup/shipping, returns, and safety policies.
- Choose checkout path: inquiry only, Stripe Payment Links, Square, Shopify, or another provider.
