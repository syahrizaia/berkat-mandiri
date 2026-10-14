import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://cvberkatmandiri.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/inventory/",
          "/sales/",
          "/employees/",
          "/reports/",
          "/help/",
          "/docs/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/inventory/",
          "/sales/",
          "/employees/",
          "/reports/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
