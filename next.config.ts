import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",                // Tempat menyimpan sw.js otomatis
  disable: process.env.NODE_ENV === "development", // Matikan di dev mode agar tidak ganggu proses coding
  register: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
};

export default withPWA(nextConfig);
