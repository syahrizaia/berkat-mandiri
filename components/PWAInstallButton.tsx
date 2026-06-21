/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Cegah browser menampilkan prompt bawaan secara otomatis
      e.preventDefault();
      // Simpan event agar bisa dipicu nanti via tombol
      setDeferredPrompt(e);
      // Munculkan tombol hanya jika belum terinstal
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Jika aplikasi dibuka sudah dalam mode PWA (Standalone), sembunyikan tombol
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Munculkan prompt instalasi bawaan browser (Android/Chrome)
    deferredPrompt.prompt();

    // Tunggu jawaban dari user (Apakah mereka klik 'Install' atau 'Cancel')
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  // Jika tidak memenuhi syarat install atau di-dismiss, jangan render apapun
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden block">
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-slate-800 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg text-white">
            <Download size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Gunakan Aplikasi Lebih Cepat</p>
            <p className="text-xs text-slate-400">Install PWA CV Berkat Mandiri</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Install
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}