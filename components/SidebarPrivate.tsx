/* eslint-disable react-hooks/static-components */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Package, Users, FileText, 
  LogOut, Menu, X, Building2, Clock
} from "lucide-react";

export default function SidebarPrivate() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // State untuk menyimpan waktu dan tanggal agar aman dari hydration error
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  // Efek untuk menjalankan jam digital secara real-time setiap 1 detik
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
          month: "long", 
          year: "numeric" 
        })
      );
    };

    updateClock(); // Jalankan sekali di awal render client
    const intervalId = setInterval(updateClock, 1000); // Update setiap detik

    return () => clearInterval(intervalId); // Bersihkan memori interval saat unmount
  }, []);

  const navLinks = [
    { name: "Dasbor", href: "/dashboard", icon: LayoutDashboard },
    { name: "Penjualan", href: "/sales", icon: FileText },
    { name: "Stok Barang", href: "/inventory", icon: Package },
    { name: "Karyawan", href: "/employees", icon: Users },
    { name: "Laporan", href: "/reports", icon: FileText },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Building2 className="w-8 h-8 text-emerald-600" />
        <span className="ml-2 font-bold text-lg text-slate-900">CV Berkat Mandiri</span>
      </div>

      {/* Links */}
      <div className="flex-1 px-4 py-6 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Bagian Bawah Sidebar (Waktu & Logout) */}
      <div className="border-t border-slate-100 p-4 space-y-3">
        {/* Tombol Logout */}
        <Link href="/" className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
          <LogOut className="w-5 h-5" />
          Keluar
        </Link>

        {/* Widget Waktu Real-Time Sistem */}
        {timeString && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-emerald-600" /> Waktu Sistem
            </span>
            <span className="text-base font-mono font-bold text-slate-800 tracking-tight">
              {timeString}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {dateString}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Hidden on mobile) */}
      <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header (Visible only on mobile) */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
            <Building2 className="w-7 h-7 text-emerald-600" />
            <span className="font-bold text-lg text-slate-900">CV Berkat Mandiri</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}