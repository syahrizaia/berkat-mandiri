"use client";

import { Edit2, Trash2, Info } from "lucide-react";
import Link from "next/link";

export default function EmployeeActions({ id }: { id: string }) {
  const handleEdit = () => {
    // Navigasi ke halaman edit atau buka modal
    console.log("Edit:", id);
  };

  const handleDelete = () => {
    if (confirm("Hapus data karyawan ini? Tindakan ini tidak dapat dibatalkan.")) {
      console.log("Menghapus:", id);
      // Panggil Server Action di sini (misal: deleteEmployee(id))
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/employees/${id}`}
        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-600 transition"
      >
        <Info className="w-4 h-4" />
      </Link>
      <button 
        onClick={handleEdit}
        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button 
        onClick={handleDelete}
        className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}