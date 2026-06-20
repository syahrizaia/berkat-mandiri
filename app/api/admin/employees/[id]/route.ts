/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// UPDATE KARYAWAN (PUT)
export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } // Menggunakan Promise sesuai aturan Next.js 16
) {
  try {
    // Wajib di-await terlebih dahulu sebelum mengambil id
    const { id } = await params; 
    const { name, phone } = await request.json();

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: { name, phone: phone || null }
    });

    revalidatePath("/employees");

    return NextResponse.json({ success: true, data: updatedEmployee });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// HAPUS KARYAWAN (DELETE)
export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> } // Menggunakan Promise sesuai aturan Next.js 16
) {
  try {
    // Wajib di-await terlebih dahulu sebelum mengambil id
    const { id } = await params; 

    await prisma.employee.delete({
      where: { id }
    });

    revalidatePath("/employees");
    
    return NextResponse.json({ success: true, message: "Karyawan berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}