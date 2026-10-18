"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sanitizeString, verifyRequestOrigin, maskError } from "@/lib/security";

export interface EmployeeActionInput {
  name: string;
  phone?: string;
}

export async function createEmployeeAction(input: EmployeeActionInput) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi origin domain tidak valid." };
    }

    const name = sanitizeString(input.name);
    const phone = sanitizeString(input.phone);

    if (!name) {
      return { success: false, error: "VALIDATION_ERROR: Nama lengkap karyawan wajib diisi." };
    }

    const existingEmployee = await prisma.employee.findUnique({ where: { name } });
    if (existingEmployee) {
      return { success: false, error: "VALIDATION_ERROR: Nama karyawan tersebut sudah terdaftar di sistem." };
    }

    await prisma.employee.create({
      data: { name, phone: phone || null },
    });

    revalidatePath("/employees");
    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal mendaftarkan profil karyawan.") };
  }
}

export async function updateEmployeeAction(id: string, input: EmployeeActionInput) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi origin domain tidak valid." };
    }

    const cleanId = sanitizeString(id);
    const name = sanitizeString(input.name);
    const phone = sanitizeString(input.phone);

    if (!cleanId || !name) {
      return { success: false, error: "VALIDATION_ERROR: Data karyawan tidak valid." };
    }

    await prisma.employee.update({
      where: { id: cleanId },
      data: { name, phone: phone || null },
    });

    revalidatePath("/employees");
    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal memperbarui profil karyawan.") };
  }
}

export async function deleteEmployeeAction(id: string) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi origin domain tidak valid." };
    }

    const cleanId = sanitizeString(id);
    if (!cleanId) {
      return { success: false, error: "ID karyawan tidak valid." };
    }

    await prisma.employee.delete({
      where: { id: cleanId },
    });

    revalidatePath("/employees");
    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal menghapus profil karyawan.") };
  }
}
