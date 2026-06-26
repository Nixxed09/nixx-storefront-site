import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const featuredProducts = products.slice(0, 3);

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-hero">
        <div>
          <p className="eyebrow">Page not found</p>
          <h1>This print path is missing.</h1>
          <p className="hero-text">
            The page may have moved, or the product link may not exist yet. You
            can go back to the shop, choose a starter print, or send a custom
            request if you had a specific idea in mind.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/#shop">
              Browse Prints
            </Link>
            <Link className="button secondary" href="/#custom">
              Start Custom Request
            </Link>
          </div>
        </div>
        <figure className="about-hero-media">
          <Image
            src="/images/products/polished/starter-action-set.jpg"
            alt="Group of colorful Dummy 13 figures"
            width={1200}
            height={900}
            priority
          />
        </figure>
      </section>

      <section className="not-found-suggestions" aria-labelledby="suggestions-heading">
        <div className="section-heading">
          <p className="eyebrow">Good places to restart</p>
          <h2 id="suggestions-heading">Popular prints</h2>
        </div>
        <div className="related-grid">
          {featuredProducts.map((product) => (
            <Link
              className="related-card"
              href={`/products/${product.id}`}
              key={product.id}
            >
              <Image
                src={product.image}
                alt={product.imageAlt}
                width={360}
                height={270}
                sizes="(max-width: 680px) 100vw, 33vw"
              />
              <span>{product.status}</span>
              <strong>{product.name}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
