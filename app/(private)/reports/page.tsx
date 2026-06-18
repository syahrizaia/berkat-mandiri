import { prisma } from "@/lib/prisma";
import ReportsChart from "@/components/ReportsChart";
import ExportPDFButton from "@/components/ExportPDFButton"; // Impor komponen tombol baru
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

export default async function ReportsPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    include: { bagType: true },
  });

  const totalIncome = transactions.filter(t => t.type === "INCOME").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "EXPENSE").reduce((acc, t) => acc + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const chartData = [
    { name: "Mei", income: 4000000, expense: 2400000 },
    { name: "Jun", income: totalIncome, expense: totalExpense },
  ];

  return (
    <div className="space-y-6 md:p-2 print:p-0 bg-transparent">
      {/* Header */}
      <div className="flex justify-between items-center p-4 print:pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laporan Keuangan</h1>
          <p className="text-slate-500 print:text-xs">Ringkasan arus kas dan performa keuangan CV Berkat Mandiri</p>
        </div>
        {/* Menggunakan Client Component Tombol */}
        <ExportPDFButton />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 print:grid-cols-3 print:gap-2">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm print:shadow-none">
          <div className="flex justify-between items-start mb-4 print:hidden">
            <span className="text-emerald-600 bg-emerald-50 p-2 rounded-lg"><ArrowUpRight size={20}/></span>
          </div>
          <p className="text-sm text-slate-500 uppercase font-bold print:text-xs">Total Pemasukan</p>
          <p className="text-2xl font-bold text-slate-900 print:text-xl">Rp {totalIncome.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm print:shadow-none">
          <div className="flex justify-between items-start mb-4 print:hidden">
            <span className="text-rose-600 bg-rose-50 p-2 rounded-lg"><ArrowDownRight size={20}/></span>
          </div>
          <p className="text-sm text-slate-500 uppercase font-bold print:text-xs">Total Pengeluaran</p>
          <p className="text-2xl font-bold text-slate-900 print:text-xl">Rp {totalExpense.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm print:shadow-none">
          <div className="flex justify-between items-start mb-4 print:hidden">
            <span className="text-blue-600 bg-blue-50 p-2 rounded-lg"><Wallet size={20}/></span>
          </div>
          <p className="text-sm text-slate-500 uppercase font-bold print:text-xs">Margin Bersih</p>
          <p className="text-2xl font-bold text-blue-600 print:text-xl">Rp {netProfit.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm print:shadow-none m-4 print:m-0 break-inside-avoid">
        <h3 className="font-bold text-slate-900 mb-6 print:mb-2 print:text-sm">Tren Arus Kas Bulanan</h3>
        <ReportsChart data={chartData} />
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm overflow-hidden m-4 print:m-0 break-inside-avoid">
        <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-600 print:text-sm">Transaksi Terakhir</div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs text-slate-600 uppercase">
            <tr>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Deskripsi</th>
              <th className="px-6 py-3">Tipe</th>
              <th className="px-6 py-3 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.slice(0, 5).map((t) => (
              <tr key={t.id} className="text-sm">
                <td className="px-6 py-4 text-slate-500">{new Date(t.date).toLocaleDateString("id-ID")}</td>
                <td className="px-6 py-4 font-medium">{t.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${t.type === 'INCOME' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {t.type}
                  </span>
                </td>
                <td className={`px-6 py-4 text-right font-mono ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'INCOME' ? '+' : '-'} Rp {t.amount.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}