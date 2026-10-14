"use client";

import React, { useState } from "react";
import { Container, PackageCheck, Ship, Sparkles } from "lucide-react";

export default function LogisticsCalculator() {
  const [sackType, setSackType] = useState<"pp" | "goni">("pp");
  const [quantity, setQuantity] = useState<number>(50000);

  // Estimasi kapasitas tampung per kontainer (berdasarkan pengemasan press/bale kargo)
  const capacityMap = {
    pp: { ft20: 40000, ft40: 80000, name: "Woven PP Sacks", unitWeight: "Kerapatan Tinggi / Ringan" },
    goni: { ft20: 15000, ft40: 30000, name: "Goni Alami (Jute)", unitWeight: "Serat Alami / Heavy Duty" }
  };

  const selectedCapacity = capacityMap[sackType];
  
  // Perhitungan jumlah kontainer yang dibutuhkan
  const need20ft = quantity > 0 ? Math.ceil(quantity / selectedCapacity.ft20) : 0;
  const need40ft = quantity > 0 ? Math.ceil(quantity / selectedCapacity.ft40) : 0;

  return (
    <div className="liquid-glass-dark text-white p-7 sm:p-9 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden w-full h-full flex flex-col justify-between">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
              <Ship className="w-3.5 h-3.5" />
              <span>Simulasi Logistik Maritim</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Kalkulator Kontainer Ekspor
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
              Estimasi presisi kapasitas FCL (Full Container Load) berdasarkan volume pesanan kargo Anda.
            </p>
          </div>
          
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Container className="w-5 h-5" />
          </div>
        </div>

        {/* Input: Sack Type Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
            Jenis Material Karung
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setSackType("pp")}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 border ${
                sackType === "pp"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-900/40"
                  : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/15 hover:text-white"
              }`}
            >
              <span>Woven PP Standard</span>
            </button>
            <button
              type="button"
              onClick={() => setSackType("goni")}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 border ${
                sackType === "goni"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-900/40"
                  : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/15 hover:text-white"
              }`}
            >
              <span>Karung Goni Alami</span>
            </button>
          </div>
        </div>

        {/* Input: Target Quantity */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-200 uppercase tracking-wider">
              Target Jumlah Pengapalan
            </label>
            <span className="text-emerald-300 font-extrabold text-sm">
              {quantity.toLocaleString()} Pcs
            </span>
          </div>
          
          <div className="relative">
            <input 
              type="number" 
              value={quantity || ""} 
              onChange={e => setQuantity(Math.max(0, parseInt(e.target.value) || 0))} 
              className="w-full px-4 py-3 bg-slate-900/90 border border-white/20 rounded-2xl text-sm font-bold text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition" 
              placeholder="Masukkan jumlah lembar..." 
              min="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300 pointer-events-none">
              LEMBAR
            </span>
          </div>

          {/* Quick preset chips */}
          <div className="flex gap-2 pt-1 flex-wrap">
            {[20000, 50000, 100000].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setQuantity(val)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-semibold transition"
              >
                +{(val / 1000)}k Pcs
              </button>
            ))}
          </div>
        </div>

        {/* Results Glass Cards */}
        <div className="border-t border-white/10 pt-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Rekomendasi Kapasitas Kontainer
            </span>
            <span className="text-[11px] text-emerald-300 flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3" /> Auto Calculated
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* 20ft FCL Box */}
            <div className="liquid-glass-subtle bg-white/[0.06] p-4 rounded-2xl border border-white/15 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between text-xs text-slate-200 font-medium">
                <span>Kontainer 20ft FCL</span>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">Standard</span>
              </div>
              <div className="text-3xl font-extrabold text-emerald-300 mt-2 tracking-tight">
                {need20ft} <span className="text-xs text-slate-200 font-normal">Unit Kapal</span>
              </div>
              <div className="text-xs text-slate-200 mt-1.5 flex items-center gap-1.5 font-medium">
                <PackageCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Max: ~{selectedCapacity.ft20.toLocaleString()} pcs/box</span>
              </div>
            </div>

            {/* 40ft FCL Box */}
            <div className="liquid-glass-subtle bg-white/[0.06] p-4 rounded-2xl border border-white/15 hover:border-teal-500/40 transition-all">
              <div className="flex items-center justify-between text-xs text-slate-200 font-medium">
                <span>Kontainer 40ft High Cube</span>
                <span className="text-[10px] text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded font-bold">High Volume</span>
              </div>
              <div className="text-3xl font-extrabold text-teal-300 mt-2 tracking-tight">
                {need40ft} <span className="text-xs text-slate-200 font-normal">Unit Kapal</span>
              </div>
              <div className="text-xs text-slate-200 mt-1.5 flex items-center gap-1.5 font-medium">
                <PackageCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Max: ~{selectedCapacity.ft40.toLocaleString()} pcs/box</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-200 font-medium">
        <span>Pengemasan: Press Bale Kedap Air</span>
        <span className="text-emerald-300 font-bold">Port: Tanjung Priok</span>
      </div>

    </div>
  );
}