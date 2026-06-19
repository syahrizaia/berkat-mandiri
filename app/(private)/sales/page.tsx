/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Plus, Printer, FileText, Truck } from "lucide-react";

// Impor Sub-Komponen Terpisah
import SalesMetrics from "./_components/SalesMetrics";
import SalesTable from "./_components/SalesTable";
import DeliveryTable from "./_components/DeliveryTable";
import SaleModalForm from "./_components/SaleModalForm";

// Type Definition Sesuai Relasi Prisma (Neon.tech)
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
  const [bagTypes, setBagTypes] = useState<any[]>([]); // Untuk Opsi Select Dropdown
  const [activeTab, setActiveTab] = useState<"sales" | "delivery">("sales");
  const [timeframe, setTimeframe] = useState<"hari" | "pekan" | "bulan" | "tahun">("bulan");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<SaleWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. FETCH DATA DARI NEON.TECH (VIA API NEXT.JS)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Dashboard Data
      const resDashboard = await fetch(`/api/admin/dashboard?timeframe=${timeframe}`);
      
      if (!resDashboard.ok) {
        throw new Error(`Dashboard API bermasalah (Status: ${resDashboard.status})`);
      }

      // Pastikan response berupa JSON sebelum di-parse
      const contentTypeStr = resDashboard.headers.get("content-type");
      if (!contentTypeStr || !contentTypeStr.includes("application/json")) {
        throw new Error("Dashboard API tidak mengembalikan JSON!");
      }

      const resData = await resDashboard.json();
      
      // Ambil array sales secara aman dari payload dashboard
      if (resData && resData.success && resData.data && Array.isArray(resData.data.sales)) {
        setSales(resData.data.sales);
      } else {
        console.warn("Format data sales di dalam dashboard tidak sesuai.");
        setSales([]);
      }

        if (resData && resData.success && resData.data) {
            
            // A. Set State Sales
            if (Array.isArray(resData.data.sales)) {
            setSales(resData.data.sales);
            } else {
            setSales([]);
            }

            // B. Set State Tipe Karung (Diambil dari stockPredictions)
            if (Array.isArray(resData.data.stockPredictions)) {
            setBagTypes(resData.data.stockPredictions);
            } else {
            console.warn("Properti stockPredictions tidak ditemukan atau bukan array.");
            setBagTypes([]);
            }

        }
      
    } catch (error) {
      console.error("Gagal memuat data operasional:", error);
      // Jika error, paksa state kembali ke array kosong agar UI tidak crash (.reduce tetap jalan)
      setSales([]);
      setBagTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeframe]);

  // 2. HANDLER HAPUS DATA (CASCADE DI DB NEON.TECH)
  const handleDelete = async (id: string) => {
    if (confirm("Hapus transaksi? Data Surat Jalan & Buku Kas terkait akan ikut terhapus otomatis.")) {
      try {
        await fetch(`/api/admin/dashboard/${id}`, { method: "DELETE" });
        fetchData(); // Refresh data dari server
      } catch (error) {
        alert("Gagal menghapus data");
      }
    }
  };

  // 3. FITUR UTILITY: CETAK REKAP BRUTO BERKALA
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
    <div className="space-y-6 p-4 md:p-6 bg-slate-50 min-h-screen">
      
      {/* HEADER CONTROL PANEL */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Penjualan & Logistik</h1>
          <p className="text-sm text-slate-500">Koneksi data live Neon.tech PostgreSQL.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm text-xs font-bold">
            {(["hari", "pekan", "bulan", "tahun"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  timeframe === t ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button onClick={printLaporanBerkala} className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm">
            <Printer className="w-4 h-4 text-slate-500" /> Cetak Rekap
          </button>

          <button onClick={() => { setEditingSale(null); setIsModalOpen(true); }} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm">
            <Plus className="w-4 h-4" /> Tambah Transaksi
          </button>
        </div>
      </div>

      {/* COMPONENT 1: METRIK STATISTIK */}
      <SalesMetrics sales={sales} />

      {/* TABS MENU */}
      <div className="flex border-b border-slate-200 gap-2">
        <button onClick={() => setActiveTab("sales")} className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${activeTab === "sales" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
          <FileText className="w-4 h-4" /> Invoice Penjualan
        </button>
        <button onClick={() => setActiveTab("delivery")} className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${activeTab === "delivery" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
          <Truck className="w-4 h-4" /> Logistik Surat Jalan
        </button>
      </div>

      {/* KONDISI LOADING */}
      {isLoading ? (
        <div className="text-center py-10 font-medium text-slate-500">Menghubungkan ke Neon Database...</div>
      ) : (
        <>
          {/* COMPONENT 2: TABEL INVOICE PENJUALAN */}
          {activeTab === "sales" && (
            <SalesTable sales={sales} onEdit={(sale) => { setEditingSale(sale); setIsModalOpen(true); }} onDelete={handleDelete} />
          )}

          {/* COMPONENT 3: TABEL SURAT JALAN / DELIVERY */}
          {activeTab === "delivery" && (
            <DeliveryTable sales={sales} onManageDriver={(sale) => { setEditingSale(sale); setIsModalOpen(true); }} />
          )}
        </>
      )}

      {/* COMPONENT 4: MODAL FORM PENJUALAN & LOGISTIK */}
      {isModalOpen && (
        <SaleModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingSale={editingSale} bagTypes={bagTypes} refreshData={fetchData} />
      )}
    </div>
  );
}