/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SaleWithRelations } from "../page";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingSale: SaleWithRelations | null;
  bagTypes: any[];
  refreshData: () => void;
}

export default function SaleModalForm({ onClose, editingSale, bagTypes, refreshData }: ModalProps) {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    customerName: "",
    bagTypeId: "",
    quantity: 0,
    pricePerPiece: 0,
    paymentStatus: "PENDING",
    driverName: "",
    plateNumber: "",
    deliveryAddress: "",
    deliveryStatus: "DIPROSES"
  });

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
    } else if (bagTypes.length > 0) {
      setFormData(prev => ({ ...prev, bagTypeId: bagTypes[0].id }));
    }
  }, [editingSale, bagTypes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingSale ? `/api/admin/dashboard/${editingSale.id}` : "/api/sales";
    const method = editingSale ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        refreshData();
        onClose();
      }
    } catch (error) {
      alert("Gagal memproses data ke database");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-lg font-black text-slate-900">{editingSale ? "Edit Transaksi" : "Input Penjualan Baru (Auto-Surat Jalan)"}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-xl"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-slate-50 text-slate-600 p-4 rounded-2xl border space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 uppercase">1. Faktur Komersial</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nomor Invoice</label>
                <input type="text" required value={formData.invoiceNumber} onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })} className="w-full text-sm border p-2.5 rounded-xl focus:outline-emerald-500" placeholder="SL-2026-001" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Pembeli</label>
                <input type="text" required value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} className="w-full text-sm border p-2.5 rounded-xl focus:outline-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Stok Karung (Database Neon)</label>
                <select value={formData.bagTypeId} onChange={e => setFormData({ ...formData, bagTypeId: e.target.value })} className="w-full text-sm border p-2.5 rounded-xl bg-white">
                  {(Array.isArray(bagTypes) ? bagTypes : []).map(b => (
                    <option key={b.id} value={b.id}>
                        {b.name} ({b.sku})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Volume (Lembar)</label>
                <input type="number" required value={formData.quantity || ""} onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })} className="w-full text-sm border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Harga Satuan (Rp)</label>
                <input type="number" required value={formData.pricePerPiece || ""} onChange={e => setFormData({ ...formData, pricePerPiece: parseInt(e.target.value) || 0 })} className="w-full text-sm border p-2.5 rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Status Keuangan</label>
                <select value={formData.paymentStatus} onChange={e => setFormData({ ...formData, paymentStatus: e.target.value })} className="w-full text-sm border p-2.5 rounded-xl bg-white">
                  <option value="PENDING">PENDING (Piutang)</option>
                  <option value="LUNAS">LUNAS (Kas Masuk)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/40 text-slate-600 p-4 rounded-2xl border border-blue-100 space-y-3">
            <h4 className="text-xs font-bold text-blue-800 uppercase">2. Manifest Logistik</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Sopir</label>
                <input type="text" value={formData.driverName} onChange={e => setFormData({ ...formData, driverName: e.target.value })} className="w-full text-sm border p-2.5 rounded-xl bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nomor Plat Mobil</label>
                <input type="text" value={formData.plateNumber} onChange={e => setFormData({ ...formData, plateNumber: e.target.value })} className="w-full text-sm border p-2.5 rounded-xl bg-white uppercase" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">Alamat Tujuan Pengiriman</label>
                <textarea rows={2} value={formData.deliveryAddress} onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })} className="w-full text-sm border p-2.5 rounded-xl bg-white resize-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">Status Pengiriman Kurir</label>
                <select value={formData.deliveryStatus} onChange={e => setFormData({ ...formData, deliveryStatus: e.target.value })} className="w-full text-sm border p-2.5 rounded-xl bg-white">
                  <option value="DIPROSES">DIPROSES GUDANG</option>
                  <option value="DIKIRIM">SEDANG DIKIRIM (ARMADA JALAN)</option>
                  <option value="DITERIMA">BARANG SUDAH DITERIMA CUSTOMER</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50">Batal</button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700">Simpan Data Terintegrasi</button>
          </div>
        </form>
      </div>
    </div>
  );
}