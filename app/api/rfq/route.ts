import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, email, country, quantity, productId, notes } = body;

    if (!companyName || !email || !country || !quantity || !productId) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const newRfq = await prisma.rfq.create({
      data: {
        companyName,
        email,
        country,
        quantity: parseInt(quantity),
        productId,
        notes,
      },
    });

    return NextResponse.json({ success: true, data: newRfq }, { status: 201 });
  } catch (error) {
    console.error("RFQ Error:", error);
    return NextResponse.json({ error: "Gagal memproses permintaan" }, { status: 500 });
  }
}