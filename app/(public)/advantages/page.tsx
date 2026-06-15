"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AdvantagesPage() {
  const coreAdvantages = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Uji Ketahanan & Standar Ekspor",
      desc: "Setiap batch produksi karung melewati uji tarik, uji beban dinamis, dan ketahanan kelembapan udara. Kami menjamin karung goni dan PP woven tidak mudah robek saat melewati proses handling pelabuhan internasional yang kasar."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v6a2 2 0 012-2m14-8V7a2 2 0 00-2-2H5a2 2 0 00-2 2v4" />
        </svg>
      ),
      title: "Skalabilitas & Kontinuitas Produksi",
      desc: "Dengan infrastruktur mesin anyaman berskala besar, kami menjamin stabilitas pasokan bulanan untuk kontrak kerja jangka panjang perusahaan Anda. Tidak ada hambatan kekurangan kuota di tengah musim panen raya atau puncak logistik."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Manajemen Data & Analitik Transparan",
      desc: "Kami mendobrak cara lama penjualan karung konvensional. Sistem manajemen berbasis data kami mencatat rekam transaksi, riwayat RFQ, bill of lading, serta statistik pengapalan Anda secara rapi, meminimalisir kesalahan administrasi audit kargo."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V6.265M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Logistik Fleksibel (FCL / LCL)",
      desc: "Kami memiliki jaringan ekspedisi pengapalan internasional yang andal. Kami melayani pengiriman satu kontainer penuh (Full Container Load) maupun pengiriman parsial gabungan (Less Container Load) ke berbagai pelabuhan utama dunia."
    }
  ];

  // Penulisan Varian Animasi dengan struktur 'as const'
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } as const;

  return (
    <div className="w-full bg-slate-50 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="bg-white border-b border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Kolon Teks Kiri */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold tracking-wide uppercase"
            >
              <span>Efisiensi & Integritas B2B</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Standar Keandalan Baru Dalam <br />
              <span className="text-emerald-600">Industri Pengemasan Massal</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Membeli karung dalam skala kontainer untuk komoditas bernilai tinggi membutuhkan kepastian rantai pasok yang kokoh. CV Berkat Mandiri mengintegrasikan manufaktur produk fisik berkualitas tinggi dengan sistem pengelolaan administrasi berbasis data modern.
            </motion.p>
          </motion.div>
          
          {/* Box Kanan (Komitmen Layanan) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl p-8 text-white space-y-6 shadow-xl border border-slate-700 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <h3 className="text-lg font-bold text-emerald-400">Komitmen Layanan Ekspor Kami:</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✔</span>
                <p><span className="font-bold">Pemberian Sampel Gratis</span>: Pengujian fisik bahan sebelum kontraktual ditandatangan.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✔</span>
                <p><span className="font-bold">Proteksi Dokumen Ekspor</span>: Kepastian kelengkapan Certificate of Origin, Phytosanitary, dan Bea Cukai.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✔</span>
                <p><span className="font-bold">Kustomisasi Fleksibel</span>: Penyesuaian density anyaman, gramatur kain, serta variasi ukuran luar banyal.</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* DETAILED ADVANTAGES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pilar Kompetitif CV Berkat Mandiri
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Bagaimana sistem operasional kami menguntungkan struktur efisiensi biaya dan keamanan logistik korporasi Anda.
          </p>
        </motion.div>

        {/* Grid Container Utama dengan Staggered Effect */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {coreAdvantages.map((advantage, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-emerald-500/30 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                {advantage.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">{advantage.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{advantage.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* METODE PENGAWASAN (QC) TIMELINE */}
      <section className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Alur Pengawasan Mutu (Quality Assurance)</h2>
            <p className="text-slate-400 text-sm">Menjamin presisi ukuran dan kekuatan fisik karung di setiap lembar pesanan Anda.</p>
          </motion.div>

          {/* Grid Tahap Berurutan */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          >
            <motion.div variants={fadeInUp} className="space-y-3 relative z-10 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tahap 01</div>
              <h4 className="text-base font-bold text-white">Inspeksi Serat Benang</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Pengujian elastisitas biji plastik PP murni dan ketebalan anyaman serat alami tanaman goni sebelum masuk mesin rajut.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-3 relative z-10 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tahap 02</div>
              <h4 className="text-base font-bold text-white">Kalibrasi Kerapatan Poros</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Monitoring otomatis presisi anyaman benang (mesh density) untuk mencegah risiko kebocoran isi produk tepung atau butiran halus.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-3 relative z-10 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tahap 03</div>
              <h4 className="text-base font-bold text-white">Uji Beban & Kekuatan Jahitan</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Sampel karung diisi muatan penuh sesuai kapasitas maksimal, lalu diletakkan pada alat simulasi guncangan logistik kontainer kapal.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-3 relative z-10 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tahap 04</div>
              <h4 className="text-base font-bold text-white">Pengepakan Bale & Press</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Karung dipress padat ke dalam kemasan bale besar berlapis pelindung luar kedap air untuk memaksimalkan efisiensi kubikasi ruang kontainer.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="bg-white py-20 text-center border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Ingin Menguji Kualitas Karung Kami Secara Langsung?</h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Kami siap mengirimkan sampel fisik material karung ke alamat kantor atau gudang operasional perusahaan Anda secara instan.
          </p>
          <div className="pt-2">
            <motion.a 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-colors text-sm"
            >
              Ajukan Permintaan Sampel & Negosiasi Harga (RFQ)
            </motion.a>
          </div>
        </div>
      </motion.section>

    </div>
  );
}