import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Pemesanan B2B",
  description: "Syarat dan ketentuan resmi pemesanan karung goni, karung plastik, prosedur pembayaran, dan perjanjian pengapalan logistik ekspor CV Berkat Mandiri.",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
