import { prisma } from "@/lib/prisma";
import ReportsChart from "@/components/ReportsChart";
import ExportPDFButton from "@/components/ExportPDFButton";
import { ArrowUpRight, ArrowDownRight, Wallet, Sparkles, TrendingUp, BarChart3, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const sales = await prisma.sale.findMany({
    orderBy: { date: "desc" },
    include: { bagType: true },
  });

  const totalOmzet = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const totalLunas = sales.filter((s) => s.paymentStatus === "LUNAS").reduce((acc, s) => acc + s.totalAmount, 0);
  const totalPending = sales.filter((s) => s.paymentStatus === "PENDING").reduce((acc, s) => acc + s.totalAmount, 0);

  const namaBulanIndo = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const bulanSaatIni = new Date().getMonth();

  const tren6BulanTerakhir = Array.from({ length: 6 }, (_, i) => {
    const indeksBulan = (bulanSaatIni - 5 + i + 12) % 12;
    return {
      name: namaBulanIndo[indeksBulan],
      indeks: indeksBulan,
      income: 0,  // Di-map ke Penjualan LUNAS
      expense: 0, // Di-map ke Penjualan PENDING (Piutang)
    };
  });

  // Isi data chart berdasarkan bulan penjualan yang cocok
  sales.forEach((s) => {
    const tanggalSale = new Date(s.date);
    const bulanSale = tanggalSale.getMonth();
    const tahunSale = tanggalSale.getFullYear();

    // Batasi hanya menghitung transaksi di tahun berjalan agar presisi
    if (tahunSale === new Date().getFullYear()) {
      const bulanChart = tren6BulanTerakhir.find((b) => b.indeks === bulanSale);
      if (bulanChart) {
        if (s.paymentStatus === "LUNAS") {
          bulanChart.income += s.totalAmount;
        } else if (s.paymentStatus === "PENDING") {
          bulanChart.expense += s.totalAmount;
        }
      }
    }
  });

  // Format akhir untuk komponen Recharts
  const chartData = tren6BulanTerakhir.map(({ name, income, expense }) => ({
    name,
    income,
    expense,
  }));

  return (
    <div className="space-y-8 print:space-y-4">
      {/* HEADER DOKUMEN CETAK (Hanya muncul saat print) */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase">CV BERKAT MANDIRI</h1>
            <p className="text-xs text-slate-600">Laporan Eksekutif Keuangan & Performa Transaksi Penjualan</p>
          </div>
          <div className="text-right text-xs text-slate-600">
            <p>Tanggal Cetak: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
            <p className="font-bold">Status: Dokumen Resmi Terverifikasi</p>
          </div>
        </div>
      </div>

      {/* Header Liquid Glass Bar (Screen only) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-[32px] liquid-glass border border-slate-200/80 shadow-xl relative overflow-hidden print:hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Audit Finansial & Realisasi Omzet
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Laporan Penjualan & Keuangan
          </h1>
          <p className="text-sm text-slate-700 font-medium mt-1 max-w-xl">
            Ringkasan omzet bruto, realisasi dana kas masuk, dan piutang dagang invoice CV Berkat Mandiri.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <ExportPDFButton />
        </div>
      </div>

      {/* Bento Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 print:grid-cols-3 print:gap-3">
        {/* Total Omzet */}
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all print:border-slate-300 print:shadow-none print:p-4">
          <div className="flex items-center justify-between print:hidden">
            <div className="p-3.5 rounded-2xl liquid-glass text-blue-700 border border-blue-500/20">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-800 border border-blue-500/20">
              Total Bruto
            </span>
          </div>
          <div className="mt-4 print:mt-0">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider print:text-slate-700">
              Total Omzet Penjualan
            </p>
            <p className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 font-mono print:text-xl">
              Rp {totalOmzet.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Realisasi Kas Masuk (Lunas) */}
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all print:border-slate-300 print:shadow-none print:p-4">
          <div className="flex items-center justify-between print:hidden">
            <div className="p-3.5 rounded-2xl liquid-glass text-emerald-700 border border-emerald-500/20">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
              Kas Masuk (Lunas)
            </span>
          </div>
          <div className="mt-4 print:mt-0">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider print:text-slate-700">
              Pembayaran Terverifikasi
            </p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 font-mono print:text-xl">
              Rp {totalLunas.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Piutang Pending */}
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-rose-500/30 transition-all print:border-slate-300 print:shadow-none print:p-4">
          <div className="flex items-center justify-between print:hidden">
            <div className="p-3.5 rounded-2xl liquid-glass text-rose-700 border border-rose-500/20">
              <ArrowDownRight className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-800 border border-rose-500/20">
              Piutang Usaha
            </span>
          </div>
          <div className="mt-4 print:mt-0">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider print:text-slate-700">
              Piutang Pending Klien
            </p>
            <p className="text-2xl sm:text-3xl font-black text-rose-700 mt-1 font-mono print:text-xl">
              Rp {totalPending.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Chart Card */}
      <div className="p-6 sm:p-8 rounded-[32px] liquid-glass border border-slate-200/80 shadow-xl break-inside-avoid print:shadow-none print:border-slate-300 print:p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-950">
              Tren Penjualan 6 Bulan Terakhir
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 print:hidden">
            Perbandingan Kas Lunas vs Piutang Pending
          </span>
        </div>
        <ReportsChart data={chartData} />
      </div>

      {/* Recent Sales Table */}
      <div className="liquid-glass rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden break-inside-avoid print:shadow-none print:border-slate-300">
        <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span className="text-sm font-bold text-slate-950">
              5 Invoice Penjualan Terakhir
            </span>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            Database Terintegrasi
          </span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left">
            <thead className="bg-slate-100/90 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">No. Invoice</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Tipe Karung & Volume</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Total Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 text-sm">
              {sales.slice(0, 5).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-slate-800 whitespace-nowrap text-xs font-bold">
                    {new Date(s.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-800">
                    {s.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-950">
                    {s.customerName}
                  </td>
                  <td className="px-6 py-4 text-slate-800 font-medium">
                    {s.bagType?.name || "Tipe Karung Standar"}{" "}
                    <span className="text-xs text-slate-500 font-mono font-bold">
                      ({s.quantity?.toLocaleString("id-ID")} pcs)
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        s.paymentStatus === "LUNAS"
                          ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-800 border-rose-500/20"
                      }`}
                    >
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-slate-950 whitespace-nowrap">
                    Rp {s.totalAmount.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}