"use client";

import { Printer, Download, Sparkles } from "lucide-react";

export default function ExportPDFButton() {
  const handleExport = () => {
    // Memicu dialog cetak/simpan PDF bawaan browser
    window.print();
  };

  return (
    <button 
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all print:hidden"
    >
      <Printer className="w-4 h-4" />
      <span>Cetak / Ekspor PDF</span>
    </button>
  );
}