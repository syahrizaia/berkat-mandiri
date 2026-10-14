import { 
  Book, 
  Database, 
  Server, 
  ShieldCheck, 
  Terminal, 
  AlertTriangle, 
  Sparkles, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Code2, 
  Lock, 
  Workflow, 
  Braces,
  ArrowRight,
  ExternalLink
} from "lucide-react";

const sections = [
  { id: "intro", title: "1. Pendahuluan & Ekosistem", icon: Book },
  { id: "stack", title: "2. Arsitektur & Tech Stack", icon: Cpu },
  { id: "database", title: "3. Skema Database Neon", icon: Database },
  { id: "ml-service", title: "4. Machine Learning Safety", icon: Workflow },
  { id: "api", title: "5. Direktori API Endpoint", icon: Server },
  { id: "auth", title: "6. Keamanan & SOP Operasional", icon: ShieldCheck },
];

export default function DocsPage() {
  return (
    <div className="space-y-8">
      {/* Header Liquid Glass Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-[32px] liquid-glass border border-slate-200/80 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Technical Architecture & Developer Guides
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Dokumentasi & Arsitektur Sistem
          </h1>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Spesifikasi teknis internal, pemodelan relasional database Neon PostgreSQL, integrasi microservice Machine Learning, dan kontrak endpoint API CV Berkat Mandiri.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <span className="px-4 py-2 rounded-2xl liquid-glass text-xs font-mono font-bold text-slate-800 border border-slate-200/80 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Build: Next.js 16 + Neon
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sticky Sidebar Navigation (macOS Sonoma Floating Pill Style) */}
        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24">
          <div className="p-5 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg space-y-2">
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider px-3 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              Daftar Isi Dokumentasi
            </h4>
            <nav className="space-y-1">
              {sections.map((sec) => (
                <a 
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black text-slate-900 hover:text-emerald-900 hover:bg-emerald-500/15 border border-transparent hover:border-emerald-500/30 transition-all"
                >
                  <sec.icon className="w-4 h-4 text-slate-600 group-hover:text-emerald-700 transition-colors shrink-0" />
                  <span>{sec.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-6 sm:p-10 rounded-[32px] liquid-glass border border-slate-200/80 shadow-xl space-y-12">
          
          {/* SECTION 1: PENDAHULUAN */}
          <section id="intro" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Book className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                1. Pendahuluan & Gambaran Umum Sistem
              </h2>
            </div>
            
            <p className="text-slate-800 text-sm font-medium leading-relaxed">
              Platform ERP internal <strong>CV Berkat Mandiri</strong> dirancang secara khusus untuk menangani seluruh rantai nilai operasional karung plastik (woven PP sacks & karung laminasi). Sistem mengonsolidasikan 4 pilar inti bisnis:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Manajemen Master SKU Karung
                </div>
                <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                  Pencatatan variasi fisik karung, ambang batas stok aman, dan konfigurasi multi-tarif borongan kerja.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-black text-blue-950">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  Penggajian Pekerja Borongan
                </div>
                <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                  Log harian pengerjaan Cuci, Lipat, dan Jahit dengan kalkulasi slip gaji instan siap cetak.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-black text-amber-950">
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  Faktur Penjualan & Manifest Logistik
                </div>
                <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                  Penerbitan invoice otomatis, pemotongan kuantitas stok real-time, dan surat jalan armada pengiriman.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-black text-purple-950">
                  <CheckCircle2 className="w-4 h-4 text-purple-700" />
                  Prediksi AI / Machine Learning
                </div>
                <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                  Peramalan kebutuhan kuantitas bulanan karung guna mencegah stockout dan mengoptimalkan modal kerja.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: TECH STACK */}
          <section id="stack" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Cpu className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                2. Arsitektur & Teknologi (Tech Stack)
              </h2>
            </div>

            <p className="text-slate-800 text-sm font-medium leading-relaxed">
              Arsitektur aplikasi dibangun di atas fondasi komputasi modern yang mengedepankan performa tinggi, efisiensi konsumsi memori, dan skalabilitas *serverless*:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-100/90 border border-slate-200/80 space-y-1 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">Frontend & Framework</span>
                <p className="font-black text-slate-950 text-sm">Next.js 16 (Turbopack)</p>
                <p className="text-xs text-slate-800 font-semibold">App Router, React 19, Server Components.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100/90 border border-slate-200/80 space-y-1 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">Styling & Animasi</span>
                <p className="font-black text-slate-950 text-sm">Tailwind v4 + Glassmorphism</p>
                <p className="text-xs text-slate-800 font-semibold">Apple Liquid Glass design token, Framer Motion.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100/90 border border-slate-200/80 space-y-1 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">Database & ORM</span>
                <p className="font-black text-slate-950 text-sm">Neon.tech + Prisma ORM</p>
                <p className="text-xs text-slate-800 font-semibold">PostgreSQL Serverless, pooled connection.</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: SKEMA DATABASE */}
          <section id="database" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Database className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                3. Skema Relasional Database (Prisma)
              </h2>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              Database menggunakan model relasional yang ketat untuk menjamin integritas transaksi dan mencegah *orphan records*. Model data mencakup jenis karung, data karyawan, log pekerjaan, dan transaksi penjualan:
            </p>

            {/* macOS Style Code Block */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900 text-slate-300">
                <div className="flex items-center gap-2 font-bold">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>prisma/schema.prisma</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
              </div>
              <pre className="p-5 text-slate-200 overflow-x-auto leading-relaxed">
{`// 1. Master Jenis Karung & Konfigurasi Tarif
model BagType {
  id           String    @id @default(cuid())
  sku          String    @unique
  name         String
  currentStock Int       @default(0)
  wageMencuci  Int       @default(0)
  wageMelipat  Int       @default(0)
  wageMenjahit Int       @default(0)
  wagePerPiece Int       @default(0)
  workLogs     WorkLog[]
  sales        Sale[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// 2. Data Tenaga Kerja Borongan
model Employee {
  id        String    @id @default(cuid())
  name      String
  phone     String?
  createdAt DateTime  @default(now())
  workLogs  WorkLog[]
}

// 3. Log Aktivitas Kerja Harian
model WorkLog {
  id         String   @id @default(cuid())
  employeeId String
  bagTypeId  String
  task       String   // "MENCUCI" | "MELIPAT" | "MENJAHIT"
  quantity   Int
  date       DateTime @default(now())
  employee   Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  bagType    BagType  @relation(fields: [bagTypeId], references: [id])
}

// 4. Transaksi Penjualan & Manifest Kurir
model Sale {
  id             String   @id @default(cuid())
  invoiceNumber  String   @unique
  customerName   String
  bagTypeId      String
  quantity       Int
  pricePerPiece  Int
  totalAmount    Int
  paymentStatus  String   // "LUNAS" | "PENDING"
  driverName     String?
  plateNumber    String?
  deliveryAddress String?
  deliveryStatus String   @default("DIPROSES")
  date           DateTime @default(now())
  bagType        BagType  @relation(fields: [bagTypeId], references: [id])
}`}
              </pre>
            </div>
          </section>

          {/* SECTION 4: ML SAFETY THRESHOLD */}
          <section id="ml-service" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Workflow className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                4. Microservice Machine Learning (Safety Threshold)
              </h2>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              Untuk mengantisipasi lonjakan permintaan pabrik pupuk dan logistik perkebunan, sistem mengintegrasikan microservice peramalan berbasis Python/FastAPI:
            </p>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Alur Algoritma Safety Threshold:
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-500">HTTP GET /predict</span>
              </div>
              <ol className="list-decimal list-inside text-xs text-slate-700 space-y-2 font-medium leading-relaxed">
                <li>Server Next.js memanggil microservice peramalan dengan batas toleransi timeout (12 detik).</li>
                <li>Model menganalisis rata-rata rolling 6 bulan volume pengeluaran karung per SKU.</li>
                <li>Hasil prediksi dikombinasikan dengan buffer pengaman 20% (<code className="bg-slate-200/80 px-1 py-0.5 rounded font-mono text-[11px] text-slate-900">currentStock * 1.2</code>) sebagai fallback jika model ML dalam status cold-start.</li>
                <li>Jika <code className="bg-slate-200/80 px-1 py-0.5 rounded font-mono text-[11px] text-slate-900">currentStock &lt; safetyThreshold</code>, kartu gudang otomatis memicu status peringatan &apos;Menipis&apos;.</li>
              </ol>
            </div>
          </section>

          {/* SECTION 5: API DIRECTORY */}
          <section id="api" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Server className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                5. Direktori API Endpoint Internal
              </h2>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              Seluruh operasi CRUD backend diimplementasikan menggunakan Next.js Route Handlers (<code className="bg-slate-200/80 px-1 py-0.5 rounded font-mono text-xs text-slate-900">app/api/admin/*</code>) yang merespons dengan JSON standar:
            </p>

            <div className="space-y-3 pt-2">
              {/* Endpoint 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm">
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-black bg-blue-500/15 text-blue-950 border border-blue-500/30 w-fit shrink-0">
                  GET / POST
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-slate-950">
                  /api/admin/inventory
                </span>
                <span className="text-xs text-slate-800 font-semibold sm:ml-auto">
                  Mengambil daftar atau mendaftarkan SKU karung baru
                </span>
              </div>

              {/* Endpoint 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm">
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-black bg-amber-500/15 text-amber-950 border border-amber-500/30 w-fit shrink-0">
                  PUT / DELETE
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-slate-950">
                  /api/admin/inventory/[id]
                </span>
                <span className="text-xs text-slate-800 font-semibold sm:ml-auto">
                  Memperbarui tarif/stok atau menghapus jenis karung
                </span>
              </div>

              {/* Endpoint 3 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm">
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-black bg-emerald-500/15 text-emerald-950 border border-emerald-500/30 w-fit shrink-0">
                  GET / POST
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-slate-950">
                  /api/admin/employees
                </span>
                <span className="text-xs text-slate-800 font-semibold sm:ml-auto">
                  Registrasi staf borongan dan rekapitulasi kontak
                </span>
              </div>

              {/* Endpoint 4 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm">
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-black bg-purple-500/15 text-purple-950 border border-purple-500/30 w-fit shrink-0">
                  GET / POST
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-slate-950">
                  /api/admin/sales
                </span>
                <span className="text-xs text-slate-800 font-semibold sm:ml-auto">
                  Input transaksi penjualan dan pembuatan manifest armada
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 6: KEAMANAN & SOP */}
          <section id="auth" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                6. Keamanan, Autentikasi & SOP Operasional
              </h2>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              Seluruh akses antarmuka privat dilindungi dari manipulasi langsung melalui protokol validasi sesi dan isolasi basis data:
            </p>

            {/* Apple Alert Callout Box */}
            <div className="p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/30 text-amber-950 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Pemberitahuan Keamanan & Variabel Lingkungan:</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-900/90 pl-7 font-medium">
                Pastikan variabel <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold text-amber-950">DATABASE_URL</code> (Neon.tech pooled connection) dan <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold text-amber-950">PYTHON_ML_SERVICE_URL</code> telah terkonfigurasi dengan valid di lingkungan produksi Vercel / server sebelum melakukan deployment.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}