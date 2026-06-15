"use client";

import React, { useState } from "react";

export default function LogisticsCalculator() {
  const [sackType, setSackType] = useState("pp"); // pp atau goni
  const [quantity, setQuantity] = useState<number>(0);

  // Estimasi kapasitas tampung per kontainer (berdasarkan pengemasan press/bale kargo)
  const capacityMap = {
    pp: { ft20: 40000, ft40: 80000 },
    goni: { ft20: 15000, ft40: 30000 }
  };

  const selectedCapacity = sackType === "pp" ? capacityMap.pp : capacityMap.goni;
  
  // Perhitungan jumlah kontainer yang dibutuhkan
  const need20ft = quantity > 0 ? Math.ceil(quantity / selectedCapacity.ft20) : 0;
  const need40ft = quantity > 0 ? Math.ceil(quantity / selectedCapacity.ft40) : 0;

  return (
    <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl max-w-xl mx-auto space-y-6">
      <div>
        <h3 className="text-lg font-bold">Kalkulator Logistik Ekspor</h3>
        <p className="text-xs text-slate-400 mt-1">Estimasi kebutuhan ruang kontainer kapal berdasarkan volume pesanan Anda.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Jenis Bahan Karung</label>
          <select value={sackType} onChange={e => setSackType(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none text-white">
            <option value="pp">Woven PP (Tipis/Kerapatan Tinggi)</option>
            <option value="goni">Goni Alami (Tebal/Heavy Duty)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Target Jumlah (Pcs)</label>
          <input type="number" value={quantity || ""} onChange={e => setQuantity(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none text-white" placeholder="0" />
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Rekomendasi Opsi Pengapalan:</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Kontainer 20ft FCL</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{need20ft} <span className="text-xs text-slate-400 font-normal">Unit</span></div>
            <div className="text-[10px] text-slate-500 mt-1">Kapasitas maks: ~{selectedCapacity.ft20.toLocaleString()} pcs/kontainer</div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Kontainer 40ft FCL</div>
            <div className="text-2xl font-bold text-teal-400 mt-1">{need40ft} <span className="text-xs text-slate-400 font-normal">Unit</span></div>
            <div className="text-[10px] text-slate-500 mt-1">Kapasitas maks: ~{selectedCapacity.ft40.toLocaleString()} pcs/kontainer</div>
          </div>
        </div>
      </div>
    </div>
  );
}