import EmployeeActions from "@/components/EmployeeActions";
import { prisma } from "@/lib/prisma";
import { Users, UserCheck, UserMinus, UserPlus } from "lucide-react";

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: "desc" },
  });

//   const activeCount = employees.filter((e) => e.status === "Active").length;

  return (
    <div className="space-y-6 md:p-2">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Karyawan</h1>
          <p className="text-slate-500">Kelola informasi dan status kepegawaian</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition">
          <UserPlus className="w-4 h-4" />
          Tambah Karyawan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl"><UserCheck className="text-emerald-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Karyawan Aktif</p>
            {/* <p className="text-2xl font-bold text-slate-900">{activeCount}</p> */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-50 rounded-xl"><Users className="text-slate-600 w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Total Karyawan</p>
            <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden m-4">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
            <tr>
              <th className="px-6 py-4">Nama</th>
              {/* <th className="px-6 py-4">Departemen</th> */}
              {/* <th className="px-6 py-4">Status</th> */}
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{emp.name}</div>
                  {/* <div className="text-xs text-slate-500">{emp.email}</div> */}
                </td>
                {/* <td className="px-6 py-4 text-sm text-slate-600">{emp.department}</td> */}
                {/* <td className="px-6 py-4">
                  {emp.status === "Active" ? (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-bold uppercase">Aktif</span>
                  ) : (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-bold uppercase">Non-Aktif</span>
                  )}
                </td> */}
                <td className="px-6 py-4 text-right">
                  <EmployeeActions id={emp.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}