/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// METODE PUT: UNTUK UPDATE DATA
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { sku, name, currentStock, wageMencuci, wageMelipat, wageMenjahit, wagePerPiece } = body;

    const updatedBag = await prisma.bagType.update({
      where: { id: params.id },
      data: {
        sku,
        name,
        currentStock: Number(currentStock),
        wageMencuci: Number(wageMencuci),
        wageMelipat: Number(wageMelipat),
        wageMenjahit: Number(wageMenjahit),
        wagePerPiece: Number(wagePerPiece)
      }
    });

    return NextResponse.json({ success: true, data: updatedBag });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// METODE DELETE: UNTUK HAPUS DATA
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.bagType.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true, message: "Item berhasil dihapus dari sistem." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}