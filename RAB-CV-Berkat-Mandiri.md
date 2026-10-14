# RENCANA ANGGARAN BIAYA (RAB) & ESTIMASI PROYEK PENGEMBANGAN SISTEM
## PROYEK: WEBSITE KORPORASI B2B & ENTERPRISE ERP SYSTEM "CV BERKAT MANDIRI"
**URL Produksi:** [https://cvberkatmandiri.vercel.app](https://cvberkatmandiri.vercel.app)  
**Dokumen:** Technical Estimation & Project Cost Proposal  
**Standar Pasar:** Industri Pengembangan Web & Perangkat Lunak Indonesia (Tahun 2026)  
**Status Audit:** Verified Production Codebase (23 Rute Valid, 0 Errors)

---

## 1. EXECUTIVE SUMMARY & INVENTARISASI RUANG LINGKUP (SCOPE OF WORK)

Berdasarkan audit teknis mendalam terhadap seluruh struktur direktori, repositori file, skema database, dan integrasi microservice pada workspace proyek **CV Berkat Mandiri**, proyek ini bukan sekadar website profil perusahaan statis (*company profile* biasa), melainkan **Portal Perdagangan Internasional B2B Terpadu yang Terintegrasi dengan Sistem ERP Pergudangan, Penggajian Borongan, Manajemen Penjualan/Surat Jalan, serta Microservice Machine Learning**.

### A. Inventarisasi Tech Stack & Arsitektur
* **Core Framework:** Next.js 16.2.9 (Turbopack Engine) + React 19.2.4 (Server & Client Components) + TypeScript 5.
* **Styling & Design System:** Tailwind CSS v4 + Apple Liquid Glass Design System (kustom token blur, specular highlights, dark obsidian glass, dynamic mesh refraction).
* **Database & ORM:** Neon Serverless PostgreSQL + Prisma ORM v7.8.0 (`@prisma/adapter-neon` pooled connection, ACID compliant, cascading relational schema).
* **Microservice Machine Learning:** Python FastAPI + Uvicorn + Pandas + Scikit-Learn (Linear Regression peramalan tren penjualan 6 bulan dan kalkulasi *Safety Stock Threshold*).
* **Mobile / PWA Capabilities:** Next-PWA (`@ducanh2912/next-pwa` v10.2.9) dengan service worker offline caching, manifest webmaskable, dan mobile install capability.
* **Automation & Webhooks:** WhatsApp Bot Webhook handler (`/api/bot/bot-webhook`) untuk input log harian borongan langsung dari gawai pekerja di gudang.
* **Reporting & Math Engines:** Recharts v3.8.1 (Interactive data analytics), SheetJS/XLSX v0.18.5 (Ekspor laporan Excel), KaTeX & React-KaTeX (Rendering visual formula matematika prediksi).

### B. Inventarisasi Halaman & Komponen (Total: 23 Rute)
1. **Public B2B International Portal:**
   * `/` & `/landing-page`: Hero Apple Glass, Value Proposition, Katalog Ringkas, Interactive Freight Calculator, Form RFQ, Live Hub Card.
   * `/product`: Katalog komprehensif Karung Goni B-Twill, Karung Woven PP, Karung Laminasi BOPP Printing dengan spesifikasi teknis lengkap.
   * `/advantages`: 4 Pilar keunggulan, QC standar ekspor, alur pengawasan mutu, dan komitmen pengapalan FCL/LCL.
   * `/about`: Profil korporasi, timeline sejarah, rekam jejak, dan animasi interaktif counter statistik.
   * `/contact`: Saluran langsung WhatsApp sales, peta kantor gudang Bekasi, Port of Loading Tanjung Priok (IDTPP), formulir RFQ.
   * `/terms` & `/privacy`: Syarat pemesanan B2B, klausul logistik pelabuhan, dan kebijakan privasi data klien.
2. **Private Enterprise ERP Modules:**
   * `/dashboard`: Executive metric cards, Recharts chart analitik tren penjualan vs produksi, dan status sistem.
   * `/inventory`: Master SKU karung, konfigurasi tarif borongan per aktivitas, stok fisik real-time, dan alert otomatis stok menipis berbasis Machine Learning.
   * `/sales`: Pencatatan faktur penjualan, pemotongan stok otomatis, penerbitan Surat Jalan kurir armada, dan tracking status LUNAS/PENDING.
   * `/employees` & `/employees/[id]`: Master pekerja borongan, rekapitulasi volume harian (Cuci, Lipat, Jahit), kalkulator upah otomatis, dan cetak slip gaji resmi.
   * `/reports`: Ledger buku kas arus kas keuangan, visualisasi profit/loss, filter periode, cetak PDF, dan ekspor file Excel XLSX.
   * `/help`: Pusat panduan operasional SOP, live keyword search, filter topik, dan accordion FAQ interaktif (Framer Motion).
   * `/docs`: Dokumentasi arsitektur internal, floating macOS sidebar, syntax terminal code block `schema.prisma`, dan direktori endpoint REST API.
3. **Automated SEO & Crawler Routes:**
   * `/robots.txt`: Directives indexing publik dan blocking rute privat.
   * `/sitemap.xml`: XML sitemap dinamis seluruh rute publik dengan prioritas dan timestamp pembaruan.
   * `/manifest.webmanifest`: PWA standalone installation config.

---

## 2. RINCIAN RENCANA ANGGARAN BIAYA (RAB) DETAIL

*Catatan: Estimasi jam kerja (Man-Hours) dihitung secara profesional berdasarkan kompleksitas arsitektur aktual. Standar tarif pasar mengacu pada rata-rata industri pengembang perangkat lunak di Indonesia tahun 2026.*

### Kategori 1: Riset, Perencanaan & UI/UX Design System
| No | Komponen / Modul Pekerjaan | Spesifikasi Teknis (Berdasarkan File Proyek) | Estimasi Jam Kerja | Tarif Standar Pasar (IDR/Jam) | Subtotal (IDR) |
| :---: | :--- | :--- | :---: | :---: | :---: |
| 1.1 | **Business Process & Requirements Analysis** | Analisis alur bisnis manufaktur karung, rantai pasok ekspor komoditas, model upah borongan (Cuci/Lipat/Jahit), dan skema penjualan terintegrasi. | 16 Jam | Rp 250.000 | Rp 4.000.000 |
| 1.2 | **Information Architecture & Wireframing** | Blueprint hierarki 7 halaman publik + 8 modul internal ERP, alur navigasi multi-level, dan user persona B2B. | 24 Jam | Rp 225.000 | Rp 5.400.000 |
| 1.3 | **Apple Liquid Glass Design System** | Pembuatan token CSS kaca visionOS (`--glass-surface`, specular highlights, dark obsidian glass, palet warna korporat emerald/teal/marine). | 32 Jam | Rp 275.000 | Rp 8.800.000 |
| 1.4 | **Interactive Responsive Prototyping** | Desain interaksi fluid motion, transisi spring, adaptive breakpoints (Mobile, Tablet, Desktop) pada Figma/Code Prototype. | 32 Jam | Rp 250.000 | Rp 8.000.000 |
| **SUB** | **TOTAL KATEGORI 1 (UI/UX DESIGN & PLANNING)** | | **104 Jam** | | **Rp 26.200.000** |

---

### Kategori 2: Frontend & Core Web Development
| No | Komponen / Modul Pekerjaan | Spesifikasi Teknis (Berdasarkan File Proyek) | Estimasi Jam Kerja | Tarif Standar Pasar (IDR/Jam) | Subtotal (IDR) |
| :---: | :--- | :--- | :---: | :---: | :---: |
| 2.1 | **Navigasi Global & Footer Apple Style** | `NavbarPublic.tsx` (macOS floating pill, glass blur, responsive hamburger drawer) & `FooterPublic.tsx` (liquid-glass-dark, sitemap footer, legal links). | 20 Jam | Rp 225.000 | Rp 4.500.000 |
| 2.2 | **Fluid Motion Canvas Background** | `LiquidMeshBackground.tsx` (4-layer dynamic canvas: aurora wave sweep, Lissajous morphing orbs, rising crystal water bubbles, caustic mesh). | 24 Jam | Rp 275.000 | Rp 6.600.000 |
| 2.3 | **Public Portal Pages (7 Halaman)** | Implementasi halaman `/`, `/product`, `/advantages`, `/about`, `/contact`, `/terms`, `/privacy` menggunakan komponen modular Tailwind v4. | 48 Jam | Rp 225.000 | Rp 10.800.000 |
| 2.4 | **Interactive Public Widgets** | `LogisticsCalculator.tsx` (kalkulasi CBM & kontainer 20ft/40ft), `RfqForm.tsx` (multi-step input penawaran harga), dan `ContactForm.tsx`. | 24 Jam | Rp 250.000 | Rp 6.000.000 |
| 2.5 | **Private ERP: Dashboard Overview** | `app/(private)/dashboard/page.tsx` + `AnalyticsDashboard.tsx` (Recharts tren penjualan vs produksi, ringkasan kas, status gudang). | 28 Jam | Rp 250.000 | Rp 7.000.000 |
| 2.6 | **Private ERP: Master Stok Gudang** | `app/(private)/inventory/page.tsx`, `InventoryClient.tsx`, `InventoryModalForm.tsx` (CRUD SKU karung, konfigurasi upah, live filter). | 32 Jam | Rp 250.000 | Rp 8.000.000 |
| 2.7 | **Private ERP: Upah & Karyawan Borongan** | `app/(private)/employees/page.tsx`, `EmployeeDetailView.tsx`, `EmployeeModalForm.tsx` (rekap aktivitas cuci/lipat/jahit, filter periode, slip gaji). | 36 Jam | Rp 250.000 | Rp 9.000.000 |
| 2.8 | **Private ERP: Penjualan & Surat Jalan** | `app/(private)/sales/page.tsx` (Invoice penjualan, otomatisasi pemotongan stok, pembuatan nomor Surat Jalan armada ekspedisi kurir). | 36 Jam | Rp 250.000 | Rp 9.000.000 |
| 2.9 | **Private ERP: Buku Kas & Laporan Finansial** | `app/(private)/reports/page.tsx` + `ReportsChart.tsx` (Ledger income/expense, visualisasi Recharts, filter rentang waktu, ekspor). | 28 Jam | Rp 250.000 | Rp 7.000.000 |
| 2.10 | **Private ERP: Pusat Bantuan & Panduan** | `app/(private)/help/page.tsx` (Live spotlight search, filter kategori topik, Framer Motion accordion FAQ beranimasi halus). | 24 Jam | Rp 225.000 | Rp 5.400.000 |
| 2.11 | **Private ERP: Dokumentasi Arsitektur** | `app/(private)/docs/page.tsx` (macOS floating sticky sidebar, syntax highlighted terminal blocks, diagram skema Neon, direktori REST API). | 24 Jam | Rp 225.000 | Rp 5.400.000 |
| **SUB** | **TOTAL KATEGORI 2 (FRONTEND DEVELOPMENT)** | | **324 Jam** | | **Rp 78.700.000** |

---

### Kategori 3: Integrasi Sistem, Backend & Microservice
| No | Komponen / Modul Pekerjaan | Spesifikasi Teknis (Berdasarkan File Proyek) | Estimasi Jam Kerja | Tarif Standar Pasar (IDR/Jam) | Subtotal (IDR) |
| :---: | :--- | :--- | :---: | :---: | :---: |
| 3.1 | **Database Architecture & Modeling** | `prisma/schema.prisma` (PostgreSQL Serverless, 7 Relational Models, Enums, Cascading integrity, Indexing timestamps & foreign keys). | 28 Jam | Rp 275.000 | Rp 7.700.000 |
| 3.2 | **Next.js REST API Route Handlers** | `app/api/admin/inventory/*`, `app/api/admin/sales/*`, `app/api/admin/employees/*`, `app/api/rfq` (Validasi input, CORS, error handling). | 32 Jam | Rp 250.000 | Rp 8.000.000 |
| 3.3 | **Machine Learning Microservice (FastAPI)** | `predict-service/main.py` (Python FastAPI, Pandas data extraction, Scikit-Learn Linear Regression 6 bulan, dynamic safety threshold 1.5x buffer). | 36 Jam | Rp 300.000 | Rp 10.800.000 |
| 3.4 | **Visualisasi Matematika ML (KaTeX)** | Integrasi `react-katex` & `katex` untuk rendering visual formula peramalan linear tren dan safety threshold pada UI gudang. | 12 Jam | Rp 250.000 | Rp 3.000.000 |
| 3.5 | **WhatsApp Field Worker Webhook API** | `app/api/bot/bot-webhook/route.ts` (Otomatisasi pencatatan log kerja borongan karyawan via bot pesan instan dengan update stok otomatis). | 24 Jam | Rp 275.000 | Rp 6.600.000 |
| 3.6 | **Excel & PDF Export Reporting Engine** | `app/api/reports/export/route.ts` (SheetJS / XLSX workbook generation) & modul cetak slip gaji/invoice resmi. | 16 Jam | Rp 225.000 | Rp 3.600.000 |
| 3.7 | **Progressive Web App (PWA) Engine** | `@ducanh2912/next-pwa` (Service Worker lifecycle, offline asset caching, web app manifest, icon maskable, prompt install banner). | 12 Jam | Rp 250.000 | Rp 3.000.000 |
| **SUB** | **TOTAL KATEGORI 3 (BACKEND & MICROSERVICE)** | | **160 Jam** | | **Rp 42.700.000** |

---

### Kategori 4: Technical SEO & Performance Tuning
| No | Komponen / Modul Pekerjaan | Spesifikasi Teknis (Berdasarkan File Proyek) | Estimasi Jam Kerja | Tarif Standar Pasar (IDR/Jam) | Subtotal (IDR) |
| :---: | :--- | :--- | :---: | :---: | :---: |
| 4.1 | **Structured Data (JSON-LD Schema.org)** | `components/JsonLdSchema.tsx` (Injeksi skema Organization, LocalBusiness dengan GPS koordinat, WebSite, OfferCatalog, dan Product Rich Snippets). | 16 Jam | Rp 250.000 | Rp 4.000.000 |
| 4.2 | **Metadata Architecture & Canonical Tags** | Konfigurasi Title Tag 50–60 karakter ber-CTR tinggi, Meta Description 150–160 karakter, OpenGraph, Twitter Card, dan Canonical URL per rute. | 16 Jam | Rp 225.000 | Rp 3.600.000 |
| 4.3 | **Automated Indexing Engine** | `app/robots.ts` (manajemen izin perayapan Googlebot/Bingbot) dan `app/sitemap.ts` (generator sitemap XML dinamis dengan prioritas & lastmod). | 8 Jam | Rp 225.000 | Rp 1.800.000 |
| 4.4 | **Branded Social Preview Asset (OG Image)** | `public/og-image.svg` (Pembuatan banner vektor resolusi 1200x630 piksel untuk pratinjau tautan WhatsApp, LinkedIn, dan media sosial). | 8 Jam | Rp 250.000 | Rp 2.000.000 |
| 4.5 | **Core Web Vitals & Asset Acceleration** | `font-display: swap` Geist font, DNS prefetch/preconnect Google Fonts, eliminasi CLS elemen visual, kompresi gambar modern AVIF/WebP. | 16 Jam | Rp 250.000 | Rp 4.000.000 |
| **SUB** | **TOTAL KATEGORI 4 (TECHNICAL SEO & PERFORMANCE)** | | **64 Jam** | | **Rp 15.400.000** |

---

### Kategori 5: Quality Assurance (QA), Security & Deployment
| No | Komponen / Modul Pekerjaan | Spesifikasi Teknis (Berdasarkan File Proyek) | Estimasi Jam Kerja | Tarif Standar Pasar (IDR/Jam) | Subtotal (IDR) |
| :---: | :--- | :--- | :---: | :---: | :---: |
| 5.1 | **Cross-Browser & Multi-Device Testing** | Pengujian kompatibilitas di Google Chrome, Apple Safari (macOS & iOS WebKit), Mozilla Firefox, Microsoft Edge, serta PWA Android. | 20 Jam | Rp 200.000 | Rp 4.000.000 |
| 5.2 | **Business Logic & Financial Validation** | Pengujian akurasi rumus kalkulasi upah borongan, integritas stok karung saat penjualan dibuat/dibatalkan, dan fallback ML service. | 20 Jam | Rp 225.000 | Rp 4.500.000 |
| 5.3 | **Production Deployment & Serverless CI/CD** | Konfigurasi production di Vercel, setup Environment Variables (`DATABASE_URL`, `PYTHON_ML_SERVICE_URL`), Prisma engine build, SSL setup. | 12 Jam | Rp 250.000 | Rp 3.000.000 |
| **SUB** | **TOTAL KATEGORI 5 (QA, TESTING & DEPLOYMENT)** | | **52 Jam** | | **Rp 11.500.000** |

---

## 3. REKAPITULASI BIAYA PENGEMBANGAN (DEVELOPMENT FEE)

| Kategori Pekerjaan | Alokasi Jam Kerja (Man-Hours) | Persentase Bobot | Total Biaya (IDR) |
| :--- | :---: | :---: | :---: |
| **Kategori 1: Riset, Perencanaan & UI/UX Design System** | 104 Jam | 14.8% | Rp 26.200.000 |
| **Kategori 2: Frontend & Core Web Development** | 324 Jam | 46.0% | Rp 78.700.000 |
| **Kategori 3: Integrasi Sistem, Backend & Microservice** | 160 Jam | 22.7% | Rp 42.700.000 |
| **Kategori 4: Technical SEO & Performance Tuning** | 64 Jam | 9.1% | Rp 15.400.000 |
| **Kategori 5: Quality Assurance (QA), Security & Deployment** | 52 Jam | 7.4% | Rp 11.500.000 |
| **TOTAL KESELURUHAN BIAYA PENGEMBANGAN (GROSS)** | **704 Jam** | **100.0%** | **Rp 174.500.000** |

---

## 4. ESTIMASI BIAYA OPERASIONAL & INFRASTRUKTUR TAHUNAN (RECURRING COST)

*Biaya operasional server cloud dan layanan pihak ketiga yang dibayarkan langsung ke penyedia infrastruktur:*

| No | Layanan / Komponen Infrastruktur | Spesifikasi & Provider Rekomendasi | Siklus Tagihan | Estimasi Biaya (IDR / Tahun) |
| :---: | :--- | :--- | :---: | :---: |
| 1 | **Domain Korporasi Resmi** | Domain `.co.id` (dengan verifikasi legalitas SIUP/NIB CV) atau `.com` via Registrar Resmi Indonesia / Namecheap. | Tahunan | Rp 275.000 – Rp 550.000 |
| 2 | **Next.js Cloud Hosting (Edge Serverless)** | **Vercel Pro Tier** (Global CDN, 1TB bandwidth, automated SSL, unlimited serverless execution, preview deployments). | Bulanan ($20/bulan) | Rp 3.840.000 |
| 3 | **PostgreSQL Serverless Cloud Database** | **Neon.tech Launch Tier** (Serverless autoscaling, pooled connections, automated daily snapshot backups, branching). | Bulanan ($19/bulan) | Rp 3.650.000 |
| 4 | **Python Microservice Container Host** | **Railway / Render Cloud** (Host runtime 24/7 untuk FastAPI Uvicorn model peramalan Machine Learning). | Bulanan ($7/bulan) | Rp 1.350.000 |
| 5 | **Sertifikat Keamanan SSL / TLS** | Automated Wildcard SSL Certificate (Managed by Vercel / Let's Encrypt Enterprise). | Tahunan | **Rp 0 (Gratis)** |
| **TOTAL** | **ESTIMASI BIAYA INFRASTRUKTUR TAHUNAN** | *(Dapat disesuaikan berdasarkan volume trafik & transaksi)* | **Tahunan** | **Rp 9.115.000 / Tahun** |

---

## 5. BIAYA PEMELIHARAAN & DUKUNGAN TEKNIS (MAINTENANCE - OPSIONAL)

| Paket Layanan | Cakupan Layanan & SLA | Estimasi Biaya (IDR / Bulan) | Estimasi Biaya (IDR / Tahun) |
| :--- | :--- | :---: | :---: |
| **Paket Standar (SLA 24 Jam)** | Monitoring uptime 99.9%, security patch dependensi npm/Python, backup database mingguan, perbaikan bug minor. | Rp 2.500.000 / bln | Rp 27.500.000 / thn *(Diskon 1 bulan)* |
| **Paket Korporat Premium (SLA 4 Jam)** | Dukungan 24/7 tim teknis, optimasi berkala model ML, penambahan minor fitur/laporan, retraining dataset, prioritas tiket WhatsApp. | Rp 5.000.000 / bln | Rp 55.000.000 / thn *(Diskon 1 bulan)* |

---

## 6. SIMULASI PERBANDINGAN HARGA PASAR INDONESIA (2026)

Untuk memberikan transparansi penuh kepada manajemen **CV Berkat Mandiri**, berikut 2 opsi skema penawaran yang berlaku umum di pasar pengembangan teknologi Indonesia:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SKEMA A: SENIOR INDEPENDENT DEVELOPER / FREELANCER (Rp 95.000.000 - 125.000.000)  │
│ Cocok untuk eksekusi fleksibel dengan anggaran efisien dan kualitas senior. │
├─────────────────────────────────────────────────────────────────────────────┤
│ SKEMA B: SOFTWARE HOUSE / DIGITAL AGENCY RESMI (Rp 175.000.000 - 245.000.000)│
│ Standar korporasi lengkap dengan dedicated PM, QA, garansi kontrak, & PPN.  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Skema A: Senior Freelancer / Tech Lead Consultant
* **Karakteristik:** Dikerjakan langsung oleh Senior Full-Stack Engineer / Technical Architect berpengalaman tinggi.
* **Overhead Biaya:** Rendah (tidak ada biaya operasional kantor agensi besar atau struktur manajemen berjenjang).
* **Alokasi Jam Kerja Terdiskon:** 704 Jam dengan efisiensi paket borongan proyek.
* **Rentang Harga Pasar:** **Rp 95.000.000 – Rp 125.000.000** (Rata-rata: **Rp 110.000.000**).
* **Garansi Bug Fixing:** 1 s/d 2 Bulan setelah serah terima sistem.

### Skema B: Software House / Digital Agency Resmi (PT/CV)
* **Karakteristik:** Melibatkan tim multidisiplin formal (Project Manager, UI/UX Designer, Frontend Developer, Backend Developer, QA Engineer, DevOps).
* **Kelengkapan Dokumen:** Kontrak legal perusahaan, Surat Perjanjian Kerja (SPK), Berita Acara Serah Terima (BAST), Faktur Pajak (PPN 11%).
* **Rentang Harga Pasar:** **Rp 175.000.000 – Rp 245.000.000** (Rata-rata: **Rp 210.000.000 + PPN**).
* **Garansi Bug Fixing & SLA:** 3 s/d 6 Bulan garansi penuh dengan tim support siaga.

---

## 7. KESIMPULAN & REKOMENDASI ARSITEKTUR

1. **Efisiensi Investasi:** Nilai fungsional yang dibangun pada sistem CV Berkat Mandiri saat ini setara dengan platform ERP kelas menengah yang memadukan portal marketing B2B global dengan operasi pabrik harian.
2. **Kesiapan Skalabilitas:** Menggunakan arsitektur serverless (Next.js 16 + Neon PostgreSQL) memastikan biaya server awal dapat dimulai dari tier gratis/minimal dan baru bertumbuh secara proporsional sesuai ekspansi omzet perusahaan.
3. **Dokumen Resmi:** Rincian ini telah diarsipkan secara permanen ke dalam file repositori proyek [RAB-CV-Berkat-Mandiri.md](file:///Users/syahrizaalsistani/Documents/Projects/CV%20Berkat%20Mandiri/berkat-mandiri/RAB-CV-Berkat-Mandiri.md) dan siap digunakan sebagai lampiran proposal teknis maupun acuan audit investasi IT perusahaan.
