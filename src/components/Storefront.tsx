"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/brand";
import { products, type Product, type ProductCategory } from "@/data/products";

type Filter = "all" | ProductCategory;
type Cart = Record<string, number>;
type StorefrontEvent = {
  type: string;
  payload: Record<string, unknown>;
  source: "nixx-storefront-site";
  at: string;
};

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Figures", value: "figures" },
  { label: "Accessories", value: "accessories" },
  { label: "Bundles", value: "bundles" },
  { label: "Custom", value: "custom" },
];

const categoryLabels: Record<ProductCategory, string> = {
  figures: "figures",
  accessories: "gear",
  bundles: "bundles",
  custom: "custom",
};

const phoenixWorlds = [
  {
    title: "Light Warrior",
    label: "Hero lane",
    text: "Protection, courage, and shadow-boss stories from the Nix Games universe.",
  },
  {
    title: "Empire Flow",
    label: "Builder lane",
    text: "Automation, base-building, and resource strategy turned into gear packs and missions.",
  },
  {
    title: "Dummy 13",
    label: "Toy lane",
    text: "Snap-fit figures with colorways, helmets, hands, wings, stands, and character drops.",
  },
];

const catalogLanes = [
  "Base kits",
  "Hero helmets",
  "Football hands",
  "Octopus arms",
  "Wings",
  "Skateboards",
  "Guitars",
  "Minecraft packs",
  "Display stands",
];

const pickerMap = {
  gift: {
    productId: "starter-squad",
    label: "Gift for a kid",
    title: "Starter Squad Bundle",
    text: "Best first gift path: one small bundle, clear color choice, and parent review before printing.",
  },
  desk: {
    productId: "angel-of-peace",
    label: "Display hero",
    title: "Angel of Peace",
    text: "Best display path: a story-rich guardian figure with a strong silhouette and gift-ready presence.",
  },
  game: {
    productId: "builders-tool-pack",
    label: "Gear or game prop",
    title: "Hero Gear Pack",
    text: "Best game path: extra gear, tools, and parts that connect the figures to missions and tabletop ideas.",
  },
  idea: {
    productId: "custom-hero",
    label: "Custom idea",
    title: "Custom Hero Request",
    text: "Best custom path: describe the hero, colors, gear, motto, and timing so Phoenix can check printability.",
  },
} satisfies Record<string, { productId: string; label: string; title: string; text: string }>;

type PickerKey = keyof typeof pickerMap;

declare global {
  interface Window {
    dataLayer?: StorefrontEvent[];
  }
}

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

function trackStorefrontEvent(type: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const event: StorefrontEvent = {
    type,
    payload,
    source: "nixx-storefront-site",
    at: new Date().toISOString(),
  };

  const key = "nixx_storefront_events";
  let current: StorefrontEvent[] = [];
  try {
    const stored = window.localStorage.getItem(key);
    current = stored ? (JSON.parse(stored) as StorefrontEvent[]) : [];
  } catch {
    current = [];
  }
  window.localStorage.setItem(key, JSON.stringify([...current, event].slice(-50)));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent("nixx:storefront-event", { detail: event }));
}

export function Storefront() {
  const [filter, setFilter] = useState<Filter>("all");
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [pickerKey, setPickerKey] = useState<PickerKey | null>(null);

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
              )} each, ${entry.product.printTime}, ${entry.product.ageNote})`,
          )
          .join("\n")}\n\nEstimated total: ${money(
          total,
        )}\n\nNotes: Please confirm colors, timing, pickup/shipping, and small-parts safety before printing.`
      : "I want to ask about Nixx 3D Printing products.";

  const inquiryHref = `mailto:${brand.contactEmail}?subject=${encodeURIComponent(
    "Nixx 3D Printing order inquiry",
  )}&body=${encodeURIComponent(inquiryBody)}`;

  const picker = pickerKey ? pickerMap[pickerKey] : null;
  const pickerProduct = picker
    ? products.find((product) => product.id === picker.productId)
    : null;

  function addToCart(id: string, source = "card") {
    const product = products.find((item) => item.id === id);
    setCart((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1,
    }));
    setCartOpen(true);
    trackStorefrontEvent("draft_cart_add", {
      productId: id,
      source,
      funnel: product?.funnel,
    });
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
    trackStorefrontEvent("draft_cart_remove", { productId: id });
  }

  function chooseFilter(value: Filter) {
    setFilter(value);
    trackStorefrontEvent("product_filter", { category: value });
  }

  function choosePicker(value: PickerKey) {
    setPickerKey(value);
    trackStorefrontEvent("guided_picker_select", {
      pick: value,
      productId: pickerMap[value].productId,
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
          <a href="#picker">Picker</a>
          <a href="#custom">Custom</a>
          <a href="#process">Process</a>
          <a href={brand.gamesSite} target="_blank" rel="noopener noreferrer">
            Games
          </a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="cart-pill"
          type="button"
          onClick={() => {
            setCartOpen((open) => {
              trackStorefrontEvent("draft_cart_toggle", { open: !open });
              return !open;
            });
          }}
          aria-label="Open draft cart"
          aria-expanded={cartOpen}
        >
          Cart <span>{totalItems}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Printed, snapped, and packed by Phoenix</p>
            <h1>Dummy 13 heroes from Phoenix&apos;s world.</h1>
            <p className="hero-text">
              Phoenix is a kid builder, football dreamer, gamer, and storyteller.
              Nixx turns his characters into snap-fit figures, gear packs,
              starter squads, and custom hero ideas.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#shop">
                Shop starter drops
              </a>
              <a className="button secondary" href="#picker">
                Find the right print
              </a>
            </div>
            <div className="hero-proof" aria-label="Store notes">
              <span>Parent-approved inquiry flow</span>
              <span>Nix Games energy</span>
              <span>No payment collected here</span>
              <span>Small parts warning included</span>
            </div>
          </div>
          <figure className="hero-media">
            <Image
              src="/images/products/hero-action.jpg"
              alt="Colorful 3D printed snap-fit toys on a maker workbench"
              width={1024}
              height={1024}
              priority
            />
          </figure>
        </section>

        <section className="stats-strip" aria-label="Store highlights">
          <div>
            <strong>32+</strong>
            <span>catalog ideas ready to sort</span>
          </div>
          <div>
            <strong>Nix Games</strong>
            <span>brand language carried over</span>
          </div>
          <div>
            <strong>Dummy 13</strong>
            <span>heroes, gear, and bundles</span>
          </div>
        </section>

        <section className="story-section" aria-labelledby="story-heading">
          <div className="story-lead">
            <p className="eyebrow">Why Nixx exists</p>
            <h2 id="story-heading">Phoenix builds worlds, not just toys.</h2>
          </div>
          <div className="story-copy">
            <p>{brand.makerStory}</p>
            <p>
              Each Dummy 13 figure can grow into a mini legend: a name, motto,
              class, signature gear, origin story, and a challenge that teaches
              courage, creativity, grit, or kindness.
            </p>
          </div>
        </section>

        <section className="world-section" aria-labelledby="world-heading">
          <div className="world-copy">
            <p className="eyebrow">Phoenix brand bridge</p>
            <h2 id="world-heading">The toy shop should feel connected to the games.</h2>
            <p>
              Nix Games brings the fire, glow, and heroic language. Nixx 3D
              Printing turns that energy into physical characters parents can
              understand and kids can actually play with.
            </p>
            <a
              className="button secondary inverted"
              href={brand.gamesSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Nix Games
            </a>
          </div>
          <div className="world-stack">
            {phoenixWorlds.map((world) => (
              <article key={world.title}>
                <span>{world.label}</span>
                <h3>{world.title}</h3>
                <p>{world.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <p className="eyebrow">Starter shop</p>
            <h2>Pick a print batch</h2>
            <p>
              These starter listings are set up like collectible character drops:
              clear category, print status, estimated price, safety note, and a
              draft-cart inquiry path.
            </p>
          </div>

          <div className="filters" aria-label="Product filters">
            {filters.map((item) => (
              <button
                className={`filter ${filter === item.value ? "active" : ""}`}
                key={item.value}
                type="button"
                onClick={() => chooseFilter(item.value)}
                aria-pressed={filter === item.value}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="catalog-lanes" aria-label="Catalog lanes">
            {catalogLanes.map((lane) => (
              <span key={lane}>{lane}</span>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.length === 0 ? (
              <p className="empty-state">No products match this filter yet.</p>
            ) : null}
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className="product-art"
                  style={{ "--product-color": product.color } as CSSProperties}
                >
                  <Image
                    src={product.image}
                    alt="Colorful 3D printed toys on a workbench"
                    width={640}
                    height={480}
                    sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                  <span>{categoryLabels[product.category]}</span>
                </div>
                <div className="product-copy">
                  <span className="status">{product.status}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="product-specs" aria-label="Product details">
                  <span>{product.printTime}</span>
                  <span>{product.ageNote}</span>
                </div>
                <div className="product-meta">
                  <span className="price">{money(product.price)}</span>
                  <span className="status">{product.funnel}</span>
                </div>
                <button
                  className="add-button"
                  type="button"
                  onClick={() => addToCart(product.id)}
                >
                  Add to draft cart
                </button>
                <Link className="detail-link" href={`/products/${product.id}`}>
                  View character page
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="picker-section" id="picker">
          <div className="section-heading">
            <p className="eyebrow">Guided picker</p>
            <h2>Not sure what to choose?</h2>
            <p>
              Pick the kind of gift or project, and the site will suggest a
              starter drop. This stays local for now and can become a real chat
              helper later.
            </p>
          </div>
          <div className="picker-layout">
            <div className="picker-options" aria-label="Product picker choices">
              {(Object.entries(pickerMap) as [PickerKey, (typeof pickerMap)[PickerKey]][]).map(
                ([key, item]) => (
                  <button
                    className={pickerKey === key ? "active" : ""}
                    key={key}
                    type="button"
                    onClick={() => choosePicker(key)}
                    aria-pressed={pickerKey === key}
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>
            <article className="picker-result">
              <span className="status">{picker ? "Suggested path" : "Start here"}</span>
              <h3>{picker?.title ?? "Choose a path"}</h3>
              <p>
                {picker?.text ??
                  "Answer one quick prompt to get a product suggestion and a cleaner inquiry message."}
              </p>
              {pickerProduct ? (
                <button
                  className="add-button"
                  type="button"
                  onClick={() => addToCart(pickerProduct.id, "picker")}
                >
                  Add {pickerProduct.name}
                </button>
              ) : null}
            </article>
          </div>
        </section>

        <section className="storybook-section" aria-labelledby="storybook-heading">
          <div className="section-heading">
            <p className="eyebrow">Character books</p>
            <h2 id="storybook-heading">The next upgrade is story.</h2>
            <p>
              The Phoenix docs make the best product idea clear: every figure
              should have a life beyond the print. Stories make the toys more
              collectible, more personal, and easier for kids to imagine with.
            </p>
          </div>
          <div className="story-card-grid">
            <article>
              <span>01</span>
              <h3>Origin</h3>
              <p>Where the hero came from, what zone they protect, and why they matter.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Gear</h3>
              <p>Helmet, weapon, armor, tool pack, special move, and power-up moment.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Lesson</h3>
              <p>A challenge that ends with courage, cleverness, kindness, or grit.</p>
            </article>
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
              review what is printable, what needs support, what should be
              simplified, whether the finished print has small parts, and what
              kind of story the character should carry.
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
              <strong>Confirm the details.</strong>
              <span>
                Colors, pickup or shipping, timing, and small-parts safety get
                checked before printing.
              </span>
            </li>
          </ol>
        </section>

        <section className="bench-section" aria-label="Maker bench">
          <div className="bench-copy">
            <p className="eyebrow">Maker bench</p>
            <h2>Built around Phoenix&apos;s actual creative lanes.</h2>
            <p>
              The store can connect to his games, Dummy 13 stories, football
              heroes, and future books. As new prints are photographed, each card
              can get its own picture, colorway, print time, availability note,
              and origin-story link.
            </p>
            <a
              className="button secondary"
              href={brand.gamesSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Play Nix Games
            </a>
          </div>
          <Image
            src="/images/phoenix-logo.png"
            alt="Phoenix logo for Nix projects"
            width={260}
            height={260}
          />
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Business base</p>
            <h2>{brand.name}</h2>
            <p>
              Built for toys, custom prints, future drops, and a real storefront
              path. Recommended for ages 6+ with adult review for small parts.
              Made to prove kids can build amazing things, not just play with them.
            </p>
          </div>
          <div className="contact-actions">
            <a
              className="button secondary"
              href={brand.gamesSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Nix Games
            </a>
            <a
              className="button secondary"
              href={brand.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
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
          <strong role="status">{money(total)}</strong>
        </div>
        <a
          className="button primary full"
          href={inquiryHref}
          onClick={() =>
            trackStorefrontEvent("inquiry_started", {
              items: entries.map((entry) => entry.product.id),
            })
          }
        >
          Send inquiry
        </a>
        <p className="cart-note">No payment is collected on this starter site.</p>
      </aside>
    </>
  );
}


