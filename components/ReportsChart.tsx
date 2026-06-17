/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ReportsChart({ data }: { data: any[] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `Rp ${val/1000}k`} />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            formatter={(value: any) => {
              if (value === undefined || value === null) return ["", ""];
              const num = Number(value);
              if (Number.isNaN(num)) return [String(value), ""];
              return [`Rp ${num.toLocaleString("id-ID")}`, ""];
            }}
          />
          <Legend />
          <Bar dataKey="income" name="Pemasukan" fill="#059669" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Pengeluaran" fill="#e11d48" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}