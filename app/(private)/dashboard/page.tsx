/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import StockPredictionBlock from "@/components/StockPredictionBlock";
import { BarChart4, Download, Printer, Users, Sparkles, TrendingUp } from "lucide-react";
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

// Custom Glass Tooltip for Dashboard Chart
function CustomDashboardTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="liquid-glass-dark px-3.5 py-2.5 rounded-xl border border-white/20 text-xs shadow-xl backdrop-blur-xl">
        <p className="font-bold text-white mb-1">Periode: {label}</p>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Volume:</span>
          <span className="font-bold text-emerald-400">{payload[0].value.toLocaleString()} lembar</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<TimeframeType>("hari");
  const [dashboardData, setDashboardData] = useState<{
    stockPredictions: StockPrediction[];
    salaryPerformance: Record<TimeframeType, SalaryPerformance[]>;
    trends: Record<TimeframeType, TrendItem[]>;
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-500 border-t-transparent" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Memuat Data Panel Enterprise...</span>
      </div>
    );
  }

  const currentTrends = dashboardData?.trends?.[timeframe] || [];
  const currentSalary = dashboardData?.salaryPerformance?.[timeframe] || [];

  const labelWaktu: Record<TimeframeType, string> = {
    hari: "Hari Ini",
    pekan: "Pekan Ini",
    bulan: "Bulan Ini",
    tahun: "Tahun Ini",
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER UTAMA (Apple Vision Glass Banner) */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/70 shadow-lg flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sistem Operasional Terintegrasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Panel Utama CV Berkat Mandiri
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Monitoring Produksi, Log Kerja Borongan, & Analitik Kargo Real-time (Neon DB)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Apple Segmented Pill Filter */}
          <div className="liquid-glass-pill p-1.5 flex gap-1 shadow-inner border border-white/60">
            {(["hari", "pekan", "bulan", "tahun"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 capitalize ${
                  timeframe === t 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20" 
                    : "text-slate-700 hover:text-slate-950 font-semibold"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Export Excel Button with Liquid Sheen */}
          <button 
            onClick={handleDownloadExcel}
            className="liquid-sheen inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 px-5 rounded-full text-xs sm:text-sm shadow-md shadow-emerald-600/25 border border-white/25 transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Excel (.xlsx)</span>
          </button>
        </div>
      </div>

      {/* BLOK 1: PREDIKSI STOK BULAN DEPAN (ML) */}
      <StockPredictionBlock predictions={dashboardData?.stockPredictions} />
      
      {/* BLOK 2: GRAFIK & NOTIFIKASI CETAK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Grafik Tren Volume Karung */}
        <div className="lg:col-span-2 liquid-glass p-6 sm:p-8 rounded-[32px] border border-white/70 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <BarChart4 className="w-5 h-5 text-emerald-600" />
                <span>Grafik Tren Volume Karung ({labelWaktu[timeframe]})</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">Visualisasi akumulasi kuantitas berdasarkan log kerja terbaru</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/20">
              Live Aggregate
            </span>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => val.toLocaleString()} />
                <Tooltip content={<CustomDashboardTooltip />} />
                <Bar 
                  dataKey="total" 
                  fill="#059669" 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={45} 
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifikasi Informasi Cetak & Formula Upah */}
        <div className="liquid-glass p-6 sm:p-8 rounded-[32px] border border-white/70 shadow-lg flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-700">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Cetak Dokumen & Ekspor Fisik</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Seluruh grafik tren, rincian borongan slip upah, beserta tabel master prediksi stok dapat diekspor langsung ke spreadsheet format `.xlsx`.
            </p>
          </div>

          <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/60 space-y-1.5">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Sistem Upah Multi-Faktor:
            </span>
            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
              Estimasi gaji dihitung otomatis secara kumulatif berdasarkan kombinasi <strong className="text-slate-950 font-bold">Jenis Pekerjaan</strong> dikali tarif spesifik masing-masing jenis karung.
            </p>
          </div>
        </div>
      </div>

      {/* BLOK 3: TABEL DATA PERFORMA BORONGAN GAJI KARYAWAN */}
      <div className="liquid-glass rounded-[32px] border border-white/70 shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Performa Borongan Gaji Karyawan ({labelWaktu[timeframe]})</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Akumulasi hasil produksi lembar karung dan total upah hak karyawan pada periode terpilih
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-500/15 px-3.5 py-1.5 rounded-full border border-emerald-500/20 self-start sm:self-auto">
            Periode: Tarikan {labelWaktu[timeframe]}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200/70 text-slate-800 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6">Nama Karyawan</th>
                <th className="py-4 px-6 text-center">Hasil Kerja ({labelWaktu[timeframe]})</th>
                <th className="py-4 px-6 text-right">Gaji Borongan (Rp)</th>
                <th className="py-4 px-6 text-center">Status Rekap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 text-slate-800 font-medium">
              {currentSalary.map((emp) => (
                <tr key={emp.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-950">{emp.name}</td>
                  <td className="py-4 px-6 text-center text-slate-900 font-mono font-bold">
                    {emp.totalBags.toLocaleString()} <span className="text-xs text-slate-600 font-semibold">lbr</span>
                  </td>
                  <td className="py-4 px-6 text-right text-emerald-700 font-mono font-bold">
                    Rp {emp.totalSalary.toLocaleString("id-ID")}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                      emp.totalSalary > 0 
                        ? "bg-emerald-500/15 text-emerald-800 border border-emerald-500/25" 
                        : "bg-slate-100 text-slate-600 border border-slate-300"
                    }`}>
                      {emp.totalSalary > 0 ? "Siap Cetak Slip" : "Tidak Ada Log"}
                    </span>
                  </td>
                </tr>
              ))}
              {currentSalary.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-slate-600 text-xs font-semibold">
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