"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, FileText, Loader2 } from "lucide-react";

export default function RfqForm({ products }: { products: { id: string; name: string }[] }) {
  const [formData, setFormData] = useState({
    companyName: "", email: "", country: "", quantity: "", productId: "", notes: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ companyName: "", email: "", country: "", quantity: "", productId: "", notes: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="liquid-glass p-7 sm:p-9 rounded-[32px] border border-white/60 shadow-xl relative overflow-hidden w-full h-full flex flex-col justify-between">
      
      {/* Decorative ambient tint */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-800 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official B2B Inquiry</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Request For Quote (RFQ)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Dapatkan kalkulasi harga grosir komersial dan dokumen proforma invoice resmi dari tim kami.
          </p>
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Nama Perusahaan / Korporasi *
          </label>
          <input 
            type="text" 
            required 
            value={formData.companyName} 
            onChange={e => setFormData({...formData, companyName: e.target.value})} 
            className="w-full px-4 py-2.5 bg-white/70 border border-slate-300 rounded-xl text-sm text-slate-950 font-semibold placeholder:text-slate-500 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" 
            placeholder="Contoh: PT. Agro Makmur Sentosa" 
          />
        </div>

        {/* Email & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Email Bisnis Resmi *
            </label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="w-full px-4 py-2.5 bg-white/70 border border-slate-300 rounded-xl text-sm text-slate-950 font-semibold placeholder:text-slate-500 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" 
              placeholder="procurement@company.com" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Negara Tujuan Kargo *
            </label>
            <input 
              type="text" 
              required 
              value={formData.country} 
              onChange={e => setFormData({...formData, country: e.target.value})} 
              className="w-full px-4 py-2.5 bg-white/70 border border-slate-300 rounded-xl text-sm text-slate-950 font-semibold placeholder:text-slate-500 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" 
              placeholder="Contoh: Singapore, Indonesia" 
            />
          </div>
        </div>

        {/* Product selection & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pilihan Material Karung *
            </label>
            <select 
              required 
              value={formData.productId} 
              onChange={e => setFormData({...formData, productId: e.target.value})} 
              className="w-full px-4 py-2.5 bg-white/70 border border-slate-300 rounded-xl text-sm text-slate-950 font-bold focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
            >
              <option value="">-- Pilih Jenis Karung --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Target Jumlah (Pcs) *
            </label>
            <input 
              type="number" 
              required 
              value={formData.quantity} 
              onChange={e => setFormData({...formData, quantity: e.target.value})} 
              className="w-full px-4 py-2.5 bg-white/70 border border-slate-300 rounded-xl text-sm text-slate-950 font-semibold placeholder:text-slate-500 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" 
              placeholder="Min. 10,000 lembar" 
              min="1"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Spesifikasi Khusus / Catatan (Opsional)
          </label>
          <textarea 
            rows={3}
            value={formData.notes} 
            onChange={e => setFormData({...formData, notes: e.target.value})} 
            className="w-full px-4 py-2.5 bg-white/70 border border-slate-300 rounded-xl text-sm text-slate-950 font-medium placeholder:text-slate-500 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition resize-none" 
            placeholder="Kustomisasi ukuran gramasi, cetak logo brand, atau sertifikasi khusus..." 
          />
        </div>

        {/* Submit Button with Liquid Sheen */}
        <button 
          type="submit" 
          disabled={status === "loading"} 
          className="liquid-sheen w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/25 border border-white/30 flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses RFQ...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Kirim Permintaan Harga Resmi</span>
            </>
          )}
        </button>

        {/* Feedback Alerts */}
        {status === "success" && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>RFQ berhasil terkirim! Tim perwakilan kami akan segera meninjau spesifikasi dan menghubungi Anda.</span>
          </div>
        )}

        {status === "error" && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-800 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Terjadi kesalahan saat memproses RFQ. Silakan periksa kembali isian formulir Anda.</span>
          </div>
        )}

      </form>
    </div>
  );
}