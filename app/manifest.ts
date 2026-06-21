import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CV Berkat Mandiri",
    short_name: "CV Berkat Mandiri",
    description: "Sistem Manajemen Stok & Penjualan CV Berkat Mandiri",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a", // Warna tema bar (Slate-900 senada dengan dashboard)
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable", // Wajib ada agar ikon bagus di Android bulat/kotak
      },
    ],
  };
}