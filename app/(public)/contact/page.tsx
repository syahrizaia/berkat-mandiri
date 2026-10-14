"use client";

import { motion } from "framer-motion";
import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, MessageCircle, Ship, Sparkles, Clock } from "lucide-react";

export default function ContactPage() {
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  } as const;

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  } as const;

  return (
    <div className="w-full relative z-10 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      
      {/* =====================================================================
          HEADER SECTION
          ===================================================================== */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-3xl space-y-4"
      >
        <motion.div variants={fadeInUp}>
          <div className="liquid-glass-pill inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Global Trade & Logistics Support</span>
          </div>
        </motion.div>
        
        <motion.h1 
          variants={fadeInUp} 
          className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
        >
          Hubungi CV Berkat Mandiri - <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-800 bg-clip-text text-transparent">
            Pemesanan Karung Grosir & Ekspor B2B
          </span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp} 
          className="text-slate-600 text-sm sm:text-base leading-relaxed"
        >
          Punya pertanyaan mengenai kapasitas mesin, legalitas ekspor kargo, atau ingin meminta sampel fisik bahan karung? Tim representatif resmi kami siap membantu operasional korporasi Anda.
        </motion.p>
      </motion.div>

      {/* =====================================================================
          MAIN SPLIT GRID
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* KIRI: INFORMASI KANTOR & INSTANT CHANNEL (Span 5) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideInLeft}
          className="lg:col-span-5 space-y-6"
        >
          
          {/* Card 1: Fast Track WhatsApp */}
          <div className="liquid-glass p-7 rounded-[32px] border border-white/70 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Saluran Langsung (Direct Channel)
              </span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
            
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/6285954597029?text=Halo%20Sales%20Representative%20CV%20Berkat%20Mandiri%2C%20saya%20tertarik%20untuk%20mendiskusikan%20kebutuhan%20pemesanan%20karung%20skala%20besar.%20Mohon%20informasi%20mengenai%20katalog%20produk%2C%20minimal%20order%2C%20serta%20prosedur%20pengiriman%20ekspor.%20Terima%20kasih." 
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-sheen flex items-center justify-center gap-2.5 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/25 border border-white/30 transition text-sm w-full"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hubungi WhatsApp Sales</span>
            </motion.a>
            
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium pt-1">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Senin - Sabtu (08:00 - 17:00 WIB)</span>
            </div>
          </div>

          {/* Card 2: Detail Kantor & Pelabuhan */}
          <div className="liquid-glass p-7 rounded-[32px] border border-white/70 shadow-xl space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-200/50">
              Pusat Administrasi & Pelabuhan Muat
            </h4>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-emerald-500/15 rounded-2xl flex items-center justify-center text-emerald-700 font-bold shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900">Kantor Operasional & Gudang</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kawasan Industri Logistik Prima, Jl. Raya Transmisi No. 42, Bekasi, Jawa Barat, Indonesia.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-teal-500/15 rounded-2xl flex items-center justify-center text-teal-700 font-bold shrink-0">
                <Ship className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900">Pelabuhan Muat Utama (Port of Loading)</h5>
                <p className="text-xs text-slate-600">
                  Tanjung Priok International Port (IDTPP), Jakarta, Indonesia.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-cyan-500/15 rounded-2xl flex items-center justify-center text-cyan-700 font-bold shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900">Korespondensi Surat Elektronik</h5>
                <p className="text-xs text-slate-600 font-medium select-all">
                  info@cvberkatmandiri.com <br />
                  export@cvberkatmandiri.com
                </p>
              </div>
            </div>
          </div>

        </motion.div>

        {/* KANAN: FORMULIR RFQ (Span 7) */}
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
  );
}