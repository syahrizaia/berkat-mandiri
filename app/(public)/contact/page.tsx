"use client";

import { motion } from "framer-motion";
import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, MessageCircle, Ship } from "lucide-react";

export default function ContactPage() {
  
  // Konfigurasi Varian Animasi (as const untuk validasi tipe TypeScript)
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
      transition: { staggerChildren: 0.12 },
    },
  } as const;

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } as const;

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } as const;

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION WITH STAGGER */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mb-12 sm:mb-16 space-y-3"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full"
          >
            Global Trade Support
          </motion.span>
          
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mulai Negosiasi Pengadaan <br />
            <span className="text-emerald-600">Komoditas Kemasan Anda</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Punya pertanyaan mengenai kapasitas mesin, legalitas ekspor, atau ingin meminta sampel fisik? Tim representative kami siap membantu administrasi perusahaan Anda.
          </motion.p>
        </motion.div>

        {/* UTAMA GRID SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* KIRI: INFORMASI KONTAK AKTIF (Slide In dari Kiri) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="lg:col-span-5 space-y-8"
          >
            
            {/* Opsi Kontak Instan */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Respons Cepat (Instant Channel)</h4>
              
              {/* Tombol WhatsApp Sales dengan Efek Spring */}
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/6285954597029?text=Halo%20Sales%20Representative%20CV%20Berkat%20Mandiri%2C%20saya%20tertarik%20untuk%20mendiskusikan%20kebutuhan%20pemesanan%20karung%20skala%20besar.%20Mohon%20informasi%20mengenai%20katalog%20produk%2C%20minimal%20order%2C%20serta%20prosedur%20pengiriman%20ekspor.%20Terima%20kasih." 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors text-sm w-full shadow-sm"
              >
                <MessageCircle /> WhatsApp Sales Representative
              </motion.a>
              
              <div className="text-center">
                <span className="text-xs text-slate-400">Jam Operasional: Senin - Sabtu (08:00 - 17:00 WIB)</span>
              </div>
            </div>

            {/* Detail Administrasi Kantor dengan Staggered List Internal */}
            <motion.div 
              variants={staggerContainer}
              className="space-y-6 px-2"
            >
              <motion.div variants={fadeInUp} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold shrink-0">
                  <MapPin />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">Kantor Operasional & Gudang Utama</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Kawasan Industri Logistik Prima, Jl. Raya Transmisi No. 42, Bekasi Regency, Jawa Barat, Indonesia.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold shrink-0">
                  <Mail />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">Korespondensi Surat Elektronik</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    info@cvberkatmandiri.com <br />
                    export@cvberkatmandiri.com
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold shrink-0">
                  <Ship />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">Pelabuhan Muat Utama (Port of Loading)</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Tanjung Priok International Port (IDTPP), Jakarta, Indonesia.
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* KANAN: FORMULIR RFQ (Slide In dari Kanan) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>

        </div>

      </div>
    </div>
  );
}