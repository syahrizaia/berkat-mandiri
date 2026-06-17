"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react"; // Ikon opsional untuk mempercantik

export default function ContactForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    country: "",
    quantity: "",
    productId: "goni-premium",
    notes: "",
  });

  // GANTI DENGAN NOMOR WA ANDA (Gunakan format internasional, misal 6281234567890)
  const WHATSAPP_NUMBER = "6285954597029"; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const productMap: Record<string, string> = {
    "goni-premium": "Karung Goni Alami (Premium Jute Bag)",
    "woven-pp": "Karung Plastik PP Woven Standard",
    "laminated-bopp": "Karung Laminasi Custom (BOPP Film Sacks)",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Memformat pesan untuk WhatsApp
    const message = `Halo *CV Berkat Mandiri*, saya ingin mengajukan permintaan harga (RFQ) dengan detail berikut:%0A%0A` +
      `*Nama Perusahaan:* ${formData.companyName}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Negara:* ${formData.country}%0A` +
      `*Produk:* ${productMap[formData.productId]}%0A` +
      `*Jumlah:* ${formData.quantity} Lembar%0A` +
      `*Catatan:* ${formData.notes || "-"}`;

    // Membuka WhatsApp di tab baru
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Formulir Permintaan Harga (RFQ)</h3>
      <p className="text-slate-500 text-xs sm:text-sm mb-6">Lengkapi data di bawah ini untuk mendapatkan kalkulasi harga grosir komersial terperinci via WhatsApp.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nama Perusahaan / Korporasi *</label>
            <input 
              type="text" required name="companyName" value={formData.companyName} onChange={handleChange}
              placeholder="PT. Energi Maju Sejahtera"
              className="w-full text-slate-700 text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Alamat Email Resmi *</label>
            <input 
              type="email" required name="email" value={formData.email} onChange={handleChange}
              placeholder="procurement@company.com"
              className="w-full text-slate-700 text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Negara Tujuan Pengiriman *</label>
            <input 
              type="text" required name="country" value={formData.country} onChange={handleChange}
              placeholder="Indonesia, Singapore, Germany"
              className="w-full text-slate-700 text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Jumlah Pesanan (Lembar) *</label>
            <input 
              type="number" required name="quantity" value={formData.quantity} onChange={handleChange}
              placeholder="Contoh: 10000" min="1"
              className="w-full text-slate-700 text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Pilih Jenis Material Karung *</label>
          <select 
            name="productId" value={formData.productId} onChange={handleChange}
            className="w-full text-slate-700 text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
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
            className="w-full text-slate-700 text-sm p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition resize-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full font-semibold p-4 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition text-sm flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Kirim RFQ via WhatsApp
        </button>
      </form>
    </div>
  );
}