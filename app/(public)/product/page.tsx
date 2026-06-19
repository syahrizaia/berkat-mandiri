"use client";

import { motion, Variants } from "framer-motion";
import { MessageCircle } from "lucide-react";
import React from "react";

// Data Katalog Produk
const products = [
  {
    id: "goni-premium",
    name: "Karung Goni Alami (Premium Jute Bag)",
    category: "Natural Fiber",
    description: "Terbuat dari 100% serat tanaman goni alami ramah lingkungan. Memiliki sirkulasi udara optimal sehingga sangat ideal untuk penyimpanan komoditas pertanian kering seperti biji kopi, kakao, kemiri, dan cengkeh.",
    features: ["Bahan 100% Biodegradable", "Sirkulasi udara tinggi (mencegah jamur)", "Jahitan ganda super kuat"],
    specs: [
      { size: "50 x 75 cm", capacity: "Up to 25 kg", thickness: "Heavy Regular" },
      { size: "75 x 110 cm", capacity: "Up to 50 - 60 kg", thickness: "Export Standard (B-Twill)" },
    ]
  },
  {
    id: "woven-pp",
    name: "Karung Plastik PP Woven Standard",
    category: "Synthetic Polymer",
    description: "Karung plastik berbahan polipropilena murni dengan anyaman rapat berdensitas tinggi. Dirancang khusus untuk menahan beban berat logistik timbunan seperti beras, pupuk, pakan ternak, gula, pasir, hingga bahan kimia industri.",
    features: ["Tahan kelembapan tinggi", "Anti-slip & mudah ditumpuk", "Pilihan strip warna list samping"],
    specs: [
      { size: "45 x 75 cm", capacity: "Up to 25 kg", thickness: "600 - 800 Denier" },
      { size: "56 x 90 cm", capacity: "Up to 50 kg", thickness: "800 - 1000 Denier" },
      { size: "60 x 100 cm", capacity: "Up to 60 kg", thickness: "1000+ Denier (Super Thick)" },
    ]
  },
  {
    id: "laminated-bopp",
    name: "Karung Laminasi Custom (BOPP Film Sacks)",
    category: "Premium Packaging",
    description: "Solusi kemasan modern retail berskala besar. Gabungan kekuatan anyaman PP dengan lapisan luar plastik BOPP yang dicetak menggunakan teknologi rotogravure full color. Memberikan tampilan mewah sekaligus proteksi kedap air.",
    features: ["Cetak gambar HD multi-warna", "100% Waterproof (Kedap Air)", "Meningkatkan nilai jual brand"],
    specs: [
      { size: "35 x 55 cm", capacity: "Up to 5 - 10 kg (Retail)", thickness: "BOPP Matte / Glossy Laminated" },
      { size: "45 x 75 cm", capacity: "Up to 25 kg", thickness: "BOPP + Multi-layer Protection" },
    ]
  }
];

export default function ProductPage() {
  
  // Konfigurasi varian animasi untuk mencegah error type merah di TypeScript (as const)
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  } as const;

  // Animasi dinamis: Masuk dari kiri atau kanan tergantung indeks baris
  const slideInCard = (idx: number): Variants => ({
    hidden: { opacity: 0, x: idx % 2 === 1 ? 50 : -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen overflow-hidden">
      
      {/* HERO HEADER */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white py-16 relative">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
        >
          <motion.h1 
            variants={fadeInUp} 
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Katalog Produk Pengemasan Massal
          </motion.h1>
          <motion.p 
            variants={fadeInUp} 
            className="text-emerald-100 max-w-xl mx-auto text-sm sm:text-base"
          >
            Sistem anyaman mutakhir dan material pilihan untuk memastikan kargo logistik Anda aman sampai di pelabuhan tujuan internasional.
          </motion.p>
        </motion.div>
      </section>

      {/* KATALOG UTAMA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {products.map((product, idx) => (
          <motion.div 
            key={product.id}
            id={product.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInCard(idx)}
            className={`flex flex-col lg:flex-row gap-12 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm items-start ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Sisi Detail Informasi */}
            <div className="flex-1 space-y-6 w-full">
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">
                  {product.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {product.name}
                </h2>
              </div>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>

              {/* Fitur Utama */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Keunggulan Struktur:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-sm text-slate-600 gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tabel Spesifikasi Teknis */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Tabel Spesifikasi Ukuran:</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-inner">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                        <th className="p-3">Dimensi (L x P)</th>
                        <th className="p-3">Kapasitas Muat</th>
                        <th className="p-3">Ketebalan / Tipe Anyaman</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {product.specs.map((spec, sIdx) => (
                        <tr key={sIdx} className="hover:bg-slate-50/80 transition">
                          <td className="p-3 font-medium text-slate-900">{spec.size}</td>
                          <td className="p-3">{spec.capacity}</td>
                          <td className="p-3">{spec.thickness}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TOMBOL WHATSAPP */}
              <div className="pt-4 flex justify-start">
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/6285954597029?text=${encodeURIComponent(
                    `Halo Sales Representative CV Berkat Mandiri, saya tertarik untuk berdiskusi mengenai pemesanan grosir produk: *${product.name}*.\n\nMohon dibantu informasi mengenai ketentuan harga volume kontainer, minimal order (MOQ), serta ketersediaan sampel kain. Terima kasih.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm w-full sm:w-auto gap-2"
                >
                  <MessageCircle /> Hubungi Sales via WhatsApp
                </motion.a>
              </div>

            </div>
          </motion.div>
        ))}
      </section>

      {/* FOOTER CALL TO ACTION (CTA) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="bg-slate-900 text-white py-16 border-t border-slate-800 text-center relative"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Butuh Spesifikasi Ukuran Khusus (Custom Request)?</h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Kami menerima order kustomisasi berat gramatur kain, ketebalan inner liner plastik PE, hingga pencetakan logo industri Anda dengan minimal kuantitas pemesanan tertentu.
          </p>
          <div className="pt-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-colors text-sm sm:text-base"
            >
              Minta Penawaran Harga (RFQ)
            </motion.a>
          </div>
        </div>
      </motion.section>

    </div>
  );
}