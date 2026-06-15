"use client";

import { motion, useInView, Variants } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Data Dummy Simulasi Jual-Beli Ekspor CV Berkat Mandiri
const salesData = [
  { bulan: "Jan", domestik: 45000, ekspor: 20000 },
  { bulan: "Feb", domestik: 52000, ekspor: 35000 },
  { bulan: "Mar", domestik: 49000, ekspor: 55000 },
  { bulan: "Apr", domestik: 63000, ekspor: 70000 },
  { bulan: "Mei", domestik: 58000, ekspor: 85000 },
  { bulan: "Jun", domestik: 71000, ekspor: 110000 },
];

// Sub-komponen untuk animasi angka berhitung dari 0
function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1.5; // Durasi dalam detik

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

export default function AnalyticsDashboard() {
  // 1. MEMBUAT REF UNTUK MENDETEKSI VIEWPORT SCROLL
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <motion.div 
      ref={containerRef} // 2. PASANG REF DI SINI
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="space-y-6 w-full p-6 bg-slate-50 rounded-2xl border border-slate-200"
    >
      {/* Judul Dashboard */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-slate-900">Sistem Analitik Data Penjualan</h2>
        <p className="text-sm text-slate-500">Rekapitulasi performa distribusi pasar domestik vs volume ekspor karung global.</p>
      </motion.div>

      {/* Ringkasan Grid Angka - HANYA BERHITUNG JIKA KONDISI isInView = TRUE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Total Pesanan Ekspor (YTD)</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {isInView ? <CountUp to={375000} /> : "0"}{" "}
            <span className="text-xs font-normal text-slate-500">Pcs</span>
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Konversi RFQ Masuk</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {isInView ? <CountUp to={64.8} decimals={1} /> : "0"}%
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Negara Tujuan Teraktif</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {isInView ? <CountUp to={5} /> : "0"}{" "}
            <span className="text-xs font-normal text-slate-500">Negara B2B</span>
          </p>
        </motion.div>
      </div>

      {/* Grafik Tren Data - HANYA DI-RENDER JIKA KONDISI isInView = TRUE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Grafik Bar Volume Distribusi */}
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-sm font-bold text-slate-800">Komparasi Volume Distribusi (Pcs)</p>
          <div className="w-full h-64">
            {isInView ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="domestik" name="Pasar Domestik" fill="#94a3b8" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1200} />
                  <Bar dataKey="ekspor" name="Ekspor Global" fill="#059669" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </motion.div>

        {/* Grafik Area Pertumbuhan Pasar Ekspor */}
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-sm font-bold text-slate-800">Tren Pertumbuhan Pengapalan Internasional</p>
          <div className="w-full h-64">
            {isInView ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEkspor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="ekspor" name="Volume Ekspor" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorEkspor)" isAnimationActive={true} animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}