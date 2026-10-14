import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standar Kualitas & Uji Ketahanan Karung Ekspor B2B",
  description: "Keunggulan QC ketat karung goni dan PP woven CV Berkat Mandiri: uji tarik mekanis, kontinuitas mesin loom, dan logistik kontainer Tanjung Priok IDTPP.",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app/advantages",
  },
  openGraph: {
    title: "Standar Kualitas & Uji Ketahanan Karung Ekspor B2B | CV Berkat Mandiri",
    description: "Keunggulan QC ketat karung goni dan PP woven CV Berkat Mandiri: uji tarik mekanis, kontinuitas mesin loom, dan logistik kontainer Tanjung Priok IDTPP.",
    url: "https://cvberkatmandiri.vercel.app/advantages",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Keunggulan Karung Standar Ekspor CV Berkat Mandiri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Standar Kualitas & Uji Ketahanan Karung Ekspor B2B | CV Berkat Mandiri",
    description: "Keunggulan QC ketat karung goni dan PP woven CV Berkat Mandiri: uji tarik mekanis, kontinuitas mesin loom, dan logistik kontainer Tanjung Priok IDTPP.",
    images: ["/og-image.svg"],
  },
};

export default function AdvantagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
