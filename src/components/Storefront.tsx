"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { brand } from "@/content/brand";
import { products, type Product, type ProductCategory } from "@/data/products";

type Filter = "all" | ProductCategory;
type Cart = Record<string, number>;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Figures", value: "figures" },
  { label: "Accessories", value: "accessories" },
  { label: "Custom", value: "custom" },
];

function money(value: number) {
  return `$${value}`;
}

function cartEntries(cart: Cart) {
  return Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((item) => item.id === id),
      quantity,
    }))
    .filter((entry): entry is { product: Product; quantity: number } =>
      Boolean(entry.product),
    );
}

export function Storefront() {
  const [filter, setFilter] = useState<Filter>("all");
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((product) => product.category === filter),
    [filter],
  );

  const entries = cartEntries(cart);
  const totalItems = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const total = entries.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0,
  );

  const inquiryBody =
    entries.length > 0
      ? `${entries
          .map(
            (entry) =>
              `${entry.quantity} x ${entry.product.name} (${money(
                entry.product.price,
              )} each)`,
          )
          .join("\n")}\n\nEstimated total: ${money(total)}`
      : "I want to ask about Nixx 3D Printing products.";

  const inquiryHref = `mailto:${brand.contactEmail}?subject=${encodeURIComponent(
    "Nixx 3D Printing order inquiry",
  )}&body=${encodeURIComponent(inquiryBody)}`;

  function addToCart(id: string) {
    setCart((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1,
    }));
    setCartOpen(true);
  }

  function removeFromCart(id: string) {
    setCart((current) => {
      const nextQuantity = (current[id] ?? 0) - 1;
      const next = { ...current };
      if (nextQuantity > 0) {
        next[id] = nextQuantity;
      } else {
        delete next[id];
      }
      return next;
    });
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Nixx 3D Printing home">
          <Image src="/images/phoenix-logo.png" alt="" width={40} height={40} />
          <span>{brand.name}</span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#custom">Custom</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="cart-pill"
          type="button"
          onClick={() => setCartOpen((open) => !open)}
          aria-label="Open draft cart"
        >
          Cart <span>{totalItems}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Printed, snapped, and packed by Phoenix</p>
            <h1>3D printed toys with real maker energy.</h1>
            <p className="hero-text">
              Shop snap-fit figures, pocket accessories, color drops, and custom
              print ideas from a small creative workshop.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#shop">
                Shop starter drops
              </a>
              <a className="button secondary" href="#custom">
                Request a custom print
              </a>
            </div>
          </div>
          <figure className="hero-media">
            <Image
              src="/images/hero-3d-toys.png"
              alt="Colorful 3D printed snap-fit toys on a maker workbench"
              width={1024}
              height={1024}
              priority
            />
          </figure>
        </section>

        <section className="stats-strip" aria-label="Store highlights">
          <div>
            <strong>$10</strong>
            <span>starter toys</span>
          </div>
          <div>
            <strong>4</strong>
            <span>launch squads</span>
          </div>
          <div>
            <strong>Custom</strong>
            <span>print ideas welcome</span>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <p className="eyebrow">Starter shop</p>
            <h2>Pick a print batch</h2>
            <p>
              These starter listings are ready for real names, photos, colors,
              and availability as products are finalized.
            </p>
          </div>

          <div className="filters" aria-label="Product filters">
            {filters.map((item) => (
              <button
                className={`filter ${filter === item.value ? "active" : ""}`}
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className="product-art"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}, #151312)`,
                  }}
                >
                  {product.name}
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <span className="price">{money(product.price)}</span>
                  <span className="status">{product.status}</span>
                </div>
                <button
                  className="add-button"
                  type="button"
                  onClick={() => addToCart(product.id)}
                >
                  Add to draft cart
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="custom-section" id="custom">
          <div>
            <p className="eyebrow">Custom prints</p>
            <h2>Have an idea for a toy, desk thing, or game prop?</h2>
          </div>
          <div className="custom-panel">
            <p>
              Send the idea, size, colors, and when you need it. Phoenix can
              review what is printable, what needs support, and what should be
              simplified before pricing.
            </p>
            <a
              className="button primary"
              href={`mailto:${brand.contactEmail}?subject=${encodeURIComponent(
                "Nixx 3D Printing custom request",
              )}`}
            >
              Start a custom request
            </a>
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2>Simple enough to run now, ready to upgrade later</h2>
          </div>
          <ol className="process-list">
            <li>
              <strong>Choose a drop.</strong>
              <span>Pick from available starter toys or build a draft cart.</span>
            </li>
            <li>
              <strong>Send the inquiry.</strong>
              <span>The site prepares a message instead of collecting payment.</span>
            </li>
            <li>
              <strong>Print and pack.</strong>
              <span>
                Products can move to real checkout after pricing, shipping, and
                inventory are final.
              </span>
            </li>
          </ol>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Business base</p>
            <h2>{brand.name}</h2>
            <p>Built for toys, custom prints, future drops, and a real storefront path.</p>
          </div>
          <a
            className="button secondary"
            href={brand.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </section>
      </main>

      <aside
        className={`cart-drawer ${cartOpen ? "open" : ""}`}
        aria-label="Draft cart"
        aria-hidden={!cartOpen}
      >
        <div className="cart-header">
          <h2>Draft cart</h2>
          <button type="button" onClick={() => setCartOpen(false)}>
            Close
          </button>
        </div>
        <div className="cart-items">
          {entries.length === 0 ? (
            <p>Your draft cart is empty.</p>
          ) : (
            entries.map((entry) => (
              <div className="cart-row" key={entry.product.id}>
                <div>
                  <strong>{entry.product.name}</strong>
                  <span>
                    {entry.quantity} x {money(entry.product.price)}
                  </span>
                </div>
                <button type="button" onClick={() => removeFromCart(entry.product.id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          <span>Estimated total</span>
          <strong>{money(total)}</strong>
        </div>
        <a className="button primary full" href={inquiryHref}>
          Send inquiry
        </a>
        <p className="cart-note">No payment is collected on this starter site.</p>
      </aside>
    </>
  );
}
