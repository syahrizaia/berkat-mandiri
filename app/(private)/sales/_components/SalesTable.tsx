import { Edit3, Trash2 } from "lucide-react";
import { SaleWithRelations } from "../page";

interface TableProps {
  sales: SaleWithRelations[];
  onEdit: (sale: SaleWithRelations) => void;
  onDelete: (id: string) => void;
}

export default function SalesTable({ sales, onEdit, onDelete }: TableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase">
            <tr>
              <th className="py-4 px-6">No. Invoice / Tgl</th>
              <th className="py-4 px-6">Pelanggan</th>
              <th className="py-4 px-6">Tipe Karung (SKU)</th>
              <th className="py-4 px-6 text-center">Volume</th>
              <th className="py-4 px-6 text-right">Total Tagihan</th>
              <th className="py-4 px-6 text-center">Keuangan</th>
              <th className="py-4 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {sales.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-6">
                  <span className="block text-slate-900 font-bold">{item.invoiceNumber}</span>
                  <span className="text-[11px] text-slate-400 block">{new Date(item.date).toLocaleDateString("id-ID")}</span>
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">{item.customerName}</td>
                <td className="py-4 px-6 text-xs text-slate-500">{item.bagType.name} <span className="block font-mono text-[10px] text-slate-400">{item.bagType.sku}</span></td>
                <td className="py-4 px-6 text-center font-mono font-bold">{item.quantity.toLocaleString()} <span className="text-xs text-slate-400 font-normal">lbr</span></td>
                <td className="py-4 px-6 text-right font-mono text-emerald-700 font-bold">Rp {item.totalAmount.toLocaleString("id-ID")}</td>
                <td className="py-4 px-6 text-center">
                  <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                    item.paymentStatus === "LUNAS" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(item)} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(item.id)} className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}