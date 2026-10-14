import type { Metadata } from "next";
import React from "react";
import { ShieldCheck, Lock, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Pelindungan Data Komersial",
  description: "Kebijakan privasi CV Berkat Mandiri mengenai tata cara pengumpulan, penyimpanan, dan penggunaan informasi korporat pada sistem RFQ kami.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  const lastUpdated = "16 Juni 2026";

  return (
    <div className="w-full relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-slate-700">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="liquid-glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Main Glass Document Plate */}
        <div className="liquid-glass p-8 sm:p-14 rounded-[36px] border border-white/80 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="border-b border-slate-200/60 pb-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kerahasiaan Data Perdagangan B2B</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kebijakan Privasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Terakhir diperbarui: <span className="font-bold text-slate-900">{lastUpdated}</span>
            </p>
          </div>

          {/* Pendahuluan */}
          <section className="space-y-3">
            <p className="leading-relaxed text-sm sm:text-base">
              Selamat datang di <strong className="text-slate-900">CV Berkat Mandiri</strong>. Kami sangat menghargai kepercayaan yang Anda berikan sebagai mitra bisnis (B2B partner). Kebijakan Privasi ini dirancang untuk menjelaskan bagaimana kami mengumpulkan, menggunakan, mengelola, dan melindungi informasi yang Anda kirimkan melalui formulir Request for Quote (RFQ), interaksi WhatsApp Sales, maupun penelusuran umum di website kami.
            </p>
            <p className="leading-relaxed text-sm sm:text-base">
              Dengan mengakses website ini dan menggunakan layanan pengadaan kargo kami, Anda dianggap menyetujui seluruh ketentuan yang tercantum dalam dokumen ini.
            </p>
          </section>

          {/* 1. Informasi yang Dikumpulkan */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
              <span>Jenis Informasi yang Dikumpulkan</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Kami hanya mengumpulkan data komersial yang bersifat spesifik dan relevan demi kelancaran kalkulasi logistik:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
              <li><strong className="text-slate-900">Data Identitas Perusahaan:</strong> Nama badan usaha/korporasi, bidang industri, dan negara tujuan pengapalan kargo.</li>
              <li><strong className="text-slate-900">Data Kontak Resmi:</strong> Alamat email korespondensi bisnis dan nomor telepon/WhatsApp aktif perwakilan pengadaan (procurement manager).</li>
              <li><strong className="text-slate-900">Spesifikasi Kargo:</strong> Estimasi jumlah pemesanan karung (lembar), jenis material yang diminati, serta catatan kustomisasi khusus.</li>
              <li><strong className="text-slate-900">Data Teknis Otomatis:</strong> Alamat IP, jenis perangkat, dan aktivitas penelusuran halaman melalui sistem analitik website kami demi peningkatan performa server.</li>
            </ul>
          </section>

          {/* 2. Penggunaan Informasi */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
              <span>Tujuan Penggunaan Data</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Seluruh data yang masuk ke dalam sistem basis data kami digunakan secara ketat untuk kepentingan operasional berikut:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
              <li>Memproses dan menyusun lembar penawaran resmi (RFQ) serta menghitung estimasi biaya logistik kontainer.</li>
              <li>Menghubungi Anda kembali via Email atau WhatsApp untuk melakukan negosiasi harga dan pengiriman sampel fisik produk.</li>
              <li>Menyusun dokumentasi kelengkapan bea cukai (Customs clearance) dan manifes muatan pelabuhan jika kontrak kerja sama disepakati.</li>
              <li>Menganalisis tren volume permintaan komoditas guna mengoptimalkan kapasitas produksi mesin anyaman kami.</li>
            </ul>
          </section>

          {/* 3. Keamanan Data */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
              <span>Keamanan & Penyimpanan Data</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Kami menerapkan enkripsi standar industri untuk mengamankan data transaksi Anda dari akses yang tidak sah, modifikasi, atau kebocoran ilegal. Data formulir digital Anda disimpan dengan aman pada infrastruktur cloud terenkripsi dan hanya dapat diakses oleh tim manajemen internal yang terikat oleh perjanjian kerahasiaan (Non-Disclosure Agreement).
            </p>
          </section>

          {/* 4. Pihak Ketiga */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
              <span>Keterbukaan Kepada Pihak Ketiga</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              CV Berkat Mandiri <strong className="text-slate-900">tidak akan pernah menjual, menyewakan, atau memperdagangkan</strong> data privasi perusahaan Anda kepada pihak pemasaran luar. Data Anda hanya akan dibagikan kepada mitra logistik pihak ketiga tepercaya (seperti shipping lines atau agen ekspedisi resmi) yang ditunjuk langsung untuk memproses pengiriman fisik kargo karung ke lokasi gudang Anda.
            </p>
          </section>

          {/* 5. Hak Kendali */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">5</span>
              <span>Hak Kendali Data Anda</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Sesuai dengan regulasi pelindungan data yang berlaku, Anda memiliki hak penuh untuk meminta salinan data riwayat transaksi Anda, meminta pembaruan jika terdapat kekeliruan data, atau meminta penghapusan total informasi perusahaan Anda dari sistem data analitik kami setelah siklus pengadaan selesai.
            </p>
          </section>

          {/* Contact Support Box */}
          <div className="liquid-glass-subtle p-6 rounded-2xl border border-white/60 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Pertanyaan & Kontak Layanan Kepatuhan Hukum</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jika Anda memiliki pertanyaan lebih lanjut mengenai kebijakan ini, silakan hubungi tim legalitas korporasi kami melalui:
            </p>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 select-all">
              legal@cvberkatmandiri.com
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}