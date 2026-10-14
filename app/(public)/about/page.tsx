"use client";

import { motion, useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { Globe, Award, Sparkles, ShieldCheck, Ship, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1.6;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress * (2 - progress);
      
      setCount(easeProgress * to);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [to]);

  return (
    <>
      {count.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </>
  );
}

export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
          HERO SECTION (Apple Liquid Glass Plate)
          ===================================================================== */}
      <section className="relative">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="liquid-glass rounded-[36px] sm:rounded-[44px] p-8 sm:p-14 lg:p-20 text-center relative overflow-hidden border border-white/80 shadow-2xl space-y-6"
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none" />

          <motion.div variants={fadeInUp} className="relative z-10">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Profil & Komitmen Korporasi</span>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp} 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight relative z-10 max-w-4xl mx-auto"
          >
            Profil CV Berkat Mandiri - Produsen & <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-800 bg-clip-text text-transparent">
              Eksportir Karung Indonesia
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp} 
            className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed relative z-10"
          >
            Didirikan dengan integritas tinggi, CV Berkat Mandiri bertransformasi dari penyedia lokal menjadi mitra distribusi karung berskala internasional yang dipercaya oleh korporasi global.
          </motion.p>
        </motion.div>
      </section>

      {/* =====================================================================
          SEJARAH & METRIK STATISTIK (Bento Grid)
          ===================================================================== */}
      <section className="relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Teks Narasi Cerita Perusahaan (Span 7) */}
          <motion.div 
            variants={fadeInUp} 
            className="lg:col-span-7 liquid-glass rounded-[32px] p-8 sm:p-10 border border-white/70 shadow-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Award className="w-4 h-4" /> Dedikasi Kualitas Sejak Awal
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Cerita Perjalanan CV Berkat Mandiri
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full" />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                CV Berkat Mandiri memulai perjalanannya dengan fokus pada pemenuhan kebutuhan pengemasan komoditas pertanian, beras, pupuk, dan semen domestik. Melalui dedikasi terhadap konsistensi kualitas bahan baku dan ketepatan waktu pengiriman, kami berhasil mendapatkan reputasi unggul di mata korporasi manufaktur Indonesia.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Menyikapi lonjakan permintaan komoditas ekspor global, kami memodernisasi lini pengawasan mutu dan sistem pencatatan data kargo. Seluruh lembar karung dirancang sanggup melewati penanganan kasar pelabuhan dan pelayaran laut jarak jauh dengan kondisi muatan tetap prima.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/50 flex items-center gap-3 text-xs font-bold text-slate-700">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Operasional Terintegrasi: Gudang Bekasi & Port Tanjung Priok</span>
            </div>
          </motion.div>
          
          {/* Visual Stat / Box Info dengan Animasi Berhitung (Span 5) */}
          <motion.div 
            ref={statsRef} 
            variants={fadeInUp} 
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="liquid-glass p-6 rounded-3xl border border-white/70 text-center space-y-2 shadow-lg flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight">
                {statsInView ? <CountUp to={10} /> : "0"}M+
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Karung Terdistribusi</p>
            </div>
            
            <div className="liquid-glass p-6 rounded-3xl border border-white/70 text-center space-y-2 shadow-lg flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {statsInView ? <CountUp to={99.4} decimals={1} /> : "0"}%
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Uji Ketahanan Lulus</p>
            </div>
            
            <div className="liquid-glass p-6 rounded-3xl border border-white/70 text-center space-y-2 shadow-lg flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {statsInView ? <CountUp to={24} /> : "0"}/7
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Pelacakan Kargo</p>
            </div>
            
            <div className="liquid-glass p-6 rounded-3xl border border-white/70 text-center space-y-2 shadow-lg flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">FCL</div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Skala Kontainer</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================================
          VISI & MISI PERUSAHAAN (Bento Layout)
          ===================================================================== */}
      <section className="relative space-y-12">
        
        {/* VISI CARD */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="liquid-glass-dark rounded-[36px] p-8 sm:p-14 text-white text-center max-w-4xl mx-auto space-y-4 border border-white/15 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-[80px] pointer-events-none" />
          
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Visi Jangka Panjang
          </span>
          <blockquote className="text-xl sm:text-2xl font-bold italic leading-relaxed text-slate-100 max-w-3xl mx-auto">
            &ldquo;Menjadi pemain kunci dalam industri rantai pasok pengemasan karung global yang mengedepankan efisiensi data, kualitas tanpa kompromi, serta keberlanjutan lingkungan.&rdquo;
          </blockquote>
        </motion.div>

        {/* MISI CARDS */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Misi Perusahaan
            </h2>
            <p className="text-slate-700 font-medium text-sm">Prinsip operasional utama kami dalam melayani mitra bisnis</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            <motion.div variants={fadeInUp} className="liquid-glass p-8 rounded-[32px] shadow-lg border border-white/70 space-y-4">
              <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center text-emerald-700 font-extrabold">01</div>
              <h3 className="text-lg font-bold text-slate-900">Standardisasi Global</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Memproduksi dan menyalurkan karung goni serta polipropilena dengan spesifikasi tinggi yang lulus uji ketahanan komoditas internasional.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="liquid-glass p-8 rounded-[32px] shadow-lg border border-white/70 space-y-4">
              <div className="w-10 h-10 bg-teal-500/15 rounded-xl flex items-center justify-center text-teal-700 font-extrabold">02</div>
              <h3 className="text-lg font-bold text-slate-900">Inovasi Berbasis Data</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mengintegrasikan sistem analitik penjualan digital untuk memastikan proses pencatatan, penagihan, hingga kargo ekspor berjalan transparan.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="liquid-glass p-8 rounded-[32px] shadow-lg border border-white/70 space-y-4">
              <div className="w-10 h-10 bg-cyan-500/15 rounded-xl flex items-center justify-center text-cyan-700 font-extrabold">03</div>
              <h3 className="text-lg font-bold text-slate-900">Kemitraan Jangka Panjang</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Memberikan fleksibilitas negosiasi harga (RFQ) dan sampel fisik bahan gratis demi mendukung efisiensi biaya logistik mitra B2B kami.
              </p>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* =====================================================================
          STANDARISASI & KEPATUHAN EKSPOR
          ===================================================================== */}
      <section className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3 mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Kepatuhan Operasional & Sertifikasi</h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">Kami memastikan seluruh aspek legalitas hukum dagang domestik maupun regulasi ekspor internasional terpenuhi lengkap.</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          <motion.div variants={fadeInUp} className="liquid-glass p-6 rounded-2xl border border-white/70 space-y-2 text-center shadow-sm hover:border-emerald-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Eco-Friendly Jute</p>
            <p className="text-xs text-slate-700 font-medium">Serat alami ramah lingkungan.</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="liquid-glass p-6 rounded-2xl border border-white/70 space-y-2 text-center shadow-sm hover:border-emerald-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Heavy Duty Strength</p>
            <p className="text-xs text-slate-700 font-medium">Daya tahan beban beban ekstrem.</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="liquid-glass p-6 rounded-2xl border border-white/70 space-y-2 text-center shadow-sm hover:border-emerald-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-2">
              <FileCheck className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Export Docs</p>
            <p className="text-xs text-slate-700 font-medium">Legalitas & kepabeanan lengkap.</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="liquid-glass p-6 rounded-2xl border border-white/70 space-y-2 text-center shadow-sm hover:border-emerald-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Ship className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-900 text-sm">FCL & LCL Delivery</p>
            <p className="text-xs text-slate-700 font-medium">Metode pengapalan kargo fleksibel.</p>
          </motion.div>
        </motion.div>

        {/* CTA Contact link */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="liquid-sheen inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-full text-sm shadow-lg shadow-emerald-600/25 border border-white/25 transition active:scale-95"
          >
            <span>Hubungi Tim Legal & Manajemen Kami</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}