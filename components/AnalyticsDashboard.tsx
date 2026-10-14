"use client";

import { motion, useInView, Variants } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp, BarChart3, Globe2, Activity } from "lucide-react";

// Data Dummy Simulasi Jual-Beli Ekspor CV Berkat Mandiri
const salesData = [
  { bulan: "Jan", domestik: 45000, ekspor: 20000 },
  { bulan: "Feb", domestik: 52000, ekspor: 35000 },
  { bulan: "Mar", domestik: 49000, ekspor: 55000 },
  { bulan: "Apr", domestik: 63000, ekspor: 70000 },
  { bulan: "Mei", domestik: 58000, ekspor: 85000 },
  { bulan: "Jun", domestik: 71000, ekspor: 110000 },
];

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1.6;

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

// Custom Glass Tooltip for Charts
function CustomGlassTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass-dark px-3.5 py-2.5 rounded-xl border border-white/20 text-xs shadow-xl backdrop-blur-xl">
        <p className="font-bold text-white mb-1">Periode: {label}</p>
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}:</span>
            <span className="font-bold text-white">{item.value.toLocaleString()} Pcs</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <motion.div 
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="space-y-6 w-full p-6 sm:p-8"
    >
      {/* Judul Dashboard & Subtitle */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-800 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live Internal Supply Chain Metrics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Sistem Analitik Data Distribusi & Ekspor
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
            Rekapitulasi performa kuota pasar domestik vs pertumbuhan volume ekspor kargo internasional.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Realtime System Ready
          </span>
        </div>
      </motion.div>

      {/* Ringkasan Grid Angka (Apple Vision Glass Tiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Metric 1 */}
        <motion.div 
          variants={itemVariants} 
          className="liquid-glass p-5 rounded-2xl border border-white/70 shadow-sm relative overflow-hidden group hover:border-emerald-500/40"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Total Ekspor Kargo (YTD)
            </p>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {isInView ? <CountUp to={375000} /> : "0"}{" "}
            <span className="text-xs font-bold text-slate-600">Pcs</span>
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+42.8% YoY Growth</span>
          </div>
        </motion.div>
        
        {/* Metric 2 */}
        <motion.div 
          variants={itemVariants} 
          className="liquid-glass p-5 rounded-2xl border border-white/70 shadow-sm relative overflow-hidden group hover:border-emerald-500/40"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Rasio Konversi RFQ
            </p>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-800 mt-2 tracking-tight">
            {isInView ? <CountUp to={64.8} decimals={1} /> : "0"}%
          </p>
          <p className="text-xs text-slate-700 font-medium mt-2">
            Dari penawaran resmi menjadi Sales Order
          </p>
        </motion.div>
        
        {/* Metric 3 */}
        <motion.div 
          variants={itemVariants} 
          className="liquid-glass p-5 rounded-2xl border border-white/70 shadow-sm relative overflow-hidden group hover:border-emerald-500/40"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Destinasi Pengapalan Aktif
            </p>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {isInView ? <CountUp to={5} /> : "0"}{" "}
            <span className="text-xs font-bold text-slate-600">Negara Hub</span>
          </p>
          <p className="text-xs text-slate-700 font-medium mt-2">
            Asia Tenggara, Oseania, & Eropa
          </p>
        </motion.div>
      </div>

      {/* Grafik Tren Data (Apple Glass Containers) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Grafik Bar Volume Distribusi */}
        <motion.div 
          variants={itemVariants} 
          className="liquid-glass p-5 sm:p-6 rounded-3xl border border-white/70 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Komparasi Volume Distribusi (Pcs)
              </h4>
              <p className="text-xs text-slate-700 font-medium">Pasar Domestik vs Pengapalan Ekspor</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Domestik
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Ekspor
              </span>
            </div>
          </div>

          <div className="w-full h-64 sm:h-72 pt-3">
            {isInView ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                  <XAxis dataKey="bulan" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomGlassTooltip />} />
                  <Bar 
                    dataKey="domestik" 
                    name="Pasar Domestik" 
                    fill="#94a3b8" 
                    radius={[6, 6, 0, 0]} 
                    isAnimationActive={true} 
                    animationDuration={1200} 
                  />
                  <Bar 
                    dataKey="ekspor" 
                    name="Ekspor Global" 
                    fill="#059669" 
                    radius={[6, 6, 0, 0]} 
                    isAnimationActive={true} 
                    animationDuration={1200} 
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </motion.div>

        {/* Grafik Area Pertumbuhan Pasar Ekspor */}
        <motion.div 
          variants={itemVariants} 
          className="liquid-glass p-5 sm:p-6 rounded-3xl border border-white/70 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Tren Laju Pengapalan Internasional
              </h4>
              <p className="text-xs text-slate-700 font-medium">Pertumbuhan kumulatif kuota ekspor bulanan</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-teal-800 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <span>Volume Ekspor</span>
            </div>
          </div>

          <div className="w-full h-64 sm:h-72 pt-3">
            {isInView ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEksporApple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                  <XAxis dataKey="bulan" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomGlassTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="ekspor" 
                    name="Volume Ekspor" 
                    stroke="#0d9488" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#colorEksporApple)" 
                    isAnimationActive={true} 
                    animationDuration={1500} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}