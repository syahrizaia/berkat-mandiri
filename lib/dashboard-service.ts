import "server-only";
import { prisma } from "@/lib/prisma";

export interface TrendItem {
  label: string;
  total: number;
}

export interface StockPredictionDTO {
  id: string;
  sku: string;
  name: string;
  currentStock: number;
  predictedNextMonth: number;
}

export interface SalaryPerformanceDTO {
  id: string;
  name: string;
  totalBags: number;
  totalSalary: number;
}

export type TimeframeType = "hari" | "pekan" | "bulan" | "tahun";

export interface DashboardDataDTO {
  stockPredictions: StockPredictionDTO[];
  salaryPerformance: Record<TimeframeType, SalaryPerformanceDTO[]>;
  trends: Record<TimeframeType, TrendItem[]>;
  financeSummary: Record<TimeframeType, { income: number; expense: number }>;
  salesSummary: {
    totalRevenueBulanIni: number;
    totalKarungTerjualBulanIni: number;
    piutangPending: number;
    invoiceLunasCount: number;
    invoicePendingCount: number;
  };
  logisticsSummary: { diproses: number; dikirim: number; diterima: number };
}

export async function getDashboardData(): Promise<DashboardDataDTO> {
  const sekarang = new Date();
  const tahunSekarang = sekarang.getFullYear();
  const bulanSekarangRaw = sekarang.getMonth();

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

  // 1. DATA STOK & PREDIKSI (SERVER-SIDE PYTHON ML INTEGRATION)
  const bagTypes = await prisma.bagType.findMany({
    select: {
      id: true,
      sku: true,
      name: true,
      currentStock: true,
      wageMencuci: true,
      wageMelipat: true,
      wageMenjahit: true,
      wagePerPiece: true,
    },
    orderBy: { name: "asc" },
  });

  interface MLPredictionItem {
    bagTypeId?: string;
    predictedNextMonth?: number;
  }
  let mlPredictions: MLPredictionItem[] = [];
  try {
    const pythonServiceUrl = process.env.PYTHON_ML_SERVICE_URL || "http://localhost:8000/predict";
    const res = await fetch(pythonServiceUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const rawData = await res.json();
      mlPredictions = Array.isArray(rawData) ? rawData : [];
    }
  } catch (err) {
    console.error("[SERVER] Gagal terhubung ke service Python ML, beralih ke fallback otomatis.", err);
    mlPredictions = [];
  }

  const stockPredictions: StockPredictionDTO[] = bagTypes.map((bag) => {
    const mlMatch = Array.isArray(mlPredictions)
      ? mlPredictions.find((pred) => pred?.bagTypeId === bag.id)
      : null;

    const predictedNextMonth = mlMatch?.predictedNextMonth
      ? mlMatch.predictedNextMonth
      : Math.ceil(bag.currentStock * 1.2 || 150);

    return {
      id: bag.id,
      sku: bag.sku,
      name: bag.name,
      currentStock: bag.currentStock,
      predictedNextMonth,
    };
  });

  // 2. HITUNG GAJI BORONGAN MULTI-TIMEFRAME
  const employees = await prisma.employee.findMany({
    select: {
      id: true,
      name: true,
      workLogs: {
        where: { date: { gte: new Date("2024-01-01") } },
        select: {
          task: true,
          quantity: true,
          date: true,
          bagType: {
            select: {
              wageMencuci: true,
              wageMelipat: true,
              wageMenjahit: true,
              wagePerPiece: true,
            },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  const salaryPerformance: Record<TimeframeType, SalaryPerformanceDTO[]> = {
    hari: [],
    pekan: [],
    bulan: [],
    tahun: [],
  };

  employees.forEach((emp) => {
    let bagsHari = 0, salaryHari = 0;
    let bagsPekan = 0, salaryPekan = 0;
    let bagsBulan = 0, salaryBulan = 0;
    let bagsTahun = 0, salaryTahun = 0;

    emp.workLogs.forEach((log) => {
      if (!log || !log.bagType) return;

      const task = (log.task || "MENCUCI").toUpperCase();
      const qty = log.quantity || 0;
      const bagType = log.bagType;

      let tarifPekerjaan = bagType.wagePerPiece ?? 0;
      if (task === "MENCUCI") tarifPekerjaan = bagType.wageMencuci > 0 ? bagType.wageMencuci : tarifPekerjaan;
      else if (task === "MELIPAT") tarifPekerjaan = bagType.wageMelipat > 0 ? bagType.wageMelipat : tarifPekerjaan;
      else if (task === "MENJAHIT") tarifPekerjaan = bagType.wageMenjahit > 0 ? bagType.wageMenjahit : tarifPekerjaan;

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

  // 3. AGREGASI TREN RIIL VOLUME PRODUKSI
  const allWorkLogs = await prisma.workLog.findMany({
    where: { date: { gte: new Date("2024-01-01") } },
    select: {
      date: true,
      quantity: true,
    },
  });

  const hariLabels = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const bulanLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const trends: Record<TimeframeType, TrendItem[]> = {
    hari: hariLabels.map((l) => ({ label: l, total: 0 })),
    pekan: [
      { label: "W1", total: 0 },
      { label: "W2", total: 0 },
      { label: "W3", total: 0 },
      { label: "W4", total: 0 },
    ],
    bulan: bulanLabels.map((l) => ({ label: l, total: 0 })),
    tahun: [
      { label: "2024", total: 0 },
      { label: "2025", total: 0 },
      { label: "2026", total: 0 },
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
      if (trends.bulan[logMonth]) trends.bulan[logMonth].total += qty;
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

  // 4. AGREGASI BUKU KAS (FINANCIALS)
  const allTransactions = await prisma.transaction.findMany({
    where: { date: { gte: new Date("2024-01-01") } },
    select: {
      type: true,
      amount: true,
      date: true,
    },
  });

  const financeSummary: Record<TimeframeType, { income: number; expense: number }> = {
    hari: { income: 0, expense: 0 },
    pekan: { income: 0, expense: 0 },
    bulan: { income: 0, expense: 0 },
    tahun: { income: 0, expense: 0 },
  };

  allTransactions.forEach((tx) => {
    const txDate = new Date(tx.date);
    const isIncome = tx.type === "INCOME";
    const amount = Number(tx.amount) || 0;

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

  // 5. AGREGASI PENJUALAN & PIUTANG BULAN INI
  const allSales = await prisma.sale.findMany({
    where: { date: { gte: awalBulanIni } },
    select: {
      totalAmount: true,
      quantity: true,
      paymentStatus: true,
    },
  });

  const salesSummary = {
    totalRevenueBulanIni: 0,
    totalKarungTerjualBulanIni: 0,
    piutangPending: 0,
    invoiceLunasCount: 0,
    invoicePendingCount: 0,
  };

  allSales.forEach((sale) => {
    const totalAmount = Number(sale.totalAmount) || 0;
    const quantity = Number(sale.quantity) || 0;
    const status = sale.paymentStatus;

    salesSummary.totalRevenueBulanIni += totalAmount;
    salesSummary.totalKarungTerjualBulanIni += quantity;

    if (status === "LUNAS") {
      salesSummary.invoiceLunasCount++;
    } else {
      salesSummary.invoicePendingCount++;
      salesSummary.piutangPending += totalAmount;
    }
  });

  // 6. MONITORING LOGISTIK
  const logisticsSummary = { diproses: 0, dikirim: 0, diterima: 0 };
  try {
    const deliveriesGroup = await prisma.delivery.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    deliveriesGroup.forEach((group) => {
      const status = group.status;
      const count = group._count?.id || 0;
      if (status === "DIPROSES") logisticsSummary.diproses = count;
      if (status === "DIKIRIM") logisticsSummary.dikirim = count;
      if (status === "DITERIMA") logisticsSummary.diterima = count;
    });
  } catch (e) {
    console.error("[SERVER] Gagal memuat summary logistik via groupBy:", e);
  }

  return {
    stockPredictions,
    salaryPerformance,
    trends,
    financeSummary,
    salesSummary,
    logisticsSummary,
  };
}
