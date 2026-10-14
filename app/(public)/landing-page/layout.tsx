import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplier Karung Goni & Plastik Woven PP Ekspor",
  description: "Supplier dan produsen karung goni alami, karung plastik woven PP, dan karung laminasi custom berkualitas tinggi untuk industri komoditas global B2B.",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app/landing-page",
  },
  openGraph: {
    title: "Supplier Karung Goni & Plastik Woven PP Ekspor | CV Berkat Mandiri",
    description: "Supplier dan produsen karung goni alami, karung plastik woven PP, dan karung laminasi custom berkualitas tinggi untuk industri komoditas global B2B.",
    url: "https://cvberkatmandiri.vercel.app/landing-page",
  },
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
