/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, Hash, Layers, Coins, Sparkles, CheckCircle2 } from "lucide-react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingBag) {
      setFormData({
        sku: editingBag.sku || "",
        name: editingBag.name || "",
        currentStock: editingBag.currentStock || 0,
        wageMencuci: editingBag.wageMencuci || 0,
        wageMelipat: editingBag.wageMelipat || 0,
        wageMenjahit: editingBag.wageMenjahit || 0,
        wagePerPiece: editingBag.wagePerPiece || 0,
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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Apple Frosted Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl transition-all"
        />

        {/* Liquid Glass Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-200/80 z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-emerald-700 shadow-sm border border-emerald-500/20">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                    {editingBag ? `Edit SKU: ${editingBag.sku}` : "Tambah Jenis Karung Baru"}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                    Master Inventory
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Kelola spesifikasi fisik stok dan konfigurasi tarif borongan pekerja.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Section 1: Identifikasi & Stok Fisik */}
            <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
                <Layers className="w-4 h-4 text-emerald-700" />
                1. Identifikasi & Stok Fisik Gudang
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                    <Hash className="w-3.5 h-3.5 text-slate-500" />
                    Kode SKU Barang
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 uppercase font-mono font-bold placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    placeholder="PP-50KG-SUPER"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Nama Deskripsi Karung
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    placeholder="Karung Transparan Super"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Jumlah Stok Fisik Gudang (Lembar)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.currentStock || ""}
                    onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Konfigurasi Tarif Borongan */}
            <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider uppercase">
                  <Coins className="w-4 h-4 text-amber-700" />
                  2. Konfigurasi Tarif Borongan Pegawai (Rp / Pcs)
                </div>
                <span className="text-xs text-slate-600 font-semibold">
                  *Acuan otomatis saat input kerja
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Tarif Borongan Cuci (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.wageMencuci || ""}
                    onChange={(e) => setFormData({ ...formData, wageMencuci: parseInt(e.target.value) || 0 })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                    placeholder="200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Tarif Borongan Lipat (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.wageMelipat || ""}
                    onChange={(e) => setFormData({ ...formData, wageMelipat: parseInt(e.target.value) || 0 })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Tarif Borongan Jahit (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.wageMenjahit || ""}
                    onChange={(e) => setFormData({ ...formData, wageMenjahit: parseInt(e.target.value) || 0 })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                    placeholder="250"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Tarif Fallback / Umum (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.wagePerPiece || ""}
                    onChange={(e) => setFormData({ ...formData, wagePerPiece: parseInt(e.target.value) || 0 })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {isSubmitting ? "Menyimpan..." : "Simpan Stok Master"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}