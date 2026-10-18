/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Truck, ShieldCheck, Coins, Package, MapPin, User, Hash, Sparkles } from "lucide-react";
import { SaleWithRelations } from "../page";

import { createSaleAction, updateSaleAction } from "../actions";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingSale: SaleWithRelations | null;
  bagTypes: any;
  refreshData: () => void;
}

export default function SaleModalForm({ onClose, editingSale, bagTypes, refreshData }: ModalProps) {
  // Ekstraksi data aman & defensif
  const actualBagTypes = Array.isArray(bagTypes)
    ? bagTypes
    : Array.isArray(bagTypes?.stockPredictions)
    ? bagTypes.stockPredictions
    : Array.isArray(bagTypes?.data?.stockPredictions)
    ? bagTypes.data.stockPredictions
    : [];

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    customerName: "",
    bagTypeId: "",
    quantity: 0,
    pricePerPiece: 0,
    paymentStatus: "PENDING" as "PENDING" | "LUNAS",
    driverName: "",
    plateNumber: "",
    deliveryAddress: "",
    deliveryStatus: "DIPROSES" as "DIPROSES" | "DIKIRIM" | "DITERIMA"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingSale) {
      setFormData({
        invoiceNumber: editingSale.invoiceNumber,
        customerName: editingSale.customerName,
        bagTypeId: editingSale.bagTypeId,
        quantity: editingSale.quantity,
        pricePerPiece: editingSale.pricePerPiece,
        paymentStatus: editingSale.paymentStatus,
        driverName: editingSale.delivery?.driverName || "",
        plateNumber: editingSale.delivery?.plateNumber || "",
        deliveryAddress: editingSale.delivery?.deliveryAddress || "",
        deliveryStatus: editingSale.delivery?.status || "DIPROSES"
      });
    } else if (actualBagTypes.length > 0) {
      setFormData(prev => ({
        ...prev,
        bagTypeId: prev.bagTypeId || actualBagTypes[0].id
      }));
    }
  }, [editingSale, actualBagTypes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = editingSale
        ? await updateSaleAction(editingSale.id, formData)
        : await createSaleAction(formData);

      if (res.success) {
        refreshData();
        onClose();
      } else {
        alert(res.error || "Gagal memproses data ke database. Silakan periksa kelengkapan form.");
      }
    } catch {
      alert("Terjadi kendala saat memproses data transaksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatedTotal = (formData.quantity || 0) * (formData.pricePerPiece || 0);

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
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                    {editingSale ? "Edit Transaksi Penjualan" : "Input Penjualan Baru"}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                    Auto-Surat Jalan
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Faktur komersial terhubung langsung dengan manifest pengiriman kurir.
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
            {/* Section 1: Faktur Komersial */}
            <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
                  <Coins className="w-4 h-4 text-emerald-700" />
                  1. Faktur Komersial & Inventori
                </div>
                <span className="text-[11px] text-slate-700 font-bold">
                  Est. Subtotal:{" "}
                  <strong className="text-emerald-800 font-extrabold">
                    Rp {calculatedTotal.toLocaleString("id-ID")}
                  </strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                    <Hash className="w-3.5 h-3.5 text-slate-500" />
                    Nomor Invoice
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.invoiceNumber}
                    onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-semibold"
                    placeholder="SL-2026-001"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    Nama Pembeli / Klien
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-semibold"
                    placeholder="PT Pupuk Sriwidjaja"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                    <Package className="w-3.5 h-3.5 text-slate-500" />
                    Tipe Karung (Database Neon)
                  </label>
                  <select
                    value={formData.bagTypeId}
                    required
                    onChange={e => setFormData({ ...formData, bagTypeId: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
                  >
                    {actualBagTypes.length === 0 ? (
                      <option disabled value="">Memuat data karung / stok kosong...</option>
                    ) : (
                      actualBagTypes.map((b: any) => (
                        <option key={b.id} value={b.id} className="text-slate-950 font-medium">
                          {b.name} ({b.sku}) — Stok Gudang: {b.currentStock?.toLocaleString("id-ID")} pcs
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Volume Penjualan (Lembar)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.quantity || ""}
                    onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-mono font-bold"
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Harga Satuan (Rp / pcs)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.pricePerPiece || ""}
                    onChange={e => setFormData({ ...formData, pricePerPiece: parseInt(e.target.value) || 0 })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-mono font-bold"
                    placeholder="1850"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                    Status Pembayaran
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={e => setFormData({ ...formData, paymentStatus: e.target.value as "LUNAS" | "PENDING" })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-bold"
                  >
                    <option value="PENDING">PENDING (Piutang Usaha / Menunggu Pelunasan)</option>
                    <option value="LUNAS">LUNAS (Kas Diterima)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Manifest Logistik */}
            <div className="p-5 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 tracking-wider uppercase">
                  <Truck className="w-4 h-4 text-blue-700" />
                  2. Manifest Logistik & Pengiriman
                </div>
                <span className="text-xs text-slate-600 font-semibold">
                  *Opsional jika self-pickup
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Nama Pengemudi / Sopir
                  </label>
                  <input
                    type="text"
                    value={formData.driverName}
                    onChange={e => setFormData({ ...formData, driverName: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                    placeholder="Pak Budi Santoso"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Nomor Plat Armada
                  </label>
                  <input
                    type="text"
                    value={formData.plateNumber}
                    onChange={e => setFormData({ ...formData, plateNumber: e.target.value.toUpperCase() })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                    placeholder="B 9876 XYZ"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    Alamat Lengkap Tujuan Pengiriman
                  </label>
                  <textarea
                    rows={2}
                    value={formData.deliveryAddress}
                    onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none"
                    placeholder="Jl. Pergudangan Industri No. 45, Karawang Timur, Jawa Barat"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Status Ekspedisi / Kurir
                  </label>
                  <select
                    value={formData.deliveryStatus}
                    onChange={e => setFormData({ ...formData, deliveryStatus: e.target.value as "DIPROSES" | "DIKIRIM" | "DITERIMA" })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-bold"
                  >
                    <option value="DIPROSES">DIPROSES GUDANG (Packing & Loading)</option>
                    <option value="DIKIRIM">SEDANG DIKIRIM (Armada Dalam Perjalanan)</option>
                    <option value="DITERIMA">BARANG SUDAH DITERIMA CUSTOMER</option>
                  </select>
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
                {isSubmitting ? "Menyimpan..." : "Simpan Data Terintegrasi"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}