import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString, maskError } from "@/lib/security";

const VALID_TASKS = new Set(["MENCUCI", "MELIPAT", "MENJAHIT"]);

export async function POST(request: Request) {
  try {
    // 1. Verifikasi Secret Token (Jika dikonfigurasi di Environment Vercel)
    const expectedSecret = process.env.BOT_WEBHOOK_SECRET;
    if (expectedSecret) {
      const incomingSecret =
        request.headers.get("x-bot-secret") ||
        request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

      if (incomingSecret !== expectedSecret) {
        console.warn("[SECURITY ALERT] Unauthorized attempt to access bot-webhook");
        return NextResponse.json(
          { success: false, message: "Akses ditolak: Token autentikasi webhook tidak valid." },
          { status: 401 }
        );
      }
    }

    const body = await request.json();
    const action = sanitizeString(body.action);
    const employeeName = sanitizeString(body.employeeName);
    const rawTask = sanitizeString(body.task).toUpperCase();
    const bagSku = sanitizeString(body.bagSku);
    const quantity = Math.floor(Number(body.quantity) || 0);

    if (action === "LOG_WORK") {
      if (!employeeName || !rawTask || !bagSku || quantity <= 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Parameter data log kerja (employeeName, task, bagSku, quantity) tidak lengkap atau tidak valid.",
          },
          { status: 400 }
        );
      }

      const task = VALID_TASKS.has(rawTask) ? (rawTask as "MENCUCI" | "MELIPAT" | "MENJAHIT") : null;
      if (!task) {
        return NextResponse.json(
          { success: false, message: `Jenis pekerjaan '${rawTask}' tidak valid.` },
          { status: 400 }
        );
      }

      // 2. Cari karyawan berdasarkan nama (Case-Insensitive)
      let employee = await prisma.employee.findFirst({
        where: {
          name: {
            equals: employeeName,
            mode: "insensitive",
          },
        },
      });

      if (!employee) {
        employee = await prisma.employee.create({
          data: {
            name: employeeName,
          },
        });
      }

      // 3. Cari jenis karung berdasarkan SKU
      const bagType = await prisma.bagType.findFirst({
        where: {
          sku: {
            equals: bagSku,
            mode: "insensitive",
          },
        },
      });

      if (!bagType) {
        return NextResponse.json(
          { success: false, message: `SKU Karung '${bagSku}' tidak terdaftar di sistem gudang.` },
          { status: 404 }
        );
      }

      // 4. Transaksi atomik: catat log kerja & perbarui stok fisik
      await prisma.$transaction([
        prisma.workLog.create({
          data: {
            employeeId: employee.id,
            bagTypeId: bagType.id,
            quantity: quantity,
            task: task,
          },
        }),
        prisma.bagType.update({
          where: { id: bagType.id },
          data: { currentStock: { increment: quantity } },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Data log kerja dan stok gudang berhasil diperbarui.",
      });
    }

    return NextResponse.json(
      { success: false, message: "Aksi tidak dikenali." },
      { status: 400 }
    );
  } catch (error) {
    const safeMsg = maskError(error, "Terjadi kesalahan internal saat memproses webhook bot.");
    return NextResponse.json({ success: false, message: safeMsg }, { status: 500 });
  }
}