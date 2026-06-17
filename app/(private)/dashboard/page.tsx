"use client";

export default function AdminDashboard() {
  const handleDownloadExcel = () => {
    // Membuka endpoint API ekspor di tab baru untuk memicu auto-download file .xlsx
    window.open("/api/reports/export", "_blank");
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Panel Utama CV Berkat Mandiri</h1>
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-sm">
        <h3 className="font-semibold text-slate-800 mb-2">Cetak Dokumen Fisik</h3>
        <p className="text-xs text-slate-500 mb-4">
          Unduh seluruh data performa borongan gaji, tren penjualan karung harian, serta prediksi stok bulan depan langsung dalam bentuk Excel siap cetak.
        </p>
        <button 
          onClick={handleDownloadExcel}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors"
        >
          📥 Unduh & Cetak Laporan Excel
        </button>
      </div>
    </div>
  );
}