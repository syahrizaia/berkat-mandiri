/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";

// ==========================================
// [PUT] UPDATE DATA TRANSAKSI & LOGISTIK
// ==========================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Wajib berbentuk Promise di Next.js 15+
) {
  try {
    // Await params terlebih dahulu untuk mendapatkan ID secara aman
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
      deliveryStatus,
    } = body;

    const totalAmount = quantity * pricePerPiece;

    const updatedSale = await prisma.sale.update({
      where: { id },
      data: {
        invoiceNumber,
        customerName,
        bagTypeId,
        quantity,
        pricePerPiece,
        totalAmount,
        paymentStatus,
        delivery: {
          upsert: {
            create: {
              suratJalanNo: `SJ-${invoiceNumber}`,
              driverName: driverName || null,
              plateNumber: plateNumber || null,
              deliveryAddress: deliveryAddress || null,
              status: deliveryStatus || "DIPROSES",
            },
            update: {
              suratJalanNo: `SJ-${invoiceNumber}`,
              driverName: driverName || null,
              plateNumber: plateNumber || null,
              deliveryAddress: deliveryAddress || null,
              status: deliveryStatus,
            },
          },
        },
      },
      include: {
        delivery: true,
        bagType: true,
      },
    });

    revalidatePath("/reports");
    revalidatePath("/sales");

    return NextResponse.json({ success: true, data: updatedSale });
  } catch (error: any) {
    console.error("[SALES_PUT_ERROR]:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui data transaksi" },
      { status: 500 }
    );
  }
}

// ==========================================
// [DELETE] HAPUS DATA TRANSAKSI CASCADE
// ==========================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Skema prisma kamu belum diset onDelete: Cascade secara menyeluruh pada relasi Sale -> Delivery,
    // Kita bersihkan manual lewat transaksi database
    await prisma.$transaction(async (tx) => {
      await tx.delivery.deleteMany({
        where: { saleId: id },
      });

      await tx.sale.delete({
        where: { id },
      });
    });

    revalidatePath("/reports");
    revalidatePath("/sales");

    return NextResponse.json({
      success: true,
      message: "Data penjualan dan manifest logistik berhasil dihapus.",
    });
  } catch (error: any) {
    console.error("[SALES_DELETE_ERROR]:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus data dari database" },
      { status: 500 }
    );
  }
}