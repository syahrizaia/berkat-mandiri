"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  ChevronDown, 
  Mail, 
  HelpCircle,
  Sparkles,
  Package,
  Users,
  FileText,
  ShieldCheck,
  TrendingUp,
  Headphones,
  CheckCircle2,
  ExternalLink,
  PhoneCall
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "Gudang" | "Karyawan" | "Penjualan" | "Sistem";
}

const allFaqs: FAQItem[] = [
  {
    category: "Gudang",
    q: "Bagaimana cara menambah jenis karung / SKU baru ke gudang?",
    a: "Buka menu 'Stok Karung' (/inventory) di bilah navigasi kiri, lalu klik tombol '+ Tambah Jenis Karung' di sudut kanan atas. Masukkan kode SKU, nama deskripsi, stok awal, serta konfigurasi tarif borongan pekerja per lembar.",
  },
  {
    category: "Gudang",
    q: "Bagaimana cara kerja Safety Threshold berbasis Machine Learning (ML)?",
    a: "Sistem kami terhubung dengan microservice Machine Learning yang memprediksi estimasi kebutuhan karung untuk 30 hari ke depan berdasarkan tren historis pengeluaran. Jika stok fisik gudang berada di bawah ambang batas aman tersebut, sistem akan otomatis menandainya dengan status 'Menipis' dan memicu peringatan restock.",
  },
  {
    category: "Gudang",
    q: "Apakah stok berkurang otomatis saat invoice penjualan dibuat?",
    a: "Ya. Setiap kali transaksi penjualan diinput di menu 'Penjualan' (/sales), stok karung fisik pada database PostgreSQL akan otomatis terpotong sesuai kuantitas lembar yang dipesan pelanggan.",
  },
  {
    category: "Karyawan",
    q: "Bagaimana cara menghitung upah borongan cuci, lipat, dan jahit?",
    a: "Tarif upah ditentukan per jenis karung pada saat pendaftaran master SKU. Ketika staf menginput log aktivitas kerja harian karyawan, total upah dihitung otomatis dengan mengalikan volume fisik (pcs) dengan tarif spesifik pekerjaan (Cuci, Lipat, atau Jahit).",
  },
  {
    category: "Karyawan",
    q: "Bagaimana cara mencetak slip gaji karyawan borongan?",
    a: "Masuk ke menu 'Data Karyawan' (/employees), klik tombol 'Slip & Detail' pada nama karyawan terkait. Anda dapat memilih filter periode (Hari Ini, Pekan Ini, Bulan Ini, atau Semua Riwayat), kemudian klik tombol 'Cetak Slip Gaji' untuk mencetak dokumen bertanda tangan resmi pimpinan.",
  },
  {
    category: "Penjualan",
    q: "Bagaimana cara membuat Surat Jalan dan Invoice Penjualan?",
    a: "Buka menu 'Penjualan' (/sales) dan klik 'Input Penjualan'. Masukkan nama pembeli, tipe karung, volume, dan data manifest kurir (nama driver & plat kendaraan). Sistem secara otomatis menghasilkan nomor invoice resmi dan tombol cetak Surat Jalan instan.",
  },
  {
    category: "Penjualan",
    q: "Apa perbedaan status pembayaran LUNAS dan PENDING?",
    a: "Status 'LUNAS' mencatat pembayaran yang telah terverifikasi masuk ke rekening kas perusahaan, sedangkan status 'PENDING' dimasukkan ke dalam pos Piutang Usaha. Ringkasan perbandingannya dapat dipantau langsung pada grafik analitik di menu 'Laporan'.",
  },
  {
    category: "Sistem",
    q: "Apakah data transaksi aman jika koneksi internet terputus?",
    a: "Seluruh basis data disimpan di cloud PostgreSQL berkecepatan tinggi (Neon.tech) dengan arsitektur ACID compliance. Form input dilengkapi validasi ganda di sisi klien dan server untuk mencegah duplikasi data transaksi.",
  },
  {
    category: "Sistem",
    q: "Bagaimana cara mengekspor dokumen laporan keuangan ke PDF?",
    a: "Buka menu 'Laporan' (/reports), lalu tekan tombol 'Cetak / Ekspor PDF' di kanan atas. Dialog cetak bawaan browser akan terbuka dan Anda dapat memilih opsi 'Save as PDF' dengan format dokumen eksekutif resmi CV Berkat Mandiri.",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const SUPPORT_WA_NUMBER = "6285954597029";
  const SUPPORT_EMAIL = "support@berkatmandiri.com";
  const WA_PREFILLED_TEXT = encodeURIComponent("Halo Tim Support CV Berkat Mandiri, saya butuh bantuan teknis terkait sistem ERP karung...");
  const EMAIL_SUBJECT = encodeURIComponent("Permintaan Bantuan Operasional - CV Berkat Mandiri");

  const categories = ["ALL", "Gudang", "Karyawan", "Penjualan", "Sistem"] as const;

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((item) => {
      const matchCategory = selectedCategory === "ALL" || item.category === selectedCategory;
      const matchSearch = 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* Header Liquid Glass Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-[32px] liquid-glass border border-slate-200/80 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-emerald-500/15 text-emerald-900 border border-emerald-500/30 inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Pusat Bantuan & Layanan Operasional
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Pusat Bantuan & Panduan Sistem
          </h1>
          <p className="text-sm text-slate-800 font-medium mt-1.5 leading-relaxed">
            Temukan jawaban komprehensif, panduan alur kerja pergudangan, perhitungan upah borongan, serta akses dukungan teknis langsung dari tim ahli kami.
          </p>
        </div>

        {/* Quick Contact Capsule */}
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <a
            href={`https://wa.me/${SUPPORT_WA_NUMBER}?text=${WA_PREFILLED_TEXT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Dukungan WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Bento Quick Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Card 1: Stok & Gudang */}
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-sm">
              Modul Gudang
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-black text-slate-950">SOP Manajemen Stok</h3>
            <p className="text-xs text-slate-800 font-semibold mt-1.5 leading-relaxed">
              Panduan inventarisasi fisik karung, integrasi safety threshold ML, dan pencegahan kekurangan pasokan produksi.
            </p>
          </div>
        </div>

        {/* Card 2: Penggajian Borongan */}
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl bg-blue-100 text-blue-800 border border-blue-300 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-950 border border-blue-300 shadow-sm">
              Modul Tenaga Kerja
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-black text-slate-950">Kalkulasi Upah Borongan</h3>
            <p className="text-xs text-slate-800 font-semibold mt-1.5 leading-relaxed">
              Tata cara rekapitulasi volume harian cuci, lipat, jahit, serta pencetakan slip kompensasi resmi karyawan.
            </p>
          </div>
        </div>

        {/* Card 3: Faktur & Logistik */}
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 shadow-sm">
              Modul Penjualan
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-black text-slate-950">Faktur & Surat Jalan</h3>
            <p className="text-xs text-slate-800 font-semibold mt-1.5 leading-relaxed">
              Otomasi surat jalan ekspedisi pengiriman, pencatatan piutang pelanggan, dan audit rekonsiliasi kas masuk.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl liquid-glass border border-slate-200/80 shadow-md">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari solusi kendala atau pertanyaan..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white border border-slate-300 text-slate-950 placeholder:text-slate-600 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl border border-slate-300/80 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-white text-slate-950 shadow-sm border border-slate-300"
                  : "text-slate-800 hover:text-slate-950 hover:bg-white/40"
              }`}
            >
              {cat === "ALL" ? "Semua Topik" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="liquid-glass rounded-[32px] border border-slate-200/80 shadow-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-black text-slate-950">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-200/80 text-slate-900 border border-slate-300">
            {filteredFaqs.length} Topik Tersedia
          </span>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-slate-800 font-semibold text-sm">
            Tidak ada jawaban yang sesuai dengan kata kunci &quot;{searchQuery}&quot;. Silakan hubungi tim bantuan langsung di bawah.
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const categoryBadgeStyles = 
                faq.category === "Gudang" ? "bg-emerald-100 text-emerald-950 border-emerald-300" :
                faq.category === "Karyawan" ? "bg-blue-100 text-blue-950 border-blue-300" :
                faq.category === "Penjualan" ? "bg-amber-100 text-amber-950 border-amber-300" :
                "bg-purple-100 text-purple-950 border-purple-300";

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white/80 hover:bg-white transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border shrink-0 shadow-xs ${categoryBadgeStyles}`}>
                        {faq.category}
                      </span>
                      <span className="font-extrabold text-slate-950 text-sm">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-700 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-5 pt-3 text-slate-900 text-sm font-semibold leading-relaxed border-t border-slate-200 bg-slate-50/90">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Direct Contact Banner (Apple Glass Obsidian Style with guaranteed dark background) */}
      <div className="rounded-[32px] liquid-glass-dark border border-white/15 shadow-2xl p-8 sm:p-10 relative overflow-hidden text-white">
        {/* Soft emerald glow orb */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-emerald-400 shrink-0 shadow-md">
              <Headphones className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm">
                  Dukungan Teknis Langsung
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Masih Membutuhkan Bantuan Khusus?
              </h3>
              <p className="text-xs sm:text-sm text-slate-100 font-medium mt-1.5 max-w-xl leading-relaxed">
                Tim administrasi dan dukungan teknis sistem CV Berkat Mandiri siap mendampingi operasional pergudangan Anda dari Senin hingga Sabtu (08:00 - 17:00 WIB).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${SUPPORT_WA_NUMBER}?text=${WA_PREFILLED_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none justify-center px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs shadow-lg shadow-emerald-500/30 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>

            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${EMAIL_SUBJECT}`}
              className="flex-1 sm:flex-none justify-center px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-black text-xs border border-white/25 active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Kirim Surel</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}