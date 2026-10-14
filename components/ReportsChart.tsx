/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-slate-200 text-xs space-y-2">
        <p className="font-bold text-slate-950 border-b border-slate-200 pb-1">
          Bulan {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 font-bold text-slate-700">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-mono font-bold text-slate-950">
              Rp {Number(entry.value).toLocaleString("id-ID")}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ReportsChart({ data }: { data: any[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-80 w-full flex items-center justify-center rounded-2xl bg-slate-100/60 animate-pulse">
        <span className="text-xs font-bold text-slate-600">Memuat visualisasi tren keuangan...</span>
      </div>
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={6}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="currentColor" 
            className="text-slate-200" 
          />
          <XAxis 
            dataKey="name" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: "#64748b", fontWeight: 600 }}
          />
          <YAxis 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: "#64748b", fontWeight: 600 }}
            tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}jt`} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: 20, fontSize: 12 }}
          />
          <Bar 
            dataKey="income" 
            name="Penjualan Lunas (Kas)" 
            fill="#10b981" 
            radius={[8, 8, 2, 2]} 
          />
          <Bar 
            dataKey="expense" 
            name="Piutang Pending" 
            fill="#f43f5e" 
            radius={[8, 8, 2, 2]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}