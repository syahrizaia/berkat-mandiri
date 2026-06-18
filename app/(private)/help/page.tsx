"use client";

import { useState } from "react";
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  HelpCircle 
} from "lucide-react";

const faqs = [
  {
    category: "Inventaris",
    questions: [
      { q: "Bagaimana cara menambah stok barang baru?", a: "Klik menu 'Stok Barang', lalu tekan tombol '+ Tambah Barang' di pojok kanan atas." },
      { q: "Mengapa stok muncul sebagai 'Menipis'?", a: "Status 'Menipis' otomatis muncul jika jumlah stok Anda di bawah ambang batas 100 unit." },
    ]
  },
  {
    category: "Karyawan",
    questions: [
      { q: "Cara mengubah status karyawan menjadi non-aktif?", a: "Pergi ke menu 'Karyawan', klik ikon edit pada karyawan terkait, dan ubah status di kolom dropdown." },
    ]
  }
];

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  // KONFIGURASI KONTAK SUPPORT (Silakan sesuaikan data ini)
  const SUPPORT_WA_NUMBER = "6285954597029"; // Format internasional tanpa tanda +
  const SUPPORT_EMAIL = "support@berkatmandiri.com";
  const WA_PREFILLED_TEXT = encodeURIComponent("Halo Tim Support CV Berkat Mandiri, saya butuh bantuan terkait sistem...");
  const EMAIL_SUBJECT = encodeURIComponent("Butuh Bantuan Sistem - CV Berkat Mandiri");

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      {/* Header & Search */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Pusat Bantuan</h1>
        <p className="text-slate-500">Ada yang bisa kami bantu hari ini?</p>
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari solusi atau panduan..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-6">
        {faqs.map((cat, catIdx) => (
          <div key={catIdx}>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" /> {cat.category}
            </h2>
            <div className="space-y-3">
              {cat.questions.map((item, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                const isOpen = openIndex === id;
                return (
                  <div key={id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => toggleAccordion(id)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-slate-50 transition"
                    >
                      <span className="font-semibold text-slate-800">{item.q}</span>
                      {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-6 py-4 bg-slate-50 text-slate-600 text-sm border-t border-slate-100">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Support Contact */}
      <div className="bg-emerald-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
        <div className="flex gap-4">
          <div className="bg-white/20 p-3 rounded-xl h-fit">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Masih butuh bantuan?</h3>
            <p className="text-emerald-100">Tim support kami siap membantu Anda 24/7.</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          {/* Tombol Live Chat (WhatsApp) */}
          <a 
            href={`https://wa.me/${SUPPORT_WA_NUMBER}?text=${WA_PREFILLED_TEXT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none justify-center bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-50 transition text-center"
          >
            <MessageCircle className="w-4 h-4" /> Live Chat
          </a>
          
          {/* Tombol Email */}
          <a 
            href={`mailto:${SUPPORT_EMAIL}?subject=${EMAIL_SUBJECT}`}
            className="flex-1 md:flex-none justify-center bg-emerald-700/50 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-800 transition text-center"
          >
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>
      </div>
    </div>
  );
}