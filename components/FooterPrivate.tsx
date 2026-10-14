import React from 'react';
import Link from 'next/link';

export default function FooterPrivate() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-slate-200/50 bg-white/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        
        {/* Sisi Kiri: Copyright */}
        <div className="text-slate-700 font-medium flex items-center gap-2">
          <span className="font-bold text-slate-950">CV Berkat Mandiri</span> 
          <span>&copy; {currentYear}. Enterprise Resource Portal.</span>
        </div>

        {/* Sisi Kanan: Tautan Internal & Status */}
        <div className="flex items-center gap-5 text-slate-800 font-bold">
          <Link href="/help" className="hover:text-emerald-700 transition-colors">
            Pusat Bantuan
          </Link>
          <Link href="/docs" className="hover:text-emerald-700 transition-colors">
            Dokumentasi Sistem
          </Link>
          <span className="text-slate-500 font-bold">|</span>
          <span className="font-mono text-[10px] bg-emerald-500/15 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
            v2.4-visionOS
          </span>
        </div>

      </div>
    </footer>
  );
}