"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sanitizeString, sanitizeText, verifyRequestOrigin, maskError } from "@/lib/security";

export interface SaleActionInput {
  invoiceNumber: string;
  customerName: string;
  bagTypeId: string;
  quantity: number;
  pricePerPiece: number;
  paymentStatus: "LUNAS" | "PENDING";
  driverName?: string;
  plateNumber?: string;
  deliveryAddress?: string;
  deliveryStatus?: "DIPROSES" | "DIKIRIM" | "DITERIMA";
}

export async function createSaleAction(input: SaleActionInput) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi domain origin tidak valid." };
    }

    const invoiceNumber = sanitizeString(input.invoiceNumber);
    const customerName = sanitizeString(input.customerName);
    const bagTypeId = sanitizeString(input.bagTypeId);
    const quantity = Math.max(1, Math.floor(Number(input.quantity) || 0));
    const pricePerPiece = Math.max(0, Math.floor(Number(input.pricePerPiece) || 0));
    const paymentStatus = input.paymentStatus === "LUNAS" ? "LUNAS" : "PENDING";
    const driverName = sanitizeString(input.driverName);
    const plateNumber = sanitizeString(input.plateNumber);
    const deliveryAddress = sanitizeText(input.deliveryAddress, 500);
    const deliveryStatus = input.deliveryStatus || "DIPROSES";

    if (!invoiceNumber || !customerName || !bagTypeId || quantity <= 0) {
      return { success: false, error: "VALIDATION_ERROR: Mohon lengkapi seluruh kolom transaksi yang diwajibkan." };
    }

    const totalAmount = quantity * pricePerPiece;

    await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          invoiceNumber,
          customerName,
          bagTypeId,
          quantity,
          pricePerPiece,
          totalAmount,
          paymentStatus,
        },
      });

      if (driverName || plateNumber || deliveryAddress) {
        await tx.delivery.create({
          data: {
            saleId: sale.id,
            suratJalanNo: `SJ-${invoiceNumber.replace(/[^a-zA-Z0-9-]/g, "")}`,
            driverName: driverName || null,
            plateNumber: plateNumber || null,
            deliveryAddress: deliveryAddress || null,
            status: deliveryStatus,
          },
        });
      }

      // Potong stok karung secara otomatis
      await tx.bagType.update({
        where: { id: bagTypeId },
        data: { currentStock: { decrement: quantity } },
      });
    });

    revalidatePath("/sales");
    revalidatePath("/dashboard");
    revalidatePath("/reports");
    revalidatePath("/inventory");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal menambahkan transaksi penjualan.") };
  }
}

export async function updateSaleAction(id: string, input: SaleActionInput) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi domain origin tidak valid." };
    }

    const cleanId = sanitizeString(id);
    const invoiceNumber = sanitizeString(input.invoiceNumber);
    const customerName = sanitizeString(input.customerName);
    const bagTypeId = sanitizeString(input.bagTypeId);
    const quantity = Math.max(1, Math.floor(Number(input.quantity) || 0));
    const pricePerPiece = Math.max(0, Math.floor(Number(input.pricePerPiece) || 0));
    const paymentStatus = input.paymentStatus === "LUNAS" ? "LUNAS" : "PENDING";
    const driverName = sanitizeString(input.driverName);
    const plateNumber = sanitizeString(input.plateNumber);
    const deliveryAddress = sanitizeText(input.deliveryAddress, 500);
    const deliveryStatus = input.deliveryStatus || "DIPROSES";

    if (!cleanId || !invoiceNumber || !customerName || !bagTypeId) {
      return { success: false, error: "VALIDATION_ERROR: Data transaksi tidak valid." };
    }

    const totalAmount = quantity * pricePerPiece;

    await prisma.sale.update({
      where: { id: cleanId },
      data: {
        invoiceNumber,
        customerName,
        bagTypeId,
        quantity,
        pricePerPiece,
        totalAmount,
        paymentStatus,
        delivery: {
          upsert: {
            create: {
              suratJalanNo: `SJ-${invoiceNumber.replace(/[^a-zA-Z0-9-]/g, "")}`,
              driverName: driverName || null,
              plateNumber: plateNumber || null,
              deliveryAddress: deliveryAddress || null,
              status: deliveryStatus,
            },
            update: {
              driverName: driverName || null,
              plateNumber: plateNumber || null,
              deliveryAddress: deliveryAddress || null,
              status: deliveryStatus,
            },
          },
        },
      },
    });

    revalidatePath("/sales");
    revalidatePath("/dashboard");
    revalidatePath("/reports");
    revalidatePath("/inventory");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal memperbarui transaksi penjualan.") };
  }
}

export async function deleteSaleAction(id: string) {
  try {
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi domain origin tidak valid." };
    }

    const cleanId = sanitizeString(id);
    if (!cleanId) {
      return { success: false, error: "ID transaksi tidak valid." };
    }

    await prisma.$transaction(async (tx) => {
      await tx.delivery.deleteMany({
        where: { saleId: cleanId },
      });
      await tx.sale.delete({
        where: { id: cleanId },
      });
    });

    revalidatePath("/sales");
    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return { success: true };
  } catch (error) {
    return { success: false, error: maskError(error, "Gagal menghapus transaksi penjualan.") };
  }
}
