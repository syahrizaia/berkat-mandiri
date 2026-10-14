import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiquidMeshBackground from "@/components/LiquidMeshBackground";
import JsonLdSchema from "@/components/JsonLdSchema";

// Konfigurasi Font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// KONTROL SEO METADATA (B2B & Global Export Optimized)
export const metadata: Metadata = {
  metadataBase: new URL("https://cvberkatmandiri.vercel.app"),
  title: {
    default: "CV Berkat Mandiri - Supplier Karung Goni & Plastik Woven PP Ekspor",
    template: "%s | CV Berkat Mandiri"
  },
  description: "Produsen dan supplier karung goni ekspor, karung plastik woven PP, dan karung laminasi custom B2B kualitas tinggi. Siap melayani pengapalan kontainer FCL & LCL.",
  keywords: [
    "supplier karung goni",
    "produsen karung plastik woven pp",
    "pabrik karung ekspor indonesia",
    "karung goni b-twill",
    "karung beras laminasi custom printing",
    "karung pupuk kimia inner pe",
    "jual karung grosir bekasi jakarta",
    "CV Berkat Mandiri",
    "packaging export Indonesia"
  ],
  authors: [{ name: "CV Berkat Mandiri" }],
  creator: "CV Berkat Mandiri",
  publisher: "CV Berkat Mandiri",
  alternates: {
    canonical: "https://cvberkatmandiri.vercel.app",
  },
  openGraph: {
    title: "CV Berkat Mandiri - Supplier Karung Goni & Plastik Woven PP Ekspor",
    description: "Produsen dan supplier karung goni ekspor, karung plastik woven PP, dan karung laminasi custom B2B kualitas tinggi. Siap pengapalan kontainer FCL & LCL via Port Tanjung Priok.",
    url: "https://cvberkatmandiri.vercel.app",
    siteName: "CV Berkat Mandiri",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CV Berkat Mandiri - Produsen dan Eksportir Karung Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Berkat Mandiri - Supplier Karung Goni & Plastik Woven PP Ekspor",
    description: "Produsen dan supplier karung goni ekspor, karung plastik woven PP, dan karung laminasi custom B2B. Siap pengapalan FCL & LCL.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Berkat Mandiri",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <JsonLdSchema />
      </head>
      <body className={`${geistSans.className} min-h-full flex flex-col bg-slate-50 text-slate-900 relative selection:bg-emerald-500/20 selection:text-emerald-900`}>
        <LiquidMeshBackground />
        <div className="flex-1 w-full relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}