/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
//   theme: {
//     extend: {
//       // Anda bisa menambahkan kustomisasi warna atau font di sini
//       colors: {
//         // Contoh penambahan warna kustom
//         emerald: {
//           600: '#059669',
//         },
//       },
//     },
//   },
  plugins: [
    require('@tailwindcss/typography'),
    // Anda bisa menambah plugin lain di sini jika diperlukan
  ],
};

export default config;