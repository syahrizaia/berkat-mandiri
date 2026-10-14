/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Plus, Printer, FileText, Truck, Sparkles, Filter } from "lucide-react";

// Sub-komponen
import SalesMetrics from "./_components/SalesMetrics";
import SalesTable from "./_components/SalesTable";
import DeliveryTable from "./_components/DeliveryTable";
import SaleModalForm from "./_components/SaleModalForm";

export interface SaleWithRelations {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  bagTypeId: string;
  quantity: number;
  pricePerPiece: number;
  totalAmount: number;
  paymentStatus: "LUNAS" | "PENDING";
  bagType: {
    id: string;
    name: string;
    sku: string;
  };
  delivery?: {
    id: string;
    suratJalanNo: string;
    driverName: string | null;
    plateNumber: string | null;
    deliveryAddress: string | null;
    status: "DIPROSES" | "DIKIRIM" | "DITERIMA";
  } | null;
}

export default function SalesPage() {
  const [sales, setSales] = useState<SaleWithRelations[]>([]);
  const [bagTypes, setBagTypes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"sales" | "delivery">("sales");
  const [timeframe, setTimeframe] = useState<"hari" | "pekan" | "bulan" | "tahun">("bulan");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<SaleWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resDashboard = await fetch(`/api/admin/sales?timeframe=${timeframe}`);
      
      if (!resDashboard.ok) {
        throw new Error(`Dashboard API bermasalah (Status: ${resDashboard.status})`);
      }

      const contentTypeStr = resDashboard.headers.get("content-type");
      if (!contentTypeStr || !contentTypeStr.includes("application/json")) {
        throw new Error("Dashboard API tidak mengembalikan JSON!");
      }

      const resData = await resDashboard.json();
      
      if (resData && resData.success && resData.data) {
        if (Array.isArray(resData.data.sales)) {
          setSales(resData.data.sales);
        } else {
          setSales([]);
        }

        if (Array.isArray(resData.data.stockPredictions)) {
          setBagTypes(resData.data.stockPredictions);
        } else {
          setBagTypes([]);
        }
      }
    } catch (error) {
      console.error("Gagal memuat data operasional:", error);
      setSales([]);
      setBagTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeframe]);

  const handleDelete = async (id: string) => {
    if (confirm("Hapus transaksi? Data Surat Jalan & Buku Kas terkait akan ikut terhapus otomatis.")) {
      try {
        await fetch(`/api/admin/sales/${id}`, { method: "DELETE" });
        fetchData();
      } catch (error) {
        alert("Gagal menghapus data");
      }
    }
  };

  const printLaporanBerkala = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head><title>Laporan_Penjualan_${timeframe}</title></head>
        <body onload="window.print(); window.close();" style="font-family:sans-serif; padding:30px;">
          <h2>REKAPITULASI OMZET BRUTO - CV BERKAT MANDIRI</h2>
          <p>Periode Rekap: <strong>${timeframe.toUpperCase()}</strong></p>
          <table border="1" style="width:100%; border-collapse:collapse; margin-top:20px;" cellpadding="8">
            <tr style="background:#f5f5f5">
              <th>Invoice</th><th>Pelanggan</th><th>Tipe Karung</th><th>Volume</th><th>Total Nilai</th>
            </tr>
            ${sales.map(s => `
              <tr>
                <td>${s.invoiceNumber}</td><td>${s.customerName}</td><td>${s.bagType.name}</td>
                <td align="center">${s.quantity}</td><td align="right">Rp ${s.totalAmount.toLocaleString()}</td>
              </tr>
            `).join("")}
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER CONTROL PANEL (Apple Liquid Glass Banner) */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/70 shadow-lg flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Commercial Sales & Logistics Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Penjualan & DO
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Faktur komersial, pencatatan otomatis surat jalan, & pelacakan status kargo (Neon PostgreSQL)
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe Filter Pill */}
          <div className="liquid-glass-pill p-1.5 flex gap-1 shadow-inner border border-white/60">
            {(["hari", "pekan", "bulan", "tahun"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 capitalize ${
                  timeframe === t 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button 
            onClick={printLaporanBerkala} 
            className="inline-flex items-center gap-2 bg-white/70 hover:bg-white text-slate-800 border border-slate-200/80 font-bold py-2.5 px-4 rounded-full text-xs sm:text-sm transition shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-500" /> 
            <span>Cetak Rekap</span>
          </button>

          <button 
            onClick={() => { setEditingSale(null); setIsModalOpen(true); }} 
            className="liquid-sheen inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 px-5 rounded-full text-xs sm:text-sm shadow-md shadow-emerald-600/25 border border-white/25 transition active:scale-95"
          >
            <Plus className="w-4 h-4" /> 
            <span>Tambah Transaksi</span>
          </button>
        </div>
      </div>

      {/* METRIK STATISTIK PENJUALAN */}
      <SalesMetrics sales={sales} />

      {/* SEGMENTED TABS MENU (Apple Glass Tabs) */}
      <div className="liquid-glass-pill p-1.5 inline-flex gap-1.5 border border-white/60 shadow-sm">
        <button 
          onClick={() => setActiveTab("sales")} 
          className={`py-2 px-5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
            activeTab === "sales" 
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" /> 
          <span>Invoice Penjualan</span>
        </button>

        <button 
          onClick={() => setActiveTab("delivery")} 
          className={`py-2 px-5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
            activeTab === "delivery" 
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Truck className="w-4 h-4" /> 
          <span>Logistik Surat Jalan</span>
        </button>
      </div>

      {/* KONDISI LOADING ATAU CONTENT */}
      {isLoading ? (
        <div className="liquid-glass rounded-3xl p-12 text-center border border-white/70 shadow-sm flex flex-col items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sinkronisasi Database Neon.tech...</span>
        </div>
      ) : (
        <>
          {activeTab === "sales" && (
            <SalesTable 
              sales={sales} 
              onEdit={(sale) => { setEditingSale(sale); setIsModalOpen(true); }} 
              onDelete={handleDelete} 
            />
          )}

          {activeTab === "delivery" && (
            <DeliveryTable 
              sales={sales} 
              onManageDriver={(sale) => { setEditingSale(sale); setIsModalOpen(true); }} 
            />
          )}
        </>
      )}

      {/* POP-UP MODAL: FORM PENJUALAN & LOGISTIK */}
      {isModalOpen && (
        <SaleModalForm 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          editingSale={editingSale} 
          bagTypes={bagTypes} 
          refreshData={fetchData} 
        />
      )}

    </div>
  );
}