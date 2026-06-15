"use client";

import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-slate-900">Request For Quote (RFQ)</h3>
      <p className="text-sm text-slate-500">Minta penawaran harga khusus untuk pengiriman internasional.</p>
      
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nama Perusahaan</label>
        <input type="text" required value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm" placeholder="e.g. Acme Corp Ltd" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Bisnis</label>
          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm" placeholder="buyer@company.com" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Negara Tujuan</label>
          <input type="text" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm" placeholder="e.g. Australia" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Pilih Produk</label>
          <select required value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white">
            <option value="">-- Pilih Jenis Karung --</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Jumlah (Lembar)</label>
          <input type="number" required value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm" placeholder="Min. 10,000" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Spesifikasi Tambahan (Opsional)</label>
        <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm h-24" placeholder="Misal: Custom ukuran, ketebalan gramasi, atau pencetakan logo khusus..." />
      </div>

      <button type="submit" disabled={status === "loading"} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition">
        {status === "loading" ? "Mengirim..." : "Kirim Permintaan Harga"}
      </button>

      {status === "success" && <p className="text-sm text-emerald-600 font-medium text-center">RFQ Berhasil dikirim! Tim kami akan menghubungi Anda via email.</p>}
      {status === "error" && <p className="text-sm text-rose-600 font-medium text-center">Terjadi kesalahan. Silakan coba lagi.</p>}
    </form>
  );
}