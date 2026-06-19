/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import InventoryClient from "@/components/InventoryClient";

export default async function InventoryPage() {
  // 1. Ambil data stok langsung dari Neon Database
  const bags = await prisma.bagType.findMany({
    orderBy: { currentStock: "asc" },
  });

  // 2. Ambil data Prediksi dari Python Service
  let mlPredictions: any[] = [];
  try {
    const pythonServiceUrl = process.env.PYTHON_ML_SERVICE_URL || "http://localhost:8000/predict";
    const res = await fetch(pythonServiceUrl, { 
      cache: "no-store", 
      signal: AbortSignal.timeout(12000) 
    });
    
    if (res.ok) {
      mlPredictions = await res.json();
    } else {
      console.warn(`⚠️ API Python merespons dengan status: ${res.status}`);
    }
  } catch (err: any) {
    if (err.name === "TimeoutError") {
      console.error("🚨 ML Service Timeout: Hugging Face terlalu lama merespons (kemungkinan cold start).");
    } else {
      console.error("❌ Gagal terhubung ke ML Service:", err.message);
    }
    
    // Pastikan tetap array kosong agar komponen UI di bawahnya tidak error .map()
    mlPredictions = [];
  }

  // 3. Gabungkan data stok dengan ambang batas aman ML
  const bagsWithPredictions = bags.map((bag) => {
    const mlMatch = mlPredictions.find((pred) => pred.bagTypeId === bag.id);
    const safetyThreshold = mlMatch 
      ? mlMatch.predictedNextMonth 
      : Math.ceil(bag.currentStock * 1.2 || 150);

    return {
      ...bag,
      safetyThreshold,
      isUnderStock: bag.currentStock < safetyThreshold,
    };
  });

  // Lempar data yang sudah matang ke Client Component
  return <InventoryClient initialData={bagsWithPredictions} />;
}