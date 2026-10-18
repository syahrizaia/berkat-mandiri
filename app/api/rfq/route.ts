import { NextResponse } from "next/server";
import { submitRfqAction } from "@/app/actions/rfq";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitRfqAction(body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message || "Data RFQ berhasil diterima!",
      });
    }

    return NextResponse.json(
      { success: false, error: result.error || "Gagal memproses data RFQ." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Permintaan data tidak valid." },
      { status: 400 }
    );
  }
}