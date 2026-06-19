import { DollarSign, Truck, Clock } from "lucide-react";
import { SaleWithRelations } from "../page";

export default function SalesMetrics({ sales }: { sales: SaleWithRelations[] }) {
  if (!sales || !Array.isArray(sales)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 animate-pulse h-24"></div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 animate-pulse h-24"></div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 animate-pulse h-24"></div>
      </div>
    );
  }
  
  const totalOmzet = sales.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const armadaAktif = sales.filter(s => s.delivery?.status === "DIKIRIM").length;
  const pendingPayment = sales.filter(s => s.paymentStatus === "PENDING").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-emerald-50 rounded-xl"><DollarSign className="text-emerald-600 w-6 h-6" /></div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Total Nilai Transaksi</p>
          <p className="text-xl font-bold text-slate-900">Rp {totalOmzet.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-xl"><Truck className="text-blue-600 w-6 h-6" /></div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Total Fleet Beroperasi</p>
          <p className="text-xl font-bold text-slate-900">{armadaAktif} Surat Jalan Aktif</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
        <div className="p-3 bg-amber-50 rounded-xl"><Clock className="text-amber-600 w-6 h-6" /></div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Invoice Jatuh Tempo</p>
          <p className="text-xl font-bold text-amber-600">{pendingPayment} Transaksi Pending</p>
        </div>
      </div>
    </div>
  );
}