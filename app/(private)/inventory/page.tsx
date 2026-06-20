/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import InventoryClient from "@/components/InventoryClient";

export default async function InventoryPage() {
  const bags = await prisma.bagType.findMany({
    orderBy: { currentStock: "asc" },
  });

  let mlPredictions: any[] = [];
  try {
    const pythonServiceUrl = process.env.PYTHON_ML_SERVICE_URL || "http://localhost:8000/predict";
    const res = await fetch(pythonServiceUrl, { 
      cache: "no-store", 
      signal: AbortSignal.timeout(12000) 
    });
    
    if (res.ok) {
      const rawData = await res.json();
      // Validasi: Pastikan data yang didapat benar-benar Array, jika null/bukan array set ke []
      mlPredictions = Array.isArray(rawData) ? rawData : [];
    } else {
      console.warn(`⚠️ API Python merespons dengan status: ${res.status}`);
    }
  } catch (err: any) {
    if (err.name === "TimeoutError") {
      console.error("🚨 ML Service Timeout: Hugging Face terlalu lama merespons (kemungkinan cold start).");
    } else {
      console.error("❌ Gagal terhubung ke ML Service:", err.message);
    }
    
    mlPredictions = [];
  }

  const bagsWithPredictions = (bags || []).map((bag) => {
    // Gunakan optional chaining (?.) dan pastikan mlPredictions aman sebelum di-find
    const mlMatch = Array.isArray(mlPredictions) 
      ? mlPredictions.find((pred) => pred?.bagTypeId === bag.id)
      : null;

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