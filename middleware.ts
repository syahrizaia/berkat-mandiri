import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Daftar host yang diizinkan untuk berinteraksi dengan aplikasi
const ALLOWED_HOST_SUFFIXES = [
  "cvberkatmandiri.vercel.app",
  "localhost:3000",
  "127.0.0.1:3000",
];

// Pola URL eksploitasi dan scanning bot umum yang wajib diblokir seketika
const BLOCKED_PATH_PATTERNS = [
  /\/\.env/i,
  /\/\.git/i,
  /\/\.neon/i,
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/xmlrpc\.php/i,
  /\/phpmyadmin/i,
  /\/cgi-bin/i,
  /\/actuator/i,
  /\/eval-stdin/i,
  /\/vendor\/phpunit/i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const origin = request.headers.get("origin") || "";
  const method = request.method;

  // 1. Blokir Scanner Probes & Malicious Path Exploration
  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(pathname)) {
      console.warn(`[SECURITY BLOCKED] Suspicious probe blocked: ${pathname} from IP: ${request.headers.get("x-forwarded-for") || "unknown"}`);
      return new NextResponse(null, { status: 404 });
    }
  }

  // 2. Anti-CSRF & Origin Verification untuk Mutasi Data (POST, PUT, DELETE, PATCH)
  if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    // Pengecualian khusus: Webhook eksternal bot WhatsApp yang diamankan oleh token
    if (pathname.startsWith("/api/bot/")) {
      return NextResponse.next();
    }

    // Periksa apakah Host terdaftar
    const isHostAllowed =
      ALLOWED_HOST_SUFFIXES.some((allowed) => host === allowed || host.endsWith(".vercel.app")) ||
      host.startsWith("localhost:") ||
      host.startsWith("127.0.0.1:");

    if (host && !isHostAllowed) {
      console.warn(`[SECURITY BLOCKED] Host header mismatch: ${host}`);
      return new NextResponse(
        JSON.stringify({ success: false, error: "Akses ditolak: Host tidak diizinkan." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Periksa apakah Origin terdaftar jika request membawa header Origin
    if (origin) {
      try {
        const originUrl = new URL(origin);
        const isOriginAllowed =
          ALLOWED_HOST_SUFFIXES.some(
            (allowed) => originUrl.host === allowed || originUrl.host.endsWith(".vercel.app")
          ) ||
          originUrl.host.startsWith("localhost:") ||
          originUrl.host.startsWith("127.0.0.1:");

        if (!isOriginAllowed) {
          console.warn(`[SECURITY BLOCKED] Origin mismatch: ${originUrl.host}`);
          return new NextResponse(
            JSON.stringify({ success: false, error: "Akses ditolak: Cross-Origin Request Forgery terdeteksi." }),
            { status: 403, headers: { "Content-Type": "application/json" } }
          );
        }
      } catch {
        return new NextResponse(
          JSON.stringify({ success: false, error: "Format Origin tidak valid." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  // 3. Lanjutkan Request dengan Security Headers
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

  return response;
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua path request kecuali untuk file statis Next.js dan aset publik:
     * - _next/static (file statis js/css)
     * - _next/image (optimasi gambar)
     * - favicon.ico, sitemap.xml, robots.txt, manifest
     * - file gambar dan icon (svg, png, jpg, jpeg, webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)",
  ],
};
