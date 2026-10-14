"use client";

import { motion, Variants } from "framer-motion";
import { MessageCircle, CheckCircle2, Sparkles, Layers, Package, ArrowRight, ShieldCheck } from "lucide-react";
import React from "react";
import Link from "next/link";

// Data Katalog Produk
const products = [
  {
    id: "goni-premium",
    name: "Karung Goni Alami (Premium Jute Bag)",
    category: "Natural Fiber",
    badge: "100% Eco-Friendly",
    icon: <Package className="w-6 h-6 text-emerald-600" />,
    description: "Terbuat dari 100% serat tanaman goni alami ramah lingkungan. Memiliki sirkulasi udara optimal (breathable) sehingga sangat ideal untuk menjaga kelembapan ideal komoditas pertanian kering seperti biji kopi, kakao, kemiri, cengkeh, dan tembakau.",
    features: [
      "Bahan 100% Biodegradable & Ramah Lingkungan",
      "Sirkulasi udara tinggi (mencegah pertumbuhan jamur kargo)",
      "Jahitan ganda super kuat (Double Lock Stitch)",
      "Standardisasi ekspor B-Twill internasional"
    ],
    specs: [
      { size: "50 x 75 cm", capacity: "Hingga 25 kg", thickness: "Heavy Regular Jute" },
      { size: "75 x 110 cm", capacity: "Hingga 50 - 60 kg", thickness: "Export Standard (B-Twill)" },
    ]
  },
  {
    id: "woven-pp",
    name: "Karung Plastik PP Woven Standard",
    category: "Synthetic Polymer",
    badge: "High Tensile Strength",
    icon: <Layers className="w-6 h-6 text-teal-600" />,
    description: "Karung plastik berbahan polipropilena murni dengan anyaman rapat berdensitas tinggi (high mesh density). Dirancang khusus untuk menahan beban berat logistik timbunan seperti beras, pupuk, pakan ternak, gula, pasir, hingga bahan kimia industri.",
    features: [
      "Tahan kelembapan tinggi & tahan sobekan mekanis",
      "Permukaan anti-slip (mudah ditumpuk di atas pallet)",
      "Pilihan strip list warna samping (custom color code)",
      "Tersedia opsi inner liner PE (kedap air penuh)"
    ],
    specs: [
      { size: "45 x 75 cm", capacity: "Hingga 25 kg", thickness: "600 - 800 Denier" },
      { size: "56 x 90 cm", capacity: "Hingga 50 kg", thickness: "800 - 1000 Denier" },
      { size: "60 x 100 cm", capacity: "Hingga 60 kg", thickness: "1000+ Denier (Super Thick)" },
    ]
  },
  {
    id: "laminated-bopp",
    name: "Karung Laminasi Custom (BOPP Film Sacks)",
    category: "Premium Packaging",
    badge: "Full Color Branding",
    icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
    description: "Solusi kemasan modern retail komersial berskala besar. Perpaduan kekuatan anyaman PP woven dengan lapisan luar plastik film BOPP yang dicetak menggunakan teknologi rotogravure resolusi tinggi. Memberikan tampilan mewah sekaligus proteksi 100% waterproof.",
    features: [
      "Cetak foto & grafis HD multi-warna (Rotogravure)",
      "100% Waterproof (Kedap air & udara lembap)",
      "Meningkatkan nilai jual brand retail di rak toko",
      "Pilihan finishing Glossy atau Elegant Matte"
    ],
    specs: [
      { size: "35 x 55 cm", capacity: "Hingga 5 - 10 kg (Retail)", thickness: "BOPP Matte / Glossy Laminated" },
      { size: "45 x 75 cm", capacity: "Hingga 25 kg", thickness: "BOPP + Multi-layer Protection" },
    ]
  }
];

export default function ProductPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
    }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  } as const;

  const slideInCard = (idx: number): Variants => ({
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  });

  return (
    <div className="w-full relative z-10 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* =====================================================================
          HERO HEADER
          ===================================================================== */}
      <section className="relative">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="liquid-glass rounded-[36px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 text-center relative overflow-hidden border border-white/80 shadow-2xl space-y-5"
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none" />

          <motion.div variants={fadeInUp} className="relative z-10">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
              <Package className="w-3.5 h-3.5 text-emerald-600" />
              <span>Katalog Spesifikasi Teknis</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeInUp} 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight relative z-10"
          >
            Katalog Karung Goni Ekspor & <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-800 bg-clip-text text-transparent">
              Karung Plastik PP Woven Grosir
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp} 
            className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed relative z-10"
          >
            Sistem anyaman mutakhir dan pemilihan serat murni untuk memastikan komoditas kargo Anda terlindungi maksimal hingga ke pelabuhan tujuan akhir dunia.
          </motion.p>
        </motion.div>
      </section>

      {/* =====================================================================
          KATALOG PRODUK UTAMA (Apple Vision Liquid Glass Cards)
          ===================================================================== */}
      <section className="space-y-12 sm:space-y-16">
        {products.map((product, idx) => (
          <motion.div 
            key={product.id}
            id={product.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInCard(idx)}
            className="liquid-glass p-8 sm:p-12 rounded-[36px] border border-white/70 shadow-xl relative overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 space-y-8">
              
              {/* Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                    {product.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">
                      {product.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                      {product.name}
                    </h2>
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 text-xs font-bold border border-slate-900/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{product.badge}</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
                {product.description}
              </p>

              {/* Features Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Keunggulan Fisik & Proteksi Material:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table (Apple Glass Styled) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Tabel Dimensi & Rekomendasi Beban:
                </h3>
                <div className="liquid-glass-subtle rounded-2xl overflow-hidden border border-white/60 shadow-inner">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100/60 border-b border-slate-200/60 text-slate-800 font-bold">
                        <th className="p-3.5">Dimensi (L x P)</th>
                        <th className="p-3.5">Kapasitas Muat</th>
                        <th className="p-3.5">Ketebalan / Tipe Anyaman</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/40 text-slate-700">
                      {product.specs.map((spec, sIdx) => (
                        <tr key={sIdx} className="hover:bg-white/60 transition">
                          <td className="p-3.5 font-bold text-slate-900">{spec.size}</td>
                          <td className="p-3.5 font-medium">{spec.capacity}</td>
                          <td className="p-3.5 text-slate-600">{spec.thickness}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Button: WhatsApp RFQ */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/6285954597029?text=${encodeURIComponent(
                    `Halo Sales Representative CV Berkat Mandiri, saya tertarik untuk berdiskusi mengenai pemesanan grosir produk: *${product.name}*.\n\nMohon dibantu informasi mengenai ketentuan harga volume kontainer, minimal order (MOQ), serta ketersediaan sampel kain. Terima kasih.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-sheen inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-600/25 border border-white/25 transition-all w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Minta Penawaran Harga via WhatsApp</span>
                </motion.a>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 rounded-2xl hover:bg-white/50 transition w-full sm:w-auto"
                >
                  <span>Ajukan Sampel Fisik Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </motion.div>
        ))}
      </section>

      {/* =====================================================================
          BOTTOM CALL TO ACTION (Apple Obsidian Glass Plate)
          ===================================================================== */}
      <section className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-dark rounded-[36px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 text-white text-center relative overflow-hidden border border-white/15 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Butuh Kustomisasi Spesifikasi Khusus (Custom Request)?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Kami melayani fabrikasi kustom gramasi kain, variasi benang warna list samping, inner liner plastik PE anti-bocor, hingga pencetakan logo merk industri Anda dalam kuantitas grosir.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="liquid-sheen inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-full text-sm shadow-xl shadow-emerald-900/40 border border-white/30 transition active:scale-95"
              >
                <span>Ajukan RFQ Kustomisasi Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}