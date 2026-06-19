/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// UPDATE STOK BARANG (PUT)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Ubah menjadi Promise sesuai aturan Next.js 16
) {
  try {
    // 2. Wajib gunakan await untuk mengambil id
    const { id } = await params;
    const body = await request.json();

    // Sesuaikan nama model database kamu (misal: inventory / inventoryItem / bagType)
    const updatedInventory = await prisma.bagType.update({
      where: { id },
      data: {
        name: body.name,
        sku: body.sku,
        currentStock: Number(body.currentStock),
        wageMencuci: Number(body.wageMencuci),
        wageMelipat: Number(body.wageMelipat),
        wageMenjahit: Number(body.wageMenjahit),
        wagePerPiece: Number(body.wagePerPiece),
      },
    });

    return NextResponse.json({ success: true, data: updatedInventory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// HAPUS STOK BARANG (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Ubah menjadi Promise
) {
  try {
    // 2. Wajib gunakan await untuk mengambil id
    const { id } = await params;

    await prisma.bagType.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Barang berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}