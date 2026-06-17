/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sekarang = new Date();
    const tahunSekarang = sekarang.getFullYear();
    const bulanSekarang = sekarang.getMonth();
    const tigaPuluhHariLalu = new Date(sekarang.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Batas Waktu Mutlak untuk Penggajian
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

    const awalBulanIni = new Date(tahunSekarang, bulanSekarang, 1);
    const awalTahunIni = new Date(tahunSekarang, 0, 1);

    // ==========================================
    // 1. AMBIL DATA STOK & PREDIKSI
    // ==========================================
    const bagTypes = await prisma.bagType.findMany({
      include: {
        workLogs: {
          where: { date: { gte: tigaPuluhHariLalu } },
        },
      },
    });

    const stockPredictions = bagTypes.map((bag) => {
      const totalProducedLastMonth = bag.workLogs.reduce((sum, log) => sum + log.quantity, 0);
      const dailyAverage = Math.round(totalProducedLastMonth / 30);

      return {
        id: bag.id,
        sku: bag.sku,
        name: bag.name,
        currentStock: bag.currentStock,
        predictedNextMonth: bag.currentStock + (dailyAverage * 30),
      };
    });

    // ==========================================
    // 2. HITUNG GAJI BORONGAN MULTI-TIMEFRAME
    // ==========================================
    const employees = await prisma.employee.findMany({
      include: {
        workLogs: {
          where: {
            date: { gte: new Date("2024-01-01") }
          },
          include: {
            bagType: true
          }
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
        if (!log || !log.bagType) return; // Skip jika log/bagType rusak

        // LOGIKA PERHITUNGAN AMAN (SAFE CALCULATION)
        const task = (log.task || "MENCUCI").toUpperCase(); 
        const qty = log.quantity || 0;
        const bagType = log.bagType || {};

        const tarifMencuci = bagType.wageMencuci ?? 0;
        const tarifMelipat = bagType.wageMelipat ?? 0;
        const tarifMenjahit = bagType.wageMenjahit ?? 0;
        const tarifBase = bagType.wagePerPiece ?? 0;

        let tarifPekerjaan = 0;

        if (task === "MENCUCI") {
          tarifPekerjaan = tarifMencuci > 0 ? tarifMencuci : tarifBase;
        } else if (task === "MELIPAT") {
          tarifPekerjaan = tarifMelipat > 0 ? tarifMelipat : tarifBase;
        } else if (task === "MENJAHIT") {
          tarifPekerjaan = tarifMenjahit > 0 ? tarifMenjahit : tarifBase;
        } else {
          tarifPekerjaan = tarifBase;
        }

        const logSalary = qty * tarifPekerjaan;
        const logDate = new Date(log.date);

        // Distribusi Waktu
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
      salaryPerformance.bulan.push({ id: emp.id, name: emp.name, totalBags: bagsBulan, totalSalary: salaryBulan }); // Perbaikan indeks kalau perlu
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
      const qty = log.quantity;

      const targetTahun = trends.tahun.find((t) => t.label === logYear.toString());
      if (targetTahun) targetTahun.total += qty;

      if (logYear === tahunSekarang) {
        trends.bulan[logMonth].total += qty;
      }

      if (logYear === tahunSekarang && logMonth === bulanSekarang) {
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

    return NextResponse.json({
      success: true,
      data: { stockPredictions, salaryPerformance, trends },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}