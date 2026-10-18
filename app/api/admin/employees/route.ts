/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    // Validasi duplikasi Nama
    const existingEmployee = await prisma.employee.findUnique({ where: { name } });
    if (existingEmployee) {
      return NextResponse.json({ success: false, error: "Nama karyawan tersebut sudah terdaftar." }, { status: 400 });
    }

    const newEmployee = await prisma.employee.create({
      data: { name, phone: phone || null }
    });

    revalidatePath("/employees");

    return NextResponse.json({ success: true, data: newEmployee }, { status: 201 });
  } catch (error: any) {
    console.error("[EMPLOYEE_POST_ERROR]:", error);
    return NextResponse.json({ success: false, error: "Gagal menyimpan data karyawan." }, { status: 500 });
  }
}