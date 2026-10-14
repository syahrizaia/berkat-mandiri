import type { Metadata } from "next";
import NavbarPublic from "@/components/NavbarPublic";
import LandingPage from "./(public)/landing-page/page";
import FooterPublic from "@/components/FooterPublic";
import PWAInstallButton from "@/components/PWAInstallButton";

export const metadata: Metadata = {
  title: "Supplier Karung Goni & Plastik Woven PP Ekspor | CV Berkat Mandiri",
  description: "Supplier dan produsen karung goni ekspor, karung plastik woven PP, dan karung laminasi custom B2B kualitas tinggi. Siap melayani pengapalan kontainer FCL & LCL.",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app",
  },
  openGraph: {
    title: "Supplier Karung Goni & Plastik Woven PP Ekspor | CV Berkat Mandiri",
    description: "Supplier dan produsen karung goni ekspor, karung plastik woven PP, dan karung laminasi custom B2B kualitas tinggi. Siap pengapalan kontainer FCL & LCL.",
    url: "https://cvberkatmandiri.vercel.app",
  },
};

export default function Home() {
  return (
    <>
    <NavbarPublic />
    <main className="flex-1 w-full">
      <LandingPage />
    </main>
    <PWAInstallButton />
    <FooterPublic />
    </>
  )
}