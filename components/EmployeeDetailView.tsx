/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { 
  Calendar, 
  Printer, 
  User, 
  Phone, 
  Briefcase, 
  Layers, 
  Wallet, 
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Clock
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface EmployeeDetailViewProps {
  employee: any;
}

type Timeframe = "day" | "week" | "month" | "all";

export default function EmployeeDetailView({ employee }: EmployeeDetailViewProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>("all");

  // Fungsi helper untuk menghitung upah per log kerja berdasarkan aturan tarif Neon.tech
  const calculateLogWage = (log: any) => {
    let wage = log.bagType?.wagePerPiece || 0;
    switch (log.task) {
      case "MENCUCI":
        wage = log.bagType?.wageMencuci || wage;
        break;
      case "MELIPAT":
        wage = log.bagType?.wageMelipat || wage;
        break;
      case "MENJAHIT":
        wage = log.bagType?.wageMenjahit || wage;
        break;
    }
    return (log.quantity || 0) * wage;
  };

  // Logika memfilter data berdasarkan waktu (Hari / Pekan / Bulan / Semua)
  const filteredLogs = useMemo(() => {
    const now = new Date();
    const logs = employee.workLogs || [];
    return logs.filter((log: any) => {
      const logDate = new Date(log.date);
      
      if (timeframe === "day") {
        return logDate.toDateString() === now.toDateString();
      }
      
      if (timeframe === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return logDate >= oneWeekAgo;
      }
      
      if (timeframe === "month") {
        return logDate.getMonth() === now.getMonth() && logDate.getFullYear() === now.getFullYear();
      }
      
      return true; // "all"
    });
  }, [employee.workLogs, timeframe]);

  // Akumulasi total produksi dan total estimasi gaji
  const summary = useMemo(() => {
    let totalPieces = 0;
    let totalSalary = 0;

    filteredLogs.forEach((log: any) => {
      totalPieces += log.quantity || 0;
      totalSalary += calculateLogWage(log);
    });

    return { totalPieces, totalSalary };
  }, [filteredLogs]);

  const handlePrint = () => {
    window.print();
  };

  const timeframeLabels: Record<Timeframe, string> = {
    day: "Hari Ini",
    week: "Pekan Ini",
    month: "Bulan Ini",
    all: "Semua Riwayat"
  };

  return (
    <div className="space-y-8">
      {/* Top Navigation & Print Actions (Hidden on print) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <Link 
          href="/employees" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl liquid-glass text-xs font-bold text-slate-800 hover:text-slate-950 border border-slate-300 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> 
          <span>Kembali ke Daftar Karyawan</span>
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
        >
          <Printer className="w-4 h-4" /> 
          <span>Cetak Slip Gaji ({timeframeLabels[timeframe]})</span>
        </button>
      </div>

      {/* HEADER DOKUMEN CETAK (Hanya muncul saat di-print ke kertas) */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase">CV BERKAT MANDIRI</h1>
            <p className="text-xs text-slate-700 font-medium">Industri & Distribusi Karung Plastik Bekas & Baru Berkualitas</p>
            <p className="text-xs text-slate-600 font-medium">Laporan Hasil Kerja & Slip Estimasi Gaji Karyawan Borongan</p>
          </div>
          <div className="text-right text-xs text-slate-700">
            <p>Dicetak: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
            <p className="font-bold text-slate-900">Periode: {timeframeLabels[timeframe]}</p>
          </div>
        </div>
      </div>

      {/* Profile Header Liquid Glass Card */}
      <div className="p-6 sm:p-8 rounded-[32px] liquid-glass border border-slate-200/80 shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl liquid-glass flex items-center justify-center font-black text-2xl text-emerald-700 border border-emerald-500/20 shadow-md shrink-0">
            {employee.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                Staf Borongan
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              {employee.name}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 font-semibold mt-1">
              {employee.phone ? (
                <a
                  href={`https://wa.me/${employee.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 transition-colors font-mono font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  {employee.phone}
                </a>
              ) : (
                <span className="flex items-center gap-1.5 text-slate-500 italic"><Phone className="w-3.5 h-3.5" /> Tanpa Nomor Kontak</span>
              )}
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> 
                Terdaftar: {new Date(employee.createdAt).toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe Selector Pill (Hidden on print) */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-2xl border border-slate-300/60 w-full md:w-auto print:hidden">
          {(["all", "day", "week", "month"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                timeframe === t
                  ? "bg-white text-slate-950 shadow-sm border border-slate-200/80"
                  : "text-slate-700 hover:text-slate-950"
              }`}
            >
              {t === "all" ? "Semua" : t === "day" ? "Hari Ini" : t === "week" ? "Pekan Ini" : "Bulan Ini"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl liquid-glass text-emerald-700 border border-emerald-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
              Hasil Periode {timeframeLabels[timeframe]}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Hasil Produksi</p>
            <p className="text-3xl font-black text-slate-950 mt-1 font-mono">
              {summary.totalPieces.toLocaleString("id-ID")}{" "}
              <span className="text-base font-bold text-slate-600 font-sans">Lembar</span>
            </p>
          </div>
        </div>

        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl liquid-glass text-blue-700 border border-blue-500/20">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-800 border border-blue-500/20">
              Estimasi Bersih
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Estimasi Gaji Borongan</p>
            <p className="text-3xl font-black text-blue-700 mt-1 font-mono">
              Rp {summary.totalSalary.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      {/* Rincian Log Kerja Table */}
      <div className="liquid-glass rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden">
        <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-700" />
            <span className="text-sm font-bold text-slate-950">
              Rincian Aktivitas Kerja ({filteredLogs.length} Entri)
            </span>
          </div>
          <span className="text-xs text-slate-500 font-bold print:hidden">
            Periode: {timeframeLabels[timeframe]}
          </span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-600 font-medium text-sm">
            Tidak ada riwayat aktivitas kerja pada periode ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100/90 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Tanggal Kerja</th>
                  <th className="px-6 py-4">Tugas & Jenis Karung</th>
                  <th className="px-6 py-4 text-center">Volume Hasil</th>
                  <th className="px-6 py-4 text-right">Estimasi Upah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 text-sm">
                {filteredLogs.map((log: any) => {
                  const logWage = calculateLogWage(log);
                  const isCuci = log.task === "MENCUCI";
                  const isLipat = log.task === "MELIPAT";
                  const isJahit = log.task === "MENJAHIT";

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 text-slate-800 whitespace-nowrap text-xs font-bold">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {new Date(log.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wider border ${
                            isCuci 
                              ? "bg-blue-500/10 text-blue-800 border-blue-500/20" 
                              : isLipat 
                              ? "bg-amber-500/10 text-amber-800 border-amber-500/20"
                              : "bg-purple-500/10 text-purple-800 border-purple-500/20"
                          }`}>
                            {log.task}
                          </span>
                          <span className="font-bold text-slate-950">
                            Karung {log.bagType?.name || "Standard"}
                          </span>
                          <span className="text-xs text-slate-500 font-mono font-bold">
                            ({log.bagType?.sku})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-slate-950 font-mono">
                        {(log.quantity || 0).toLocaleString("id-ID")}{" "}
                        <span className="text-xs font-bold text-slate-600 font-sans">lbr</span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-emerald-800">
                        Rp {logWage.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FOOTER KHUSUS CETAK SLIP GAJI */}
      <div className="hidden print:flex justify-between items-center mt-12 px-6 text-sm text-slate-800">
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Tenaga Kerja Penerima,</p>
          <div className="h-20"></div>
          <p className="font-bold border-b border-slate-900 px-6 inline-block">{employee.name}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Pimpinan / Gudang,</p>
          <div className="h-20"></div>
          <p className="font-bold border-b border-slate-900 px-6 inline-block">CV Berkat Mandiri</p>
        </div>
      </div>
    </div>
  );
}