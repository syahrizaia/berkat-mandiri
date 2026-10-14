import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi Perlindungan Data Klien",
  description: "Kebijakan privasi perlindungan data transaksi, dokumen RFQ komoditas, dan kerahasiaan informasi mitra korporasi klien CV Berkat Mandiri.",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
