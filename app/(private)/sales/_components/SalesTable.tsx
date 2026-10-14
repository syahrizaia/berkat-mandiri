import { Edit3, Trash2 } from "lucide-react";
import { SaleWithRelations } from "../page";

interface TableProps {
  sales: SaleWithRelations[];
  onEdit: (sale: SaleWithRelations) => void;
  onDelete: (id: string) => void;
}

export default function SalesTable({ sales, onEdit, onDelete }: TableProps) {
  return (
    <div className="liquid-glass rounded-[32px] border border-white/70 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100/70 border-b border-slate-200/70 text-slate-800 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-4 px-6">No. Invoice / Tgl</th>
              <th className="py-4 px-6">Pelanggan Korporat</th>
              <th className="py-4 px-6">Tipe Karung (SKU)</th>
              <th className="py-4 px-6 text-center">Volume</th>
              <th className="py-4 px-6 text-right">Total Tagihan</th>
              <th className="py-4 px-6 text-center">Status Keuangan</th>
              <th className="py-4 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 font-medium text-slate-800">
            {sales.map((item) => (
              <tr key={item.id} className="hover:bg-white/60 transition-colors">
                <td className="py-4 px-6">
                  <span className="block text-slate-950 font-bold">{item.invoiceNumber}</span>
                  <span className="text-[11px] text-slate-600 font-semibold block mt-0.5">
                    {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </td>
                <td className="py-4 px-6 font-bold text-slate-950">{item.customerName}</td>
                <td className="py-4 px-6 text-xs text-slate-800">
                  <span className="font-semibold block">{item.bagType?.name || "Tipe Karung"}</span>
                  <span className="font-mono text-[10px] text-emerald-800 font-bold block mt-0.5">
                    {item.bagType?.sku || "-"}
                  </span>
                </td>
                <td className="py-4 px-6 text-center font-mono font-bold text-slate-950">
                  {item.quantity.toLocaleString()}{" "}
                  <span className="text-xs text-slate-600 font-semibold">lbr</span>
                </td>
                <td className="py-4 px-6 text-right font-mono text-emerald-700 font-bold text-sm">
                  Rp {item.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`inline-block text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                    item.paymentStatus === "LUNAS" 
                      ? "bg-emerald-500/15 text-emerald-800 border border-emerald-500/25" 
                      : "bg-amber-500/15 text-amber-800 border border-amber-500/25"
                  }`}>
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-1.5">
                    <button 
                      onClick={() => onEdit(item)} 
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition"
                      aria-label="Edit Transaksi"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)} 
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition"
                      aria-label="Hapus Transaksi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-700 text-xs font-semibold">
                  Belum ada catatan transaksi invoice penjualan pada periode ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}