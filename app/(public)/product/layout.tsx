import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jual Karung Goni Ekspor & Karung Plastik PP Woven Grosir",
  description: "Katalog spesifikasi karung goni alami B-Twill, karung plastik woven PP high-tensile, dan karung laminasi BOPP full color rotogravure dari CV Berkat Mandiri.",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app/product",
  },
  openGraph: {
    title: "Jual Karung Goni Ekspor & Karung Plastik PP Woven Grosir | CV Berkat Mandiri",
    description: "Katalog spesifikasi karung goni alami B-Twill, karung plastik woven PP high-tensile, dan karung laminasi BOPP full color rotogravure dari CV Berkat Mandiri.",
    url: "https://cvberkatmandiri.vercel.app/product",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Katalog Karung Ekspor CV Berkat Mandiri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jual Karung Goni Ekspor & Karung Plastik PP Woven Grosir | CV Berkat Mandiri",
    description: "Katalog spesifikasi karung goni alami B-Twill, karung plastik woven PP high-tensile, dan karung laminasi BOPP full color rotogravure dari CV Berkat Mandiri.",
    images: ["/og-image.svg"],
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
