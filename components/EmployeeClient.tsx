/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, UserPlus, Phone, Calendar, Edit3, Trash2, Info } from "lucide-react";
import EmployeeModalForm from "./EmployeeModalForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function EmployeeClient({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);

  // Fungsi untuk menghapus karyawan
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus karyawan "${name}"? Semua log kerja borongan terkait akan ikut terhapus.`)) {
      try {
        const res = await fetch(`/api/admin/employees/${id}`, { method: "DELETE" });
        if (res.ok) {
          router.refresh();
        } else {
          alert("Gagal menghapus data karyawan.");
        }
      } catch (err) {
        alert("Terjadi kesalahan koneksi.");
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
    <div className="space-y-6 md:p-2">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Karyawan</h1>
          <p className="text-slate-500">Kelola informasi master data dan kontak tenaga kerja borongan</p>
        </div>
        <button 
          onClick={handleCreateClick}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition"
        >
          <UserPlus className="w-4 h-4" />
          Tambah Karyawan
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl"><Users className="text-emerald-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Total Karyawan Terdaftar</p>
            <p className="text-2xl font-bold text-slate-900">{initialData.length} <span className="text-xs font-normal text-slate-400">orang</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl"><Phone className="text-blue-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Karyawan Memiliki Kontak</p>
            <p className="text-2xl font-bold text-slate-900">
              {initialData.filter(e => e.phone).length} <span className="text-xs font-normal text-slate-400">orang</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Data - Berhasil Memperbaiki Kolom yang Merah */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden m-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
              <tr>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">Nomor Telepon / WA</th>
                <th className="px-6 py-4">Tanggal Bergabung</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-sm text-slate-400 font-medium">Belum ada data karyawan gudang.</td>
                </tr>
              ) : (
                initialData.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 text-sm">{emp.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: {emp.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {emp.phone ? (
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-700">📞 {emp.phone}</span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Tidak ada nomor</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500 flex items-center gap-1.5 pt-6">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(emp.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Link 
                            href={`/employees/${emp.id}`} 
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition" 
                            title="Detail Karyawan"
                        >
                            <Info className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleEditClick(emp)}
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                          title="Edit Karyawan"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(emp.id, emp.name)}
                          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
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

      {/* Modal Form */}
      <EmployeeModalForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingEmployee={editingEmployee} 
      />
    </div>
  );
}