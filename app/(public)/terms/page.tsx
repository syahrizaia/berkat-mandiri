import type { Metadata } from "next";
import React from "react";
import { FileText, ArrowLeft, Scale, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Perdagangan | Regulasi B2B Supply Chain",
  description: "Syarat dan ketentuan resmi mengenai tata cara pemesanan grosir, mekanisme pembayaran kargo, regulasi pengapalan ekspor, dan garansi kualitas di CV Berkat Mandiri.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
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
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>Regulasi Perdagangan B2B & Ekspor</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Syarat & Ketentuan Perdagangan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Terakhir diperbarui: <span className="font-semibold text-slate-700">{lastUpdated}</span>
            </p>
          </div>

          {/* Pendahuluan */}
          <section className="space-y-3">
            <p className="leading-relaxed text-sm sm:text-base">
              Perjanjian ini mengatur hubungan komersial antara <strong className="text-slate-900">CV Berkat Mandiri</strong> (selanjutnya disebut &ldquo;Kami&rdquo; atau &ldquo;Perusahaan&rdquo;) sebagai penyuplai produk pengemasan massal, dengan pihak korporasi, badan usaha, atau individu (selanjutnya disebut &ldquo;Pembeli&rdquo; atau &ldquo;Klien&rdquo;) yang mengajukan permintaan harga atau melakukan pemesanan komoditas melalui platform digital kami.
            </p>
            <p className="leading-relaxed text-sm sm:text-base">
              Dengan menyerahkan formulir Request for Quote (RFQ) atau menyetujui Nota Kesepahaman Penjualan (Sales Contract), Anda menyatakan telah membaca, memahami, dan tunduk pada seluruh ketentuan di bawah ini.
            </p>
          </section>

          {/* 1. Status Penawaran Harga */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
              <span>Status Penawaran Harga (Quotation)</span>
            </h2>
            <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
              <li>Data harga yang tercantum atau dikirimkan melalui estimasi awal bersifat tidak mengikat sebelum diterbitkannya dokumen <strong className="text-slate-900">Proforma Invoice (PI)</strong> resmi oleh manajemen kami.</li>
              <li>Setiap lembar penawaran harga resmi memiliki masa berlaku terbatas (umumnya 14 hari kalender) akibat fluktuasi harga bahan baku polimer dunia (untuk karung PP) maupun kuota pasokan serat alam global (untuk karung goni).</li>
            </ul>
          </section>

          {/* 2. Batas Minimum Pemesanan & Kustomisasi */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
              <span>Batas Minimum Pemesanan & Kustomisasi</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Sebagai distributor skala besar (wholesale B2B supplier), kami menerapkan kebijakan <strong className="text-slate-900">Minimum Order Quantity (MOQ)</strong> yang bervariasi bergantung pada jenis produk:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
              <li><strong className="text-slate-900">Ukuran Standar Pabrik:</strong> Berlaku minimal order standar sesuai dengan katalog produk aktif.</li>
              <li><strong className="text-slate-900">Custom Printing / Laminasi BOPP:</strong> Memerlukan pembuatan silinder rotogravure baru, sehingga MOQ akan disesuaikan dengan kalkulasi panjang minimum produksi gulungan mesin.</li>
            </ul>
          </section>

          {/* 3. Syarat Pembayaran */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
              <span>Syarat Pembayaran (Payment Terms)</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Kecuali disepakati lain secara tertulis dalam kontrak kemitraan, sistem pembayaran yang berlaku adalah:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
              <li><strong className="text-slate-900">Uang Muka (Down Payment):</strong> Pembeli wajib melunasi uang muka sebesar persentase yang disepakati dari total nilai kontrak sebelum proses produksi massal atau pemotongan kain dimulai.</li>
              <li><strong className="text-slate-900">Pelunasan:</strong> Sisa pembayaran wajib dilunasi penuh sebelum kargo dimuat ke dalam kontainer (loading) atau saat dokumen manifes pengapalan diterbitkan.</li>
              <li>Metode pembayaran resmi hanya dilayani melalui transfer bank ke rekening atas nama berbadan hukum <strong className="text-slate-900">CV Berkat Mandiri</strong>.</li>
            </ul>
          </section>

          {/* 4. Regulasi Pengapalan */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
              <span>Regulasi Pengapalan & Penyerahan Barang</span>
            </h2>
            <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
              <li><strong className="text-slate-900">Port of Loading:</strong> Seluruh pengiriman jalur laut komersial internasional diproses secara default melalui Pelabuhan Internasional Tanjung Priok (IDTPP), Jakarta, Indonesia.</li>
              <li><strong className="text-slate-900">Incoterms:</strong> Kami melayani sistem perdagangan berbasis Free On Board (FOB), Cost and Freight (CFR), atau Cost, Insurance, and Freight (CIF). Risiko kerusakan barang berpindah sesuai dengan Incoterms yang disepakati.</li>
              <li>Estimasi waktu fabrikasi dan pengapalan yang diberikan merupakan perkiraan terbaik. Kami tidak bertanggung jawab atas keterlambatan akibat hambatan bea cukai pelabuhan tujuan luar kendali atau antrean kapal.</li>
            </ul>
          </section>

          {/* 5. Kontrol Kualitas & Prosedur Klaim */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">5</span>
              <span>Kontrol Kualitas & Prosedur Klaim</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Kami menjamin setiap produk diproduksi sesuai batasan toleransi gramatur dan ukuran industri manufaktur karung. Jika terdapat kecacatan material mayor atau ketidaksesuaian spesifikasi:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
              <li>Pembeli wajib mengajukan sanggahan resmi secara tertulis maksimal dalam waktu <strong className="text-slate-900">7 hari kalender</strong> sejak kargo sampai di gudang pembongkaran tujuan.</li>
              <li>Klaim wajib disertai bukti autentik berupa video pembongkaran segel kontainer (unboxing video) serta laporan pengecekan sampel fisik yang cacat.</li>
            </ul>
          </section>

          {/* 6. Force Majeure */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">6</span>
              <span>Keadaan Memaksa (Force Majeure)</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Kami dibebaskan dari segala bentuk tanggung jawab kegagalan eksekusi produksi atau keterlambatan pengiriman yang disebabkan oleh kejadian di luar kendali manusiawi, termasuk: bencana alam, konflik bersenjata, embargo perdagangan internasional, pemogokan massal pelabuhan, atau kelangkaan bahan baku skala nasional.
            </p>
          </section>

          {/* 7. Hukum yang Berlaku */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-xs font-bold">7</span>
              <span>Hukum & Penyelesaian Sengketa</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Seluruh struktur materi syarat perdagangan ini diatur, ditafsirkan, dan tunduk sepenuhnya pada asas <strong className="text-slate-900">Hukum Dagang Republik Indonesia</strong>. Penyelesaian perselisihan diutamakan melalui musyawarah mufakat atau diajukan melalui yurisdiksi Pengadilan Negeri di wilayah kedudukan hukum CV Berkat Mandiri.
            </p>
          </section>

          {/* Contact Legal Box */}
          <div className="liquid-glass-subtle p-6 rounded-2xl border border-white/60 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Konsultasi Kontrak Kerja Sama Resmi</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jika perusahaan Anda memerlukan penyesuaian khusus pada klausul Sales Contract atau asuransi kargo maritim, silakan hubungi tim legalitas korporasi kami:
            </p>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 select-all">
              corporate@cvberkatmandiri.com
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}