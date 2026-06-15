import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Sementara, kita cetak dulu datanya di terminal server
    console.log("Data RFQ Masuk (Tanpa DB):", body);

    // Di sini nanti kita bisa pasang logika pengiriman Email / WhatsApp
    return NextResponse.json({ 
      success: true, 
      message: "Data RFQ berhasil diterima!" 
    });
    
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Gagal memproses data" 
    }, { status: 500 });
  }
}