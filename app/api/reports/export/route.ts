/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    // 1. AMBIL DATA LOGS (Disesuaikan dengan relasi & field baru)
    const logs = await prisma.workLog.findMany({
      include: { 
        employee: true, 
        bagType: true 
      }
    });

    const salarySummary: Record<string, { nama: string; totalKarung: number; totalGaji: number }> = {};
    
    logs.forEach((log: any) => {
      if (!salarySummary[log.employee.name]) {
        salarySummary[log.employee.name] = { 
          nama: log.employee.name, 
          totalKarung: 0, 
          totalGaji: 0 
        };
      }

      // Penyesuaian Neon.tech: Hitung tarif berdasarkan tipe tugas (TaskType)
      let wagePerPiece = log.bagType.wagePerPiece; // Fallback jika tidak ada yang cocok
      
      switch (log.task) {
        case "MENCUCI":
          wagePerPiece = log.bagType.wageMencuci;
          break;
        case "MELIPAT":
          wagePerPiece = log.bagType.wageMelipat;
          break;
        case "MENJAHIT":
          wagePerPiece = log.bagType.wageMenjahit;
          break;
      }

      // Akumulasikan total produksi lembar dan total gaji berdasarkan jenis tugas
      salarySummary[log.employee.name].totalKarung += log.quantity;
      salarySummary[log.employee.name].totalGaji += log.quantity * wagePerPiece;
    });

    // 2. ANALISIS TREN & REKOMENDASI RESTOCK (Disesuaikan dengan model Transaction baru)
    const bags = await prisma.bagType.findMany({
      include: { 
        // Mengambil data sales dari model Transaction yang bertipe INCOME
        sales: {
          where: {
            type: "INCOME"
          }
        } 
      }
    });

    const inventoryReport = bags.map((bag: any) => {
      const totalTerjual = bag.sales.reduce((sum: number, s: any) => sum + s.quantity, 0);
      
      // Rumus Safety Stock & Restock
      const avgMonthlySales = Math.ceil(totalTerjual / 3) || 100; 
      const safetyStock = Math.ceil(avgMonthlySales * 1.5);
      const saranRestock = safetyStock > bag.currentStock ? (safetyStock - bag.currentStock) : 0;

      return {
        "SKU Karung": bag.sku,
        "Nama Karung": bag.name,
        "Stok Saat Ini": bag.currentStock,
        "Total Terjual (3 Bln)": totalTerjual,
        "Saran Restock Bulan Depan": saranRestock === 0 ? "Stok Aman" : `${saranRestock} Lembar`
      };
    });

    // 3. PROSES PEMBUATAN FILE EXCEL
    const workbook = XLSX.utils.book_new();

    // Lembar 1: Gaji Karyawan
    const employeeSheetData = Object.values(salarySummary).map((s: any) => ({
      "Nama Karyawan": s.nama,
      "Total Produksi (Lembar)": s.totalKarung,
      "Total Gaji Bersih (Rp)": s.totalGaji
    }));
    const worksheet1 = XLSX.utils.json_to_sheet(employeeSheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Gaji Karyawan");

    // Lembar 2: Inventori & Rekomendasi Restock
    const worksheet2 = XLSX.utils.json_to_sheet(inventoryReport);
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Analisis Stok & Tren");

    // Generate buffer data Excel
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Kirim balik sebagai file unduhan langsung ke browser
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=Laporan_CV_Berkat_Mandiri.xlsx",
      },
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}