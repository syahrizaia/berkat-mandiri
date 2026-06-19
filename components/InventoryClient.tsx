/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, AlertTriangle, CheckCircle2, TrendingUp, BrainCircuit, Edit3, Trash2 } from "lucide-react";
import InventoryModalForm from "./InventoryModalForm";

export default function InventoryClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBag, setEditingBag] = useState<any | null>(null);

  const totalStock = initialData.reduce((acc, bag) => acc + bag.currentStock, 0);
  const lowStockCount = initialData.filter((bag) => bag.isUnderStock).length;

  // Fungsi Hapus Data Karung
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus jenis karung "${name}"? Semua log operasional terkait akan ikut terhapus.`)) {
      try {
        const res = await fetch(`/api/admin/inventory/${id}`, { method: "DELETE" });
        if (res.ok) {
          router.refresh(); // Segarkan data Server Component otomatis
        } else {
          alert("Gagal menghapus barang.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan koneksi saat menghapus.");
      }
    }
  };

  const handleEditClick = (bag: any) => {
    setEditingBag(bag);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingBag(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 md:p-2">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Stok</h1>
          <p className="text-slate-500">Monitor dan kelola ketersediaan karung di gudang berbasis data cerdas</p>
        </div>
        <button 
          onClick={handleCreateClick}
          className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition"
        >
          + Tambah Barang
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl"><Package className="text-emerald-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Total Item</p>
            <p className="text-2xl font-bold text-slate-900">{initialData.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl"><TrendingUp className="text-blue-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Total Stok Fisik</p>
            <p className="text-2xl font-bold text-slate-900">{totalStock.toLocaleString()}</p>
          </div>
        </div>
        <div className={`bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4 transition-colors ${
          lowStockCount > 0 ? "border-rose-200 bg-gradient-to-br from-white to-rose-50/10" : "border-slate-200"
        }`}>
          <div className={`p-3 rounded-xl ${lowStockCount > 0 ? "bg-rose-50" : "bg-amber-50"}`}>
            <AlertTriangle className={`w-6 h-6 ${lowStockCount > 0 ? "text-rose-600" : "text-amber-600"}`} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase flex items-center gap-1">
              Perlu Restock <BrainCircuit className="w-3 h-3 text-emerald-600" />
            </p>
            <p className={`text-2xl font-bold ${lowStockCount > 0 ? "text-rose-600" : "text-slate-900"}`}>
              {lowStockCount} <span className="text-xs font-normal text-slate-400">item</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden m-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
              <tr>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Nama Barang</th>
                <th className="px-6 py-4 text-center">Stok Saat Ini</th>
                <th className="px-6 py-4 text-center">Batas Aman ML</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialData.map((bag) => (
                <tr key={bag.id} className={`hover:bg-slate-50/50 transition-colors ${bag.isUnderStock ? "bg-rose-50/5" : ""}`}>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-700">{bag.sku}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">{bag.name}</td>
                  <td className="px-6 py-4 text-sm text-center font-mono text-slate-900 font-bold">
                    {bag.currentStock.toLocaleString()} <span className="text-xs font-normal text-slate-400">lbr</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-mono text-slate-500">
                    {bag.safetyThreshold.toLocaleString()} <span className="text-xs font-normal text-slate-400">lbr</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {bag.isUnderStock ? (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-rose-50 border border-rose-200 text-rose-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse">
                        ⚠️ Menipis
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" /> Aman
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(bag)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Barang"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(bag.id, bag.name)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Hapus Barang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Integrasi */}
      <InventoryModalForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingBag={editingBag} 
      />
    </div>
  );
}