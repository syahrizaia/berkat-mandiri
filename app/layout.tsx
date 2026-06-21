import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Konfigurasi Font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// KONTROL SEO METADATA (B2B & Global Export Optimized)
export const metadata: Metadata = {
  title: {
    default: "CV Berkat Mandiri | High-Quality Sacks Supplier & Global Exporter",
    template: "%s | CV Berkat Mandiri"
  },
  description: "Produsen & supplier karung goni, karung plastik woven PP, dan karung laminasi custom untuk kebutuhan industri, logistik, dan pertanian skala besar (B2B). Siap melayani pengapalan ekspor internasional.",
  keywords: [
    "supplier karung", "eksportir karung goni", "woven PP sacks manufacturer", 
    "karung plastik grosir", "custom printing sacks", "bulk sack packaging", 
    "CV Berkat Mandiri", "karung laminasi", "packaging export Indonesia"
  ],
  authors: [{ name: "CV Berkat Mandiri" }],
  creator: "CV Berkat Mandiri",
  publisher: "CV Berkat Mandiri",
  metadataBase: new URL("https://berkatmandiricv.com"), // Ganti dengan domain asli Anda nanti
  
  // OpenGraph untuk optimasi share ke media sosial & LinkedIn Bisnis
  openGraph: {
    title: "CV Berkat Mandiri | Premium Sacks & Packaging Exporter",
    description: "Solusi pengemasan karung standar internasional untuk rantai pasok global Anda. Hubungi kami untuk penawaran harga (RFQ) skala besar.",
    url: "https://berkatmandiricv.com",
    siteName: "CV Berkat Mandiri",
    locale: "en_US", // Bagus untuk target pasar global, atau gunakan id_ID
    type: "website",
    // images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "CV Berkat Mandiri Hub" }]
  },

  // Pengaturan Robot crawler Google
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

  // Verifikasi Webmaster (Opsional, isi jika sudah mendaftar Google Search Console)
  // verification: {
  //   google: "kode-verifikasi-google-anda",
  // },
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
      <body className={`${geistSans.className} min-h-full flex flex-col bg-slate-50 text-slate-800`}>
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}