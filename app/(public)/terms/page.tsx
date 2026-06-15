import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Perdagangan | Regulasi B2B Supply Chain",
  description: "Syarat dan ketentuan resmi mengenai tata cara pemesanan grosir, mekanisme pembayaran kargo, regulasi pengapalan ekspor, dan garansi kualitas di CV Berkat Mandiri.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  const lastUpdated = "16 Juni 2026";

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 sm:py-16 text-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
        
        {/* HEADER HALAMAN */}
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Syarat & Ketentuan Perdagangan
          </h1>
          <p className="text-sm text-slate-400">
            Terakhir diperbarui: <span className="font-semibold text-slate-600">{lastUpdated}</span>
          </p>
        </div>

        {/* PENDAHULUAN */}
        <section className="space-y-3">
          <p className="leading-relaxed text-sm sm:text-base">
            Perjanjian ini mengatur hubungan komersial antara <span className="font-bold">CV Berkat Mandiri </span> (selanjutnya disebut &ldquo;Kami&rdquo; atau &ldquo;Perusahaan&rdquo;) sebagai penyuplai produk pengemasan massal, dengan pihak korporasi, badan usaha, atau individu (selanjutnya disebut &ldquo;Pembeli&rdquo; atau &ldquo;Klien&rdquo;) yang mengajukan permintaan harga atau melakukan pemesanan komoditas melalui platform digital kami.
          </p>
          <p className="leading-relaxed text-sm sm:text-base">
            Dengan menyerahkan formulir Request for Quote (RFQ) atau menyetujui Nota Kesepahaman Penjualan (Sales Contract), Anda menyatakan telah membaca, memahami, dan tunduk pada seluruh ketentuan di bawah ini.
          </p>
        </section>

        {/* KETENTUAN PERMINTAAN HARGA (RFQ) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">1.</span> Status Penawaran Harga (Quotation)
          </h2>
          <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
            <li>Data harga yang tercantum atau dikirimkan melalui estimasi awal bersifat tidak mengikat sebelum diterbitkannya dokumen <strong className="text-slate-900">Proforma Invoice (PI)</strong> resmi oleh manajemen kami.</li>
            <li>Setiap lembar penawaran harga resmi memiliki masa berlaku terbatas (umumnya 14 hari kalender) akibat fluktuasi harga bahan baku polimer dunia (untuk karung PP) maupun kuota pasokan serat alam global (untuk karung goni).</li>
          </ul>
        </section>

        {/* MINIMAL ORDER & KUSTOMISASI */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">2.</span> Batas Minimum Pemesanan & Kustomisasi
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Sebagai distributor skala besar (wholesale B2B supplier), kami menerapkan kebijakan <span className="font-bold">Minimum Order Quantity (MOQ)</span> yang bervariasi bergantung pada jenis produk:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base">
            <li><strong className="text-slate-900">Ukuran Standar Pabrik:</strong> Berlaku minimal order standar sesuai dengan katalog produk aktif.</li>
            <li><strong className="text-slate-900">Custom Printing / Laminasi BOPP:</strong> Memerlukan pembuatan silinder cetak (rotogravure cylinder) baru, sehingga MOQ akan disesuaikan dengan kalkulasi panjang minimum produksi gulungan mesin.</li>
          </ul>
        </section>

        {/* MEKANISME PEMBAYARAN */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">3.</span> Syarat Pembayaran (Payment Terms)
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Kecuali disepakati lain secara tertulis dalam kontrak kemitraan jangka panjang, sistem pembayaran yang berlaku adalah:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base">
            <li><strong className="text-slate-900">Uang Muka (Down Payment):</strong> Pembeli wajib melunasi uang muka sebesar persentase yang disepakati dari total nilai kontrak sebelum proses produksi massal atau pemotongan kain dimulai.</li>
            <li><strong className="text-slate-900">Pelunasan:</strong> Sisa pembayaran wajib dilunasi penuh sebelum kargo dimuat ke dalam kontainer (loading) atau saat dokumen manifes pengapalan diterbitkan sesuai kesepakatan transaksi.</li>
            <li>Metode pembayaran resmi hanya dilayani melalui transfer bank ke rekening atas nama berbadan hukum <span className="font-bold">CV Berkat Mandiri</span>.</li>
          </ul>
        </section>

        {/* REGULASI PENGIRIMAN & LOGISTIK */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">4.</span> Regulasi Pengapalan & Penyerahan Barang
          </h2>
          <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base leading-relaxed">
            <li><strong className="text-slate-900">Port of Loading (Pelabuhan Muat):</strong> Seluruh pengiriman jalur laut komersial internasional diproses secara default melalui Pelabuhan Internasional Tanjung Priok (IDTPP), Jakarta, Indonesia.</li>
            <li><strong className="text-slate-900">Incoterms:</strong> Kami melayani sistem perdagangan berbasis Free On Board (FOB), Cost and Freight (CFR), atau Cost, Insurance, and Freight (CIF). Risiko kerusakan barang berpindah dari Penjual ke Pembeli sesuai dengan jenis Incoterms yang disepakati secara tertulis.</li>
            <li>Estimasi waktu fabrikasi dan pengapalan yang diberikan merupakan perkiraan terbaik. Kami tidak bertanggung jawab atas keterlambatan akibat hambatan bea cukai, pemeriksaan karantina pelabuhan, atau antrean jadwal kapal (vessel delay).</li>
          </ul>
        </section>

        {/* JAMINAN KUALITAS & KLAIM KEKURANGAN */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">5.</span> Kontrol Kualitas & Prosedur Klaim
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Kami menjamin setiap produk diproduksi sesuai batasan toleransi gramatur dan ukuran industri manufaktur karung. Jika terdapat kecacatan material mayor atau ketidaksesuaian spesifikasi:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-2 text-sm sm:text-base">
            <li>Pembeli wajib mengajukan sanggahan resmi secara tertulis maksimal dalam waktu <strong className="text-slate-900">7 hari kalender</strong> sejak kargo koli/kontainer sampai di gudang pembongkaran tujuan.</li>
            <li>Klaim wajib disertai bukti autentik berupa video pembongkaran segel kontainer (unboxing video) serta laporan pengecekan sampel fisik yang cacat.</li>
          </ul>
        </section>

        {/* FORCE MAJEURE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">6.</span> Keadaan Memaksa (Force Majeure)
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Kami dibebaskan dari segala bentuk tanggung jawab kegagalan eksekusi produksi atau keterlambatan pengiriman yang disebabkan oleh kejadian di luar kendali manusiawi, termasuk namun tidak terbatas pada: bencana alam (gempa bumi, banjir bandang), konflik bersenjata/perang, embargo perdagangan internasional, pemogokan massal tenaga kerja pelabuhan, pembatasan ketat otoritas pemerintah, maupun kelangkaan bahan baku skala nasional.
          </p>
        </section>

        {/* HUKUM YANG BERLAKU */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">7.</span> Hukum & Penyelesaian Sengketa
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Seluruh struktur materi syarat perdagangan ini diatur, ditafsirkan, dan tunduk sepenuhnya pada asas <span className="font-bold">Hukum Dagang Republik Indonesia</span>. Apabila timbul perselisihan dalam penafsiran klausul transaksi yang tidak dapat diselesaikan melalui musyawarah mufakat, maka penyelesaian akhir akan diajukan melalui yurisdiksi Pengadilan Negeri di wilayah kedudukan hukum CV Berkat Mandiri.
          </p>
        </section>

        {/* CONTACT INFO INTERNAL */}
        <div className="pt-8 border-t border-slate-100 bg-slate-50/50 p-6 rounded-2xl border border-slate-200/50 space-y-3">
          <h3 className="text-base font-bold text-slate-900">Konsultasi Kontrak Kerja Sama Resmi</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Jika perusahaan Anda memerlukan penyesuaian khusus pada klausul Sales Contract, klausul asuransi kargo maritim, atau penerbitan berkas legalitas legalisasi kementerian, silakan hubungi tim legalitas korporasi kami:
          </p>
          <div className="text-xs sm:text-sm font-semibold text-emerald-700">
            ✉️ corporate@cvberkatmandiri.com
          </div>
        </div>

      </div>
    </div>
  );
}