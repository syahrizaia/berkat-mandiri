/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // 0. AMBIL PARAMETER TIMEFRAME DARI URL
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get("timeframe") || "bulan"; // fallback ke 'bulan'

    const sekarang = new Date();
    const tahunSekarang = sekarang.getFullYear();
    const bulanSekarangRaw = sekarang.getMonth();

    // Batas Waktu Mutlak untuk Filter Timeframe
    const awalHariIni = new Date(sekarang);
    awalHariIni.setHours(0, 0, 0, 0);

    const dapatkanAwalPekan = (d: Date) => {
      const tanggalData = new Date(d);
      const hariIndex = tanggalData.getDay();
      const selisih = tanggalData.getDate() - hariIndex + (hariIndex === 0 ? -6 : 1);
      return new Date(tanggalData.setDate(selisih));
    };

    const awalPekanIni = dapatkanAwalPekan(sekarang);
    awalPekanIni.setHours(0, 0, 0, 0);
    const akhirPekanIni = new Date(awalPekanIni.getTime() + 7 * 24 * 60 * 60 * 1000);

    const awalBulanIni = new Date(tahunSekarang, bulanSekarangRaw, 1);
    const awalTahunIni = new Date(tahunSekarang, 0, 1);

    // Tentukan batasan waktu berdasarkan parameter timeframe yang dikirim frontend
    let batasWaktuSales = awalBulanIni;
    if (timeframe === "hari") batasWaktuSales = awalHariIni;
    else if (timeframe === "pekan") batasWaktuSales = awalPekanIni;
    else if (timeframe === "tahun") batasWaktuSales = awalTahunIni;

    // ==========================================
    // 1. AMBIL DATA STOK & PREDIKSI (PYTHON ML INTEGRATION)
    // ==========================================
    const bagTypes = await prisma.bagType.findMany();

    let mlPredictions: any[] = [];
    try {
      const pythonServiceUrl = process.env.PYTHON_ML_SERVICE_URL || "http://localhost:8000/predict";
      const res = await fetch(pythonServiceUrl, { cache: "no-store", signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        mlPredictions = await res.json();
      }
    } catch (err) {
      console.error("Gagal terhubung ke service Python ML, beralih ke fallback otomatis.", err);
    }

    const stockPredictions = bagTypes.map((bag) => {
      const mlMatch = mlPredictions.find((pred) => pred.bagTypeId === bag.id);
      const predictedNextMonth = mlMatch 
        ? mlMatch.predictedNextMonth 
        : Math.ceil(bag.currentStock * 1.2 || 150);

      return {
        id: bag.id,
        sku: bag.sku,
        name: bag.name,
        currentStock: bag.currentStock,
        predictedNextMonth: predictedNextMonth,
      };
    });

    // ==========================================
    // 2. HITUNG GAJI BORONGAN MULTI-TIMEFRAME
    // ==========================================
    const employees = await prisma.employee.findMany({
      include: {
        workLogs: {
          where: { date: { gte: new Date("2024-01-01") } },
          include: { bagType: true }
        },
      },
    });

    const salaryPerformance = {
      hari: [] as any[],
      pekan: [] as any[],
      bulan: [] as any[],
      tahun: [] as any[],
    };

    employees.forEach((emp) => {
      let bagsHari = 0, salaryHari = 0;
      let bagsPekan = 0, salaryPekan = 0;
      let bagsBulan = 0, salaryBulan = 0;
      let bagsTahun = 0, salaryTahun = 0;

      const logs = emp.workLogs || [];
      logs.forEach((log: any) => {
        if (!log || !log.bagType) return;

        const task = (log.task || "MENCUCI").toUpperCase(); 
        const qty = log.quantity || 0;
        const bagType = log.bagType || {};

        const tarifMencuci = bagType.wageMencuci ?? 0;
        const tarifMelipat = bagType.wageMelipat ?? 0;
        const tarifMenjahit = bagType.wageMenjahit ?? 0;
        const tarifBase = bagType.wagePerPiece ?? 0;

        let tarifPekerjaan = 0;
        if (task === "MENCUCI") tarifPekerjaan = tarifMencuci > 0 ? tarifMencuci : tarifBase;
        else if (task === "MELIPAT") tarifPekerjaan = tarifMelipat > 0 ? tarifMelipat : tarifBase;
        else if (task === "MENJAHIT") tarifPekerjaan = tarifMenjahit > 0 ? tarifMenjahit : tarifBase;
        else tarifPekerjaan = tarifBase;

        const logSalary = qty * tarifPekerjaan;
        const logDate = new Date(log.date);

        if (logDate >= awalHariIni) {
          bagsHari += qty;
          salaryHari += logSalary;
        }
        if (logDate >= awalPekanIni && logDate < akhirPekanIni) {
          bagsPekan += qty;
          salaryPekan += logSalary;
        }
        if (logDate >= awalBulanIni) {
          bagsBulan += qty;
          salaryBulan += logSalary;
        }
        if (logDate >= awalTahunIni) {
          bagsTahun += qty;
          salaryTahun += logSalary;
        }
      });

      salaryPerformance.hari.push({ id: emp.id, name: emp.name, totalBags: bagsHari, totalSalary: salaryHari });
      salaryPerformance.pekan.push({ id: emp.id, name: emp.name, totalBags: bagsPekan, totalSalary: salaryPekan });
      salaryPerformance.bulan.push({ id: emp.id, name: emp.name, totalBags: bagsBulan, totalSalary: salaryBulan });
      salaryPerformance.tahun.push({ id: emp.id, name: emp.name, totalBags: bagsTahun, totalSalary: salaryTahun });
    });

    // ==========================================
    // 3. AGREGASI TREN RIIL VOLUME PRODUKSI
    // ==========================================
    const allWorkLogs = await prisma.workLog.findMany({
      where: { date: { gte: new Date("2024-01-01") } },
    });

    const hariLabels = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    const bulanLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    const trends = {
      hari: hariLabels.map((l) => ({ label: l, total: 0 })),
      pekan: [
        { label: "W1", total: 0 }, { label: "W2", total: 0 },
        { label: "W3", total: 0 }, { label: "W4", total: 0 },
      ],
      bulan: bulanLabels.map((l) => ({ label: l, total: 0 })),
      tahun: [
        { label: "2024", total: 0 }, { label: "2025", total: 0 }, { label: "2026", total: 0 },
      ],
    };

    allWorkLogs.forEach((log) => {
      const logDate = new Date(log.date);
      const logYear = logDate.getFullYear();
      const logMonth = logDate.getMonth();
      const qty = log.quantity || 0;

      const targetTahun = trends.tahun.find((t) => t.label === logYear.toString());
      if (targetTahun) targetTahun.total += qty;

      if (logYear === tahunSekarang) {
        trends.bulan[logMonth].total += qty;
      }

      if (logYear === tahunSekarang && logMonth === bulanSekarangRaw) {
        const tanggalHari = logDate.getDate();
        if (tanggalHari <= 7) trends.pekan[0].total += qty;
        else if (tanggalHari <= 14) trends.pekan[1].total += qty;
        else if (tanggalHari <= 21) trends.pekan[2].total += qty;
        else trends.pekan[3].total += qty;
      }

      if (logDate >= awalPekanIni && logDate < akhirPekanIni) {
        let dayIdx = logDate.getDay();
        dayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
        if (trends.hari[dayIdx]) trends.hari[dayIdx].total += qty;
      }
    });

    // ==========================================
    // 4. AGREGASI BUKU KAS (FINANCIALS)
    // ==========================================
    const allTransactions = await prisma.transaction.findMany({
      where: { date: { gte: new Date("2024-01-01") } },
    });

    const financeSummary = {
      hari: { income: 0, expense: 0 },
      pekan: { income: 0, expense: 0 },
      bulan: { income: 0, expense: 0 },
      tahun: { income: 0, expense: 0 },
    };

    allTransactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      const isIncome = tx.type === "INCOME";
      const amount = Number(tx.amount) || 0; // Mengamankan tipe data Decimal Prisma

      if (txDate >= awalHariIni) {
        if (isIncome) financeSummary.hari.income += amount;
        else financeSummary.hari.expense += amount;
      }
      if (txDate >= awalPekanIni && txDate < akhirPekanIni) {
        if (isIncome) financeSummary.pekan.income += amount;
        else financeSummary.pekan.expense += amount;
      }
      if (txDate >= awalBulanIni) {
        if (isIncome) financeSummary.bulan.income += amount;
        else financeSummary.bulan.expense += amount;
      }
      if (txDate >= awalTahunIni) {
        if (isIncome) financeSummary.tahun.income += amount;
        else financeSummary.tahun.expense += amount;
      }
    });

    // ==========================================
    // 5. AGREGASI PENJUALAN & PIUTANG (SALES) - DINAMIS & SUPER AMAN
    // ==========================================
    let allSales: any[] = [];
    
    // Deteksi otomatis penamaan model di Prisma Client Anda (Sale, sales, atau sale)
    const salesModel = (prisma as any).sale || (prisma as any).Sale || (prisma as any).sales || (prisma as any).Sales;

    if (salesModel) {
      try {
        allSales = await salesModel.findMany({
          where: { date: { gte: batasWaktuSales } }
        });
      } catch (e) {
        console.error("Gagal mengeksekusi query findMany pada model Sales:", e);
      }
    } else {
      console.warn("Peringatan: Model 'Sale' / 'sales' tidak ditemukan di instance Prisma Anda. Menggunakan array kosong.");
    }

    const salesSummary = {
      totalRevenueBulanIni: 0,
      totalKarungTerjualBulanIni: 0,
      piutangPending: 0, 
      invoiceLunasCount: 0,
      invoicePendingCount: 0,
    };

    allSales.forEach((sale: any) => {
      if (!sale) return;
      
      const totalAmount = Number(sale.totalAmount) || 0; 
      const quantity = Number(sale.quantity) || 0;
      const status = (sale.paymentStatus || "PENDING").toUpperCase();

      salesSummary.totalRevenueBulanIni += totalAmount;
      salesSummary.totalKarungTerjualBulanIni += quantity;

      if (status === "LUNAS") {
        salesSummary.invoiceLunasCount++;
      } else {
        salesSummary.invoicePendingCount++;
        salesSummary.piutangPending += totalAmount;
      }
    });

    // ==========================================
    // 6. MONITORING LOGISTIK (DELIVERIES) - SUPER AMAN
    // ==========================================
    const logisticsSummary = { diproses: 0, dikirim: 0, diterima: 0 };
    
    // Deteksi otomatis penamaan model Delivery / delivery / deliveries
    const deliveryModel = (prisma as any).delivery || (prisma as any).Delivery || (prisma as any).deliveries || (prisma as any).Deliveries;

    if (deliveryModel && typeof deliveryModel.groupBy === "function") {
      try {
        const deliveriesGroup = await deliveryModel.groupBy({
          by: ["status"],
          _count: { id: true },
        });

        deliveriesGroup.forEach((group: any) => {
          const status = (group.status || "").toUpperCase();
          const count = group._count?.id || 0;
          if (status === "DIPROSES") logisticsSummary.diproses = count;
          if (status === "DIKIRIM") logisticsSummary.dikirim = count;
          if (status === "DITERIMA") logisticsSummary.diterima = count;
        });
      } catch (e) {
        console.error("Gagal memuat data logistik via groupBy:", e);
      }
    } else {
      console.warn("Peringatan: Model 'Delivery' tidak ditemukan di instance Prisma Anda.");
    }

    // ==========================================
    // RETURN DATA GABUNGAN UTUH KUMPULAN MODUL
    // ==========================================
    return NextResponse.json({
      success: true,
      data: { 
        stockPredictions, 
        salaryPerformance, 
        trends,
        financeSummary,    
        salesSummary,      
        logisticsSummary,   
        sales: allSales
      },
    });

  } catch (error: any) {
    console.error("CRITICAL DASHBOARD API ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}