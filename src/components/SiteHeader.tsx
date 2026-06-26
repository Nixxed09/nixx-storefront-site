import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/brand";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${brand.name} home`}>
        <Image src={brand.logoPath} alt="" width={40} height={40} />
        <span>{brand.name}</span>
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        <Link href="/#shop">Shop</Link>
        <Link href="/#picker">Help Me Choose</Link>
        <Link href="/about">About</Link>
        <Link href="/#custom">Custom</Link>
        <Link href="/#process">Process</Link>
        <Link href="/#faq">FAQ</Link>
        <a href={brand.gamesSite} target="_blank" rel="noopener noreferrer">
          Games
        </a>
      </nav>
    </header>
  );
}
