import InventoryActions from "@/components/InventoryActions";
import { prisma } from "@/lib/prisma";
import { Package, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

export default async function InventoryPage() {
  // Mengambil data stok dari database
  const bags = await prisma.bagType.findMany({
    orderBy: { currentStock: "asc" },
  });

  const totalStock = bags.reduce((acc, bag) => acc + bag.currentStock, 0);
  const lowStockCount = bags.filter((bag) => bag.currentStock < 100).length;

  return (
    <div className="space-y-6 md:p-2">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Stok</h1>
          <p className="text-slate-500">Monitor dan kelola ketersediaan karung di gudang</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition">
          + Tambah Barang
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl"><Package className="text-emerald-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Total Item</p>
            <p className="text-2xl font-bold text-slate-900">{bags.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl"><TrendingUp className="text-blue-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Total Stok Fisik</p>
            <p className="text-2xl font-bold text-slate-900">{totalStock.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl"><AlertTriangle className="text-amber-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Perlu Restock</p>
            <p className="text-2xl font-bold text-amber-600">{lowStockCount}</p>
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden m-4">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
            <tr>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Nama Barang</th>
              <th className="px-6 py-4 text-center">Stok</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bags.map((bag) => (
              <tr key={bag.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-sm font-medium text-emerald-700">{bag.sku}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">{bag.name}</td>
                <td className="px-6 py-4 text-sm text-center font-mono">{bag.currentStock.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  {bag.currentStock < 100 ? (
                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-bold uppercase">Menipis</span>
                  ) : (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-bold uppercase">Aman</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {/* Panggil Client Component untuk aksi */}
                  <InventoryActions id={bag.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}