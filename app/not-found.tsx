"use client"

import Link from "next/link";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="text-center space-y-6 max-w-lg">
        {/* Ikon Peringatan */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 border border-amber-100 shadow-sm">
          <AlertTriangle className="w-10 h-10 text-amber-600" />
        </div>

        {/* Judul & Deskripsi */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
          <h2 className="text-xl font-semibold text-slate-800">Halaman Tidak Ditemukan</h2>
          <p className="text-slate-500 leading-relaxed">
            Maaf, halaman yang Anda cari tidak tersedia atau mungkin sudah dipindahkan. 
            Pastikan URL yang Anda masukkan sudah benar.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali Sebelumnya
          </button>
        </div>
      </div>
      
      {/* Footer Ringan */}
      <p className="absolute bottom-6 text-slate-400 text-xs">
        &copy; {new Date().getFullYear()} CV Berkat Mandiri
      </p>
    </div>
  );
}