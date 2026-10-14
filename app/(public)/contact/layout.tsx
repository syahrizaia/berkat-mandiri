import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Sales & Permintaan Penawaran Harga Karung (RFQ)",
  description: "Hubungi tim representatif CV Berkat Mandiri untuk konsultasi pengadaan karung skala besar, request sampel material gratis, dan estimasi biaya kargo ekspor.",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app/contact",
  },
  openGraph: {
    title: "Hubungi Sales & Permintaan Penawaran Harga Karung (RFQ) | CV Berkat Mandiri",
    description: "Hubungi tim representatif CV Berkat Mandiri untuk konsultasi pengadaan karung skala besar, request sampel material gratis, dan estimasi biaya kargo ekspor.",
    url: "https://cvberkatmandiri.vercel.app/contact",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Kontak Sales CV Berkat Mandiri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubungi Sales & Permintaan Penawaran Harga Karung (RFQ) | CV Berkat Mandiri",
    description: "Hubungi tim representatif CV Berkat Mandiri untuk konsultasi pengadaan karung skala besar, request sampel material gratis, dan estimasi biaya kargo ekspor.",
    images: ["/og-image.svg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
