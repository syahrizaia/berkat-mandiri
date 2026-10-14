# DOKUMEN SPESIFIKASI KEBUTUHAN PRODUK (PRODUCT REQUIREMENTS DOCUMENT - PRD)
## PROYEK: PLATFORM DIGITAL BISNIS TERPADU "CV BERKAT MANDIRI"
### (PORTAL PERDAGANGAN B2B EKSPOR & SISTEM OPERASIONAL TERPADU)

---

| Informasi Dokumen | Keterangan Detail |
| :--- | :--- |
| **Nama Proyek** | Website Korporasi B2B & Sistem Operasional CV Berkat Mandiri |
| **URL Website Resmi** | [https://cvberkatmandiri.vercel.app](https://cvberkatmandiri.vercel.app) |
| **Entitas Usaha** | CV Berkat Mandiri (Produsen & Eksportir Karung Goni & Plastik PP Woven) |
| **Status Dokumen** | **Final Release / Production Verified (V 1.0)** |
| **Peran Penyusun** | Principal Product Manager & Senior Business System Analyst |
| **Audiens Dokumen** | Dewan Direksi CV Berkat Mandiri, Tim Manajemen, Klien Korporat, & Tim Teknis |
| **Bahasa & Pendekatan** | Bahasa Bisnis Indonesia Komunikatif (*Client-Friendly & Value-Oriented*) |

---

## 1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)

### 1.1. Latar Belakang & Urgensi Bisnis
**CV Berkat Mandiri** adalah perusahaan manufaktur dan distribusi pengemasan industri terkemuka di Indonesia yang memproduksi tiga lini produk utama:
1. **Karung Goni Alami (*Natural Jute Bags*)** berstandar ekspor komoditas agrikultur (kopi, kakao, rempah-rempah),
2. **Karung Plastik PP Woven (*High-Density Polypropylene*)** untuk muatan beban berat (beras, pupuk, gula, pakan ternak, semen, dan bahan kimia),
3. **Karung Laminasi BOPP (*Custom Printing*)** dengan teknologi rotogravure resolusi tinggi untuk pengemasan retail premium.

Dalam industri perdagangan B2B dan ekspor internasional saat ini, pembeli korporat (*corporate buyers*) dan perwakilan pengadaan luar negeri (*foreign procurement managers*) tidak lagi mengandalkan brosur kertas atau kartu nama konvensional. Mereka menuntut **kehadiran digital yang kredibel, transparan, dan mampu membuktikan kapasitas produksi, standar pengawasan mutu (QC), serta kesiapan logistik pelabuhan**.

### 1.2. Tujuan Utama Pembuatan Platform
1. **Membangun Otoritas & Kredibilitas Internasional:** Menghadirkan portal profil korporasi kelas dunia dengan tampilan visual modern (*Apple Liquid Glass*) yang membuktikan legalitas, sertifikasi, dan kapasitas pabrik CV Berkat Mandiri.
2. **Mesin Akuisisi Pelanggan B2B Otomatis:** Mengubah pengunjung website dari calon pembeli pasif menjadi *inbound leads* berkualitas melalui fitur interaktif seperti **Kalkulator Logistik Kontainer** dan **Formulir Penawaran Harga Cepat (RFQ via WhatsApp Resmi)**.
3. **Efisiensi Rantai Operasional Terpadu (ERP):** Mengintegrasikan portal publik dengan sistem operasional gudang, kalkulasi gaji borongan per lembar karung, penerbitan faktur penjualan dan Surat Jalan, hingga prediksi kebutuhan stok berbasis kecerdasan buatan (*Machine Learning*).

### 1.3. Dampak Bisnis yang Diharapkan (*Expected Business Impact*)
* **Peningkatan Rasio Konversi Penjualan:** Calon klien dapat langsung menghitung estimasi muatan kontainer dan mengirimkan spesifikasi pesanan secara terstruktur dalam waktu kurang dari 2 menit.
* **Dominasi Pencarian Google (Trafik Organik Tanpa Biaya Iklan):** Website dioptimalkan secara teknis agar kata kunci bernilai komersial tinggi seperti *"Supplier Karung Goni Ekspor"* dan *"Pabrik Karung Plastik PP Woven"* dapat menembus halaman pertama Google.
* **Kepercayaan Mitra Ekspor:** Ketersediaan data spesifikasi teknis lengkap, titik pelabuhan muat (*Port of Loading Tanjung Priok IDTPP*), serta komitmen *Zero-Defect* memberikan rasa aman bagi pembeli skala puluhan kontainer.

---

## 2. TARGET PENGUNJUNG & PROFIL PELANGGAN (TARGET AUDIENCE & USER PERSONA)

Website ini dirancang secara khusus untuk menjawab kebutuhan 4 profil pengunjung utama:

```
                                  +----------------------------------------------------+
                                  |         TARGET AUDIENCE CV BERKAT MANDIRI          |
                                  +----------------------------------------------------+
                                                            |
            +-----------------------+-----------------------+-----------------------+
            |                       |                       |                       |
            v                       v                       v                       v
    [ 1. BUYER EKSPOR B2B ]   [ 2. PENGADAAN INDUSTRI ]   [ 3. PEMILIK MERK RETAIL ]  [ 4. MANAJEMEN INTERNAL ]
    * Eksportir Kopi/Kakao    * Pabrik Beras/Pupuk        * Distributor Grosir     * Mandor Pabrik & Admin
    * Kebutuhan: B-Twill Jute * Kebutuhan: PP Woven Kuat  * Kebutuhan: BOPP Print  * Kebutuhan: Stok & Gaji
```

### 2.1. Profil Pengunjung Eksternal

| Profil Pengguna | Karakteristik & Latar Belakang | Kebutuhan Utama Saat Membuka Website | Fitur Website yang Menjawab Kebutuhan |
| :--- | :--- | :--- | :--- |
| **Buyer Ekspor Komoditas (B2B Exporter)** | Eksportir biji kopi specialty, kakao, dan rempah-rempah ke Eropa, Amerika, dan Timur Tengah. | Membutuhkan karung goni yang memiliki sirkulasi udara optimal (*breathable*), bebas kontaminasi kimia, dan memiliki sertifikasi standar B-Twill ekspor. | Halaman Katalog Produk Goni, Informasi Port of Loading Tanjung Priok, dan tombol WhatsApp RFQ Ekspor. |
| **Manajer Pengadaan Pabrik (Procurement Officer)** | Divisi *purchasing* pabrik pupuk, penggilingan padi modern, semen, atau produsen pakan ternak nasional. | Mencari suplai karung plastik PP woven puluhan ribu lembar per bulan dengan ketahanan sobek tinggi (*high tensile strength*) dan harga pabrik kompetitif. | Tabel Spesifikasi Denier Karung PP, Kalkulator Muatan Kontainer/Truk, serta Legalitas Perusahaan. |
| **Pemilik Merk / Distributor Beras Retail** | Pengusaha agribisnis dan beras premium yang mendistribusikan produk ke supermarket/hypermarket. | Membutuhkan karung dengan tampilan mengkilap (*glossy/matte*), desain cetak multi-warna beresolusi tinggi (BOPP) untuk mempercantik display rak toko. | Portofolio Karung Laminasi BOPP, contoh ketajaman cetak Rotogravure, dan opsi pemesanan sampel gratis. |

### 2.2. Profil Pengguna Internal Perusahaan

| Profil Internal | Tanggung Jawab Operasional | Kebutuhan Sistem | Solusi yang Disediakan |
| :--- | :--- | :--- | :--- |
| **Mandor Gudang & Supervisor Lapangan** | Mengawasi ratusan pekerja borongan yang mencuci, melipat, dan menjahit karung di pabrik. | Pencatatan hasil kerja pekerja borongan harian tanpa perlu input manual di lembaran kertas yang rentan hilang atau basah. | Integrasi Bot WhatsApp Webhook (`/api/bot/bot-webhook`) dan Modul Karyawan Internal (`/employees`). |
| **Direksi & Manajer Keuangan** | Memantau perputaran arus kas, margin keuntungan penjualan, dan kecukupan stok menjelang musim panen. | Laporan keuangan transparan, pembuatan Surat Jalan otomatis, dan peringatan dini jika stok karung menipis. | Dashboard Eksekutif (`/dashboard`), Modul Penjualan (`/sales`), dan Algoritma Prediksi Stok AI (`predict-service`). |

---

## 3. PETA SITUS & ALUR PERJALANAN PENGUNJUNG (SITEMAP & USER JOURNEY)

### 3.1. Struktur Peta Situs (Sitemap Architecture)

```
CV BERKAT MANDIRI DIGITAL PLATFORM
│
├── [AREA PUBLIK - PORTAL BISNIS & AKUISISI KLIEN]
│   ├── / (Halaman Utama / Landing Page)
│   │   ├── Apple Vision Hero Section (Focal Glass Showcase)
│   │   ├── Bento Grid: Keunggulan Kompetitif & Uji Ketahanan
│   │   ├── Kalkulator Logistik Kontainer (FCL 20ft & 40ft HC)
│   │   ├── Formulir Permintaan Penawaran Cepat (RFQ)
│   │   ├── Dashboard Analitik Penjualan Transparan (Simulasi)
│   │   ├── Sorotan Katalog Produk Unggulan
│   │   └── Call-to-Action (CTA) Obsidian Glass & Direct WhatsApp
│   │
│   ├── /about (Profil, Cerita Perjalanan, Visi, Misi, & Statistik Pabrik)
│   ├── /product (Katalog Lengkap Spesifikasi Teknis, Dimensi, & Opsi Cetak)
│   ├── /advantages (Rincian Komitmen Mutu QC, Kapasitas Mesin Loom, & Pelabuhan)
│   ├── /contact (Peta Operasional Bekasi, Port Tanjung Priok, & Form Kontak)
│   ├── /privacy (Kebijakan Privasi Perlindungan Data Mitra Korporat)
│   └── /terms (Syarat & Ketentuan Perdagangan, Pembayaran, & Prosedur Klaim)
│
└── [AREA PRIVAT - ENTERPRISE RESOURCE PLANNING (ERP)]
    ├── /dashboard (Ringkasan Eksekutif, Pendapatan, & Indikator Kritis)
    ├── /inventory (Katalog Stok Real-Time, Ambang Batas Minimum, & Tarif Borongan)
    ├── /employees (Pencatatan Pekerja, Log Kerja Cuci/Lipat/Jahit, & Slip Gaji)
    ├── /sales (Penerbitan Faktur Penjualan, Status Pembayaran, & Surat Jalan Kurir)
    ├── /reports (Buku Kas Keuangan, Arus Kas Masuk/Keluar, & Ekspor Excel)
    ├── /help (Pusat Bantuan, Panduan Penggunaan Sistem, & Layanan IT)
    └── /docs (Dokumentasi Teknis Prosedur Operasional Standar)
```

### 3.2. Alur Perjalanan Pengunjung Menuju Konversi (Conversion Journey Flow)

```
   [ LANGKAH 1: PENEMUAN ]
   Calon klien mencari kata kunci "Supplier Karung Goni Ekspor" di Google 
   --> Menemukan link resmi CV Berkat Mandiri dengan snippet harga & bintang rating.
                            │
                            ▼
   [ LANGKAH 2: DAYA TARIK PERTAMA (FIRST IMPRESSION) ]
   Website terbuka kilat (< 0.8 detik) dengan animasi fluida dan desain Apple Liquid Glass
   --> Pengunjung langsung melihat status "Siap Pengapalan Ekspor Global (FCL)".
                            │
                            ▼
   [ LANGKAH 3: PEMBUKTIAN KREDIBILITAS & SPESIFIKASI ]
   Pengunjung membaca spesifikasi karung (B-Twill / Denier tinggi) & melihat komitmen QC 99.4%
   --> Menggunakan Kalkulator Logistik untuk menghitung kapasitas muat kontainer 40ft.
                            │
                            ▼
   [ LANGKAH 4: AKSI KONVERSI (LEAD GENERATION) ]
   Pengunjung menekan tombol "Minta Penawaran Harga (RFQ)" atau "WhatsApp Sales"
   --> Sistem otomatis menyusun draf pesan WhatsApp berisi tipe karung dan volume yang diinginkan.
                            │
                            ▼
   [ LANGKAH 5: CLOSING & DEAL BISNIS ]
   Tim Penjualan CV Berkat Mandiri menerima pesan WhatsApp terstruktur dan mengirimkan sampel fisik
   --> Kesepakatan kontrak penjualan ditandatangani dan dimasukkan ke dalam sistem ERP.
```

---

## 4. RINCIAN FITUR & SPESIFIKASI HALAMAN (FUNCTIONAL REQUIREMENTS)

Berikut adalah rincian lengkap setiap modul halaman pada website publik CV Berkat Mandiri, mencakup konten visual, cara kerja interaksi, dan manfaat bisnis nyatanya bagi perusahaan:

### 4.1. Navigasi Atas (Header & Navbar Public)
* **Apa yang Ditampilkan:**
  * Logo korporat CV Berkat Mandiri dengan lambang bola dunia berkilau (*jewel icon*).
  * Teks identitas *"CV Berkat Mandiri - Global Packaging Exporter"*.
  * Tautan navigasi ringkas: Beranda, Tentang Kami, Produk, dan Keunggulan.
  * Tombol aksi cepat: *"Hubungi Kami"* dengan efek kilau cairan (*liquid sheen*).
  * Menu responsif (*hamburger drawer*) untuk kemudahan navigasi di layar smartphone.
* **Cara Kerjanya:**
  * Menggunakan sistem *Smart Floating Pill*: Saat halaman digulir ke bawah (*scroll down*), bilah navigasi mengecil secara mulus dan latar belakang kaca menjadi lebih buram (*blur*) dengan bayangan halus, memastikan keterbacaan tetap sempurna tanpa menghalangi konten di bawahnya.
  * Menampilkan indikator titik aktif (*active indicator*) pada menu halaman yang sedang dibuka.
* **Manfaat Bisnis bagi Klien:**
  * Memberikan kesan pertama bahwa perusahaan sangat profesional, modern, dan memperhatikan detail.
  * Memastikan calon klien dapat berpindah halaman atau langsung menghubungi tim penjualan hanya dengan 1 sentuhan jari, kapan pun dan di halaman mana pun mereka berada.

---

### 4.2. Halaman Utama: Bagian Pembuka (Hero Section)
* **Apa yang Ditampilkan:**
  * Lencana status menyala: *"LIVE - Siap Pengapalan Ekspor Global"*.
  * Judul utama tegas: *"Supplier Karung Goni & Plastik Woven PP untuk Industri & Ekspor Global"*.
  * Paragraf ringkas yang menonjolkan komitmen menjaga integritas rantai pasok komoditas pembeli.
  * Dua tombol tindakan utama: *"Lihat Katalog Produk"* (Warna Hijau Zamrud Berkilau) dan *"Pelajari Profil Perusahaan"* (Kaca Transparan).
  * Panel Panggung Visual Kaca 3D (*Apple Vision Stage*) di sisi kanan yang menampilkan 3 kartu metrik dinamis:
    1. Pengapalan Kontainer FCL dari Tanjung Priok,
    2. Uji Beban & Ketahanan lulus 99.4%,
    3. Layanan Sampel Fisik Gratis sebelum kontrak.
  * Statistik ringkas: **10M+ Karung Terdistribusi** dan **24/7 Tracking Support**.
* **Cara Kerjanya:**
  * Seluruh elemen muncul dengan animasi pegas yang lembut (*Apple Spring Animation*). Saat kursor mouse diarahkan ke kartu metrik di sisi kanan, kartu akan membesar sedikit (*hover float*) dengan efek bias cahaya kaca.
* **Manfaat Bisnis bagi Klien:**
  * Dalam 5 detik pertama, calon pembeli langsung paham apa yang dijual perusahaan, skala kapasitasnya (kontainer ekspor), dan tingkat keandalannya, sehingga menurunkan tingkat pengunjung yang langsung keluar (*bounce rate*).

---

### 4.3. Bagian Keunggulan Kompetitif (Bento Grid: Why Choose Us?)
* **Apa yang Ditampilkan:**
  * Tata letak kotak modern 3 kolom (*Bento Grid Card*) dengan ikon tematik:
    1. **Kualitas Standar Ekspor (*Zero-Defect Commitment*):** Penjelasan mengenai uji ketahanan guncangan kapal dan cuaca laut ekstrem.
    2. **Kapasitas Produksi Besar (*Continuous Output*):** Ketersediaan lini mesin tenun modern *circular loom* untuk mengamankan kuota puluhan kontainer saat musim panen raya.
    3. **Manajemen Data Transparan (*Digital Audit Trail*):** Kemudahan dokumentasi ekspor (*Bill of Lading*, sertifikat asal kargo) yang meminimalisir kesalahan audit logistik mitra korporat.
* **Cara Kerjanya:**
  * Kartu kaca memiliki garis tepi putih halus yang berubah menjadi aksen hijau zamrud saat disorot kursor, dilengkapi panah interaktif yang bergerak ke kanan.
* **Manfaat Bisnis bagi Klien:**
  * Mengeliminasi keraguan calon pembeli (*buyer skepticism*) terhadap kualitas dan ketepatan waktu pengiriman, memposisikan CV Berkat Mandiri jauh di atas kompetitor tradisional yang belum memiliki standardisasi.

---

### 4.4. Alat Bantu Interaktif: Kalkulator Logistik Kontainer & Formulir RFQ
* **Apa yang Ditampilkan:**
  * **Kalkulator Logistik Kontainer:** Alat simulasi interaktif yang memungkinkan calon klien memilih jenis karung (Goni / PP Woven / Laminasi), memilih ukuran kontainer kapal (**20ft Standard** kapasitas ~28 CBM atau **40ft High Cube** kapasitas ~68 CBM), dan memasukkan jumlah lembar pesanan.
  * **Formulir Permintaan Penawaran (RFQ Form):** Kolom isian nama perusahaan, nama narahubung, alamat email, pilihan produk karung, perkiraan volume pemesanan, dan catatan kebutuhan khusus.
* **Cara Kerjanya:**
  * Pengunjung memasukkan angka pesanan -> Kalkulator secara *real-time* (tanpa memuat ulang halaman) menampilkan estimasi berat total (kg), persentase ruang kontainer yang terisi, dan jumlah palet kargo yang dibutuhkan.
  * Menekan tombol *"Kirim RFQ"* akan memvalidasi data dan langsung mengarahkan pengunjung ke obrolan WhatsApp resmi dengan pesan yang sudah terformat rapi sesuai simulasi yang dilakukan.
* **Manfaat Bisnis bagi Klien:**
  * **Mempercepat Proses Penjualan (*Lead Acceleration*):** Calon pembeli tidak perlu menebak-nebak berapa karung yang muat di kontainer mereka. Tim penjualan CV Berkat Mandiri menerima pesan penawaran yang sudah terstruktur lengkap dengan data kuantitas dan jenis karung.

---

### 4.5. Katalog Produk Komersial (Apple Bento Product Cards)
* **Apa yang Ditampilkan:**
  Tiga kartu produk utama dengan rincian spesifikasi teknis mendalam:
  1. **Karung Goni Alami (*Premium Jute Bag*):**
     * *Lencana:* 100% Biodegradable & Eco-Friendly.
     * *Spesifikasi:* Pilihan ukuran 50x75 cm (hingga 25 kg) dan 75x110 cm (hingga 60 kg, standar ekspor B-Twill). Jahitan ganda *Double Lock Stitch*, sirkulasi udara bebas jamur.
  2. **Karung Plastik PP Woven (*High-Density Polymer*):**
     * *Lencana:* High Tensile Strength & Anti-Slip.
     * *Spesifikasi:* Pilihan ukuran 45x75 cm (25 kg), 56x90 cm (50 kg), dan 60x100 cm (60 kg super tebal). Kerapatan benang 600 - 1000+ Denier, tahan timbunan kargo, opsi lapisan dalam (*inner liner* PE) kedap air.
  3. **Karung Laminasi BOPP (*Custom Rotogravure Printing*):**
     * *Lencana:* Full Color Retail Branding & 100% Waterproof.
     * *Spesifikasi:* Pilihan ukuran 35x55 cm (5-10 kg) dan 45x75 cm (25 kg). Lapisan plastik film BOPP cetak grafis resolusi tinggi, finishing *Glossy* atau *Elegant Matte*.
* **Cara Kerjanya:**
  * Setiap kartu memiliki tombol aksi langsung *"Minta Penawaran Harga (RFQ)"* yang membuka WhatsApp dengan format pertanyaan otomatis sesuai nama produk yang dipilih.
* **Manfaat Bisnis bagi Klien:**
  * Memberikan transparansi spesifikasi teknis tanpa menyembunyikan informasi penting, memudahkan manajer pengadaan melakukan komparasi spesifikasi dengan standar internal pabrik mereka.

---

### 4.6. Bagian Penutup & Aksi Kontak (CTA Obsidian Glass Stage)
* **Apa yang Ditampilkan:**
  * Panel kaca hitam obsidian yang megah (*Liquid Glass Dark*) dengan pancaran cahaya ambient zamrud.
  * Teks persuasif: *"Siap Memperluas Rantai Pasok Produk Anda Bersama Kami?"*.
  * Dua opsi saluran kontak instan:
    1. **Email Bisnis Resmi:** `info@cvberkatmandiri.com` untuk pengiriman dokumen tender formal.
    2. **WhatsApp Sales Representative:** `+62 859-5459-7029` untuk konsultasi cepat dan permintaan sampel fisik.
* **Cara Kerjanya:**
  * Tautan email membuka aplikasi email pengguna dengan subjek otomatis, sedangkan tautan WhatsApp membuka chat langsung dengan narahubung resmi.
* **Manfaat Bisnis bagi Klien:**
  * Menjadi penangkap prospek (*lead capture*) terakhir sebelum pengunjung meninggalkan website, memastikan calon klien memiliki akses langsung ke staf representatif perusahaan.

---

### 4.7. Kaki Halaman (Footer Public)
* **Apa yang Ditampilkan:**
  * Identitas legal dan logo perusahaan lengkap dengan lencana akreditasi *"ISO & Export Grade"* dan *"B2B Specialist"*.
  * Navigasi tautan cepat ke seluruh katalog produk dan artikel profil perusahaan.
  * Informasi pusat operasional: Alamat kantor di Kawasan Industri Logistik Prima Bekasi dan Pelabuhan Muat Resmi (*Tanjung Priok International Port IDTPP*).
  * Tautan hukum: Syarat & Ketentuan Perdagangan serta Kebijakan Privasi.
  * Hak Cipta Tahun Berjalan (`2026 CV Berkat Mandiri`) dengan tautan tersembunyi yang aman menuju portal login ERP internal (`/dashboard`).
* **Cara Kerjanya:**
  * Tautan alamat email dapat disalin otomatis (*select-all*), dan seluruh tautan halaman internal dimuat secara instan menggunakan teknologi *Next.js Link Prefetching*.
* **Manfaat Bisnis bagi Klien:**
  * Menegaskan transparansi legalitas dan mempermudah pengarsipan data kontak oleh staf administrasi klien yang menyusun daftar vendor (*vendor registry*).

---

### 4.8. Ringkasan Modul ERP Operasional Terpadu (Internal Modules)

Selain portal publik, sistem ini memiliki modul operasional terpadu di balik layar yang dapat diakses oleh staf internal CV Berkat Mandiri:

```
+--------------------------------------------------------------------------------------------------+
|                              MODUL OPERASIONAL TERPADU (ERP INTERNAL)                            |
+-------------------+------------------------------------+-----------------------------------------+
| Modul / URL       | Fitur Fungsional Utama             | Nilai Manfaat bagi Bisnis CV Berkat     |
+-------------------+------------------------------------+-----------------------------------------+
| /dashboard        | Visualisasi metrik omzet, jumlah   | Memberikan pandangan menyeluruh bagi    |
|                   | pesanan aktif, dan peringatan stok | direksi dalam mengambil keputusan       |
|                   | karung yang menipis secara harian. | bisnis tanpa menunggu laporan akhir     |
|                   |                                    | bulan.                                  |
+-------------------+------------------------------------+-----------------------------------------+
| /inventory        | Manajemen master SKU karung, stok  | Mencegah terjadinya selisih stok fisik  |
|                   | riil gudang, dan konfigurasi tarif | di gudang dan memastikan akurasi data   |
|                   | upah borongan per lembar karung.   | saat menerima pesanan skala kontainer.  |
+-------------------+------------------------------------+-----------------------------------------+
| /employees        | Pencatatan log kerja buruh cuci,   | Menghilangkan kecurangan atau kesalahan |
|                   | lipat, dan jahit dengan kalkulasi  | hitung manual dalam penggajian pekerja  |
|                   | slip gaji borongan otomatis.       | borongan pabrik.                        |
+-------------------+------------------------------------+-----------------------------------------+
| /sales            | Pembuatan faktur (Invoice) B2B,    | Mempercepat proses pengiriman barang ke |
|                   | status lunas/pending, dan pener-   | pelabuhan dan mempermudah penagihan kas |
|                   | bitan Surat Jalan kurir armada.    | ke perusahaan pembeli.                  |
+-------------------+------------------------------------+-----------------------------------------+
| /reports          | Buku kas arus masuk/keluar, grafik | Mempermudah rekonsiliasi akuntansi dan  |
|                   | tren penjualan bulanan, serta fitur| persiapan pelaporan pajak perusahaan.   |
|                   | ekspor data ke format Excel/PDF.   |                                         |
+-------------------+------------------------------------+-----------------------------------------+
| predict-service   | Algoritma Kecerdasan Buatan (ML)   | Mengantisipasi lonjakan permintaan karung|
| (Microservice AI) | yang menganalisis data riwayat un- | saat panen raya 6 bulan ke depan agar   |
|                   | tuk memprediksi stok bulan depan.  | pabrik tidak kehabisan bahan baku.      |
+-------------------+------------------------------------+-----------------------------------------+
| bot-webhook       | Integrasi webhook WhatsApp untuk   | Memungkinkan mandor di lapangan mencatat|
| (WhatsApp Bot)    | input hasil kerja harian buruh via | hasil kerja hanya dengan mengirim pesan |
|                   | pesan chat WhatsApp sederhana.     | teks biasa dari ponsel mereka.          |
+-------------------+------------------------------------+-----------------------------------------+
```

---

## 5. STANDAR DESAIN & PENGALAMAN PENGGUNA (UI/UX DESIGN SYSTEM)

### 5.1. Konsep Visual: Apple Liquid Glass & Estetika Kaca Fluida
Website dirancang mengikuti standar estetika antarmuka terdepan (*state-of-the-art*) yang terinspirasi oleh bahasa desain Apple Vision:
* **Efek Kaca Tembus Pandang (*Liquid Glass Backdrop Blur 24px*):** Panel konten tampak melayang di atas latar belakang dengan efek kaca buram berkilau (*specular highlights*), menciptakan kesan mewah, modern, dan bernilai tinggi.
* **Latar Belakang Bergerak Dinamis (*Continuous Fluid Wave Background*):** Empat lapisan animasi fluida air dan gradasi aurora hijau zamrud yang mengalir perlahan tanpa henti di belakang halaman, melambangkan kelancaran rantai pasok logistik laut dan kesegaran serat alam goni.
* **Peredam Gerakan (*Accessibility Friendly*):** Dilengkapi fitur otomatis `@media (prefers-reduced-motion)` sehingga jika pengunjung menyalakan pengaturan penghemat daya atau sensitif terhadap gerakan, animasi background akan otomatis berhenti secara statis dan elegan.

### 5.2. Palet Warna Korporat (*Curated Corporate Palette*)
Warna-warna yang digunakan dipilih secara cermat untuk mencerminkan stabilitas industri, keberlanjutan lingkungan, dan kredibilitas korporat:

| Kode Peran Warna | Nuansa Warna | Filosofi & Representasi Bisnis |
| :--- | :--- | :--- |
| **Emerald Green** (`#059669` / `#10B981`) | Hijau Zamrud Alami | Melambangkan serat tanaman goni ramah lingkungan, komoditas agrikultur Indonesia, dan komitmen keberlanjutan (*sustainability*). |
| **Ocean Teal** (`#0D9488` / `#14B8A6`) | Biru Laut Dalam | Melambangkan jalur pelayaran kargo laut internasional, ekspansi ekspor global, dan keandalan logistik kontainer. |
| **Corporate Slate** (`#0F172A` / `#334155`) | Abu-Abu Gelap Solid | Digunakan pada judul dan teks utama untuk memastikan keterbacaan yang sangat tegas, tajam, dan formal di segala kondisi layar. |
| **Obsidian Glass** (`#020617` berkabut) | Kaca Hitam Premium | Digunakan pada panel penutup (CTA) dan footer untuk memberikan nuansa penutup yang eksklusif dan berwibawa. |

### 5.3. Tipografi & Kontras Keterbacaan Tinggi (*High Contrast Readability*)
* Menggunakan jenis huruf modern **Geist Sans** dari Vercel yang dioptimalkan untuk keterbacaan di layar digital resolusi tinggi (*Retina Display*).
* Setiap teks pada kartu kaca menggunakan tingkat kontras minimal **4.5:1** (memenuhi standar aksesibilitas internasional WCAG 2.1 AA), menjamin teks tidak akan pernah tampak samar atau tenggelam meskipun dibuka di bawah terik sinar matahari langsung.

### 5.4. Responsivitas Sempurna di Semua Perangkat (*Adaptive Layout*)
Website dirancang dengan prinsip *Mobile-First*. Tampilan secara cerdas menyesuaikan diri tanpa merusak tata letak di 3 jenis perangkat:
1. **Layar Ponsel (Smartphone, 360px - 640px):** Tata letak berubah menjadi 1 kolom vertikal yang lapang, tombol aksi membesar agar mudah ditekan ibu jari, dan menu atas tersimpan rapi di dalam drawer geser.
2. **Layar Tablet (iPad / Tablet, 768px - 1024px):** Tata letak berubah menjadi 2 kolom grid dengan proporsi gambar dan kalkulator yang seimbang.
3. **Layar Komputer & Laptop (Desktop, 1280px - 1920px+):** Menampilkan panggung penuh 3 kolom Bento Grid dengan detail visual maksimal dan efek interaksi kursor (*hover effect*).

---

## 6. KUALITAS SISTEM, KECEPATAN & OPTIMASI GOOGLE (NON-FUNCTIONAL REQUIREMENTS)

### 6.1. Kecepatan Muat Ekstrem & Performa (*Core Web Vitals*)
Website dibangun dengan target kecepatan tertinggi Google:
* **Largest Contentful Paint (LCP) < 1.2 Detik:** Konten utama halaman langsung tampil utuh dalam waktu sekejap saat pertama kali dibuka.
* **Cumulative Layout Shift (CLS) = 0.00:** Tidak ada elemen halaman yang bergeser atau melompat secara tiba-tiba saat gambar sedang dimuat, memberikan kenyamanan membaca maksimal bagi pengunjung.
* **Font Display Swap & DNS Prefetch:** Huruf dimuat instan tanpa jeda kosong (*flash of invisible text*), dan koneksi ke server Google serta Vercel dipersiapkan lebih awal di latar belakang.

### 6.2. Optimasi Mesin Pencari Google (Advanced Technical SEO)
Agar CV Berkat Mandiri dapat mendominasi halaman pertama pencarian Google tanpa perlu terus-menerus membayar biaya iklan, website telah dilengkapi dengan:
1. **Struktur Data Terverifikasi (Schema.org JSON-LD):** Menanamkan kode khusus yang memberi tahu mesin pencari Google bahwa website ini adalah organisasi resmi (*Organization*), bisnis lokal berbadan hukum (*LocalBusiness*), dengan katalog produk ekspor bersertifikat (*Product & OfferCatalog*).
2. **Pratinjau Media Sosial Eksklusif (Open Graph 1200x630):** Saat tautan `https://cvberkatmandiri.vercel.app` dibagikan di grup WhatsApp, LinkedIn, atau Facebook, kartu pratinjau (*card preview*) otomatis muncul dengan banner beresolusi tinggi, logo resmi, dan deskripsi perusahaan yang meyakinkan.
3. **Peta Situs Otomatis (*Dynamic Sitemap.xml*):** Peta situs yang otomatis memperbarui daftar halaman publik setiap kali ada perubahan konten untuk memudahkan robot perayap Google (*Googlebot*) mengindeks website secara berkala.
4. **Instruksi Perayapan Terkendali (*Robots.txt*):** Membuka akses penuh bagi mesin pencari ke halaman publik, sekaligus mengunci dan merahasiakan rute sistem internal perusahaan (`/dashboard`, `/inventory`, `/api`) agar tidak bocor ke publik.

### 6.3. Standar Keamanan & Keandalan Server (Security & High Availability)
* **Sertifikat Keamanan SSL/HTTPS 256-Bit:** Seluruh lalu lintas data antara pengunjung dan website dienkripsi secara penuh dengan protokol keamanan perbankan (gembok hijau/aman di browser).
* **Jaringan Distribusi Konten Global (Vercel Edge Global CDN):** Website diduplikasi di puluhan pusat data di seluruh dunia (termasuk server terdekat di Singapura dan Jakarta), memastikan website tetap dapat diakses dengan cepat oleh calon pembeli dari luar negeri (Amerika, Eropa, Asia).
* **Jaminan Waktu Aktif 99.9% (*Uptime SLA*):** Menggunakan arsitektur komputasi tanpa server (*Serverless*), sehingga website tidak akan pernah mengalami gangguan *"server down"* atau kehabisan memori meskipun dikunjungi oleh ribuan orang secara bersamaan.

---

## 7. RINGKASAN TEKNOLOGI YANG DIGUNAKAN (TECH STACK OVERVIEW)

Teknologi yang dipilih adalah standar industri perangkat lunak modern terbaik tahun 2026. Berikut penjelasan sederhana mengenai manfaat langsung teknologi ini bagi CV Berkat Mandiri:

```
+--------------------------------------------------------------------------------------------------+
|                                    ARSITEKTUR TEKNOLOGI MODERN                                   |
+--------------------------+---------------------------------+-------------------------------------+
| Lapisan Teknologi        | Perangkat Lunak / Framework     | Keuntungan Bisnis Nyata bagi Klien  |
+--------------------------+---------------------------------+-------------------------------------+
| **Pondasi Aplikasi**     | Next.js 16 (App Router) +       | Performa sangat cepat, struktur kode|
|                          | React 19 + TypeScript 5         | standar internasional yang kokoh,   |
|                          |                                 | bebas error, dan mudah dirawat.     |
+--------------------------+---------------------------------+-------------------------------------+
| **Desain & Animasi**     | Tailwind CSS v4 + Framer Motion | Tampilan antarmuka sangat elegan    |
|                          | + Lucide Icons Modern           | seperti produk Apple, hemat kuota   |
|                          |                                 | internet pengunjung, dan responsif. |
+--------------------------+---------------------------------+-------------------------------------+
| **Pusat Basis Data**     | Neon Serverless PostgreSQL +    | Data tersimpan aman di cloud dengan |
|                          | Prisma ORM v7                   | pencadangan berkala, tahan lonjakan |
|                          |                                 | transaksi, dan biaya perawatan nol. |
+--------------------------+---------------------------------+-------------------------------------+
| **Kecerdasan Buatan**    | Python FastAPI + Scikit-Learn   | Membantu bisnis memprediksi tren    |
|                          | Linear Regression (AI)          | kebutuhan stok karung secara ilmiah,|
|                          |                                 | bukan sekadar perkiraan manual.     |
+--------------------------+---------------------------------+-------------------------------------+
| **Infrastruktur Cloud**  | Vercel Cloud Edge Platform      | Bebas repot perawatan server fisik, |
|                          | (Singapore & Global Node)       | garansi website selalu aktif 24/7,  |
|                          |                                 | dan tahan serangan siber.           |
+--------------------------+---------------------------------+-------------------------------------+
```

---

## 8. INDIKATOR KEBERHASILAN PROYEK (SUCCESS METRICS & KPIS)

Untuk mengukur dampak nyata investasi pembuatan website ini terhadap pertumbuhan bisnis CV Berkat Mandiri, berikut adalah indikator kinerja utama (*Key Performance Indicators*) yang direkomendasikan:

```
                                  +----------------------------------------------------+
                                  |            KEY PERFORMANCE INDICATORS (KPI)        |
                                  +----------------------------------------------------+
                                                            |
            +-----------------------+-----------------------+-----------------------+
            |                       |                       |                       |
            v                       v                       v                       v
      [ BISNIS & LEADS ]             [ EFISIENSI WAKTU ]       [ KINERJA TEKNIS & SEO ]  [ OPERASIONAL GUDANG ]
  * Inbound WhatsApp RFQ     * Kecepatan respon penawaran   * Skor Google Lighthouse > 90 * Akurasi pencatatan stok
  * Nilai transaksi ekspor   * Pembuatan faktur dalam 1 mnt * Peringkat 1-5 kata kunci    * Nol komplain upah borongan
```

1. **Metrik Akuisisi Pelanggan (Business & Inbound Leads):**
   * *Target:* Minimal 15 - 25 pesan penawaran harga (*RFQ inquiries*) masuk setiap bulan melalui tombol WhatsApp dan Formulir Kontak resmi.
   * *Rasio Konversi:* Minimal 10% dari calon pembeli yang mengirimkan pesan RFQ berlanjut ke tahap pengiriman sampel fisik bahan karung.
2. **Metrik Efisiensi Waktu & Operasional (Operational Productivity):**
   * *Waktu Terbit Faktur & Surat Jalan:* Berkurang dari sebelumnya 30 menit (pencatatan manual di buku) menjadi kurang dari **1 menit** melalui Modul Penjualan Terintegrasi.
   * *Akurasi Gaji Borongan:* **100% akurat** tanpa ada kekeliruan perhitungan lembar kerja antara mandor gudang dan bagian kasir keuangan.
3. **Metrik Kinerja Teknis & Visibilitas Mesin Pencari (Search & Performance):**
   * *Skor Kecepatan Google PageSpeed / Lighthouse:* Mencapai skor minimal **90 - 100** untuk metrik Performance, Accessibility, Best Practices, dan SEO.
   * *Peringkat Mesin Pencari:* Masuk peringkat 1 - 5 teratas di Google Indonesia dalam kurun waktu 3 hingga 6 bulan untuk kata kunci:
     * *"Supplier Karung Goni Ekspor"*
     * *"Pabrik Karung Plastik PP Woven"*
     * *"Distributor Karung Laminasi BOPP"*

---

## 9. RANGKUMAN PENUTUP & REKOMENDASI TAHAP BERIKUTNYA

Dokumen **Product Requirements Document (PRD)** ini menegaskan bahwa website **CV Berkat Mandiri** (`https://cvberkatmandiri.vercel.app`) telah berhasil dibangun dan diuji dengan standar kualitas industri perangkat lunak modern. Platform ini tidak hanya berfungsi sebagai etalase digital korporasi yang memikat calon pembeli internasional, tetapi juga bertindak sebagai tulang punggung sistem otomatisasi operasional pabrik dan pergudangan yang efisien.

### Rekomendasi Langkah Strategis Berikutnya:
1. **Pendaftaran Domain Resmi Korporat:** Memasang domain resmi berbadan hukum Indonesia (`cvberkatmandiri.co.id` atau `cvberkatmandiri.com`) untuk melipatgandakan kredibilitas di mata pembeli internasional dan perbankan.
2. **Pendaftaran Google Search Console & Google Profil Bisnis:** Memasukkan tautan sitemap resmi (`/sitemap.xml`) ke dalam Google Search Console serta memverifikasi titik lokasi pabrik di Google Maps untuk memperkuat dominasi pencarian lokal (*Local SEO*).
3. **Penyebaran Brosur Digital QR Code:** Menempatkan kode QR yang langsung mengarah ke website ini pada kartu nama tim penjualan, faktur fisik, dan stiker kemasan karung kargo.

---
*Dokumen ini disusun dan diverifikasi secara resmi sebagai panduan acuan standar produk digital CV Berkat Mandiri.*  
**Disetujui untuk Implementasi Produksi.**
