import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nixx 3D Printing | 3D Printed Toys by Phoenix",
  description:
    "Nixx 3D Printing is Phoenix's storefront for 3D printed snap-fit toys, figures, accessories, and custom print ideas.",
  authors: [{ name: "Phoenix" }],
  metadataBase: new URL("https://nixx.it.com"),
  openGraph: {
    title: "Nixx 3D Printing",
    description:
      "3D printed toys, snap-fit figures, and custom print drops by Phoenix.",
    url: "https://nixx.it.com",
    siteName: "Nixx 3D Printing",
    images: [{ url: "/images/hero-3d-toys.png", width: 1024, height: 1024 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <div id="main">{children}</div>
      </body>
    </html>
  );
}

