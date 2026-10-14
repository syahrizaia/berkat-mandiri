"use client";

import { motion } from "framer-motion";
import React from "react";
import { ShieldCheck, Factory, BarChart3, Ship, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdvantagesPage() {
  const coreAdvantages = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Uji Ketahanan & Standar Ekspor",
      desc: "Setiap batch produksi karung melewati uji tarik mekanis, uji ketahanan timbunan kargo, serta ketahanan kelembapan cuaca laut. Kami menjamin karung goni dan PP woven tidak mudah robek saat penanganan kasar di dermaga pelabuhan internasional."
    },
    {
      icon: <Factory className="w-6 h-6 text-teal-600" />,
      title: "Skalabilitas & Kontinuitas Produksi",
      desc: "Didukung lini mesin circular loom berkapasitas tinggi, kami menjamin stabilitas pasokan rutin untuk kontrak jangka panjang korporasi Anda. Bebas hambatan kekurangan kuota saat puncak musim panen raya atau lonjakan logistik komoditas."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-cyan-600" />,
      title: "Manajemen Data & Rekam Jejak Digital",
      desc: "Kami memperbarui tata kelola penjualan karung konvensional. Sistem manajemen data kami mencatat riwayat transaksi, status RFQ, manifes pengapalan, dan statistik kargo secara transparan untuk memudahkan audit logistik klien."
    },
    {
      icon: <Ship className="w-6 h-6 text-emerald-600" />,
      title: "Logistik Fleksibel (FCL / LCL)",
      desc: "Bekerja sama erat dengan shipping line terkemuka melalui Port of Loading Tanjung Priok (IDTPP), kami melayani pengapalan kontainer penuh (Full Container Load) maupun pengiriman parsial gabungan (Less Container Load) ke berbagai pelabuhan utama dunia."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
    },
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  } as const;

  return (
    <div className="w-full relative z-10 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* =====================================================================
          HERO SECTION (Apple Vision Liquid Glass Split Plate)
          ===================================================================== */}
      <section className="relative">
        <div className="liquid-glass rounded-[36px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-white/80 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            
            {/* Left Narrative */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-5"
            >
              <motion.div variants={fadeInUp}>
                <div className="liquid-glass-pill inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Keunggulan Kompetitif B2B</span>
                </div>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp} 
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
              >
                Keunggulan Standar Ekspor Karung Goni & Plastik PP Woven <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-800 bg-clip-text text-transparent">
                  CV Berkat Mandiri
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp} 
                className="text-slate-600 text-sm sm:text-base leading-relaxed"
              >
                Pengadaan karung skala kontainer untuk komoditas bernilai tinggi membutuhkan kepastian rantai pasok yang kokoh. CV Berkat Mandiri memadukan manufaktur fisik berstandar ekspor dengan manajemen administrasi data modern.
              </motion.p>
            </motion.div>
            
            {/* Right Glass Commitment Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 liquid-glass-dark rounded-3xl p-7 sm:p-8 text-white space-y-5 shadow-xl border border-white/15 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-base font-bold text-emerald-400">Komitmen Layanan Ekspor Kami:</h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p><span className="font-bold text-white">Sampel Fisik Gratis</span>: Uji coba ketahanan material sebelum penandatanganan kontrak.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p><span className="font-bold text-white">Kelengkapan Dokumen</span>: Jaminan legalitas Certificate of Origin, Phytosanitary, dan Bea Cukai.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p><span className="font-bold text-white">Kustomisasi Fleksibel</span>: Penyesuaian density rajutan benang, gramatur kain, dan cetak logo merk.</p>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          PILAR KOMPETITIF (Bento Grid)
          ===================================================================== */}
      <section className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pilar Kompetitif CV Berkat Mandiri
          </h2>
          <p className="text-slate-700 font-medium text-sm sm:text-base">
            Bagaimana sistem operasional terintegrasi kami mengoptimalkan efisiensi biaya dan keamanan kargo Anda.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {coreAdvantages.map((advantage, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              className="liquid-glass p-8 sm:p-9 rounded-[32px] border border-white/70 shadow-lg flex flex-col sm:flex-row gap-6 items-start group hover:border-emerald-500/40"
            >
              <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 shadow-inner">
                {advantage.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{advantage.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{advantage.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =====================================================================
          ALUR PENGAWASAN MUTU (Quality Assurance 4-Step Flow)
          ===================================================================== */}
      <section className="relative">
        <div className="liquid-glass-dark rounded-[36px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 border border-white/15 text-white space-y-12 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-3 relative z-10"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Zero-Defect Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Alur Pengawasan Mutu (Quality Control)
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Memastikan presisi ukuran, kerapatan anyaman, dan kekuatan fisik karung di setiap lembar pesanan Anda.
            </p>
          </motion.div>

          {/* 4-Step Cards Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            <motion.div variants={fadeInUp} className="liquid-glass-subtle bg-white/[0.04] p-6 rounded-2xl border border-white/10 space-y-3">
              <span className="inline-block text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Tahap 01
              </span>
              <h4 className="text-base font-bold text-white">Inspeksi Serat Benang</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Pengujian elastisitas biji plastik PP murni dan ketebalan serat tanaman goni alami sebelum proses penenunan.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="liquid-glass-subtle bg-white/[0.04] p-6 rounded-2xl border border-white/10 space-y-3">
              <span className="inline-block text-[11px] font-bold text-teal-400 bg-teal-500/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Tahap 02
              </span>
              <h4 className="text-base font-bold text-white">Kalibrasi Kerapatan Mesh</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Monitoring presisi anyaman benang (mesh density) untuk mencegah risiko kebocoran isi tepung atau butiran halus.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="liquid-glass-subtle bg-white/[0.04] p-6 rounded-2xl border border-white/10 space-y-3">
              <span className="inline-block text-[11px] font-bold text-cyan-400 bg-cyan-500/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Tahap 03
              </span>
              <h4 className="text-base font-bold text-white">Uji Beban & Jahitan</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sampel diisi beban maksimal dan diuji guncangan untuk menyimulasikan dinamika logistik kargo laut internasional.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="liquid-glass-subtle bg-white/[0.04] p-6 rounded-2xl border border-white/10 space-y-3">
              <span className="inline-block text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Tahap 04
              </span>
              <h4 className="text-base font-bold text-white">Pengepakan Bale Press</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Karung dipress padat ke dalam kemasan bale berlapis pelindung kedap air untuk memaksimalkan efisiensi kontainer.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* =====================================================================
          FINAL CALL TO ACTION
          ===================================================================== */}
      <section className="relative text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="liquid-glass rounded-[36px] p-8 sm:p-12 border border-white/80 shadow-xl max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ingin Menguji Kualitas Material Karung Kami Secara Langsung?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Kami siap mengirimkan sampel fisik material karung langsung ke alamat kantor atau gudang operasional perusahaan Anda.
          </p>
          <div className="pt-2">
            <Link
              href="/contact" 
              className="liquid-sheen inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-full text-sm shadow-xl shadow-emerald-600/30 border border-white/30 transition active:scale-95"
            >
              <span>Ajukan Permintaan Sampel Fisik & RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}