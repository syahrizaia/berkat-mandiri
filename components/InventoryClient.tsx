/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  BrainCircuit, 
  Edit3, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Sparkles,
  Layers
} from "lucide-react";
import InventoryModalForm from "./InventoryModalForm";

export default function InventoryClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBag, setEditingBag] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "SAFE" | "LOW">("ALL");

  const totalStock = initialData.reduce((acc, bag) => acc + (bag.currentStock || 0), 0);
  const lowStockCount = initialData.filter((bag) => bag.isUnderStock).length;
  const safeStockCount = initialData.length - lowStockCount;

  // Filtered bags based on search and status
  const filteredBags = useMemo(() => {
    return initialData.filter((bag) => {
      const matchSearch = 
        bag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bag.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchSearch) return false;
      if (filterStatus === "SAFE") return !bag.isUnderStock;
      if (filterStatus === "LOW") return bag.isUnderStock;
      return true;
    });
  }, [initialData, searchQuery, filterStatus]);

  // Fungsi Hapus Data Karung
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus jenis karung "${name}"? Semua log operasional terkait akan ikut terhapus.`)) {
      try {
        const res = await fetch(`/api/admin/inventory/${id}`, { method: "DELETE" });
        if (res.ok) {
          router.refresh();
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
    <div className="space-y-8">
      {/* Header Liquid Glass Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-[32px] liquid-glass border border-slate-200/80 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Real-time Warehouse Inventory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Manajemen Stok Karung
          </h1>
          <p className="text-sm text-slate-700 font-medium mt-1 max-w-xl">
            Monitor ketersediaan fisik karung di gudang secara otomatis dengan ambang batas keselamatan berbasis kecerdasan buatan (ML).
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={handleCreateClick}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Jenis Karung</span>
          </button>
        </div>
      </div>

      {/* Bento Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total SKU */}
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl liquid-glass text-emerald-700 border border-emerald-500/20">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-800">
              Katalog Aktif
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Tipe SKU</p>
            <p className="text-3xl font-black text-slate-950 mt-1">
              {initialData.length} <span className="text-base font-bold text-slate-600">Variasi</span>
            </p>
          </div>
        </div>

        {/* Total Stok Fisik */}
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl liquid-glass text-blue-700 border border-blue-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-800 border border-blue-500/20">
              Gudang Utama
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Lembar Fisik</p>
            <p className="text-3xl font-black text-slate-950 mt-1 font-mono">
              {totalStock.toLocaleString("id-ID")} <span className="text-base font-bold text-slate-600 font-sans">Lembar</span>
            </p>
          </div>
        </div>

        {/* Status Menipis / Perlu Restock */}
        <div className={`p-6 rounded-[28px] liquid-glass border shadow-lg relative overflow-hidden transition-all ${
          lowStockCount > 0 
            ? "border-rose-500/30 bg-gradient-to-br from-rose-500/5 to-amber-500/5" 
            : "border-slate-200/80"
        }`}>
          <div className="flex items-center justify-between">
            <div className={`p-3.5 rounded-2xl liquid-glass border ${
              lowStockCount > 0 
                ? "text-rose-700 border-rose-500/30 bg-rose-500/10" 
                : "text-emerald-700 border-emerald-500/20 bg-emerald-500/10"
            }`}>
              {lowStockCount > 0 ? <AlertTriangle className="w-6 h-6 animate-pulse" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200/80 text-slate-800">
              <BrainCircuit className="w-3.5 h-3.5 text-emerald-700" />
              Safety Threshold ML
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Perlu Restock Gudang</p>
            <p className={`text-3xl font-black mt-1 ${lowStockCount > 0 ? "text-rose-700" : "text-emerald-700"}`}>
              {lowStockCount} <span className="text-base font-bold text-slate-600">item SKU</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl liquid-glass border border-slate-200/80 shadow-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari SKU atau nama karung..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white/90 border border-slate-300 text-slate-950 placeholder:text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl border border-slate-300/60">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === "ALL"
                ? "bg-white text-slate-950 shadow-sm border border-slate-200/80"
                : "text-slate-700 hover:text-slate-950"
            }`}
          >
            Semua ({initialData.length})
          </button>
          <button
            onClick={() => setFilterStatus("SAFE")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === "SAFE"
                ? "bg-white text-emerald-800 shadow-sm border border-slate-200/80"
                : "text-slate-700 hover:text-slate-950"
            }`}
          >
            Aman ({safeStockCount})
          </button>
          <button
            onClick={() => setFilterStatus("LOW")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === "LOW"
                ? "bg-white text-rose-800 shadow-sm border border-slate-200/80"
                : "text-slate-700 hover:text-slate-950"
            }`}
          >
            Menipis ({lowStockCount})
          </button>
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="liquid-glass rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100/90 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Kode SKU</th>
                <th className="px-6 py-4">Deskripsi Jenis Karung</th>
                <th className="px-6 py-4 text-center">Stok Fisik Gudang</th>
                <th className="px-6 py-4 text-center">Batas Aman ML</th>
                <th className="px-6 py-4 text-center">Status Gudang</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60">
              {filteredBags.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-600 font-medium text-sm">
                    Tidak ada data karung yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredBags.map((bag) => (
                  <tr
                    key={bag.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      bag.isUnderStock ? "bg-rose-500/[0.04]" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-black text-emerald-800 font-mono">
                      {bag.sku}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-950">
                        {bag.name}
                      </div>
                      <div className="text-xs text-slate-600 font-semibold flex items-center gap-2 mt-0.5">
                        <span>Borongan Cuci: Rp {(bag.wageMencuci || 0).toLocaleString()}</span>
                        <span>•</span>
                        <span>Jahit: Rp {(bag.wageMenjahit || 0).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-mono font-bold text-slate-950">
                      {bag.currentStock.toLocaleString("id-ID")}{" "}
                      <span className="text-xs font-bold text-slate-600 font-sans">lbr</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-mono font-bold text-slate-800">
                      {bag.safetyThreshold.toLocaleString("id-ID")}{" "}
                      <span className="text-xs font-bold text-slate-600 font-sans">lbr</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {bag.isUnderStock ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] bg-rose-500/10 border border-rose-500/30 text-rose-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Menipis
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Aman
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(bag)}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit Konfigurasi Stok"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(bag.id, bag.name)}
                          className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Hapus Karung"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Master Stok (POP-UP 3) */}
      <InventoryModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingBag={editingBag}
      />
    </div>
  );
}