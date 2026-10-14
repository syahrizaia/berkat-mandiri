/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Download, X, Sparkles } from "lucide-react";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 z-50 md:hidden block hardware-accel">
      <div className="liquid-glass-dark text-white p-3.5 sm:p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-white/20 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 rounded-2xl text-white shadow-md shadow-emerald-500/25 shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs sm:text-sm font-bold text-white">Akses Cepat Web App</p>
              <Sparkles className="w-3 h-3 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-300">Install aplikasi CV Berkat Mandiri</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="liquid-sheen bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-md border border-white/20"
          >
            Install
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            aria-label="Tutup Banner Install"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}