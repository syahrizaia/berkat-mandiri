"use client";

import { motion, Variants } from "framer-motion";
import { 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  Factory, 
  BarChart2, 
  Ship, 
  CheckCircle2, 
  Package, 
  Sparkles, 
  Send,
  Anchor,
  Layers
} from "lucide-react";
import Link from "next/link";

import LogisticsCalculator from "@/components/LogisticsCalculator";
import RfqForm from "@/components/RfqForm";

import AnalyticsDashboard from "@/components/AnalyticsDashboard";

export default function LandingPage() {
  // Data produk sampel
  const products = [
    {
      id: 1,
      badge: "Eco-Friendly Natural",
      name: "Karung Goni Standar Internasional",
      desc: "Terbuat dari serat tanaman goni alami berkualitas tinggi, ramah lingkungan, dengan sirkulasi udara optimal untuk komoditas pertanian seperti kopi, kakao, dan cengkeh.",
      specs: ["100% Biodegradable", "B-Twill Export Standard", "Kapasitas 25 - 60 kg"],
      icon: <Package className="w-6 h-6 text-emerald-500" />
    },
    {
      id: 2,
      badge: "High-Density Polymer",
      name: "Karung Plastik Woven PP",
      desc: "Didesain dengan kerapatan benang anyaman tinggi berdaya tahan maksimal untuk menahan beban berat logistik timbunan seperti beras, pupuk, semen, dan bahan kimia industri.",
      specs: ["Anti-Slip & Kedap Lembap", "600 - 1000+ Denier", "Kapasitas hingga 60 kg"],
      icon: <Layers className="w-6 h-6 text-teal-500" />
    },
    {
      id: 3,
      badge: "Premium High-Gloss Branding",
      name: "Karung Laminasi & Custom Printing",
      desc: "Perlindungan kedap air ekstra dengan lapisan plastik BOPP beresolusi tinggi (rotogravure printing) guna meningkatkan daya pikat visual dan nilai komersial merk Anda.",
      specs: ["100% Waterproof", "Full Color Rotogravure", "Custom Size & Finishing"],
      icon: <Sparkles className="w-6 h-6 text-cyan-500" />
    },
  ];

  const sampleProducts = [
    { id: "p1", name: "Karung Goni Standar Internasional" },
    { id: "p2", name: "Karung Plastik Woven PP" },
    { id: "p3", name: "Karung Laminasi & Printing" }
  ];

  // Apple Spring & Ease Animations
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const appleSpringUp: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.75, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <div className="w-full text-slate-800 font-sans relative">

      {/* =====================================================================
          HERO SECTION (Apple Vision Liquid Glass Focal Panel)
          ===================================================================== */}
      <section className="relative pt-6 pb-20 sm:pt-10 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Main Hero Glass Card Container */}
        <div className="liquid-glass rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 lg:p-16 border border-white/80 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Light Reflections */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Hero Left: Narrative Typography */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-6 sm:space-y-7"
            >
              {/* Apple Floating Badge */}
              <motion.div variants={appleSpringUp}>
                <div className="liquid-glass-pill inline-flex items-center gap-2.5 px-4 py-1.5 shadow-sm">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                  </span>
                  <span className="text-xs font-bold tracking-wide uppercase text-emerald-800 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" /> Siap Pengapalan Ekspor Global
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                variants={appleSpringUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
              >
                Supplier Karung Goni & Plastik Woven PP untuk{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-800 bg-clip-text text-transparent">
                  Industri & Ekspor Global
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p 
                variants={appleSpringUp}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl"
              >
                CV Berkat Mandiri memadukan produksi karung goni serat alami, karung plastik woven PP, dan solusi laminasi kustom berstandar internasional untuk menjaga integritas rantai pasok komoditas global Anda.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div 
                variants={appleSpringUp}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <Link 
                  href="/product" 
                  className="liquid-sheen inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-xl shadow-emerald-600/30 border border-white/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Lihat Katalog Produk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link 
                  href="/about" 
                  className="liquid-glass-subtle inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-slate-800 hover:text-emerald-800 hover:bg-white/80 border border-white/60 shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Pelajari Profil Perusahaan</span>
                </Link>
              </motion.div>

              {/* Value Pill Highlights */}
              <motion.div 
                variants={appleSpringUp}
                className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>QC Ketat Standar Ekspor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Port of Loading: IDTPP Tanjung Priok</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Kapasitas Skala Kontainer FCL</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Right: 3D Apple Vision Glass Interactive Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex justify-center items-center"
            >
              {/* Glass Focal Stage */}
              <div className="w-full relative rounded-3xl p-6 sm:p-8 liquid-glass-subtle border border-white/70 shadow-2xl overflow-hidden">
                
                {/* Dynamic Water Wave Morph Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-emerald-400/20 to-teal-300/25 blur-2xl rounded-full animate-pulse pointer-events-none" />

                {/* Central Glass Hub Card */}
                <div className="relative z-10 space-y-5">
                  
                  {/* Top Hub Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                        <Anchor className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">CV Berkat Mandiri Hub</span>
                        <p className="text-xs text-slate-600 font-semibold">B2B International Supply Chain</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>

                  {/* Glass Float Tile 1: Export Loading Status */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="liquid-glass p-3.5 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                        <Ship className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Pengapalan Kontainer FCL</p>
                        <p className="text-xs text-slate-600 font-medium">Tanjung Priok ke Pelabuhan Global</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-700">40ft HC</span>
                  </motion.div>

                  {/* Glass Float Tile 2: Quality & Strength Index */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="liquid-glass p-3.5 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-700 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Ketahanan Uji Beban</p>
                        <p className="text-xs text-slate-600 font-medium">Tensile & Drop Test Passed</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-teal-700">99.4%</span>
                  </motion.div>

                  {/* Glass Float Tile 3: Fast Response RFQ */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="liquid-glass p-3.5 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-700 flex items-center justify-center">
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Layanan Sampel Gratis</p>
                        <p className="text-xs text-slate-600 font-medium">Inspeksi fisik bahan sebelum kontrak</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">Verified</span>
                  </motion.div>

                  {/* Bottom Stats Row */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-2xl bg-white/60 border border-white/70 text-center">
                      <p className="text-lg font-extrabold text-slate-900 tracking-tight">10M+</p>
                      <p className="text-xs uppercase font-bold text-slate-600">Karung Terdistribusi</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/60 border border-white/70 text-center">
                      <p className="text-lg font-extrabold text-emerald-700 tracking-tight">24/7</p>
                      <p className="text-xs uppercase font-bold text-slate-600">Tracking Support</p>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          BENTO GRID: KEUNGGULAN UTAMA (Why Choose Us?)
          ===================================================================== */}
      <section id="keunggulan" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <div className="liquid-glass-pill inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pilar Keunggulan Kompetitif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Standar Keandalan Tanpa Kompromi
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Kami mengintegrasikan kualitas material kelas ekspor dengan transparansi manajemen data digital demi mendukung efisiensi rantai pasok Anda.
          </p>
        </motion.div>

        {/* Bento Grid 3-Card Layout */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {/* Card 1: Kualitas Standar Ekspor */}
          <motion.div 
            variants={appleSpringUp}
            className="liquid-glass p-8 sm:p-9 rounded-[32px] border border-white/70 shadow-lg relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="space-y-4 relative z-10">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Kualitas Standar Ekspor
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Setiap batch produksi melewati inspeksi Quality Control ketat untuk menjamin ketahanan terhadap guncangan kontainer kapal dan kelembapan cuaca laut ekstrem.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Zero-Defect Commitment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2: Kapasitas Produksi Besar */}
          <motion.div 
            variants={appleSpringUp}
            className="liquid-glass p-8 sm:p-9 rounded-[32px] border border-white/70 shadow-lg relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="space-y-4 relative z-10">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-cyan-400/20 border border-teal-500/30 flex items-center justify-center text-teal-600 shadow-inner">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Kapasitas Produksi Besar
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Didukung lini mesin circular loom modern berkapasitas massal, kami siap mengamankan kuota pemesanan skala puluhan kontainer secara konsisten dan tepat waktu.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Continuous Output</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3: Manajemen Data Transparan */}
          <motion.div 
            variants={appleSpringUp}
            className="liquid-glass p-8 sm:p-9 rounded-[32px] border border-white/70 shadow-lg relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="space-y-4 relative z-10">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-400/20 border border-cyan-500/30 flex items-center justify-center text-cyan-700 shadow-inner">
                <BarChart2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Manajemen Data Transparan
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dokumentasi ekspor (Bill of Lading, Certificate of Origin) dan pelacakan RFQ tercatat rapi secara digital, meminimalisir kekeliruan audit logistik mitra korporat.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-cyan-800">
              <span>Digital Audit Trail</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </motion.div>

      </section>

      {/* =====================================================================
          BENTO PAIR: KALKULATOR LOGISTIK & FORMULIR RFQ
          ===================================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <LogisticsCalculator />
          <RfqForm products={sampleProducts} />
        </div>
      </section>

      {/* =====================================================================
          ANALITIK DATA PENJUALAN (SIMULASI DASHBOARD INTERNAL)
          ===================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="liquid-glass rounded-[36px] sm:rounded-[44px] p-2 sm:p-4 border border-white/80 shadow-2xl overflow-hidden">
          <AnalyticsDashboard />
        </div>
      </section>

      {/* =====================================================================
          KATALOG PRODUK UNGGULAN (Apple Bento Product Cards)
          ===================================================================== */}
      <section id="produk" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="liquid-glass-pill inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Package className="w-3.5 h-3.5 text-emerald-600" />
            <span>Katalog Komersial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pilihan Produk Unggulan
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Spesifikasi material berstandar tinggi yang disesuaikan dengan kebutuhan komoditas agrikultur maupun industri Anda.
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id} 
              variants={appleSpringUp}
              className="liquid-glass rounded-[32px] p-7 sm:p-8 border border-white/70 shadow-lg flex flex-col justify-between space-y-6 group hover:border-emerald-500/40"
            >
              <div className="space-y-5">
                
                {/* Header Card: Icon + Category Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    {product.icon}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                    {product.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* Key Spec Bullets */}
                <div className="space-y-2 pt-2 border-t border-slate-200/50">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Spesifikasi Utama:
                  </span>
                  <div className="space-y-1.5">
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button: RFQ via WhatsApp */}
              <div className="pt-4">
                <Link
                  href={`https://wa.me/6285954597029?text=${encodeURIComponent(
                    `Halo Sales Representative CV Berkat Mandiri, saya tertarik untuk meminta penawaran harga (RFQ) grosir untuk produk: *${product.name}*.\n\nMohon informasi mengenai ketentuan minimal order (MOQ), estimasi harga per lembar kargo, serta opsi kustomisasi cetak logo. Terima kasih.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-sheen w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 border border-white/20 transition-all hover:shadow-lg active:scale-95"
                >
                  <span>Minta Penawaran Harga (RFQ)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Full Catalog Button */}
        <div className="mt-12 text-center">
          <Link
            href="/product"
            className="liquid-glass-pill inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-800 transition"
          >
            <span>Buka Tabel Spesifikasi & Katalog Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* =====================================================================
          CALL TO ACTION (Apple Obsidian Liquid Glass Stage)
          ===================================================================== */}
      <section id="kontak" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-dark rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-20 text-white text-center relative overflow-hidden border border-white/15 shadow-2xl"
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-400 text-xs font-semibold">
              <Ship className="w-3.5 h-3.5" />
              <span>Siap Melayani Pengadaan Skala Besar</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Siap Memperluas Rantai Pasok Produk Anda Bersama Kami?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Hubungi tim representatif penjualan kami untuk konsultasi spesifikasi karung, estimasi waktu fabrikasi, perhitungan kontainer laut, atau permintaan sampel fisik gratis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
              <Link 
                href="mailto:info@cvberkatmandiri.com" 
                className="liquid-sheen w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-900/40 border border-white/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Hubungi via Email Bisnis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="https://wa.me/6285954597029?text=Halo%20Sales%20Representative%20CV%20Berkat%20Mandiri%2C%20saya%20tertarik%20untuk%20mendiskusikan%20kebutuhan%20pemesanan%20karung%20skala%20besar.%20Mohon%20informasi%20mengenai%20katalog%20produk%2C%20minimal%20order%2C%20serta%20prosedur%20pengiriman%20ekspor.%20Terima%20kasih." 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>WhatsApp Sales Representative</span>
              </Link>
            </div>

          </div>
        </motion.div>
      </section>

    </div>
  );
}