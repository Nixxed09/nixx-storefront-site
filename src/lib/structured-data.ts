import { brand } from "@/content/brand";
import { faqs } from "@/data/faqs";
import { products, type Product } from "@/data/products";
import { siteUrl } from "@/lib/site-url";

export function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function siteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: brand.name,
    url: siteUrl,
    description: brand.description,
    email: brand.contactEmail,
    founder: {
      "@type": "Person",
      name: brand.maker,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: brand.contactEmail,
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${brand.name} prints`,
      itemListElement: products.map((product) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: product.name,
          url: `${siteUrl}/products/${product.id}`,
          image: `${siteUrl}${product.image}`,
          description: product.description,
        },
        priceCurrency: "USD",
        price: product.price.toFixed(2),
      })),
    },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      url: siteUrl,
      logo: `${siteUrl}${brand.logoPath}`,
      sameAs: [brand.github, brand.gamesSite],
    },
  };
}

export function catalogStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${brand.name} catalog`,
    url: siteUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/products/${product.id}`,
      name: product.name,
    })),
  };
}

export function productStructuredData(product: Product) {
  const image = product.detailImage ?? product.image;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`${siteUrl}${image}`],
    url: `${siteUrl}/products/${product.id}`,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    category: product.category,
    keywords: product.tags.join(", "),
    additionalProperty: product.featured
      ? [
          {
            "@type": "PropertyValue",
            name: "Featured print",
            value: "Recommended starting point",
          },
        ]
      : undefined,
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: product.ageNote.includes("6+") ? 6 : undefined,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.id}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/LimitedAvailability",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: brand.name,
        url: siteUrl,
      },
    },
  };
}

export function productBreadcrumbStructuredData(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${siteUrl}/#shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteUrl}/products/${product.id}`,
      },
    ],
  };
}

export function faqStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
