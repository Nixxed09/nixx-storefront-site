import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/content/brand";
import { getProductById, products, type Product } from "@/data/products";
import {
  jsonLd,
  productBreadcrumbStructuredData,
  productStructuredData,
} from "@/lib/structured-data";
import { siteUrl } from "@/lib/site-url";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function productMetadataTitle(product: Product) {
  const descriptor =
    product.category === "custom" ? "Custom 3D Print Request" : titleCase(product.status);

  return `${product.name} ${descriptor}`;
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {};
  }

  const image = product.detailImage ?? product.image;
  const imageAlt = product.detailImageAlt ?? product.imageAlt;
  const url = `${siteUrl}/products/${product.id}`;
  const metadataTitle = productMetadataTitle(product);
  const keywords = [
    product.name,
    product.characterClass,
    product.status,
    product.category,
    ...product.tags,
    "Dummy 13",
    "3D printed figure",
    brand.name,
  ];

  return {
    title: metadataTitle,
    description: product.description,
    keywords,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: `${metadataTitle} | ${brand.name}`,
      description: product.description,
      url,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 900,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadataTitle} | ${brand.name}`,
      description: product.description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const inquiryBody = `${product.name} inquiry\n\nEstimated price: ${money(product.price)}\nType: ${product.status}\nPrint note: ${product.printTime}\nSafety note: ${product.ageNote}\n\nQuestions:\n- Preferred colors:\n- Pickup or shipping:\n- Timing:\n- Custom notes:`;
  const inquiryHref = `mailto:${brand.contactEmail}?subject=${encodeURIComponent(
    `${product.name} inquiry`,
  )}&body=${encodeURIComponent(inquiryBody)}`;
  const detailImage = product.detailImage ?? product.image;
  const detailImageAlt = product.detailImageAlt ?? product.imageAlt;
  const relatedProducts = [
    ...products.filter(
      (item) => item.id !== product.id && item.category === product.category,
    ),
    ...products.filter(
      (item) => item.id !== product.id && item.category !== product.category,
    ),
  ].slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(productStructuredData(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(productBreadcrumbStructuredData(product)),
        }}
      />
      <main className="product-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>

        <section className="product-hero-detail">
          <div className="product-detail-copy">
            <p className="eyebrow">{product.status}</p>
            <h1>{product.name}</h1>
            <p className="hero-text">{product.description}</p>
            <div className="product-detail-meta">
              <span>Est. {money(product.price)}</span>
              <span>{product.characterClass}</span>
              <span>{product.printTime}</span>
              <span>{product.ageNote}</span>
            </div>
            <div className="product-tags" aria-label="Product tags">
              {product.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="button primary" href={inquiryHref}>
                Ask about this print
              </a>
              <Link className="button secondary" href="/#storybook-heading">
                See Character Stories
              </Link>
            </div>
          </div>
          <figure className="product-detail-media">
            <Image
              src={detailImage}
              alt={detailImageAlt}
              width={1200}
              height={900}
              priority
            />
          </figure>
        </section>

        <section className="character-sheet" aria-labelledby="character-heading">
          <div>
            <p className="eyebrow">Character sheet</p>
            <h2 id="character-heading">{product.characterClass}</h2>
            <p className="motto">&quot;{product.motto}&quot;</p>
          </div>
          <div className="character-details">
            <article>
              <h3>Origin</h3>
              <p>{product.origin}</p>
            </article>
            <article>
              <h3>Gear</h3>
              <ul>
                {product.gear.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Lesson</h3>
              <p>{product.lesson}</p>
            </article>
          </div>
        </section>

        <section className="next-business-step">
          <p className="eyebrow">Story idea</p>
          <h2>This print can become part of a story.</h2>
          <p>
            Each Dummy 13 figure can grow into a short origin story with a cover,
            motto, challenge, gear page, and a link back to the print.
          </p>
        </section>

        <section className="related-products" aria-labelledby="related-heading">
          <div className="section-heading">
            <p className="eyebrow">Keep browsing</p>
            <h2 id="related-heading">Related prints</h2>
          </div>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <Link
                className="related-card"
                href={`/products/${item.id}`}
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={360}
                  height={270}
                  sizes="(max-width: 680px) 100vw, 33vw"
                />
                <span>{item.status}</span>
                <strong>{item.name}</strong>
                <small>Est. {money(item.price)}</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="product-inquiry-panel" aria-labelledby="inquiry-heading">
          <div>
            <p className="eyebrow">Ready to ask?</p>
            <h2 id="inquiry-heading">Send an inquiry for {product.name}</h2>
            <p>
              This starts a conversation, not a checkout. Colors, timing, pickup
              or shipping, final price, and small-parts safety are confirmed
              before printing.
            </p>
          </div>
          <a className="button primary" href={inquiryHref}>
            Ask about this print
          </a>
        </section>
      </main>
    </>
  );
}
