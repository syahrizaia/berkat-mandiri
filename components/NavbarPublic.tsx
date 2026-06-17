"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function NavbarPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
              CV Berkat Mandiri
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">Beranda</Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">Tentang Kami</Link>
            <Link href="/product" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">Produk</Link>
            <Link href="/advantages" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">Keunggulan</Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition">
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Animasi Halus Tanpa Interupsi DOM */}
      <div 
        className={`md:hidden bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-lg ${
          isMenuOpen 
            ? "max-h-[320px] opacity-100 border-b border-slate-200" 
            : "max-h-0 opacity-0 border-b-0 pointer-events-none"
        }`}
      >
        {/* Inner Wrapper untuk mengisolasi padding agar transisi height tidak memantul */}
        <div className="px-4 pt-2 pb-6 space-y-1">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition">Beranda</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition">Tentang Kami</Link>
          <Link href="/product" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition">Produk</Link>
          <Link href="/advantages" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition">Keunggulan</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-3 py-2.5 rounded-md text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 mt-4 shadow-sm transition">Hubungi Kami</Link>
        </div>
      </div>
    </nav>
  );
}