import React from "react";

export default function JsonLdSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization Schema
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://cvberkatmandiri.vercel.app/#organization",
        "name": "CV Berkat Mandiri",
        "alternateName": "Berkat Mandiri Sacks & Packaging Exporter",
        "url": "https://cvberkatmandiri.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://cvberkatmandiri.vercel.app/globe.svg",
          "caption": "CV Berkat Mandiri Logo"
        },
        "image": "https://cvberkatmandiri.vercel.app/globe.svg",
        "description": "Produsen, supplier grosir, dan eksportir karung goni alami, karung plastik woven PP, dan karung laminasi custom printing untuk kebutuhan industri, logistik, dan komoditas pertanian internasional.",
        "telephone": "+6285954597029",
        "email": "info@cvberkatmandiri.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kawasan Industri Logistik Prima, Jl. Raya Transmisi No. 42",
          "addressLocality": "Bekasi",
          "addressRegion": "Jawa Barat",
          "postalCode": "17530",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.2383,
          "longitude": 106.9756
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "08:00",
            "closes": "17:00"
          }
        ],
        "areaServed": [
          {
            "@type": "Country",
            "name": "Indonesia"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Global Export Market (Southeast Asia, Middle East, Europe, Americas)"
          }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+6285954597029",
            "contactType": "sales",
            "areaServed": "Global",
            "availableLanguage": ["Indonesian", "English"]
          },
          {
            "@type": "ContactPoint",
            "email": "export@cvberkatmandiri.com",
            "contactType": "customer service",
            "areaServed": "Global",
            "availableLanguage": ["Indonesian", "English"]
          }
        ],
        "sameAs": [
          "https://cvberkatmandiri.vercel.app"
        ],
        "hasOfferCatalog": {
          "@id": "https://cvberkatmandiri.vercel.app/#offercatalog"
        }
      },

      // 2. WebSite Schema
      {
        "@type": "WebSite",
        "@id": "https://cvberkatmandiri.vercel.app/#website",
        "url": "https://cvberkatmandiri.vercel.app",
        "name": "CV Berkat Mandiri",
        "description": "Supplier & Produsen Karung Goni, Karung Plastik PP Woven, dan Karung Laminasi Ekspor Indonesia",
        "publisher": {
          "@id": "https://cvberkatmandiri.vercel.app/#organization"
        },
        "inLanguage": "id-ID"
      },

      // 3. Service & OfferCatalog Schema
      {
        "@type": "OfferCatalog",
        "@id": "https://cvberkatmandiri.vercel.app/#offercatalog",
        "name": "Katalog Produk & Layanan Karung Ekspor CV Berkat Mandiri",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Karung Goni Alami (Premium Jute Sacks)",
            "description": "Karung goni 100% serat alami ramah lingkungan standar B-Twill ekspor internasional dengan sirkulasi udara tinggi untuk biji kopi, kakao, dan cengkeh.",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Karung Goni B-Twill Standar Ekspor 50-60 kg",
                  "description": "Karung goni anyaman kuat ukuran 75x110 cm berjahitan ganda (Double Lock Stitch) untuk komoditas ekspor.",
                  "category": "Packaging Materials > Jute Sacks",
                  "brand": {
                    "@type": "Brand",
                    "name": "CV Berkat Mandiri"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Karung Goni Kapasitas 25 kg",
                  "description": "Karung goni serat alami ukuran 50x75 cm untuk hasil panen pertanian dan rempah-rempah.",
                  "category": "Packaging Materials > Jute Sacks",
                  "brand": {
                    "@type": "Brand",
                    "name": "CV Berkat Mandiri"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Karung Plastik PP Woven Standard & Heavy Duty",
            "description": "Karung plastik berbahan anyaman polipropilena berdaya tahan tarik tinggi (600 - 1000+ Denier) tahan sobekan untuk beras, pupuk, semen, dan pakan ternak.",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Karung Plastik PP Woven 25 kg - 50 kg",
                  "description": "Karung plastik anyaman rapat anti-slip dengan opsi inner liner PE kedap air penuh.",
                  "category": "Packaging Materials > Polypropylene Woven Bags",
                  "brand": {
                    "@type": "Brand",
                    "name": "CV Berkat Mandiri"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Karung Laminasi BOPP & Custom Printing",
            "description": "Kemasan karung plastik woven PP berlapis film BOPP cetak rotogravure multi-warna resolusi tinggi 100% waterproof untuk meningkatkan nilai jual brand retail.",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Karung Beras Laminasi Rotogravure Custom Printing",
                  "description": "Karung kemasan beras premium retail kapasitas 5 kg, 10 kg, hingga 25 kg dengan finishing glossy atau elegant matte.",
                  "category": "Packaging Materials > Laminated Sacks",
                  "brand": {
                    "@type": "Brand",
                    "name": "CV Berkat Mandiri"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Jasa Maklon, Cuci, Lipat, Jahit & Sablon Karung",
            "description": "Layanan pengerjaan borongan cuci karung, sortir, lipat, jahit karung, serta sablon logo merk untuk pabrik, distributor, dan eksportir komoditas."
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
