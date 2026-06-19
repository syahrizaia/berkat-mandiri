"use client";

import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import LogisticsCalculator from "@/components/LogisticsCalculator";
import RfqForm from "@/components/RfqForm";
import { motion, Variants } from "framer-motion";
import { Globe } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  // Data produk sampel
  const products = [
    {
      id: 1,
      name: "Karung Goni Standar Internasional",
      desc: "Terbuat dari serat alami berkualitas tinggi, ramah lingkungan, dan sangat kuat untuk komoditas pertanian seperti kopi dan kakao.",
      imageText: "Karung Goni",
    },
    {
      id: 2,
      name: "Karung Plastik Woven PP",
      desc: "Didesain dengan kerapatan tinggi untuk menahan beban berat seperti beras, pupuk, pasir, dan bahan kimia industri.",
      imageText: "Karung PP Woven",
    },
    {
      id: 3,
      name: "Karung Laminasi & Custom Printing",
      desc: "Perlindungan ekstra terhadap kelembapan dengan tampilan visual premium untuk meningkatkan nilai branding produk Anda.",
      imageText: "Karung Laminasi",
    },
  ];

  const sampleProducts = [
    { id: "p1", name: "Karung Goni Standar Internasional" },
    { id: "p2", name: "Karung Plastik Woven PP" },
    { id: "p3", name: "Karung Laminasi & Printing" }
  ];

  // Varian animasi untuk efek stagger (muncul bergantian satu per satu)
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUpItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden">

      {/* HERO SECTION */}
      <header className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Teks */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold tracking-wide uppercase">
              <span className="flex items-center gap-2">
                <Globe /> Siap Ekspor Global
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Solusi Pengemasan Karung Berkualitas untuk <span className="text-emerald-600">Pasar Internasional</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              CV Berkat Mandiri menyediakan karung goni, karung plastik, dan solusi pengemasan kustom berskala besar. Kami berkomitmen menjaga rantai pasok global Anda tetap aman dengan produk standar tinggi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/product" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 transition">
                Lihat Katalog Produk
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition">
                Pelajari Tentang Kami
              </Link>
            </div>
          </motion.div>
          
          {/* Hero Ilustrasi */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center items-center lg:h-full"
          >
            <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl border border-emerald-200/50 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <svg className="w-24 h-24 text-emerald-600/80 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-xl font-bold text-slate-800">CV Berkat Mandiri Hub</h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1">Sistem Terintegrasi untuk Supply Chain Karung Domestik & Internasional</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* KEUNGGULAN UTAMA */}
      <section id="keunggulan" className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Keunggulan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">Mengapa Memilih Kami?</h2>
            <p className="text-slate-600 text-lg">Kami memadukan kualitas produk konvensional dengan manajemen modern berbasis data.</p>
          </motion.div>

          {/* Grid Cards Keunggulan (Staggered) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUpItem} className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Kualitas Standar Ekspor</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Setiap lembar karung melewati proses Quality Control yang ketat guna memastikan ketahanan terhadap cuaca ekstrem dan tekanan beban logistik laut.</p>
            </motion.div>

            <motion.div variants={fadeInUpItem} className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Kapasitas Produksi Besar</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Didukung fasilitas manufaktur modern, kami siap memenuhi kuota pemesanan skala kontainer secara konsisten dengan jadwal pengiriman yang presisi.</p>
            </motion.div>

            <motion.div variants={fadeInUpItem} className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19.2a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Manajemen Data Transparan</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Melalui integrasi data penjualan dan analitik digital, kami memastikan kejelasan dokumentasi ekspor-impor, penagihan, serta statistik pasokan Anda.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BAGIAN UTAMA: KALKULATOR & FORM RFQ */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        <LogisticsCalculator />
        <RfqForm products={sampleProducts} />
      </motion.section>

      {/* BAGIAN ANALITIK (SIMULASI DASHBOARD INTERNAL) */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
      >
        <div className="bg-white p-2 rounded-3xl border border-slate-200/80 shadow-sm">
          <AnalyticsDashboard />
        </div>
      </motion.section>

      {/* PRODUK UTAMA */}
      <section id="produk" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Katalog */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">Katalog Produk Unggulan</h2>
            <p className="text-slate-600 text-lg">Pilihan jenis karung terbaik yang disesuaikan dengan kebutuhan komoditas spesifik Anda.</p>
          </motion.div>

          {/* Grid Katalog Produk (Staggered) */}
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
                variants={fadeInUpItem}
                className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-slate-100 flex items-center justify-center border-b border-slate-100 text-slate-400 font-semibold text-lg">
                  {product.imageText}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{product.desc}</p>
                  </div>
                  
                  <Link
                    href={`https://wa.me/6285954597029?text=${encodeURIComponent(
                      `Halo Sales Representative CV Berkat Mandiri, saya tertarik untuk meminta penawaran harga (RFQ) grosir untuk produk: *${product.name}*.\n\nMohon informasi mengenai ketentuan minimal order (MOQ), estimasi harga per lembar kargo, serta opsi kustomisasi cetak logo. Terima kasih.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-medium rounded-xl text-sm transition text-center shadow-sm"
                  >
                    Minta Penawaran Harga (RFQ)
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION (CTA) / KONTAK */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        id="kontak" 
        className="py-20 bg-slate-950 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Siap Memperluas Distribusi Produk Anda Bersama Kami?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Hubungi tim representatif kami untuk konsultasi spesifikasi karung, estimasi pengapalan internasional, atau permintaan sampel produk gratis.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
          >
            <Link href="mailto:info@cvberkatmandiri.com" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 transition w-full sm:w-auto">
              Hubungi via Email Bisnis
            </Link>
            <Link
              href="https://wa.me/6285954597029?text=Halo%20Sales%20Representative%20CV%20Berkat%20Mandiri%2C%20saya%20tertarik%20untuk%20mendiskusikan%20kebutuhan%20pemesanan%20karung%20skala%20besar.%20Mohon%20informasi%20mengenai%20katalog%20produk%2C%20minimal%20order%2C%20serta%20prosedur%20pengiriman%20ekspor.%20Terima%20kasih." 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition w-full sm:w-auto"
            >
              WhatsApp Sales Representative
            </Link>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}