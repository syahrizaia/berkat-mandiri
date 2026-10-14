import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CV Berkat Mandiri - Supplier Karung Goni & Plastik Ekspor",
    short_name: "CV Berkat Mandiri",
    description: "Produsen dan supplier karung goni alami, karung plastik woven PP, dan karung laminasi custom printing B2B standar ekspor internasional.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#059669",
    categories: ["business", "productivity", "shopping"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "512x512",
        type: "image/x-icon",
        purpose: "maskable",
      },
    ],
  };
}