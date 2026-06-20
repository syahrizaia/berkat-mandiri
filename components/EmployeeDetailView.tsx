/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { Calendar, Printer, User, Phone, Briefcase, Layers, Wallet, ArrowLeft } from "lucide-react";
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
    let wage = log.bagType.wagePerPiece; // Fallback dasar
    switch (log.task) {
      case "MENCUCI":
        wage = log.bagType.wageMencuci;
        break;
      case "MELIPAT":
        wage = log.bagType.wageMelipat;
        break;
      case "MENJAHIT":
        wage = log.bagType.wageMenjahit;
        break;
    }
    return log.quantity * wage;
  };

  // Logika memfilter data berdasarkan waktu (Hari / Pekan / Bulan)
  const filteredLogs = useMemo(() => {
    const now = new Date();
    return employee.workLogs.filter((log: any) => {
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

  // Akumulasi total produksi dan total estimasi gaji dari data yang terfilter
  const summary = useMemo(() => {
    let totalPieces = 0;
    let totalSalary = 0;

    filteredLogs.forEach((log: any) => {
      totalPieces += log.quantity;
      totalSalary += calculateLogWage(log);
    });

    return { totalPieces, totalSalary };
  }, [filteredLogs]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Tombol Kembali & Aksi Cetak (Disembunyikan saat print dokumen) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <Link 
          href="/employees" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Karyawan
        </Link>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/10"
        >
          <Printer className="w-4 h-4" /> Cetak Slip Gaji ({timeframe === 'day' ? 'Hari Ini' : timeframe === 'week' ? 'Pekan Ini' : timeframe === 'month' ? 'Bulan Ini' : 'Semua'})
        </button>
      </div>

      {/* HEADER DOKUMEN CETAK (Hanya muncul saat di-print) */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 uppercase">CV BERKAT MANDIRI</h1>
        <p className="text-xs text-slate-500">Laporan Hasil Kerja & Slip Estimasi Gaji Karyawan Borongan</p>
        <p className="text-xs text-slate-700 mt-1">Periode Cetak: {timeframe === 'day' ? 'Hari Ini' : timeframe === 'week' ? '7 Hari Terakhir' : timeframe === 'month' ? 'Bulan Berjalan' : 'Seluruh Riwayat'}</p>
      </div>

      {/* PROFIL DATA KARYAWAN */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-4 rounded-2xl text-slate-700 shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {employee.phone || "-"}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Terdaftar: {new Date(employee.createdAt).toLocaleDateString("id-ID")}</span>
            </div>
          </div>
        </div>

        {/* Kontrol Filter Waktu (Disembunyikan saat print) */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto print:hidden">
          {(["all", "day", "week", "month"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg uppercase transition ${
                timeframe === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {t === "all" ? "Semua" : t === "day" ? "Hari" : t === "week" ? "Pekan" : "Bulan"}
            </button>
          ))}
        </div>
      </div>

      {/* KARTU RINGKASAN ESTIMASI GAJI & PRODUKSI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl"><Layers className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Hasil Produksi</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{summary.totalPieces.toLocaleString("id-ID")} <span className="text-sm font-normal text-slate-500">Lembar</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><Wallet className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Estimasi Gaji Bersih</p>
            <p className="text-2xl font-black text-blue-600 mt-0.5">Rp {summary.totalSalary.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>

      {/* TABEL RINCIAN HASIL KERJA */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-700 bg-slate-50/50 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-slate-500" />
          Rincian Aktivitas Kerja ({filteredLogs.length} Entri)
        </div>
        
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">Tidak ada riwayat aktivitas kerja pada periode ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Tanggal</th>
                  <th className="px-6 py-3.5">Deskripsi Aktivitas Kerja</th>
                  <th className="px-6 py-3.5 text-center">Jumlah</th>
                  <th className="px-6 py-3.5 text-right">Estimasi Gaji</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {filteredLogs.map((log: any) => {
                  const logWage = calculateLogWage(log);
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {new Date(log.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        <span className="inline-block bg-slate-100 text-slate-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md mr-2 tracking-wide align-middle">
                          {log.task}
                        </span>
                        <span className="align-middle">
                          Karung {log.bagType.name} ({log.bagType.sku})
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-800 whitespace-nowrap">
                        {log.quantity.toLocaleString("id-ID")} Lembar
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600 whitespace-nowrap">
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
      <div className="hidden print:flex justify-between items-center mt-12 px-6 text-sm text-slate-700">
        <div className="text-center">
          <p>Penerima Gaji,</p>
          <div className="h-16"></div>
          <p className="font-bold border-b border-slate-400 px-4 inline-block">{employee.name}</p>
        </div>
        <div className="text-center">
          <p>Staf Operasional,</p>
          <div className="h-16"></div>
          <p className="font-bold border-b border-slate-400 px-4 inline-block">Manager Gudang</p>
        </div>
      </div>
    </div>
  );
}