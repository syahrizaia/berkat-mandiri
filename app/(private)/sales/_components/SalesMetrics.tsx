import { DollarSign, Truck, Clock, TrendingUp } from "lucide-react";
import { SaleWithRelations } from "../page";

export default function SalesMetrics({ sales }: { sales: SaleWithRelations[] }) {
  if (!sales || !Array.isArray(sales)) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="liquid-glass p-5 rounded-3xl border border-white/70 h-28 animate-pulse" />
        <div className="liquid-glass p-5 rounded-3xl border border-white/70 h-28 animate-pulse" />
        <div className="liquid-glass p-5 rounded-3xl border border-white/70 h-28 animate-pulse" />
      </div>
    );
  }
  
  const totalOmzet = sales.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const armadaAktif = sales.filter(s => s.delivery?.status === "DIKIRIM").length;
  const pendingPayment = sales.filter(s => s.paymentStatus === "PENDING").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      
      {/* Metric 1: Total Omzet */}
      <div className="liquid-glass p-6 rounded-3xl border border-white/70 shadow-lg flex items-center justify-between group hover:border-emerald-500/40 transition-all">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">
            Total Nilai Transaksi Bruto
          </p>
          <p className="text-2xl font-extrabold text-slate-950 tracking-tight">
            Rp {totalOmzet.toLocaleString("id-ID")}
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 pt-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Rekapitulasi Periode</span>
          </div>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-700 shadow-inner">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>

      {/* Metric 2: Armada Aktif */}
      <div className="liquid-glass p-6 rounded-3xl border border-white/70 shadow-lg flex items-center justify-between group hover:border-blue-500/40 transition-all">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">
            Total Armada Beroperasi
          </p>
          <p className="text-2xl font-extrabold text-slate-950 tracking-tight">
            {armadaAktif}{" "}
            <span className="text-xs font-bold text-slate-600">Surat Jalan</span>
          </p>
          <p className="text-[11px] text-blue-700 font-bold pt-0.5">
            Status: Kargo On-The-Road
          </p>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-700 shadow-inner">
          <Truck className="w-6 h-6" />
        </div>
      </div>

      {/* Metric 3: Invoice Pending */}
      <div className="liquid-glass p-6 rounded-3xl border border-white/70 shadow-lg flex items-center justify-between group hover:border-amber-500/40 transition-all sm:col-span-2 lg:col-span-1">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">
            Invoice Jatuh Tempo / Belum Lunas
          </p>
          <p className="text-2xl font-extrabold text-amber-800 tracking-tight">
            {pendingPayment}{" "}
            <span className="text-xs font-bold text-slate-600">Transaksi</span>
          </p>
          <p className="text-[11px] text-amber-700 font-bold pt-0.5">
            Piutang Menunggu Pelunasan
          </p>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-700 shadow-inner">
          <Clock className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
}