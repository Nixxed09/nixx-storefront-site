---
name: Nixx Storefront
mode: marketing
concept: toy workshop meets product counter
audience: kids, parents, gift buyers, local supporters
tokens:
  colors:
    ink: "#151312"
    paper: "#fbf7ef"
    panel: "#fffdf8"
    ember: "#f15a24"
    mint: "#26a69a"
    blueberry: "#4056f4"
    lemon: "#ffd166"
    clay: "#a8552b"
  radius:
    card: 8px
    control: 6px
  type:
    display: "Trebuchet MS"
    body: "Arial"
---

# Nixx Storefront Design

## Concept
Toy workshop meets product counter. The site should make the products feel real: printed parts, color batches, price tags, and a maker behind the work.

## Tension
Playful creator energy plus clear small-business trust.

## Visual Direction
Light, tactile, and colorful. Use warm paper backgrounds, dark readable text, and saturated accents from toy plastic. Avoid making the site look like the fire-heavy Nix Games brand.

## Layout
First viewport shows the business name, product promise, and 3D printed toys. Product browsing comes immediately after. Supporting sections explain custom orders, process, and contact.

## Motion
Small, useful motion only: button press feedback, cart updates, filter changes, and subtle product hover lift. Respect reduced motion.

## Accessibility
High contrast text, visible focus states, real buttons for filters/cart actions, semantic sections, and descriptive image alt text.


## Feature Modules
- Product grid: static catalog with category filters, price, status, print time, and age/safety note.
- Guided picker: local product recommendation flow that can later become a Conversos mission.
- Draft cart: inquiry-first cart with no payment collection.
- Event hooks: local analytics events for future MarketingOS or AnalyticsOS ingestion.

## Reference Implementations
- Glacier Ice Cream informs the client-site structure and inquiry path.
- OpenBazaar AI informs the starter -> bundle -> custom funnel shape.
- Image Engine owns future product photos, mockups, and thumbnails.
- MarketingOS should only be wired after contact, safety, and product policy details are final.
