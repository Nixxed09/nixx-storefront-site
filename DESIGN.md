---
name: Nixx Storefront
mode: marketing
concept: heroic game world meets parent-safe maker counter
audience: kids, parents, gift buyers, local supporters
tokens:
  colors:
    ink: "#151312"
    paper: "#fbf7ef"
    panel: "#fffdf8"
    phoenixPrimary: "#ff4500"
    phoenixSecondary: "#ff6600"
    phoenixGold: "#ffd700"
    ember: "#f15a24"
    mint: "#26a69a"
    blueberry: "#4056f4"
    lemon: "#ffd166"
    clay: "#a8552b"
  radius:
    card: 8px
    control: 6px
    pill: 999px
  type:
    display: "Orbitron"
    body: "Rajdhani"
---

# Nixx Storefront Design

## Overview
The storefront is Phoenix's physical-product bridge from Nix Games into Dummy 13 toys. The tension is heroic fire-world energy plus clear parent trust. The target 50ms feeling is confidence: this is made by a kid with a real creative universe, but the order path is controlled, readable, and adult-reviewed.

## Colors
Use warm paper and ink as the main shop environment. Phoenix orange, secondary orange, and gold come from Nix Games and should appear in the hero proof, primary buttons, brand bridge, and active states. Mint, blueberry, lemon, and clay are toy-plastic accents for categories and product identity.

## Typography
Orbitron carries the Nix Games title energy for headings and brand marks. Rajdhani carries readable product copy and keeps the storefront connected to the gaming site without loading the page with hard sci-fi styling. Letter spacing remains neutral.

## Layout
Use varied rhythms: hero with real product photo, compact stats band, two-column story, dark Nix Games bridge, product grid, guided picker, story cards, custom request split, process list, and maker bench. Do not stack repeated card grids without a section rhythm change.

## Elevation & Depth
The shop uses tactile cards with small shadows and 8px radii. The Nix Games bridge is the only dark/glow-heavy band. Product cards can lift on hover, but checkout and inquiry controls must remain calm and predictable.

## Components
- Product grid: static catalog with category filters, price, status, print time, age/safety note, and local product photos.
- Catalog lanes: compact chips that preserve the breadth from the existing WordPress/WooCommerce catalog.
- Guided picker: a local recommendation flow that can later become a Conversos mission.
- Draft cart: inquiry-first cart with no payment collection.
- Brand bridge: connects Light Warrior, Empire Flow, and Dummy 13 into one Phoenix ecosystem.
- Event hooks: local analytics events for future MarketingOS or AnalyticsOS ingestion.

## Motion
Use motivated motion only: button lift, product image zoom, active picker state, drawer slide, and hover elevation. Respect reduced-motion globally.

## Accessibility
Maintain high contrast, visible focus states, real buttons for filters and picker choices, `aria-pressed` for active controls, `aria-expanded` for the cart, descriptive image alt text, and a skip link. The cart is intentionally inquiry-first until payment and safety policies are finalized.

## Do's and Don'ts
Do show real product photos and real catalog categories. Do keep Phoenix's game-world language visible. Do make parent review and small-parts safety explicit. Do not add a fake checkout. Do not make the entire storefront dark/fire-themed. Do not use generic AI or stock imagery when local product pictures exist.

## Reference Implementations
- Nix Games supplies the Phoenix orange/gold palette, Orbitron/Rajdhani type direction, heroic world language, and dark glow bridge.
- The current WordPress/WooCommerce site supplies catalog breadth and product naming patterns.
- Glacier Ice Cream informs the client-site structure and inquiry path.
- OpenBazaar AI informs the starter-to-bundle-to-custom funnel shape.
- Image Engine owns future generated product mockups only when local photos are missing.
