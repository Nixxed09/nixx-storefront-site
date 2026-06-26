import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { brand } from "@/content/brand";

export const metadata: Metadata = {
  title: "About Phoenix",
  description:
    "Meet Phoenix, the young maker behind Nixx 3D Printing, Dummy 13 figures, custom print requests, games, and character stories.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Phoenix | ${brand.name}`,
    description:
      "The maker story behind Nixx 3D Printing, Dummy 13 figures, custom print requests, and Nix Games.",
    url: "https://nixx.it.com/about",
    images: [
      {
        url: "/images/products/polished/winged-guardian-poster.jpg",
        width: 1200,
        height: 900,
        alt: "Mint and white winged Dummy 13 guardian in a wide display pose",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Phoenix | ${brand.name}`,
    description:
      "The maker story behind Nixx 3D Printing, Dummy 13 figures, custom print requests, and Nix Games.",
    images: ["/images/products/polished/winged-guardian-poster.jpg"],
  },
};

const makerLanes = [
  {
    title: "3D printed heroes",
    text: "Dummy 13 figures, gear packs, display poses, and custom color ideas that turn character concepts into real toys.",
  },
  {
    title: "Game worlds",
    text: "Nix Games gives the characters missions, powers, boss fights, and challenges.",
  },
  {
    title: "Character stories",
    text: "Every print can become a character sheet, short origin story, mini book, or collectible card.",
  },
];

const buildSteps = [
  "Sketch the hero, role, colors, and gear.",
  "Check what can print cleanly and safely.",
  "Print, assemble, photograph, and name the figure.",
  "Add the story so the figure has a world around it.",
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">About the maker</p>
          <h1>Phoenix turns ideas into figures and stories.</h1>
          <p className="hero-text">
            {brand.makerStory} The store keeps that process simple: clear
            listings, character ideas, game links, and parent-reviewed inquiries
            before anything gets printed.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/#shop">
              Browse Prints
            </Link>
            <a
              className="button secondary"
              href={brand.gamesSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Nix Games
            </a>
          </div>
        </div>
        <figure className="about-hero-media">
          <Image
            src="/images/products/polished/winged-guardian-poster.jpg"
            alt="Mint and white winged Dummy 13 guardian in a wide display pose"
            width={1200}
            height={900}
            priority
          />
        </figure>
      </section>

      <section className="about-mission" aria-labelledby="about-mission-heading">
        <div>
          <p className="eyebrow">Mission</p>
          <h2 id="about-mission-heading">{brand.mission}</h2>
        </div>
        <p>
          Nixx starts as a simple storefront for 3D printed figures and
          accessories. Over time, it can grow into a connected world of toys,
          stories, custom print requests, and games.
        </p>
      </section>

      <section className="maker-lanes" aria-label="What Phoenix makes">
        {makerLanes.map((lane) => (
          <article key={lane.title}>
            <h3>{lane.title}</h3>
            <p>{lane.text}</p>
          </article>
        ))}
      </section>

      <section className="build-path" aria-labelledby="build-path-heading">
        <div>
          <p className="eyebrow">Build process</p>
          <h2 id="build-path-heading">How an idea becomes a Nixx print</h2>
        </div>
        <ol>
          {buildSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
