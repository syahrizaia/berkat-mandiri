/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendItem {
  label: string;
  total: number;
}

interface StockPrediction {
  id: string;
  sku: string;
  name: string;
  currentStock: number;
  predictedNextMonth: number;
}

interface SalaryPerformance {
  id: string;
  name: string;
  totalBags: number;
  totalSalary: number;
}

type TimeframeType = "hari" | "pekan" | "bulan" | "tahun";

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<TimeframeType>("hari");
  const [dashboardData, setDashboardData] = useState<{
    stockPredictions: StockPrediction[];
    salaryPerformance: Record<TimeframeType, SalaryPerformance[]>; // 👈 Sudah Sesuai
    trends: Record<TimeframeType, TrendItem[]>;                   // 👈 Sudah Sesuai
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/admin/dashboard");
        const json = await res.json();
        if (json.success) {
          setDashboardData(json.data);
        }
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const handleDownloadExcel = () => {
    window.open("/api/reports/export", "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Ambil pecahan data sesuai filter aktif saat ini dengan fallback array kosong jika data belum termuat
  const currentTrends = dashboardData?.trends?.[timeframe] || [];
  const currentSalary = dashboardData?.salaryPerformance?.[timeframe] || [];

  // Label pembantu teks judul tabel agar lebih informatif
  const labelWaktu: Record<TimeframeType, string> = {
    hari: "Hari Ini",
    pekan: "Pekan Ini",
    bulan: "Bulan Ini",
    tahun: "Tahun Ini",
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen space-y-8">
      {/* HEADER UTAMA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Panel Utama CV Berkat Mandiri</h1>
          <p className="text-sm text-slate-500">Sistem Pemantauan Produksi & Log Kerja Real-time (Neon DB)</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Navigasi Filter Kunci Utama (Mengontrol Grafik & Tabel Sekaligus) */}
          <div className="flex bg-slate-200/70 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {(["hari", "pekan", "bulan", "tahun"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-2 rounded-lg capitalize transition-all ${
                  timeframe === t ? "bg-white text-emerald-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button 
            onClick={handleDownloadExcel}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-all shadow-sm"
          >
            📥 Excel
          </button>
        </div>
      </div>

      {/* BLOK 1: PREDIKSI STOK BULAN DEPAN */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          📦 Prediksi Batas Stok Karung (Bulan Depan)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData?.stockPredictions.map((stock) => (
            <div key={stock.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md uppercase">
                    {stock.sku}
                  </span>
                  <h4 className="font-semibold text-slate-800 mt-2 text-sm truncate">{stock.name}</h4>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Stok Fisik</p>
                  <p className="text-lg font-bold text-slate-800">
                    {stock.currentStock.toLocaleString()} <span className="text-xs font-normal text-slate-500">lbr</span>
                  </p>
                </div>
                <div className="bg-amber-50/50 rounded-lg py-1">
                  <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Prediksi Berjalan</p>
                  <p className="text-lg font-bold text-amber-600">
                    {stock.predictedNextMonth.toLocaleString()} <span className="text-xs font-normal text-amber-500">lbr</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BLOK 2: GRAFIK TREN VOLUME */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">📈 Grafik Tren Volume Karung ({labelWaktu[timeframe]})</h3>
            <p className="text-xs text-slate-500 mb-4">Visualisasi akumulasi kuantitas berdasarkan log kerja terbaru</p>
          </div>

          <div className="w-full h-56 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentTrends} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => val.toLocaleString()} />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none" }}
                  labelStyle={{ color: "#94a3b8", fontSize: "11px", fontWeight: 600 }}
                  itemStyle={{ color: "#34d399", fontSize: "13px", fontWeight: 700 }}
                  formatter={(value: any) => [`${value.toLocaleString()} lembar`, "Total Vol"]}
                />
                <Bar dataKey="total" fill="#059669" radius={[6, 6, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NOTIFIKASI INFORMASI CETAK */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">🖨️ Cetak Dokumen Fisik</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Seluruh grafik tren, rincian borongan slip upah, beserta tabel master prediksi stok di samping dapat diekspor langsung ke spreadsheet format `.xlsx`.
            </p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mt-4">
            <span className="text-xs font-semibold text-slate-700 block mb-1">💡 Sistem Upah Multi-Faktor:</span>
            <p className="text-[11px] text-slate-500 leading-normal">
              Estimasi gaji dihitung otomatis secara kumulatif berdasarkan kombinasi **Jenis Pekerjaan** dikali tarif spesifik masing-masing jenis karung.
            </p>
          </div>
        </div>
      </div>

      {/* BLOK 3: TABEL DATA PERFORMA BORONGAN GAJI KARYAWAN */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-base">👥 Performa Borongan Gaji Karyawan ({labelWaktu[timeframe]})</h3>
            <p className="text-xs text-slate-500">Akumulasi hasil produksi lembar karung dan total upah hak karyawan pada periode terpilih</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl self-start sm:self-auto border border-emerald-200/50">
            Periode: Tarikan {labelWaktu[timeframe]}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs tracking-wider uppercase">
                <th className="py-3 px-6">Nama Karyawan</th>
                <th className="py-3 px-6 text-center">Hasil Kerja ({labelWaktu[timeframe]})</th>
                <th className="py-3 px-6 text-right">Gaji Borongan (Rp)</th>
                <th className="py-3 px-6 text-center">Status Rekap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {currentSalary.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-900">{emp.name}</td>
                  <td className="py-3.5 px-6 text-center text-slate-800 font-mono">
                    {emp.totalBags.toLocaleString()} <span className="text-xs text-slate-400 font-normal">lbr</span>
                  </td>
                  <td className="py-3.5 px-6 text-right text-emerald-700 font-mono">
                    Rp {emp.totalSalary.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      emp.totalSalary > 0 
                        ? "bg-amber-50 text-amber-700 border border-amber-200/60" 
                        : "bg-slate-100 text-slate-400 border border-slate-200/40"
                    }`}>
                      {emp.totalSalary > 0 ? "Siap Cetak Slip" : "Tidak Ada Log"}
                    </span>
                  </td>
                </tr>
              ))}
              {currentSalary.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400 text-xs font-normal">
                    Belum ada data log aktivitas karyawan untuk filter waktu ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}