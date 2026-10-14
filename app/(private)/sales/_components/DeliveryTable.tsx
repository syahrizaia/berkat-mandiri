import { Edit3, Printer, Truck, CheckCircle2, Clock } from "lucide-react";
import { SaleWithRelations } from "../page";

export default function DeliveryTable({ 
  sales, 
  onManageDriver 
}: { 
  sales: SaleWithRelations[]; 
  onManageDriver: (sale: SaleWithRelations) => void 
}) {
  
  const triggerPrintSuratJalan = (item: SaleWithRelations) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <body onload="window.print(); window.close();" style="font-family: sans-serif; padding: 40px; color: #333;">
          <div style="text-align: center; border-bottom: 3px double #333; padding-bottom: 15px;">
            <h2>CV BERKAT MANDIRI</h2>
            <p>Manifes Gudang Karung & Logistik Terintegrasi</p>
          </div>
          <h3 style="text-align: center; text-decoration: underline; margin-top:20px;">SURAT JALAN PENGIRIMAN</h3>
          <p style="text-align: center">Nomor Dokumen: ${item.delivery?.suratJalanNo || `SJ-${item.invoiceNumber}`}</p>
          <hr/>
          <p><strong>Kepada Yth:</strong> ${item.customerName}</p>
          <p><strong>Alamat Bongkar:</strong> ${item.delivery?.deliveryAddress || "-"}</p>
          <p><strong>Driver / Plat:</strong> ${item.delivery?.driverName || "-"} / ${item.delivery?.plateNumber || "-"}</p>
          <table border="1" cellspacing="0" cellpadding="10" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
              <tr style="background:#f5f5f5"><th>Deskripsi Item Karung</th><th>Muatan (Qty)</th><th>Satuan</th></tr>
            </thead>
            <tbody>
              <tr><td>${item.bagType.name}</td><td align="center"><strong>${item.quantity.toLocaleString()}</strong></td><td align="center">Lembar</td></tr>
            </tbody>
          </table>
          <div style="margin-top: 50px; display: flex; justify-content: space-between; text-align: center;">
            <div><p>Sopir / Pengirim</p><br/><br/><p>( ________________ )</p></div>
            <div><p>Petugas Gudang</p><br/><br/><p>( ________________ )</p></div>
            <div><p>Penerima</p><br/><br/><p>( ________________ )</p></div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getStatusBadge = (status?: string | null) => {
    switch (status) {
      case "DITERIMA":
        return "bg-emerald-500/15 text-emerald-800 border-emerald-500/25";
      case "DIKIRIM":
        return "bg-blue-500/15 text-blue-800 border-blue-500/25";
      case "DIPROSES":
      default:
        return "bg-amber-500/15 text-amber-800 border-amber-500/25";
    }
  };

  return (
    <div className="liquid-glass rounded-[32px] border border-white/70 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100/70 border-b border-slate-200/70 text-slate-800 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-4 px-6">No. Surat Jalan</th>
              <th className="py-4 px-6">Tujuan Bongkar & Customer</th>
              <th className="py-4 px-6">Armada / Driver</th>
              <th className="py-4 px-6 text-center">Kuantitas Muat</th>
              <th className="py-4 px-6 text-center">Status Distribusi</th>
              <th className="py-4 px-6 text-right">Aksi Dokumen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 font-medium text-slate-800">
            {sales.map((item) => (
              <tr key={item.id} className="hover:bg-white/60 transition-colors">
                <td className="py-4 px-6">
                  <span className="font-mono font-bold text-slate-950 block">
                    {item.delivery?.suratJalanNo || `SJ-${item.invoiceNumber}`}
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold block mt-0.5">
                    Ref: {item.invoiceNumber}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-bold text-slate-950 block">{item.customerName}</span>
                  <span className="text-xs text-slate-700 line-clamp-1 mt-0.5 font-medium">
                    {item.delivery?.deliveryAddress || "Alamat gudang belum diinput"}
                  </span>
                </td>
                <td className="py-4 px-6 text-xs text-slate-800">
                  <span className="font-semibold text-slate-900 block">
                    {item.delivery?.driverName || "Driver belum ditugaskan"}
                  </span>
                  <span className="font-mono text-[10px] text-slate-600 block mt-0.5 uppercase font-bold">
                    {item.delivery?.plateNumber || "No Plat: -"}
                  </span>
                </td>
                <td className="py-4 px-6 text-center font-mono font-bold text-slate-950">
                  {item.quantity.toLocaleString()}{" "}
                  <span className="text-xs text-slate-600 font-semibold">lbr</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`inline-block text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${getStatusBadge(item.delivery?.status)}`}>
                    {item.delivery?.status || "DIPROSES"}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onManageDriver(item)} 
                      className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-200/60 rounded-xl transition"
                      title="Edit Armada & Alamat"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => triggerPrintSuratJalan(item)} 
                      className="p-2 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-xl transition"
                      title="Cetak Surat Jalan Fisik"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-700 text-xs font-semibold">
                  Belum ada catatan jadwal pengiriman logistik pada periode ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}