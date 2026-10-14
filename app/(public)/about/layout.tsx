import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil CV Berkat Mandiri - Produsen & Eksportir Karung",
  description: "Profil resmi CV Berkat Mandiri, produsen dan mitra distribusi karung goni alami dan woven PP berskala internasional di Kawasan Industri Bekasi Jawa Barat.",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app/about",
  },
  openGraph: {
    title: "Profil CV Berkat Mandiri - Produsen & Eksportir Karung | CV Berkat Mandiri",
    description: "Profil resmi CV Berkat Mandiri, produsen dan mitra distribusi karung goni alami dan woven PP berskala internasional di Kawasan Industri Bekasi Jawa Barat.",
    url: "https://cvberkatmandiri.vercel.app/about",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Profil Perusahaan CV Berkat Mandiri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Profil CV Berkat Mandiri - Produsen & Eksportir Karung | CV Berkat Mandiri",
    description: "Profil resmi CV Berkat Mandiri, produsen dan mitra distribusi karung goni alami dan woven PP berskala internasional di Kawasan Industri Bekasi Jawa Barat.",
    images: ["/og-image.svg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
