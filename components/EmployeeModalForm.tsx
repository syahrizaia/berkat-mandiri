/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingEmployee: any | null;
}

export default function EmployeeModalForm({ isOpen, onClose, editingEmployee }: ModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        phone: editingEmployee.phone || "",
      });
    } else {
      setFormData({ name: "", phone: "" });
    }
  }, [editingEmployee, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingEmployee ? `/api/admin/employees/${editingEmployee.id}` : `/api/admin/employees`;
    const method = editingEmployee ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        router.refresh();
      } else {
        const err = await response.json();
        alert(`Gagal memproses data: ${err.error || "Terjadi kesalahan sistem"}`);
      }
    } catch (error) {
      alert("Gagal terhubung ke server database.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-lg font-black text-slate-900">
            {editingEmployee ? "🔧 Edit Data Karyawan" : "👤 Tambah Karyawan Baru"}
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Nama Lengkap Karyawan</label>
            <input 
              type="text" 
              required 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              className="w-full text-sm border p-2.5 rounded-xl focus:outline-emerald-500 font-semibold text-slate-800" 
              placeholder="Contoh: Ahmad Subarjo" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Nomor Telepon / WhatsApp (Opsional)</label>
            <input 
              type="text" 
              value={formData.phone} 
              onChange={e => setFormData({ ...formData, phone: e.target.value })} 
              className="w-full text-sm border p-2.5 rounded-xl focus:outline-emerald-500 font-mono text-slate-800" 
              placeholder="Contoh: 081234567890" 
            />
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700">
              Simpan Data Karyawan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}