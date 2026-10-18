"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sanitizeString, verifyRequestOrigin, maskError } from "@/lib/security";

export interface InventoryActionInput {
  sku: string;
  name: string;
  currentStock: number;
  wageMencuci?: number;
  wageMelipat?: number;
  wageMenjahit?: number;
  wagePerPiece?: number;
}

export async function createInventoryAction(input: InventoryActionInput) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi origin domain tidak valid." };
    }

    const sku = sanitizeString(input.sku).toUpperCase();
    const name = sanitizeString(input.name);
    const currentStock = Math.max(0, Math.floor(Number(input.currentStock) || 0));
    const wageMencuci = Math.max(0, Math.floor(Number(input.wageMencuci) || 0));
    const wageMelipat = Math.max(0, Math.floor(Number(input.wageMelipat) || 0));
    const wageMenjahit = Math.max(0, Math.floor(Number(input.wageMenjahit) || 0));
    const wagePerPiece = Math.max(0, Math.floor(Number(input.wagePerPiece) || 0));

    if (!sku || !name) {
      return { success: false, error: "VALIDATION_ERROR: Kode SKU dan Nama Jenis Karung wajib diisi." };
    }

    const existingBag = await prisma.bagType.findUnique({ where: { sku } });
    if (existingBag) {
      return { success: false, error: "VALIDATION_ERROR: Kode SKU tersebut sudah terdaftar di sistem." };
    }

    await prisma.bagType.create({
      data: {
        sku,
        name,
        currentStock,
        wageMencuci,
        wageMelipat,
        wageMenjahit,
        wagePerPiece,
      },
    });

    revalidatePath("/inventory");
    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal menambahkan stok jenis karung baru.") };
  }
}

export async function updateInventoryAction(id: string, input: InventoryActionInput) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi origin domain tidak valid." };
    }

    const cleanId = sanitizeString(id);
    const sku = sanitizeString(input.sku).toUpperCase();
    const name = sanitizeString(input.name);
    const currentStock = Math.max(0, Math.floor(Number(input.currentStock) || 0));
    const wageMencuci = Math.max(0, Math.floor(Number(input.wageMencuci) || 0));
    const wageMelipat = Math.max(0, Math.floor(Number(input.wageMelipat) || 0));
    const wageMenjahit = Math.max(0, Math.floor(Number(input.wageMenjahit) || 0));
    const wagePerPiece = Math.max(0, Math.floor(Number(input.wagePerPiece) || 0));

    if (!cleanId || !sku || !name) {
      return { success: false, error: "VALIDATION_ERROR: Data pembaruan karung tidak lengkap." };
    }

    await prisma.bagType.update({
      where: { id: cleanId },
      data: {
        sku,
        name,
        currentStock,
        wageMencuci,
        wageMelipat,
        wageMenjahit,
        wagePerPiece,
      },
    });

    revalidatePath("/inventory");
    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal memperbarui konfigurasi stok karung.") };
  }
}

export async function deleteInventoryAction(id: string) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi origin domain tidak valid." };
    }

    const cleanId = sanitizeString(id);
    if (!cleanId) {
      return { success: false, error: "ID barang tidak valid." };
    }

    await prisma.bagType.delete({
      where: { id: cleanId },
    });

    revalidatePath("/inventory");
    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal menghapus jenis karung.") };
  }
}
