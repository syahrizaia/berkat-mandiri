import "server-only";
import { headers } from "next/headers";

/**
 * CV Berkat Mandiri - Security Hardening Layer (OWASP Protection)
 */

// 1. INPUT SANITIZATION (Anti-XSS & Anti-Injection)
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Strip HTML tag angle brackets
    .trim();
}

export function sanitizeText(input: unknown, maxLength = 2000): string {
  if (typeof input !== "string") return "";
  const cleaned = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/javascript:[^"']*/gi, "")
    .trim();
  return cleaned.slice(0, maxLength);
}

// 2. ERROR MASKING (Anti-Information Disclosure)
export function maskError(error: unknown, defaultMessage = "Terjadi kesalahan pada sistem server. Silakan coba beberapa saat lagi."): string {
  // Log internal server detail for administrators
  console.error("[INTERNAL_SECURE_SERVER_LOG]:", error);

  if (error instanceof Error) {
    // If it's a known user-validation error, pass harmless message
    if (error.message.startsWith("VALIDATION_ERROR:")) {
      return error.message.replace("VALIDATION_ERROR:", "").trim();
    }
  }

  // Never return raw database stack trace, prisma metadata, or file paths
  return defaultMessage;
}

// 3. ORIGIN & HOST VERIFICATION (Anti-CSRF)
const ALLOWED_HOSTS = new Set([
  "cvberkatmandiri.vercel.app",
  "localhost:3000",
  "127.0.0.1:3000",
]);

export async function verifyRequestOrigin(): Promise<boolean> {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const host = headersList.get("host");

    // In Server Actions or POST requests, origin or host should match allowed domains
    if (host && !ALLOWED_HOSTS.has(host) && !host.endsWith(".vercel.app")) {
      console.warn(`[SECURITY WARNING] Host mismatch blocked: ${host}`);
      return false;
    }

    if (origin) {
      try {
        const originUrl = new URL(origin);
        if (!ALLOWED_HOSTS.has(originUrl.host) && !originUrl.host.endsWith(".vercel.app")) {
          console.warn(`[SECURITY WARNING] Origin mismatch blocked: ${originUrl.host}`);
          return false;
        }
      } catch {
        return false;
      }
    }

    return true;
  } catch {
    return true; // Fallback for direct SSR invocations
  }
}

// 4. RATE LIMITING (In-Memory Sliding Window Anti-DDoS / Anti-Brute-Force)
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 300000);
}

export function checkRateLimit(identifier: string, limit = 20, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}
