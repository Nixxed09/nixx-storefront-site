"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/brand";
import { faqs } from "@/data/faqs";
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

const filterCounts: Record<Filter, number> = {
  all: products.length,
  figures: products.filter((product) => product.category === "figures").length,
  accessories: products.filter((product) => product.category === "accessories").length,
  bundles: products.filter((product) => product.category === "bundles").length,
  custom: products.filter((product) => product.category === "custom").length,
};

const categoryLabels: Record<ProductCategory, string> = {
  figures: "figure",
  accessories: "accessory",
  bundles: "bundle",
  custom: "custom",
};

const funnelLabels: Record<Product["funnel"], string> = {
  starter: "Starter pick",
  gift: "Gift pick",
  game: "Play add-on",
  bundle: "Gift set",
  custom: "Custom request",
};

const phoenixWorlds = [
  {
    title: "Characters",
    label: "Story",
    text: "Each figure can have a name, role, motto, challenge, and origin story.",
  },
  {
    title: "Missions",
    label: "Play",
    text: "Gear packs and team ideas give each figure a reason to move, battle, explore, or protect.",
  },
  {
    title: "Printed Toys",
    label: "Build",
    text: "Snap-fit figures can be printed with different colors, helmets, hands, wings, stands, and accessories.",
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
    productId: "starter-action-set",
    label: "Gift for a kid",
    title: "Starter Action Set",
    text: "A strong first gift with several characters, bright colors, action poses, and details confirmed before printing.",
  },
  desk: {
    productId: "angel-of-peace",
    label: "Display hero",
    title: "Angel of Peace",
    text: "Best for display: a winged guardian figure with a clear story and a bold shelf-ready pose.",
  },
  game: {
    productId: "builders-tool-pack",
    label: "Gear or game prop",
    title: "Hero Gear Pack",
    text: "A useful add-on for play: extra gear, tools, and parts that connect figures to missions and tabletop games.",
  },
  idea: {
    productId: "custom-hero",
    label: "Custom idea",
    title: "Custom Hero Request",
    text: "Start here for a custom figure. Share the idea, colors, gear, size, and timing so Phoenix can review what is printable.",
  },
} satisfies Record<string, { productId: string; label: string; title: string; text: string }>;

type PickerKey = keyof typeof pickerMap;

declare global {
  interface Window {
    dataLayer?: StorefrontEvent[];
  }
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
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
  const cartDrawerRef = useRef<HTMLElement | null>(null);
  const cartCloseRef = useRef<HTMLButtonElement | null>(null);
  const cartOpenerRef = useRef<HTMLElement | null>(null);

  const visibleProducts = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((product) => product.category === filter),
    [filter],
  );
  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured),
    [],
  );

  const entries = cartEntries(cart);
  const totalItems = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const total = entries.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0,
  );

  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    document.body.classList.add("scroll-locked");
    cartCloseRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
      }

      if (event.key === "Tab") {
        const drawer = cartDrawerRef.current;
        if (!drawer) {
          return;
        }

        const focusable = Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first || !last) {
          return;
        }

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("scroll-locked");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cartOpen]);

  const inquiryBody =
    entries.length > 0
      ? `${entries
          .map(
            (entry) =>
              `${entry.quantity} x ${entry.product.name} (${money(
                entry.product.price,
              )} each, line estimate ${money(
                entry.product.price * entry.quantity,
              )}, ${entry.product.printTime}, ${entry.product.ageNote})`,
          )
          .join("\n")}\n\nEstimated inquiry total before custom changes: ${money(
          total,
        )}\n\nNotes: Please confirm colors, timing, pickup or shipping, final price, and small-parts safety before printing.`
      : "I want to ask about Nixx 3D Printing prints.";

  const inquiryHref = `mailto:${brand.contactEmail}?subject=${encodeURIComponent(
    "Nixx 3D Printing order inquiry",
  )}&body=${encodeURIComponent(inquiryBody)}`;

  const picker = pickerKey ? pickerMap[pickerKey] : null;
  const pickerProduct = picker
    ? products.find((product) => product.id === picker.productId)
    : null;

  function addToCart(id: string, source = "card") {
    const product = products.find((item) => item.id === id);
    cartOpenerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
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

  function openCart(event: MouseEvent<HTMLElement>) {
    cartOpenerRef.current = event.currentTarget;
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
    window.requestAnimationFrame(() => {
      cartOpenerRef.current?.focus();
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
      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">3D printed toys by Phoenix</p>
            <h1>Dummy 13 figures with stories, gear, and custom options.</h1>
            <div className="hero-actions">
              <a className="button primary" href="#shop">
                Browse Prints
              </a>
              <a className="button secondary" href="#picker">
                Help Me Choose
              </a>
              <button
                className="cart-pill"
                type="button"
                onClick={(event) => {
                  if (cartOpen) {
                    closeCart();
                    trackStorefrontEvent("draft_cart_toggle", { open: false });
                  } else {
                    openCart(event);
                    trackStorefrontEvent("draft_cart_toggle", { open: true });
                  }
                }}
                aria-label="Open inquiry list"
                aria-expanded={cartOpen}
              >
                Inquiry List <span>{totalItems}</span>
              </button>
            </div>
            <div className="hero-proof" aria-label="Store notes">
              <span>Parent-reviewed inquiries</span>
              <span>Linked to Nix Games</span>
              <span>Ask first, pay after details are confirmed</span>
              <span>Small-parts notes included</span>
            </div>
          </div>
          <figure className="hero-media">
            <Image
              src="/images/products/polished/starter-action-set.jpg"
              alt="Group of Dummy 13 figures including skateboard, blaster, staff, and mini heroes"
              width={1024}
              height={1024}
              priority
            />
          </figure>
        </section>

        <section className="stats-strip" aria-label="Store highlights">
          <div>
            <strong>{products.length}</strong>
            <span>prints available for inquiry</span>
          </div>
          <div>
            <strong>Nix Games</strong>
            <span>games, stories, and toys connected</span>
          </div>
          <div>
            <strong>Dummy 13</strong>
            <span>figures, gear, and gift sets</span>
          </div>
        </section>

        <section className="story-section" aria-labelledby="story-heading">
          <div className="story-lead">
            <h2 id="story-heading">
              My name is Phoenix and I am a dedicated kid planning for a bright
              future.
            </h2>
          </div>
        </section>

        <section className="world-section" aria-labelledby="world-heading">
          <div className="world-copy">
            <p className="eyebrow">Connected to Nix Games</p>
            <h2 id="world-heading">The toys connect to the games.</h2>
            <p>
              Nix Games gives Phoenix&apos;s characters missions and worlds. Nixx
              3D Printing turns those same characters into physical figures kids
              can collect, play with, and display.
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
            <p className="eyebrow">Shop</p>
            <h2>Browse figures, accessories, bundles, and custom requests</h2>
            <p>
              Each listing includes an estimated price, print note, safety note,
              and a simple way to ask about the item before ordering.
            </p>
          </div>

          <div className="featured-products" aria-label="Best places to start">
            <div>
              <p className="eyebrow">Best places to start</p>
              <h3>Recommended first picks</h3>
            </div>
            <div className="featured-product-list">
              {featuredProducts.map((product) => (
                <a href={`/products/${product.id}`} key={product.id}>
                  <span>{funnelLabels[product.funnel]}</span>
                  <strong>{product.name}</strong>
                  <small>Est. {money(product.price)}</small>
                </a>
              ))}
            </div>
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
                {item.label} <span>{filterCounts[item.value]}</span>
              </button>
            ))}
          </div>

          <p className="catalog-count" role="status">
            Showing {visibleProducts.length} of {products.length} prints
          </p>

          <div className="catalog-lanes" aria-label="Product types">
            {catalogLanes.map((lane) => (
              <span key={lane}>{lane}</span>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.length === 0 ? (
              <p className="empty-state">No prints match this filter yet.</p>
            ) : null}
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className="product-art"
                  style={{ "--product-color": product.color } as CSSProperties}
                >
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    width={640}
                    height={480}
                    sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                  <span>{categoryLabels[product.category]}</span>
                  {product.featured ? <strong>Featured</strong> : null}
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
                <div className="product-card-tags" aria-label={`${product.name} tags`}>
                  {product.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="product-meta">
                  <span className="price">Est. {money(product.price)}</span>
                  <span className="status">{funnelLabels[product.funnel]}</span>
                </div>
                <button
                  className="add-button"
                  type="button"
                  onClick={() => addToCart(product.id)}
                  aria-label={`Add ${product.name} to inquiry list`}
                >
                  Add to inquiry
                </button>
                <Link
                  className="detail-link"
                  href={`/products/${product.id}`}
                  aria-label={`View details for ${product.name}`}
                >
                  View print details
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="picker-section" id="picker">
          <div className="section-heading">
            <p className="eyebrow">Help me choose</p>
            <h2>Not sure where to start?</h2>
            <p>
              Choose the kind of gift or project you have in mind, and Nixx will
              suggest a good starting point.
            </p>
          </div>
          <div className="picker-layout">
            <div className="picker-options" aria-label="Print choices">
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
              <span className="status">{picker ? "Suggested print" : "Start here"}</span>
              <h3>{picker?.title ?? "Choose an option"}</h3>
              <p>
                {picker?.text ??
                  "Pick one option to get a suggestion for a gift, display piece, game prop, or custom print."}
              </p>
              {pickerProduct ? (
                <button
                  className="add-button"
                  type="button"
                  onClick={() => addToCart(pickerProduct.id, "picker")}
                  aria-label={`Add ${pickerProduct.name} to inquiry list`}
                >
                  Add {pickerProduct.name} to inquiry
                </button>
              ) : null}
            </article>
          </div>
        </section>

        <section className="storybook-section" aria-labelledby="storybook-heading">
          <div className="section-heading">
            <p className="eyebrow">Character stories</p>
            <h2 id="storybook-heading">Every figure can have a story.</h2>
            <p>
              A printed figure is more fun when it has a name, mission, and
              reason to exist. Stories make the toys more personal and easier to
              play with.
            </p>
          </div>
          <div className="story-card-grid">
            <article>
              <span>01</span>
              <h3>Origin</h3>
              <p>Where the hero came from, what they protect, and why they matter.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Gear</h3>
              <p>The helmet, armor, tools, weapons, or accessories that make the hero unique.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Lesson</h3>
              <p>A challenge that helps the hero show courage, cleverness, kindness, or grit.</p>
            </article>
          </div>
        </section>

        <section className="custom-section" id="custom">
          <div>
            <p className="eyebrow">Custom prints</p>
            <h2>Have an idea for a toy, desk display, or game prop?</h2>
          </div>
          <div className="custom-panel">
            <p>
              Send the idea, size, colors, and timing. Phoenix can review what
              can print cleanly, what may need to be simplified, whether it has
              small parts, and what story could go with the character.
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
            <h2>Ask first. Confirm the details. Then print.</h2>
          </div>
          <ol className="process-list">
            <li>
              <strong>Choose a print.</strong>
              <span>Pick an available print or build an inquiry list.</span>
            </li>
            <li>
              <strong>Send the inquiry.</strong>
              <span>The site prepares a message with the items and notes.</span>
            </li>
            <li>
              <strong>Confirm the details.</strong>
              <span>
                Colors, pickup or shipping, timing, final price, and small-parts
                safety are checked before printing.
              </span>
            </li>
          </ol>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="section-heading">
            <h2 id="faq-heading">Questions before you send an inquiry</h2>
            <p>
              Nixx uses an inquiry-first process so every print can be checked
              for colors, timing, final price, and small-parts safety.
            </p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bench-section" aria-label="Maker bench">
          <div className="bench-copy">
            <p className="eyebrow">What comes next</p>
            <h2>More figures, stories, and game ideas are coming.</h2>
            <p>
              As new prints are made and photographed, each listing can get its
              own image, color options, print note, availability note, and
              character story.
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
            src={brand.logoPath}
            alt="Phoenix logo for Nix projects"
            width={260}
            height={260}
          />
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">About the store</p>
            <h2>{brand.name}</h2>
            <p>
              Built for 3D printed toys, custom print requests, product updates,
              and character stories. Recommended for ages 6+ with adult review
              for small parts.
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

      <button
        className={`cart-backdrop ${cartOpen ? "open" : ""}`}
        type="button"
        onClick={closeCart}
        aria-label="Close inquiry list"
        tabIndex={cartOpen ? 0 : -1}
      />
      <aside
        className={`cart-drawer ${cartOpen ? "open" : ""}`}
        aria-hidden={!cartOpen}
        aria-labelledby="cart-heading"
        aria-modal={cartOpen}
        ref={cartDrawerRef}
        role="dialog"
      >
        <div className="cart-header">
          <h2 id="cart-heading">Inquiry list</h2>
          <button type="button" onClick={closeCart} ref={cartCloseRef}>
            Close
          </button>
        </div>
        <div className="cart-items">
          {entries.length === 0 ? (
            <div className="cart-empty">
              <p>Your inquiry list is empty.</p>
              <a className="button secondary full" href="#shop" onClick={closeCart}>
                Browse Prints
              </a>
              <a className="button secondary full" href="#picker" onClick={closeCart}>
                Help Me Choose
              </a>
            </div>
          ) : (
            entries.map((entry) => (
              <div className="cart-row" key={entry.product.id}>
                <div>
                  <strong>{entry.product.name}</strong>
                  <span>
                    {entry.quantity} at {money(entry.product.price)}
                  </span>
                </div>
                <div className="cart-row-actions">
                  <button
                    type="button"
                    onClick={() => addToCart(entry.product.id, "cart")}
                    aria-label={`Add one more ${entry.product.name}`}
                  >
                    Add one
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromCart(entry.product.id)}
                    aria-label={`Remove one ${entry.product.name}`}
                  >
                    Remove one
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          <span>Estimated inquiry total</span>
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
        <p className="cart-note">
          This sends an inquiry only. Final price, timing, colors, and safety
          notes are confirmed before anything is printed.
        </p>
      </aside>
    </>
  );
}


