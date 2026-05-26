import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/content/brand";
import { getProductById, products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function money(value: number) {
  return `$${value}`;
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | ${brand.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${brand.name}`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const inquiryBody = `${product.name} inquiry\n\nPrice: ${money(product.price)}\nStatus: ${product.status}\nPrint timing: ${product.printTime}\nSafety note: ${product.ageNote}\n\nQuestions:\n- Preferred colors:\n- Pickup/shipping:\n- Timing:\n- Custom notes:`;
  const inquiryHref = `mailto:${brand.contactEmail}?subject=${encodeURIComponent(
    `${product.name} inquiry`,
  )}&body=${encodeURIComponent(inquiryBody)}`;

  return (
    <main className="product-page">
      <Link className="back-link" href="/#shop">
        Back to shop
      </Link>

      <section className="product-hero-detail">
        <div className="product-detail-copy">
          <p className="eyebrow">{product.status}</p>
          <h1>{product.name}</h1>
          <p className="hero-text">{product.description}</p>
          <div className="product-detail-meta">
            <span>{money(product.price)}</span>
            <span>{product.characterClass}</span>
            <span>{product.printTime}</span>
            <span>{product.ageNote}</span>
          </div>
          <div className="hero-actions">
            <a className="button primary" href={inquiryHref}>
              Ask about this print
            </a>
            <Link className="button secondary" href="/#storybook-heading">
              See story format
            </Link>
          </div>
        </div>
        <figure className="product-detail-media">
          <Image
            src={product.image}
            alt={`${product.name} product photo`}
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
        <p className="eyebrow">Next product upgrade</p>
        <h2>Turn this print into a mini book.</h2>
        <p>
          Each Dummy 13 hero can grow into a short origin story with a cover,
          motto, challenge, gear page, and QR link back to the figure.
        </p>
      </section>
    </main>
  );
}
