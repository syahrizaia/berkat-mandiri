/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingBag: any | null;
}

export default function InventoryModalForm({ isOpen, onClose, editingBag }: ModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    currentStock: 0,
    wageMencuci: 0,
    wageMelipat: 0,
    wageMenjahit: 0,
    wagePerPiece: 0,
  });

  useEffect(() => {
    if (editingBag) {
      setFormData({
        sku: editingBag.sku,
        name: editingBag.name,
        currentStock: editingBag.currentStock,
        wageMencuci: editingBag.wageMencuci,
        wageMelipat: editingBag.wageMelipat,
        wageMenjahit: editingBag.wageMenjahit,
        wagePerPiece: editingBag.wagePerPiece,
      });
    } else {
      setFormData({
        sku: "",
        name: "",
        currentStock: 0,
        wageMencuci: 0,
        wageMelipat: 0,
        wageMenjahit: 0,
        wagePerPiece: 0,
      });
    }
  }, [editingBag, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingBag ? `/api/admin/inventory/${editingBag.id}` : `/api/admin/inventory`;
    const method = editingBag ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        router.refresh();
      } else {
        const errData = await response.json();
        alert(`Gagal menyimpan data: ${errData.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      alert("Gagal memproses data ke database Cloud.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-lg font-black text-slate-900">
            {editingBag ? `🔧 Edit Item: ${editingBag.sku}` : "📦 Tambah Jenis Karung Baru"}
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Kelompok Data Fisik */}
          <div className="bg-slate-50 text-slate-600 p-4 rounded-2xl border space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 uppercase">1. Identifikasi & Stok Fisik</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Kode SKU Barang</label>
                <input 
                  type="text" 
                  required 
                  value={formData.sku} 
                  onChange={e => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} 
                  className="w-full text-sm border p-2.5 rounded-xl uppercase font-semibold focus:outline-emerald-500" 
                  placeholder="PP-50KG-SUPER" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Deskripsi Karung</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full text-sm border p-2.5 rounded-xl focus:outline-emerald-500" 
                  placeholder="Karung Transparan Super"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">Jumlah Stok Awal Gudang (Lembar)</label>
                <input 
                  type="number" 
                  required 
                  value={formData.currentStock || ""} 
                  onChange={e => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })} 
                  className="w-full text-sm border p-2.5 rounded-xl focus:outline-emerald-500 font-mono font-bold" 
                />
              </div>
            </div>
          </div>

          {/* Kelompok Tarif Borongan */}
          <div className="bg-amber-50/40 text-slate-600 p-4 rounded-2xl border border-amber-100 space-y-3">
            <h4 className="text-xs font-bold text-amber-800 uppercase">2. Konfigurasi Tarif Borongan Pegawai (Rp / Pcs)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tarif Upah Mencuci</label>
                <input 
                  type="number" 
                  value={formData.wageMencuci || ""} 
                  onChange={e => setFormData({ ...formData, wageMencuci: parseInt(e.target.value) || 0 })} 
                  className="w-full text-sm border p-2.5 rounded-xl bg-white" 
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tarif Upah Melipat</label>
                <input 
                  type="number" 
                  value={formData.wageMelipat || ""} 
                  onChange={e => setFormData({ ...formData, wageMelipat: parseInt(e.target.value) || 0 })} 
                  className="w-full text-sm border p-2.5 rounded-xl bg-white" 
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tarif Upah Menjahit</label>
                <input 
                  type="number" 
                  value={formData.wageMenjahit || ""} 
                  onChange={e => setFormData({ ...formData, wageMenjahit: parseInt(e.target.value) || 0 })} 
                  className="w-full text-sm border p-2.5 rounded-xl bg-white" 
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tarif Dasar/Fallback (Per Piece)</label>
                <input 
                  type="number" 
                  value={formData.wagePerPiece || ""} 
                  onChange={e => setFormData({ ...formData, wagePerPiece: parseInt(e.target.value) || 0 })} 
                  className="w-full text-sm border p-2.5 rounded-xl bg-white" 
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700">
              Simpan Stok Master
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}