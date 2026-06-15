"use client";

import { motion, useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

// Sub-komponen untuk animasi angka berhitung dari 0
function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1.5;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress * (2 - progress); // Easing Out Quad
      
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
  // Ref untuk mendeteksi kapan area angka statistik mulai terlihat di layar
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Konfigurasi Variasi Animasi (as const agar terhindar dari error TypeScript merah)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  } as const;

  return (
    <div className="w-full overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 to-emerald-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
          >
            Profil Perusahaan
          </motion.span>
          
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Menghubungkan Industri Global <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Dengan Pengemasan Terbaik
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Didirikan dengan semangat integritas, CV Berkat Mandiri bertransformasi dari penyedia lokal menjadi mitra distribusi karung berskala internasional.
          </motion.p>
        </motion.div>
      </section>

      {/* SEJARAH & PERJALANAN */}
      <section className="py-20 bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Teks Sejarah */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Cerita di Balik CV Berkat Mandiri</h2>
            <div className="h-1 w-20 bg-emerald-600 rounded"></div>
            <p className="text-slate-600 leading-relaxed">
              CV Berkat Mandiri memulai perjalanannya berfokus pada pemenuhan kebutuhan pengemasan sektor pertanian dan semen domestik. Melalui dedikasi terhadap konsistensi kualitas bahan baku dan ketepatan waktu pengiriman, kami berhasil mendapatkan kepercayaan dari berbagai korporasi besar di Indonesia.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Melihat potensi komoditas global yang terus berkembang pesat, kami memodernisasi lini manajemen data internal serta meningkatkan standardisasi kekuatan karung agar sanggup melewati proses logistik jalur laut internasional yang ketat.
            </p>
          </motion.div>
          
          {/* Visual Stat / Box Info dengan Animasi Berhitung */}
          <motion.div 
            ref={statsRef} 
            variants={fadeInUp} 
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-sm">
              <div className="text-4xl font-extrabold text-emerald-600">
                {statsInView ? <CountUp to={10} /> : "0"}M+
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Karung Terdistribusi</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-sm">
              <div className="text-4xl font-extrabold text-slate-900">
                {statsInView ? <CountUp to={99.4} decimals={1} /> : "0"}%
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tingkat Ketahanan Produk</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-sm">
              <div className="text-4xl font-extrabold text-slate-900">
                {statsInView ? <CountUp to={24} /> : "0"}/7
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sistem Pelacakan Kargo</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-sm flex flex-col justify-center items-center">
              <div className="text-4xl font-extrabold text-emerald-600">B2B</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">Skala Penjualan Massal</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* VISI & MISI */}
      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* VISI */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-2xl font-bold uppercase tracking-wider text-emerald-700">Visi Kami</h2>
            <blockquote className="text-xl sm:text-2xl font-semibold text-slate-800 italic leading-relaxed">
              &quot;Menjadi pemain kunci dalam industri rantai pasok pengemasan karung global yang mengedepankan efisiensi data, kualitas tanpa kompromi, serta keberlanjutan lingkungan.&quot;
            </blockquote>
          </motion.div>

          <hr className="border-slate-300 max-w-md mx-auto" />

          {/* MISI */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-slate-900"
            >
              Misi Perusahaan
            </motion.h2>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold">1</div>
                <h3 className="text-lg font-bold text-slate-900">Standardisasi Global</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Memproduksi dan menyalurkan karung goni serta polipropilena dengan spesifikasi tinggi yang lulus uji ketahanan komoditas internasional.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold">2</div>
                <h3 className="text-lg font-bold text-slate-900">Inovasi Berbasis Data</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Mengintegrasikan teknologi analitik penjualan digital untuk memastikan proses pencatatan, penagihan, hingga kargo ekspor berjalan transparan.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold">3</div>
                <h3 className="text-lg font-bold text-slate-900">Kemitraan Jangka Panjang</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Memberikan layanan negosiasi harga (RFQ) yang fleksibel dan adu kompetitif demi mendukung efisiensi biaya logistik mitra B2B kami.</p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* STANDARISASI EKSPOR */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-slate-900">Kepatuhan Operasional & Kualitas</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Kami memastikan seluruh aspek legalitas hukum dagang domestik maupun regulasi ekspor internasional terpenuhi dengan lengkap.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeInUp} className="p-6 border border-slate-200 rounded-xl space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl block mb-2">📦</span>
              <p className="font-bold text-slate-800 text-sm">Eco-Friendly Jute</p>
              <p className="text-xs text-slate-500">Serat alami ramah lingkungan.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="p-6 border border-slate-200 rounded-xl space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl block mb-2">🛡️</span>
              <p className="font-bold text-slate-800 text-sm">Heavy Duty Strength</p>
              <p className="text-xs text-slate-500">Daya tahan beban beban ekstrem.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="p-6 border border-slate-200 rounded-xl space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl block mb-2">📝</span>
              <p className="font-bold text-slate-800 text-sm">Export Documentation</p>
              <p className="text-xs text-slate-500">Legalitas & bea cukai lengkap.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="p-6 border border-slate-200 rounded-xl space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl block mb-2">🚢</span>
              <p className="font-bold text-slate-800 text-sm">FCL & LCL Delivery</p>
              <p className="text-xs text-slate-500">Metode pengapalan kargo fleksibel.</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}