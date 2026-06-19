/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ==========================================
// HANDLE PUT REQUEST (UPDATE DATA)
// ==========================================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Wajib Promise untuk Next.js 15/16
) {
  try {
    // 1. Await params untuk mengambil ID Penjualan dari URL
    const { id } = await params;
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
      deliveryStatus
    } = body;

    // 2. Hitung Ulang Total Nilai Nominal
    const totalAmount = Number(quantity || 0) * Number(pricePerPiece || 0);
    const suratJalanNo = invoiceNumber ? `SJ-${invoiceNumber.replace(/[^a-zA-Z0-9]/g, "")}` : undefined;

    // 3. Deteksi Model Database Seperti pada Rute Utama
    const isSaleModel = (prisma as any).sale || (prisma as any).Sale || (prisma as any).sales || (prisma as any).Sales;
    const isDeliveryModel = (prisma as any).delivery || (prisma as any).Delivery || (prisma as any).deliveries || (prisma as any).Deliveries;
    const isTransactionModel = (prisma as any).transaction || (prisma as any).Transaction;

    let dataDiperbarui;

    // KONDISI 1: Jika menggunakan skema tabel Sale terpisah
    if (isSaleModel) {
      const updatePayload: any = {
        invoiceNumber,
        customerName,
        bagTypeId,
        quantity: Number(quantity),
        pricePerPiece: Number(pricePerPiece),
        totalAmount,
        paymentStatus,
      };

      // Jika relasi logistik (Delivery) diaktifkan, lakukan Upsert (Update jika ada, Create jika belum ada)
      if (isDeliveryModel) {
        updatePayload.delivery = {
          upsert: {
            create: {
              suratJalanNo: suratJalanNo || `SJ-${id.slice(0, 8).toUpperCase()}`,
              driverName: driverName || null,
              plateNumber: plateNumber || null,
              deliveryAddress: deliveryAddress || null,
              status: deliveryStatus || "DIPROSES",
            },
            update: {
              driverName: driverName || null,
              plateNumber: plateNumber || null,
              deliveryAddress: deliveryAddress || null,
              status: deliveryStatus || "DIPROSES",
            }
          }
        };
      }

      dataDiperbarui = await isSaleModel.update({
        where: { id },
        data: updatePayload,
        include: {
          bagType: true,
          ...(isDeliveryModel ? { delivery: true } : {})
        }
      });

    } 
    // KONDISI 2: Jika fallback ke single table Transaction
    else if (isTransactionModel) {
      dataDiperbarui = await isTransactionModel.update({
        where: { id },
        data: {
          amount: totalAmount,
          description: `${invoiceNumber} - ${customerName} (${quantity} lbr)`,
          bagTypeId: bagTypeId
        }
      });
    } 
    // KONDISI 3: Model tidak ditemukan
    else {
      return NextResponse.json(
        { success: false, error: "Model manajemen penjualan tidak ditemukan di Prisma." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: dataDiperbarui }, { status: 200 });

  } catch (error: any) {
    console.error(`Gagal memperbarui data transaksi di Neon PostgreSQL:`, error);
    return NextResponse.json(
      { success: false, error: error.message || "Terjadi kesalahan internal server saat memperbarui data." },
      { status: 500 }
    );
  }
}

// ==========================================
// HANDLE DELETE REQUEST (OPSIONAL - AGAR LENGKAP)
// ==========================================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const isSaleModel = (prisma as any).sale || (prisma as any).Sale || (prisma as any).sales || (prisma as any).Sales;
    const isTransactionModel = (prisma as any).transaction || (prisma as any).Transaction;

    let dataDihapus;

    if (isSaleModel) {
      dataDihapus = await isSaleModel.delete({ where: { id } });
    } else if (isTransactionModel) {
      dataDihapus = await isTransactionModel.delete({ where: { id } });
    } else {
      throw new Error("Model data tidak ditemukan.");
    }

    return NextResponse.json({ success: true, data: dataDihapus }, { status: 200 });
  } catch (error: any) {
    console.error("Gagal menghapus data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus entri data." },
      { status: 500 }
    );
  }
}