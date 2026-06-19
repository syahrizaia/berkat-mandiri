/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// UPDATE KARYAWAN
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, phone } = await request.json();

    const updatedEmployee = await prisma.employee.update({
      where: { id: params.id },
      data: { name, phone: phone || null }
    });

    return NextResponse.json({ success: true, data: updatedEmployee });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// HAPUS KARYAWAN
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.employee.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true, message: "Karyawan berhasil dihapus." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}