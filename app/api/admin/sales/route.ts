/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// ==========================================
// [GET] AMBIL DATA PENJUALAN & TIPE KARUNG
// ==========================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get("timeframe") || "bulan";

    // 1. Hitung Filter Tanggal (Timeframe)
    const now = new Date();
    let startDate = new Date();

    switch (timeframe) {
      case "hari":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "pekan":
        startDate.setDate(now.getDate() - 7);
        break;
      case "bulan":
        startDate.setDate(now.getDate() - 30);
        break;
      case "tahun":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // 2. Query Data Sales dengan Relasi ke Neon.tech
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      include: {
        bagType: true,
        delivery: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    // 3. Ambil Data Tipe Karung (Gunakan Fallback untuk Stock Predictions Frontend)
    const bagTypes = await prisma.bagType.findMany({
      orderBy: { name: "asc" },
    });

    // Sesuaikan format return objek dengan ekspektasi frontend kamu
    return NextResponse.json({
      success: true,
      data: {
        sales: sales,
        stockPredictions: bagTypes, // Di-map ke state bagTypes di frontend
      },
    });
  } catch (error: any) {
    console.error("[SALES_GET_ERROR]:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data dari database" },
      { status: 500 }
    );
  }
}

// ==========================================
// [POST] BUAT TRANSAKSI & SURAT JALAN BARU
// ==========================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      invoiceNumber,
      customerName,
      bagTypeId,
      quantity,
      pricePerPiece,
      paymentStatus,
      driverName,
      plateNumber,
      deliveryAddress,
      deliveryStatus,
    } = body;

    // Hitung total nilai otomatis di server side (Keamanan Data)
    const totalAmount = quantity * pricePerPiece;

    // Jalankan Prisma Transaction agar data Sales & Delivery konsisten
    const newSale = await prisma.$transaction(async (tx) => {
      // a. Simpan data penjualan
      const sale = await tx.sale.create({
        data: {
          invoiceNumber,
          customerName,
          bagTypeId,
          quantity,
          pricePerPiece,
          totalAmount,
          paymentStatus,
        },
      });

      // b. Jalankan logika auto-create Surat Jalan / Delivery
      // Jika salah satu manifest logistik diisi, buat records Surat Jalan.
      if (driverName || plateNumber || deliveryAddress) {
        await tx.delivery.create({
          data: {
            saleId: sale.id,
            suratJalanNo: `SJ-${invoiceNumber}`,
            driverName: driverName || null,
            plateNumber: plateNumber || null,
            deliveryAddress: deliveryAddress || null,
            status: deliveryStatus || "DIPROSES",
          },
        });
      }

      // c. OPTIONAL: Kurangi stok karung otomatis di gudang
      await tx.bagType.update({
        where: { id: bagTypeId },
        data: { currentStock: { decrement: quantity } },
      });

      return sale;
    });

    return NextResponse.json({ success: true, data: newSale }, { status: 201 });
  } catch (error: any) {
    console.error("[SALES_POST_ERROR]:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Gagal memuat data",
        prismaMessage: error.meta?.message || null // Mengintip error bawaan prisma
      },
      { status: 500 }
    );
  }
}