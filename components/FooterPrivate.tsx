import React from 'react';

export default function FooterPrivate() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Sisi Kiri: Copyright */}
          <div className="text-slate-500 text-sm">
            <span className="font-semibold text-slate-700">CV Berkat Mandiri</span> 
            <span className="hidden md:inline"> &copy; {currentYear}. All rights reserved.</span>
            <span className="md:hidden"> © {currentYear}</span>
          </div>

          {/* Sisi Kanan: Tautan Internal & Status */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="/help" className="hover:text-emerald-600 transition-colors">
              Pusat Bantuan
            </a>
            <a href="/docs" className="hover:text-emerald-600 transition-colors">
              Dokumentasi
            </a>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-300">|</span>
              <span className="font-mono text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                v2.0.4-stable
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}