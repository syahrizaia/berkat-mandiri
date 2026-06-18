"use client";

import { Download } from "lucide-react";

export default function ExportPDFButton() {
  const handleExport = () => {
    // Memicu dialog cetak/simpan PDF bawaan browser
    window.print();
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition print:hidden print:shadow-none break-inside-avoid"
    >
      <Download className="w-4 h-4" /> Export PDF
    </button>
  );
}