import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Pelindungan Data Komersial",
  description: "Kebijakan privasi CV Berkat Mandiri mengenai tata cara pengumpulan, penyimpanan, dan penggunaan informasi korporat pada sistem RFQ kami.",
  robots: { index: false, follow: true }, // Halaman legalitas sebaiknya tidak perlu bersaing ketat di indeks utama Google, cukup di-follow link-nya.
};

export default function PrivacyPage() {
  const lastUpdated = "16 Juni 2026";

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 sm:py-16 text-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
        
        {/* HEADER HALAMAN */}
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Kebijakan Privasi
          </h1>
          <p className="text-sm text-slate-400">
            Terakhir diperbarui: <span className="font-semibold text-slate-600">{lastUpdated}</span>
          </p>
        </div>

        {/* PENDAHULUAN */}
        <section className="space-y-3">
          <p className="leading-relaxed text-sm sm:text-base">
            Selamat datang di <span className="font-bold">CV Berkat Mandiri</span>. Kami sangat menghargai kepercayaan yang Anda berikan sebagai mitra bisnis (B2B partner). Kebijakan Privasi ini dirancang untuk menjelaskan bagaimana kami mengumpulkan, menggunakan, mengelola, dan melindungi informasi yang Anda kirimkan melalui formulir Request for Quote (RFQ), interaksi WhatsApp Sales, maupun penelusuran umum di website kami.
          </p>
          <p className="leading-relaxed text-sm sm:text-base">
            Dengan mengakses website ini dan menggunakan layanan pengadaan kargo kami, Anda dianggap menyetujui seluruh ketentuan yang tercantum dalam dokumen ini.
          </p>
        </section>

        {/* INFORMASI YANG KAMI KUMPULKAN */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">1.</span> Jenis Informasi yang Dikumpulkan
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Kami hanya mengumpulkan data komersial yang bersifat spesifik dan relevan demi kelancaran kalkulasi logistik. Data tersebut meliputi:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base">
            <li><strong className="text-slate-900">Data Identitas Perusahaan:</strong> Nama badan usaha/korporasi, bidang industri, dan negara tujuan pengapalan kargo.</li>
            <li><strong className="text-slate-900">Data Kontak Resmi:</strong> Alamat email korespondensi bisnis dan nomor telepon/WhatsApp aktif perwakilan pengadaan (procurement manager).</li>
            <li><strong className="text-slate-900">Spesifikasi Kargo:</strong> Estimasi jumlah pemesanan karung (lembar), jenis material yang diminati, serta catatan kustomisasi khusus.</li>
            <li><strong className="text-slate-900">Data Teknis Otomatis:</strong> Alamat IP, jenis perangkat, dan aktivitas penelusuran halaman melalui sistem analitik website kami demi peningkatan performa server.</li>
          </ul>
        </section>

        {/* PENGGUNAAN INFORMASI */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">2.</span> Tujuan Penggunaan Data
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Seluruh data yang masuk ke dalam sistem basis data kami digunakan secara ketat untuk kepentingan operasional berikut:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base">
            <li>Memproses dan menyusun lembar penawaran resmi (RFQ) serta menghitung estimasi biaya logistik kontainer.</li>
            <li>Menghubungi Anda kembali via Email atau WhatsApp untuk melakukan negosiasi harga dan pengiriman sampel fisik produk.</li>
            <li>Menyusun dokumentasi kelengkapan bea cukai (Customs clearance) dan manifes muatan pelabuhan jika kontrak kerja sama disepakati.</li>
            <li>Menganalisis tren volume permintaan komoditas guna mengoptimalkan kapasitas produksi mesin anyaman kami.</li>
          </ul>
        </section>

        {/* PERLINDUNGAN & KEAMANAN DATA */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">3.</span> Keamanan & Penyimpanan Data
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Kami menerapkan enkripsi standar industri untuk mengamankan data transaksi Anda dari akses yang tidak sah, modifikasi, atau kebocoran ilegal. Data formulir digital Anda disimpan dengan aman pada infrastruktur cloud terenkripsi dan hanya dapat diakses oleh tim manajemen internal yang terikat oleh perjanjian kerahasiaan (Non-Disclosure Agreement).
          </p>
        </section>

        {/* PENYEBARAN DATA PIHAK KETIGA */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">4.</span> Keterbukaan Kepada Pihak Ketiga
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            CV Berkat Mandiri <span className="font-bold">tidak akan pernah menjual, menyewakan, atau memperdagangkan</span> data privasi perusahaan Anda kepada pihak pemasaran luar. Data Anda hanya akan dibagikan kepada mitra logistik pihak ketiga tepercaya (seperti shipping lines atau agen ekspedisi resmi) yang ditunjuk langsung untuk memproses pengiriman fisik kargo karung ke lokasi gudang Anda.
          </p>
        </section>

        {/* HAK PENGGUNA */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">5.</span> Hak Kendali Data Anda
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Sesuai dengan regulasi pelindungan data yang berlaku, Anda memiliki hak penuh untuk meminta salinan data riwayat transaksi Anda, meminta pembaruan jika terdapat kekeliruan data, atau meminta penghapusan total informasi perusahaan Anda dari sistem data analitik kami setelah siklus pengadaan selesai.
          </p>
        </section>

        {/* CONTACT INFO INTERNAL */}
        <div className="pt-8 border-t border-slate-100 bg-slate-50/50 p-6 rounded-2xl border border-slate-200/50 space-y-3">
          <h3 className="text-base font-bold text-slate-900">Pertanyaan & Kontak Layanan Hukum</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Jika Anda memiliki pertanyaan lebih lanjut mengenai kepatuhan hukum privasi atau ingin mengajukan penghapusan catatan RFQ, silakan hubungi tim kepatuhan kami melalui email resmi:
          </p>
          <div className="text-xs sm:text-sm font-semibold text-emerald-700">
            ✉️ legal@cvberkatmandiri.com
          </div>
        </div>

      </div>
    </div>
  );
}