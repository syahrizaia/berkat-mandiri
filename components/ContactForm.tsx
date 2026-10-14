"use client";

import React, { useState } from "react";
import { MessageCircle, ShieldCheck, Sparkles, Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    country: "",
    quantity: "",
    productId: "goni-premium",
    notes: "",
  });

  // Nomor WhatsApp Sales Representative
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
      `*Negara Tujuan:* ${formData.country}%0A` +
      `*Produk:* ${productMap[formData.productId]}%0A` +
      `*Jumlah:* ${formData.quantity} Lembar%0A` +
      `*Catatan:* ${formData.notes || "-"}`;

    // Membuka WhatsApp di tab baru
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="liquid-glass p-7 sm:p-10 rounded-[32px] border border-white/70 shadow-2xl relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Sales Fast-Track</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Formulir Permintaan Penawaran (RFQ)
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
            Lengkapi data kebutuhan pengemasan kargo Anda di bawah ini untuk tersambung langsung dengan representatif penjualan via WhatsApp.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Nama Perusahaan / Korporasi *
              </label>
              <input 
                type="text" 
                required 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange}
                placeholder="PT. Energi Maju Sejahtera"
                className="w-full text-slate-950 font-semibold placeholder:text-slate-500 text-sm p-3 border border-slate-300 rounded-xl bg-white/70 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Alamat Email Resmi *
              </label>
              <input 
                type="email" 
                required 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="procurement@company.com"
                className="w-full text-slate-950 font-semibold placeholder:text-slate-500 text-sm p-3 border border-slate-300 rounded-xl bg-white/70 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Negara Tujuan Pengiriman *
              </label>
              <input 
                type="text" 
                required 
                name="country" 
                value={formData.country} 
                onChange={handleChange}
                placeholder="Indonesia, Singapore, Germany"
                className="w-full text-slate-950 font-semibold placeholder:text-slate-500 text-sm p-3 border border-slate-300 rounded-xl bg-white/70 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Jumlah Pesanan (Lembar) *
              </label>
              <input 
                type="number" 
                required 
                name="quantity" 
                value={formData.quantity} 
                onChange={handleChange}
                placeholder="Contoh: 10000" 
                min="1"
                className="w-full text-slate-950 font-semibold placeholder:text-slate-500 text-sm p-3 border border-slate-300 rounded-xl bg-white/70 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pilih Jenis Material Karung *
            </label>
            <select 
              name="productId" 
              value={formData.productId} 
              onChange={handleChange}
              className="w-full text-slate-950 font-bold text-sm p-3 border border-slate-300 rounded-xl bg-white/70 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
            >
              <option value="goni-premium">Karung Goni Alami (Premium Jute Bag)</option>
              <option value="woven-pp">Karung Plastik PP Woven Standard</option>
              <option value="laminated-bopp">Karung Laminasi Custom (BOPP Film Sacks)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Spesifikasi Tambahan / Catatan Khusus (Opsional)
            </label>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              rows={3}
              placeholder="Tuliskan detail kustomisasi ukuran khusus, gramatur ketebalan kain, atau instruksi pelabelan logo di sini..."
              className="w-full text-slate-950 font-medium placeholder:text-slate-500 text-sm p-3 border border-slate-300 rounded-xl bg-white/70 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition resize-none"
            />
          </div>

          <button 
            type="submit"
            className="liquid-sheen w-full font-bold p-4 text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-2xl shadow-xl shadow-emerald-600/25 border border-white/30 transition-all text-sm flex items-center justify-center gap-2.5 active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Kirim Permintaan Harga via WhatsApp Resmi</span>
          </button>

          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kerahasiaan data penawaran harga Anda terjamin di bawah regulasi B2B NDA.</span>
          </div>
        </form>

      </div>
    </div>
  );
}