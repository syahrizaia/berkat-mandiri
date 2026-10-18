/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Phone, 
  Calendar, 
  Edit3, 
  Trash2, 
  Info, 
  Search, 
  Sparkles,
  ExternalLink,
  MessageCircle
} from "lucide-react";
import EmployeeModalForm from "./EmployeeModalForm";
import Link from "next/link";
import { deleteEmployeeAction } from "@/app/(private)/employees/actions";

export const dynamic = "force-dynamic";

export default function EmployeeClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const totalEmployees = initialData.length;
  const withPhoneCount = initialData.filter((e) => e.phone).length;

  // Filtered employees based on search
  const filteredEmployees = useMemo(() => {
    return initialData.filter((emp) => {
      const matchName = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPhone = emp.phone ? emp.phone.includes(searchQuery) : false;
      return matchName || matchPhone;
    });
  }, [initialData, searchQuery]);

  // Fungsi untuk menghapus karyawan
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus karyawan "${name}"? Semua log kerja borongan terkait akan ikut terhapus.`)) {
      try {
        const res = await deleteEmployeeAction(id);
        if (res.success) {
          router.refresh();
        } else {
          alert(res.error || "Gagal menghapus data karyawan.");
        }
      } catch (err) {
        alert("Terjadi kesalahan sistem.");
      }
    }
  };

  const handleEditClick = (employee: any) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Liquid Glass Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-[32px] liquid-glass border border-slate-200/80 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Tenaga Kerja Borongan
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Master Data Karyawan
          </h1>
          <p className="text-sm text-slate-700 font-medium mt-1 max-w-xl">
            Kelola data staf dan tenaga kerja borongan harian dengan transparansi perhitungan upah cuci, lipat, dan jahit.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={handleCreateClick}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Karyawan</span>
          </button>
        </div>
      </div>

      {/* Bento Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl liquid-glass text-emerald-700 border border-emerald-500/20">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
              Aktif Bekerja
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Karyawan Terdaftar</p>
            <p className="text-3xl font-black text-slate-950 mt-1">
              {totalEmployees} <span className="text-base font-bold text-slate-600">Orang</span>
            </p>
          </div>
        </div>

        <div className="p-6 rounded-[28px] liquid-glass border border-slate-200/80 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl liquid-glass text-blue-700 border border-blue-500/20">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-800 border border-blue-500/20">
              Terverifikasi Kontak
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Memiliki Nomor WhatsApp</p>
            <p className="text-3xl font-black text-slate-950 mt-1">
              {withPhoneCount} <span className="text-base font-bold text-slate-600">Orang</span>
            </p>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 rounded-2xl liquid-glass border border-slate-200/80 shadow-md">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama karyawan atau nomor telepon..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white/90 border border-slate-300 text-slate-950 placeholder:text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Main Employee Table */}
      <div className="liquid-glass rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100/90 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nama Lengkap Karyawan</th>
                <th className="px-6 py-4">Nomor WhatsApp / Kontak</th>
                <th className="px-6 py-4">Tanggal Bergabung</th>
                <th className="px-6 py-4 text-right">Aksi & Slip Gaji</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-600 font-medium text-sm">
                    {searchQuery ? "Tidak ada karyawan yang cocok dengan kata kunci." : "Belum ada data karyawan terdaftar."}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center font-bold text-slate-950 border border-slate-200/80 text-sm shrink-0">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-950 text-sm">
                            {emp.name}
                          </div>
                          <div className="text-xs text-slate-500 font-mono font-semibold">
                            ID: {emp.id.slice(0, 12)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {emp.phone ? (
                        <a
                          href={`https://wa.me/${emp.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 hover:bg-emerald-500/20 transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          {emp.phone}
                        </a>
                      ) : (
                        <span className="text-xs text-slate-500 italic font-medium">Tidak ada nomor</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {new Date(emp.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/employees/${emp.id}`}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-800 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all flex items-center gap-1"
                          title="Lihat Log Kerja & Slip Gaji"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Slip & Detail</span>
                        </Link>
                        <button
                          onClick={() => handleEditClick(emp)}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit Data Karyawan"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id, emp.name)}
                          className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Hapus Karyawan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Karyawan (POP-UP 4) */}
      <EmployeeModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingEmployee={editingEmployee}
      />
    </div>
  );
}