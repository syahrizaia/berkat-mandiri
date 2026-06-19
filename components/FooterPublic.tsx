import { Briefcase, Globe, Mail, MapPin, Ship } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FooterPublic() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRID UTAMA: Diatur 2 kolom pada mobile, dan otomatis 4 kolom pada desktop (md) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          
          {/* KOLOM 1: BRANDING (col-span-2 membuat ini penuh di mobile, kembali normal di md) */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              CV Berkat Mandiri
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
              Produsen dan eksportir tepercaya untuk solusi pengemasan karung goni alami dan polipropilena (PP Woven) standar industri global.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[11px] font-bold tracking-wider uppercase flex items-center gap-2 text-emerald-400">
                <Globe className="w-4 h-4" /> Export Quality
              </span>
              <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[11px] font-bold tracking-wider uppercase flex items-center gap-2 text-slate-300">
                <Briefcase className="w-4 h-4" /> B2B Supplier
              </span>
            </div>
          </div>

          {/* KOLOM 2: LINI PRODUK (Secara alami mengambil 1 kolom, berdampingan dengan Kolom 3) */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs">Lini Produk</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/product#goni-premium" className="hover:text-emerald-400 transition">Karung Goni</Link>
              </li>
              <li>
                <Link href="/product#woven-pp" className="hover:text-emerald-400 transition">Karung Plastik PP</Link>
              </li>
              <li>
                <Link href="/product#laminated-bopp" className="hover:text-emerald-400 transition">Laminasi BOPP</Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: NAVIGASI PERUSAHAAN (Secara alami mengambil 1 kolom, berdampingan dengan Kolom 2) */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs">Perusahaan</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-emerald-400 transition">Produk</Link>
              </li>
              <li>
                <Link href="/advantages" className="hover:text-emerald-400 transition">Keunggulan</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">Hubungi Kami</Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: INFORMASI LOGISTIK (col-span-2 membuat ini penuh di mobile agar teks alamat tidak terpotong) */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs">Hub Logistik</h4>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <MapPin />
                <span>Kawasan Industri Logistik Prima, Bekasi, Jawa Barat.</span>
              </li>
              <li className="flex items-center gap-2">
                <Ship />
                <span>Port of Loading: Tanjung Priok (IDTPP)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail />
                <span className="text-slate-300 font-medium">export@cvberkatmandiri.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* GARIS PEMBATAS ATAS COPYRIGHT */}
        <hr className="border-slate-800 my-8" />

        {/* BOTTOM BAR: COPYRIGHT & LEGALITAS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <p>&copy; {new Date().getFullYear()} CV Berkat Mandiri. Seluruh hak cipta dilindungi undang-undang.</p>
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-slate-400 transition">Kebijakan Privasi</a>
            <a href="/terms" className="hover:text-slate-400 transition">Syarat & Ketentuan</a>
          </div>
        </div>

      </div>
    </footer>
  );
}