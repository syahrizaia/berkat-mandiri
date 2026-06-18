import { Book, Database, Server, ShieldCheck, Terminal, AlertTriangle } from "lucide-react";

const sections = [
  { id: "intro", title: "Pendahuluan", icon: Book },
  { id: "database", title: "Skema Database", icon: Database },
  { id: "api", title: "API Endpoint", icon: Server },
  { id: "auth", title: "Keamanan & Auth", icon: ShieldCheck },
];

export default function DocsPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 py-6 px-4 sm:px-6">
      
      {/* Sidebar Navigasi (Daftar Isi) */}
      <aside className="w-full lg:w-60 shrink-0">
        <div className="sticky top-24 space-y-1.5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
            Daftar Isi
          </h4>
          <nav className="space-y-1">
            {sections.map((sec) => (
              <a 
                key={sec.id}
                href={`#${sec.id}`}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-200"
              >
                <sec.icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                {sec.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 min-w-0 bg-white border border-slate-200/80 text-slate-600 rounded-3xl p-6 sm:p-10 shadow-sm">
        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed">
          
          <div className="border-b border-slate-100 pb-6 mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-2">
              Dokumentasi Sistem
            </h1>
            <p className="text-slate-500 text-sm sm:text-base m-0">
              Spesifikasi teknis, arsitektur data, dan panduan integrasi sistem internal.
            </p>
          </div>
          
          {/* Section: Pendahuluan */}
          <section id="intro" className="scroll-mt-28 mb-10">
            <h2 className="text-xl sm:text-2xl text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
              Pendahuluan
            </h2>
            <p>
              Selamat datang di dokumentasi teknis <strong>CV Berkat Mandiri</strong>. Dokumentasi ini disusun untuk mempermudah pemeliharaan sistem, memahami struktur aliran data, serta membantu proses deployment modul manajemen operasional.
            </p>
          </section>

          {/* Section: Skema Database */}
          <section id="database" className="scroll-mt-28 mb-10">
            <h2 className="text-xl sm:text-2xl text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
              Skema Database
            </h2>
            <p>
              Penyimpanan data memanfaatkan klaster PostgreSQL terkelola melalui platform <strong>Neon.tech</strong>. Pemetaan objek database dikelola menggunakan Prisma ORM. Berikut adalah struktur model fundamental data kepegawaian:
            </p>
            
            {/* MacOS Style Code Block Component */}
            <div className="my-6 rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-md font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-950 text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <span>prisma/schema.prisma</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>
              </div>
              <pre className="p-4 m-0 text-slate-300 overflow-x-auto bg-transparent leading-6">
{`model Employee {
  id         String   @id @default(cuid())
  name       String
  email      String   @unique
  department String
  status     String   // "Active" | "Inactive"
  createdAt  DateTime @default(now())
}`}
              </pre>
            </div>
          </section>

          {/* Section: API Endpoints */}
          <section id="api" className="scroll-mt-28 mb-10">
            <h2 className="text-xl sm:text-2xl text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
              API Endpoint
            </h2>
            <p>
              Arsitektur rute backend mengadopsi standar Next.js API Routes yang diletakkan di dalam direktori <code>app/api/</code>. Seluruh respons mengembalikan format standar JSON objek.
            </p>
            
            {/* Clean API Endpoint Display Block */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-4 shadow-sm max-w-2xl font-mono text-xs sm:text-sm">
              <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg text-xs tracking-wide w-fit shadow-sm shadow-emerald-600/10">
                GET
              </span>
              <span className="text-slate-800 font-semibold tracking-tight">
                /api/inventory/list
              </span>
              <span className="text-slate-400 sm:ml-auto text-xs font-sans">
                (Proteksi: Session Required)
              </span>
            </div>
          </section>

          {/* Section: Keamanan & Auth */}
          <section id="auth" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
              Keamanan & Auth
            </h2>
            <p>
              Sistem memproteksi rute internal privat dengan mekanisme enkripsi token berbasis sesi server. Gerbang autentikasi divalidasi silang pada tingkat middleware aplikasi sebelum merender komponen halaman.
            </p>

            {/* Alert / Callout Box Component */}
            <div className="my-6 flex gap-4 bg-amber-50/60 border border-amber-200/70 rounded-2xl p-5 text-xs sm:text-sm text-amber-900 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-1 text-amber-950">Pemberitahuan Keamanan Penting:</strong>
                Pastikan kunci rahasia <code className="bg-amber-100/80 text-amber-800 border border-amber-200/50 px-1.5 py-0.5 rounded font-mono text-xs">NEXTAUTH_SECRET</code> telah digenerate menggunakan string kriptografi acak yang kuat dan telah terkonfigurasi dengan valid di berkas produksi <code className="bg-amber-100/80 text-amber-800 border border-amber-200/50 px-1.5 py-0.5 rounded font-mono text-xs">.env.local</code>.
              </div>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}