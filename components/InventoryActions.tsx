"use client";

import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

export default function InventoryActions({ id }: { id: string }) {
  const handleEdit = () => {
    alert(`Edit barang ${id}`);
    // Implementasi navigasi ke form edit atau buka modal
  };

  const handleDelete = () => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      console.log("Menghapus:", id);
      // Panggil Server Action atau API endpoint di sini
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button 
        onClick={handleEdit}
        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-emerald-600 transition"
      >
        <Edit className="w-4 h-4" />
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