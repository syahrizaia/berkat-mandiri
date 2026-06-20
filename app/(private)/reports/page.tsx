import { prisma } from "@/lib/prisma";
import ReportsChart from "@/components/ReportsChart";
import ExportPDFButton from "@/components/ExportPDFButton";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const sales = await prisma.sale.findMany({
    orderBy: { date: "desc" },
    include: { bagType: true },
  });

  const totalOmzet = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const totalLunas = sales.filter(s => s.paymentStatus === "LUNAS").reduce((acc, s) => acc + s.totalAmount, 0);
  const totalPending = sales.filter(s => s.paymentStatus === "PENDING").reduce((acc, s) => acc + s.totalAmount, 0);

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

  // Format akhir untuk komponen Recharts (Mencegah break karena key props)
  const chartData = tren6BulanTerakhir.map(({ name, income, expense }) => ({
    name,
    income,  // Representasi Lunas
    expense, // Representasi Pending
  }));

  return (
    <div className="space-y-6 md:p-2 print:p-0 bg-transparent">
      {/* Header */}
      <div className="flex justify-between items-center p-4 print:pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laporan Penjualan</h1>
          <p className="text-slate-500 print:text-xs">Ringkasan omzet dan performa invoice CV Berkat Mandiri</p>
        </div>
        <ExportPDFButton />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 print:grid-cols-3 print:gap-2">
        {/* CARD 1: TOTAL OMZET BRUTO */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm print:shadow-none">
          <div className="flex justify-between items-start mb-4 print:hidden">
            <span className="text-blue-600 bg-blue-50 p-2 rounded-lg"><Wallet size={20}/></span>
          </div>
          <p className="text-sm text-slate-500 uppercase font-bold print:text-xs">Total Omzet Penjualan</p>
          <p className="text-2xl font-bold text-slate-900 print:text-xl">Rp {totalOmzet.toLocaleString("id-ID")}</p>
        </div>

        {/* CARD 2: REALISASI DANA MASUK (LUNAS) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm print:shadow-none">
          <div className="flex justify-between items-start mb-4 print:hidden">
            <span className="text-emerald-600 bg-emerald-50 p-2 rounded-lg"><ArrowUpRight size={20}/></span>
          </div>
          <p className="text-sm text-slate-500 uppercase font-bold print:text-xs">Pembayaran Lunas (Dana Masuk)</p>
          <p className="text-2xl font-bold text-emerald-600 print:text-xl">Rp {totalLunas.toLocaleString("id-ID")}</p>
        </div>

        {/* CARD 3: PIUTANG DAGANG (PENDING) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm print:shadow-none">
          <div className="flex justify-between items-start mb-4 print:hidden">
            <span className="text-rose-600 bg-rose-50 p-2 rounded-lg"><ArrowDownRight size={20}/></span>
          </div>
          <p className="text-sm text-slate-500 uppercase font-bold print:text-xs">Piutang Pending</p>
          <p className="text-2xl font-bold text-rose-600 print:text-xl">Rp {totalPending.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm print:shadow-none m-4 print:m-0 break-inside-avoid">
        <h3 className="font-bold text-slate-900 mb-6 print:mb-2 print:text-sm">Tren Penjualan Bulanan (Lunas vs Pending)</h3>
        <ReportsChart data={chartData} />
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white rounded-2xl border border-slate-200 print:border-slate-300 shadow-sm overflow-hidden m-4 print:m-0 break-inside-avoid">
        <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-600 print:text-sm">
          Invoice Penjualan Terakhir
        </div>
        
        <div className="overflow-x-auto w-full current-scrollbar">
          <table className="w-full text-left min-w-[600px] table-auto">
            <thead className="bg-slate-50 text-xs text-slate-600 uppercase">
              <tr>
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3">No. Invoice</th>
                <th className="px-6 py-3">Pelanggan</th>
                <th className="px-6 py-3">Tipe Karung</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Total Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.slice(0, 5).map((s) => (
                <tr key={s.id} className="text-sm hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {new Date(s.date).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-700">
                    {s.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600 truncate max-w-[150px]">
                    {s.customerName}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {s.bagType?.name || "Tidak Diketahui"} ({s.quantity} pcs)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${s.paymentStatus === 'LUNAS' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
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