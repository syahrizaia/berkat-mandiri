/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Menggunakan singleton prisma Anda

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, employeeName, bagSku, quantity } = body;

    if (action === 'LOG_WORK') {
      // 1. Cari atau buat karyawan otomatis jika belum ada
      const employee = await prisma.employee.upsert({
        where: { name: employeeName },
        update: {},
        create: { name: employeeName }
      });

      // 2. Cari jenis karung berdasarkan SKU
      const bagType = await prisma.bagType.findUnique({
        where: { sku: bagSku }
      });

      if (!bagType) {
        return NextResponse.json({ success: false, message: `SKU Karung '${bagSku}' tidak terdaftar!` });
      }

      // 3. Simpan data log kerja harian & otomatis tambahkan stok fisik karung siap jual
      await prisma.$transaction([
        prisma.workLog.create({
          data: {
            employeeId: employee.id,
            bagTypeId: bagType.id,
            quantity: quantity
          }
        }),
        prisma.bagType.update({
          where: { id: bagType.id },
          data: { currentStock: { increment: quantity } }
        })
      ]);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Aksi tidak dikenali" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}