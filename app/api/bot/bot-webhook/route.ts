/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Menggunakan singleton prisma Anda

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 1. Ekstrak variabel 'task' yang dikirim dari bot WhatsApp terbaru
    const { action, employeeName, task, bagSku, quantity } = body;

    if (action === 'LOG_WORK') {
      // Validasi awal untuk memastikan data pekerjaan masuk
      if (!task) {
        return NextResponse.json({ 
          success: false, 
          message: "❌ Gagal: Parameter 'task' (jenis pekerjaan) wajib diisi!" 
        });
      }
      
      // 2. Cari karyawan berdasarkan nama (Case-Insensitive)
      let employee = await prisma.employee.findFirst({
        where: {
          name: {
            equals: employeeName.trim(),
            mode: "insensitive",
          },
        },
      });

      // Jika belum ada di database, otomatis kita buat baru!
      if (!employee) {
        employee = await prisma.employee.create({
          data: {
            name: employeeName.trim(),
          },
        });
      }

      // 3. Cari jenis karung berdasarkan SKU
      const bagType = await prisma.bagType.findFirst({
        where: {
          sku: {
            equals: bagSku.trim(), 
            mode: "insensitive",
          },
        },
      });

      if (!bagType) {
        return NextResponse.json({ 
          success: false, 
          message: `❌ Gagal: SKU Karung '${bagSku}' tidak terdaftar!` 
        });
      }

      // 4. Simpan data log kerja harian dengan jenis pekerjaan & perbarui stok fisik
      await prisma.$transaction([
        prisma.workLog.create({
          data: {
            employeeId: employee.id,
            bagTypeId: bagType.id,
            quantity: quantity,
            task: task.trim() // SIMPAN DATA JENIS PEKERJAAN DI SINI
          }
        }),
        prisma.bagType.update({
          where: { id: bagType.id },
          data: { currentStock: { increment: quantity } }
        })
      ]);

      return NextResponse.json({ success: true, message: "🚀 Data berhasil dicatat ke Neon DB!" });
    }

    return NextResponse.json({ success: false, message: "Aksi tidak dikenali" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}