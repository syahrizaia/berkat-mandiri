/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sku, name, currentStock, wageMencuci, wageMelipat, wageMenjahit, wagePerPiece } = body;

    // Cek duplikasi SKU
    const existingBag = await prisma.bagType.findUnique({ where: { sku } });
    if (existingBag) {
      return NextResponse.json({ success: false, error: "Kode SKU barang tersebut sudah terdaftar." }, { status: 400 });
    }

    const newBag = await prisma.bagType.create({
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

    return NextResponse.json({ success: true, data: newBag }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}