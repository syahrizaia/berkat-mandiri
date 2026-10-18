"use server";

import "server-only";
import { headers } from "next/headers";
import { 
  sanitizeString, 
  sanitizeText, 
  verifyRequestOrigin, 
  checkRateLimit, 
  maskError 
} from "@/lib/security";

export interface RfqActionInput {
  companyName: string;
  email: string;
  country: string;
  quantity: string | number;
  productId: string;
  notes?: string;
  website_hp?: string; // Invisible honeypot field for bot trapping
}

export async function submitRfqAction(input: RfqActionInput) {
  try {
    // 1. Verifikasi Origin & Host (Anti-CSRF)
    const isOriginValid = await verifyRequestOrigin();
    if (!isOriginValid) {
      return { success: false, error: "Akses ditolak: Verifikasi origin domain tidak sah." };
    }

    // 2. Anti-Bot Honeypot Trap
    // Jika field 'website_hp' diisi oleh bot web crawler, kembalikan response seolah-olah sukses tanpa memproses
    if (input.website_hp && input.website_hp.trim().length > 0) {
      console.warn("[SECURITY ALERT] Bot detected via honeypot trap!");
      return { success: true, message: "Data RFQ berhasil diterima." };
    }

    // 3. Rate Limiting (Maksimal 5 submission per 60 detik per IP)
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-client";

    const { allowed } = checkRateLimit(`rfq:${clientIp}`, 5, 60000);
    if (!allowed) {
      return {
        success: false,
        error: "Terlalu banyak permintaan dalam waktu singkat. Mohon tunggu 1 menit sebelum mengirim kembali.",
      };
    }

    // 4. Validasi & Sanitasi Data Input (Anti-XSS & Anti-Injection)
    const companyName = sanitizeString(input.companyName);
    const email = sanitizeString(input.email).toLowerCase();
    const country = sanitizeString(input.country);
    const productId = sanitizeString(input.productId);
    const notes = sanitizeText(input.notes || "", 1000);
    const quantity = Math.max(1, Math.floor(Number(input.quantity) || 0));

    if (!companyName || !email || !country || !productId || quantity <= 0) {
      return { success: false, error: "VALIDATION_ERROR: Mohon lengkapi seluruh kolom formulir yang diwajibkan." };
    }

    // Validasi format email RFC 5322 sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "VALIDATION_ERROR: Format alamat email bisnis tidak valid." };
    }

    // Log securely on server without exposing credentials
    console.log("[SECURE_SERVER_RFQ_RECEIVED]:", {
      companyName,
      email: email.replace(/(.{2})(.*)(?=@)/, "$1***"), // Masked email in server logs
      country,
      productId,
      quantity,
      hasNotes: Boolean(notes),
      receivedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Data RFQ berhasil diverifikasi dan diterima oleh sistem server.",
    };
  } catch (error) {
    return {
      success: false,
      error: maskError(error, "Terjadi kesalahan internal saat memproses RFQ."),
    };
  }
}
