import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/brand";
import { products } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="brand" href="/" aria-label={`${brand.name} home`}>
          <Image src={brand.logoPath} alt="" width={44} height={44} />
          <span>{brand.name}</span>
        </Link>
        <p>{brand.valueProposition}</p>
      </div>

      <nav className="footer-nav" aria-label="Footer navigation">
        <Link href="/#shop">Shop</Link>
        <Link href="/#picker">Help Me Choose</Link>
        <Link href="/about">About Phoenix</Link>
        <Link href="/#custom">Custom Prints</Link>
        <Link href="/#faq">FAQ</Link>
      </nav>

      <div className="footer-contact">
        <a className="button primary" href={`mailto:${brand.contactEmail}`}>
          Email Nixx
        </a>
        <a
          className="button secondary"
          href={brand.gamesSite}
          target="_blank"
          rel="noopener noreferrer"
        >
          Nix Games
        </a>
        <a
          className="footer-link"
          href={brand.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>

      <p className="footer-note">
        {products.length} prints listed. Catalog updated {brand.catalogUpdated}.
        Inquiry first: final price, timing, colors, pickup or shipping, and
        small-parts safety are confirmed before printing.
      </p>
    </footer>
  );
}
