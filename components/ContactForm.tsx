/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    country: "",
    quantity: "",
    productId: "goni-premium",
    notes: "",
  });
  
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      // Mengirimkan data ke API route POST yang sudah Anda buat sebelumnya
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Gagal mengirim permintaan.");
      }

      setStatus({
        type: "success",
        message: "Formulir RFQ Berhasil Dikirim! Tim sales kami akan segera menghubungi Anda melalui email.",
      });
      
      // Reset Form jika sukses
      setFormData({
        companyName: "",
        email: "",
        country: "",
        quantity: "",
        productId: "goni-premium",
        notes: "",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Terjadi kesalahan sistem, silakan coba lagi nanti.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Formulir Permintaan Harga (RFQ)</h3>
      <p className="text-slate-500 text-xs sm:text-sm mb-6">Lengkapi data di bawah ini untuk mendapatkan kalkulasi harga grosir komersial terperinci.</p>
      
      {status.type && (
        <div className={`p-4 rounded-xl text-sm font-medium mb-6 ${
          status.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nama Perusahaan / Korporasi *</label>
            <input 
              type="text" required name="companyName" value={formData.companyName} onChange={handleChange}
              placeholder="PT. Energi Maju Sejahtera"
              className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Alamat Email Resmi *</label>
            <input 
              type="email" required name="email" value={formData.email} onChange={handleChange}
              placeholder="procurement@company.com"
              className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Negara Tujuan Pengiriman *</label>
            <input 
              type="text" required name="country" value={formData.country} onChange={handleChange}
              placeholder="Indonesia, Singapore, Germany"
              className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Jumlah Pesanan (Lembar) *</label>
            <input 
              type="number" required name="quantity" value={formData.quantity} onChange={handleChange}
              placeholder="Contoh: 10000" min="1"
              className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Pilih Jenis Material Karung *</label>
          <select 
            name="productId" value={formData.productId} onChange={handleChange}
            className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
          >
            <option value="goni-premium">Karung Goni Alami (Premium Jute Bag)</option>
            <option value="woven-pp">Karung Plastik PP Woven Standard</option>
            <option value="laminated-bopp">Karung Laminasi Custom (BOPP Film Sacks)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Spesifikasi Tambahan / Catatan Khusus (Opsional)</label>
          <textarea 
            name="notes" value={formData.notes} onChange={handleChange} rows={4}
            placeholder="Tuliskan detail kustomisasi ukuran khusus, gramatur ketebalan kain, atau instruksi pelabelan logo di sini..."
            className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition resize-none"
          ></textarea>
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full font-semibold p-4 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md disabled:opacity-50 transition text-sm flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Memproses Data Kargo...
            </>
          ) : (
            "Kirim Dokumen Permintaan RFQ"
          )}
        </button>
      </form>
    </div>
  );
}