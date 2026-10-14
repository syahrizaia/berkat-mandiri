/* eslint-disable react-hooks/static-components */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Package, Users, FileText, 
  LogOut, Menu, X, Building2, Clock, Sparkles, ChevronRight
} from "lucide-react";

export default function SidebarPrivate() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // State waktu real-time
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("id-ID", { 
          hour: "2-digit", 
          minute: "2-digit", 
          second: "2-digit",
          hour12: false 
        }) + " WIB"
      );

      setDateString(
        now.toLocaleDateString("id-ID", { 
          weekday: "long", 
          day: "numeric", 
          month: "short", 
          year: "numeric" 
        })
      );
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const navLinks = [
    { name: "Dasbor Utama", href: "/dashboard", icon: LayoutDashboard },
    { name: "Penjualan & DO", href: "/sales", icon: FileText },
    { name: "Manajemen Stok", href: "/inventory", icon: Package },
    { name: "Data Karyawan", href: "/employees", icon: Users },
    { name: "Laporan Keuangan", href: "/reports", icon: FileText },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full liquid-glass border-r border-white/60 relative overflow-hidden backdrop-blur-2xl">
      
      {/* Ambient glow accent inside sidebar */}
      <div className="absolute top-0 -left-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Header / Brand Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-200/50 relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-400 p-[1px] shadow-md shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950/85 rounded-[15px] flex items-center justify-center backdrop-blur-md">
              <Building2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              CV Berkat Mandiri
            </span>
            <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-emerald-600" /> Enterprise Hub
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-1.5 relative z-10 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
          Navigasi Operasional
        </div>

        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 group ${
                isActive 
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25 border border-white/30" 
                  : "text-slate-800 hover:text-slate-950 hover:bg-white/80 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                  isActive ? "text-emerald-100" : "text-slate-600 group-hover:text-emerald-600 group-hover:scale-110"
                }`} />
                <span>{link.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="w-4 h-4 text-emerald-100" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Bagian Bawah Sidebar (Waktu & Logout) */}
      <div className="border-t border-slate-200/50 p-4 space-y-3 relative z-10">
        
        {/* Widget Waktu Real-Time Sistem (Apple Glass Card) */}
        {timeString && (
          <div className="liquid-glass-subtle rounded-2xl p-3.5 border border-white/60 shadow-inner flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" /> Waktu Server Real-time
            </span>
            <span className="text-base font-mono font-bold text-slate-950 tracking-tight mt-0.5">
              {timeString}
            </span>
            <span className="text-[11px] text-slate-700 font-semibold">
              {dateString}
            </span>
          </div>
        )}

        {/* Tombol Logout / Keluar ke Beranda */}
        <Link 
          href="/" 
          className="flex w-full items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200/50 transition-all hover:shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4" />
            <span>Keluar ke Beranda</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-rose-400">Public</span>
        </Link>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden md:block w-72 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 liquid-glass-pill my-2 mx-3 px-4 h-14 flex items-center justify-between border border-white/80 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm text-slate-900">CV Berkat Mandiri</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100/80 transition"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 md:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}