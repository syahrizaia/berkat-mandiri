import { Briefcase, Globe, Mail, MapPin, Ship, ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FooterPublic() {
  return (
    <footer className="w-full pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Glass Footer Container */}
        <div className="liquid-glass-dark rounded-[32px] p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-white/10 shadow-2xl">
          
          {/* Ambient Liquid Glow Accents */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Grid Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 relative z-10">
            
            {/* Column 1: Brand & Identity (Span 4) */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20">
                  <div className="w-full h-full bg-slate-950/80 rounded-[15px] flex items-center justify-center backdrop-blur-md">
                    <Globe className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                    CV Berkat Mandiri
                  </span>
                  <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-semibold">
                    Global Packaging Exporter
                  </span>
                </div>
              </Link>

              <p className="text-slate-200 leading-relaxed text-xs sm:text-sm max-w-sm">
                Produsen dan eksportir tepercaya untuk solusi pengemasan karung goni alami, woven polipropilena (PP), dan karung laminasi berstandar industri internasional.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> ISO & Export Grade
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                  <Briefcase className="w-3.5 h-3.5 text-teal-400" /> B2B Specialist
                </span>
              </div>
            </div>

            {/* Column 2: Lini Produk (Span 3) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Katalog Produk
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/product#goni-premium" className="text-slate-300 hover:text-white flex items-center gap-1.5 transition group">
                    <span className="group-hover:translate-x-1 transition-transform">Karung Goni Alami</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-emerald-400 transition" />
                  </Link>
                </li>
                <li>
                  <Link href="/product#woven-pp" className="text-slate-300 hover:text-white flex items-center gap-1.5 transition group">
                    <span className="group-hover:translate-x-1 transition-transform">Karung Plastik PP Woven</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-emerald-400 transition" />
                  </Link>
                </li>
                <li>
                  <Link href="/product#laminated-bopp" className="text-slate-300 hover:text-white flex items-center gap-1.5 transition group">
                    <span className="group-hover:translate-x-1 transition-transform">Karung Laminasi BOPP</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-emerald-400 transition" />
                  </Link>
                </li>
                <li>
                  <Link href="/advantages" className="text-slate-300 hover:text-white text-xs flex items-center gap-1 transition">
                    <span>Standar Kualitas & QC</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigasi Perusahaan (Span 2) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Perusahaan
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                <li>
                  <Link href="/about" className="hover:text-white transition">Tentang Kami</Link>
                </li>
                <li>
                  <Link href="/product" className="hover:text-white transition">Produk</Link>
                </li>
                <li>
                  <Link href="/advantages" className="hover:text-white transition">Keunggulan</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">Hubungi Kami</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Hub Logistik & Ekspor (Span 3) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Hub Logistik & Ekspor
              </h4>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Kawasan Industri Logistik Prima, Bekasi, Jawa Barat.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Ship className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Port of Loading: Tanjung Priok (IDTPP)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-white font-medium select-all">export@cvberkatmandiri.com</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8 sm:my-10" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-300">
            <p>
              &copy; {new Date().getFullYear()} <Link href="/dashboard" className="text-white hover:text-emerald-300 transition font-medium">CV Berkat Mandiri</Link>. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white transition">Kebijakan Privasi</Link>
              <Link href="/terms" className="hover:text-white transition">Syarat & Ketentuan</Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}