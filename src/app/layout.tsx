import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nixx 3D Printing | Dummy 13 Heroes by Phoenix",
  description:
    "Nixx 3D Printing is Phoenix's storefront for Dummy 13 heroes, story-driven snap-fit toys, accessories, and custom print ideas.",
  authors: [{ name: "Phoenix" }],
  metadataBase: new URL("https://nixx.it.com"),
  openGraph: {
    title: "Nixx 3D Printing",
    description:
      "Dummy 13 heroes, story-driven snap-fit figures, and custom print drops by Phoenix.",
    url: "https://nixx.it.com",
    siteName: "Nixx 3D Printing",
    images: [
      {
        url: "/images/products/polished/starter-action-set.jpg",
        width: 1400,
        height: 1050,
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#ff6600",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable}`}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <div id="main">{children}</div>
      </body>
    </html>
  );
}
