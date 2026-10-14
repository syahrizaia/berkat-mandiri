"use client";

import { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Database, 
  ArrowRight, 
  LineChart, 
  ShieldCheck, 
  Cpu, 
  Bot,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface StockPrediction {
  id: string;
  sku: string;
  name: string;
  currentStock: number;
  predictedNextMonth: number;
}

interface StockPredictionBlockProps {
  predictions: StockPrediction[] | undefined;
}

export default function StockPredictionBlock({ predictions }: StockPredictionBlockProps) {
  const [selectedStock, setSelectedStock] = useState<StockPrediction | null>(null);

  if (!predictions || predictions.length === 0) {
    return (
      <div className="p-8 liquid-glass rounded-3xl border border-white/70 text-center text-slate-700 font-semibold text-sm shadow-sm flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span>Memuat analisis kecerdasan stok Scikit-Learn ML...</span>
      </div>
    );
  }

  const basePrediction = selectedStock 
    ? Math.round(selectedStock.predictedNextMonth / 1.5) 
    : 0;

  return (
    <div className="space-y-4">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-700">
            <Bot className="w-4 h-4" />
          </div>
          <span>Prediksi Batas Stok Karung Aman (Scikit-Learn ML)</span>
        </h2>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 text-xs font-bold border border-emerald-500/20">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Linear Regression Trained
        </span>
      </div>
      
      {/* GRID KARTU STOK (Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {predictions.map((stock) => {
          const isUnderStock = stock.currentStock < stock.predictedNextMonth;
          
          return (
            <motion.div 
              key={stock.id}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="liquid-glass rounded-3xl p-6 border border-white/70 shadow-lg flex flex-col justify-between space-y-5 relative overflow-hidden group"
            >
              <div className="space-y-4">
                
                {/* SKU Badge & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                    {stock.sku}
                  </span>

                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    isUnderStock 
                      ? "bg-rose-500/15 text-rose-700 border border-rose-500/20" 
                      : "bg-emerald-500/15 text-emerald-700 border border-emerald-500/20"
                  }`}>
                    {isUnderStock ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Kritis / Reorder</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Stok Aman</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  {stock.name}
                </h3>

                {/* Data Points */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="liquid-glass-subtle p-3 rounded-2xl border border-white/60">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Stok Fisik</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">
                      {stock.currentStock.toLocaleString()}{" "}
                      <span className="text-xs font-semibold text-slate-600">lbr</span>
                    </p>
                  </div>

                  <div className="liquid-glass-subtle p-3 rounded-2xl border border-white/60">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Prediksi Batas</p>
                    <p className="text-xl font-extrabold text-emerald-700 mt-1">
                      {stock.predictedNextMonth.toLocaleString()}{" "}
                      <span className="text-xs font-semibold text-slate-600">lbr</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Trigger Modal */}
              <button
                type="button"
                onClick={() => setSelectedStock(stock)}
                className="liquid-sheen w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <span>Buka Detail Alur Logika ML</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* POP-UP MODAL: Transparansi Alur ML & Matematika (Apple Vision Liquid Glass) */}
      <AnimatePresence>
        {selectedStock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop with Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStock(null)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-[36px] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/80 relative z-10 flex flex-col backdrop-blur-3xl"
            >
              {/* Header Modal */}
              <div className="p-6 sm:p-8 border-b border-slate-200/60 flex justify-between items-start bg-white/50 backdrop-blur-md sticky top-0 z-10">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                    {selectedStock.sku}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                    {selectedStock.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Transparansi Alur Logika Algoritma & Pembuktian Matematika ML
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedStock(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-200/60 text-slate-600 hover:text-slate-900 transition"
                  aria-label="Tutup Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Isi Konten Alur Pemrosesan */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                
                {/* Komparasi Kondisi Berjalan (Glass Cards) */}
                <div className="liquid-glass-subtle p-5 rounded-2xl border border-white/70 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Stok Gudang Saat Ini</p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                      {selectedStock.currentStock.toLocaleString()}{" "}
                      <span className="text-xs font-semibold text-slate-600">lbr</span>
                    </p>
                  </div>
                  <div className="border-l border-slate-200/60">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Rekomendasi Batas Aman</p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">
                      {selectedStock.predictedNextMonth.toLocaleString()}{" "}
                      <span className="text-xs font-semibold text-slate-600">lbr</span>
                    </p>
                  </div>
                </div>

                {/* Garis Alur Langkah ML (Numbered Pipeline) */}
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                    Tahapan Prediksi Scikit-Learn:
                  </p>

                  {/* Langkah 1 */}
                  <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/60 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0 text-blue-700">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Langkah 1: Kueri Agregasi Riwayat Penjualan</h4>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                        Layanan Python FastAPI melakukan kueri SQL ke database serverless Neon untuk mengumpulkan volume penjualan bulanan historis (`type = &apos;INCOME&apos;`) spesifik SKU ini.
                      </p>
                    </div>
                  </div>

                  {/* Langkah 2 */}
                  <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/60 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shrink-0 text-purple-700">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Langkah 2: Rekayasa Fitur Waktu (Feature Engineering)</h4>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                        Data penanggalan dikonversi menjadi matriks linear indeks waktu kontinu menggunakan NumPy `[0, 1, 2, ...]` untuk membentuk sumbu X algoritma regresi.
                      </p>
                    </div>
                  </div>

                  {/* Langkah 3 */}
                  <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/60 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0 text-amber-700">
                      <LineChart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Langkah 3: Pemodelan Regresi Linear</h4>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                        Algoritma <span className="font-bold">Linear Regression</span> dari Scikit-Learn menghitung kemiringan gradien kurva permintaan komoditas. Persamaan: <span className="inline-block px-2 py-0.5 bg-white/70 rounded-md border border-slate-200 text-slate-900 font-bold ml-1"><InlineMath math="Y = mX + c" /></span>
                      </p>
                    </div>
                  </div>

                  {/* Langkah 4 */}
                  <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/60 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0 text-cyan-700">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Langkah 4: Proyeksi Penjualan Bulan Depan</h4>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                        Indeks bulan berikutnya diinterpolasi ke fungsi matematika yang telah dilatih. Proyeksi murni: <strong className="text-slate-950">{basePrediction.toLocaleString()} lembar</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Langkah 5 */}
                  <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/60 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 text-emerald-700">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Langkah 5: Kalibrasi Safety Stock (1.5x)</h4>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                        Untuk memitigasi fluktuasi pesanan kargo mendadak, sistem menerapkan faktor pengali keamanan <strong className="text-slate-950">1.5x</strong>, menghasilkan batas stok aman <strong className="text-emerald-700">{selectedStock.predictedNextMonth.toLocaleString()} lembar</strong>.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Footer Modal */}
              <div className="p-4 sm:p-6 border-t border-slate-200/60 bg-white/50 backdrop-blur-md flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStock(null)}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 transition"
                >
                  Tutup Rincian
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}