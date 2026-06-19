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
  Bot
} from "lucide-react";
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
  // State untuk menyimpan data karung yang sedang dipilih/diklik
  const [selectedStock, setSelectedStock] = useState<StockPrediction | null>(null);

  if (!predictions || predictions.length === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
        Memuat analisis kecerdasan stok...
      </div>
    );
  }

  // Hitung taksiran penjualan dasar sebelum dikalibrasi safety stock 1.5x (untuk keperluan penjelasan di modal)
  const basePrediction = selectedStock 
    ? Math.round(selectedStock.predictedNextMonth / 1.5) 
    : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
        <Bot />
        Prediksi Batas Stok Karung Aman (Scikit-Learn ML)
      </h2>
      
      {/* GRID KARTU STOK */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((stock) => {
          const isUnderStock = stock.currentStock < stock.predictedNextMonth;
          
          return (
            <div 
              key={stock.id} 
              onClick={() => setSelectedStock(stock)}
              className={`bg-white p-5 rounded-2xl border transition-all shadow-sm flex flex-col justify-between space-y-4 cursor-pointer group hover:shadow-md hover:-translate-y-0.5 ${
                isUnderStock 
                  ? "border-rose-200 hover:border-rose-300 bg-gradient-to-b from-white to-rose-50/10" 
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                    isUnderStock ? "bg-rose-100 text-rose-700" : "bg-emerald-50 text-emerald-700"
                  }`}>
                    {stock.sku}
                  </span>
                  
                  {isUnderStock ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-600 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5" /> Restock!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5" /> Aman
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-800 text-sm tracking-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">
                  {stock.name}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Stok Fisik</p>
                  <p className="text-xl font-black text-slate-800 mt-0.5">
                    {stock.currentStock.toLocaleString()} 
                    <span className="text-xs font-normal text-slate-500 ml-1">lbr</span>
                  </p>
                </div>
                <div className={isUnderStock ? "bg-rose-50/50 rounded-xl py-1.5" : "bg-slate-50/80 rounded-xl py-1.5"}>
                  <p className={`text-[10px] font-black uppercase tracking-wider ${isUnderStock ? "text-rose-700" : "text-slate-500"}`}>
                    Prediksi ML
                  </p>
                  <p className={`text-xl font-black mt-0.5 ${isUnderStock ? "text-rose-600" : "text-emerald-700"}`}>
                    {stock.predictedNextMonth.toLocaleString()} 
                    <span className="text-xs font-normal text-slate-400 ml-1">lbr</span>
                  </p>
                </div>
              </div>
              
              <div className="text-[11px] text-slate-400 text-center pt-1 group-hover:text-emerald-600 font-medium transition-colors">
                Klik kartu untuk bedah alur AI ↗
              </div>
            </div>
          );
        })}
      </div>

      {/* POP-UP DIALOG DIKKLIK (EXPLORER ALUR MACHINE LEARNING) */}
      {selectedStock && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Header Modal */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md uppercase">
                  {selectedStock.sku}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{selectedStock.name}</h3>
                <p className="text-xs text-slate-500">Transparansi Logika Matematika & Alur Prediksi Sistem</p>
              </div>
              <button 
                onClick={() => setSelectedStock(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Isi Konten Alur Pemrosesan */}
            <div className="p-6 space-y-6">
              
              {/* Komparasi Kondisi Berjalan */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Stok Gudang Saat Ini</p>
                  <p className="text-2xl font-black text-slate-800 mt-1">{selectedStock.currentStock.toLocaleString()} <span className="text-sm font-normal text-slate-500">lbr</span></p>
                </div>
                <div className="border-l border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Rekomendasi Batas Aman</p>
                  <p className="text-2xl font-black text-emerald-700 mt-1">{selectedStock.predictedNextMonth.toLocaleString()} <span className="text-sm font-normal text-slate-500">lbr</span></p>
                </div>
              </div>

              {/* Garis Alur Langkah ML */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:top-2 before:w-0.5 before:bg-slate-100 before:h-[88%]">
                
                {/* Langkah 1 */}
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Langkah 1: Kueri Riwayat Penjualan Fisik</h5>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Sistem Python FastAPI melakukan kueri SQL langsung ke database Neon.tech untuk menarik agregasi penjualan bulanan (`type = &apos;INCOME&apos;`) khusus untuk ID karung ini.
                    </p>
                  </div>
                </div>

                {/* Langkah 2 */}
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 text-purple-600">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Langkah 2: Rekayasa Fitur (Feature Engineering)</h5>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Data berbasis waktu (timestamp) diubah menjadi urutan indeks angka linear menggunakan library NumPy `[0, 1, 2, ...]` untuk mewakili sumbu urutan bulan agar mesin mampu mengalkulasi tren matriks.
                    </p>
                  </div>
                </div>

                {/* Langkah 3 */}
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Langkah 3: Pencarian Pola Tren Tren (Linear Regression)</h5>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Algoritma <span className="font-bold">Linear Regression</span> dari library Scikit-Learn membaca sebaran riwayat data penjualan untuk menentukan tingkat kemiringan grafik penjualan (apakah permintaan pasar condong naik atau turun). Rumus matematis yang terbentuk di memori: <InlineMath math="Y = mX + c" />
                    </p>
                  </div>
                </div>

                {/* Langkah 4 */}
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0 text-cyan-600">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Langkah 4: Proyeksi Penjualan Bulan Depan</h5>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Sistem memasukkan indeks bulan masa depan ke dalam pola garis tren yang telah dipelajari. Untuk karung ini, didapatkan estimasi target penjualan murni sebesar <span className="font-bold text-slate-800">{basePrediction.toLocaleString()} lembar</span> untuk bulan depan.
                    </p>
                  </div>
                </div>

                {/* Langkah 5 */}
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Langkah 5: Kalibrasi Pengaman Berlipat (Safety Stock)</h5>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Untuk mengantisipasi lonjakan order tak terduga dari pembeli dan menghindari kehabisan barang di gudang, hasil prediksi dasar dikalikan dengan <span className="font-bold"></span>, menghasilkan angka <span className="font-bold text-emerald-700">{selectedStock.predictedNextMonth.toLocaleString()} lembar</span>.
                    </p>
                  </div>
                </div>

              </div>

              {/* Kesimpulan Status Akhir */}
              <div className={`p-4 rounded-2xl border text-xs font-medium leading-relaxed ${
                selectedStock.currentStock < selectedStock.predictedNextMonth
                  ? "bg-rose-50 text-rose-800 border-rose-200"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}>
                {selectedStock.currentStock < selectedStock.predictedNextMonth ? (
                  <p>
                    <strong>Kesimpulan Analisis:</strong> Stok fisik Anda saat ini ({selectedStock.currentStock.toLocaleString()} lbr) berada <strong>di bawah</strong> batas aman hasil prediksi AI ({selectedStock.predictedNextMonth.toLocaleString()} lbr). Gudang direkomendasikan untuk segera memproduksi atau memesan pasokan baru guna menghindari hilangnya potensi penjualan bulan depan.
                  </p>
                ) : (
                  <p>
                    <strong>Kesimpulan Analisis:</strong> Stok fisik Anda saat ini ({selectedStock.currentStock.toLocaleString()} lbr) masih <strong>mencukupi</strong> untuk menutupi batas aman prediksi AI ({selectedStock.predictedNextMonth.toLocaleString()} lbr). Status barang dinilai aman terkendali.
                  </p>
                )}
              </div>

            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end rounded-b-3xl">
              <button
                onClick={() => setSelectedStock(null)}
                className="bg-slate-900 text-white font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800 transition shadow-sm"
              >
                Selesai Membaca
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}