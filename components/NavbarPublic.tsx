"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export default function NavbarPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/product", label: "Produk" },
    { href: "/advantages", label: "Keunggulan" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full pt-3 px-3 sm:px-6 lg:px-8 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <nav 
          aria-label="Navigasi Utama"
          className={`liquid-glass-pill px-4 sm:px-6 transition-all duration-500 hardware-accel ${
            scrolled 
              ? "py-2.5 shadow-xl shadow-slate-900/5 bg-white/80" 
              : "py-3.5 bg-white/70"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo Brand with Apple-style Jewel Icon */}
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-400 p-[1px] shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-950/80 rounded-[11px] flex items-center justify-center backdrop-blur-md">
                  <Globe className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-800 bg-clip-text text-transparent group-hover:opacity-90 transition">
                  CV Berkat Mandiri
                </span>
                <span className="text-[9px] font-semibold tracking-widest text-emerald-600 uppercase hidden sm:block">
                  Global Packaging Exporter
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 relative ${
                      isActive 
                        ? "text-emerald-700 font-semibold bg-emerald-500/15 shadow-inner" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/5"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action: CTA Pill with Liquid Sheen */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="liquid-sheen relative inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/25 border border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Hubungi Kami</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-100" />
              </Link>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Panel: Apple Liquid Glass Sheet */}
        <div 
          className={`md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            isMenuOpen 
              ? "max-h-[380px] opacity-100 mt-2.5 translate-y-0" 
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="liquid-glass rounded-3xl p-4 shadow-2xl border border-white/60 space-y-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-800 font-bold"
                      : "text-slate-700 hover:bg-slate-100/70"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                </Link>
              );
            })}
            
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="liquid-sheen w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-600/30 border border-white/20 transition active:scale-95"
              >
                <span>Hubungi Kami (RFQ)</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}