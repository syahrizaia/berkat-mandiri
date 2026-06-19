import { Edit3, Printer } from "lucide-react";
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
            <p>Manifes Gudang Plastik & Logistik Terintegrasi</p>
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3.5">No. Surat Jalan</th>
              <th className="px-6 py-3.5">Tujuan Bongkar</th>
              <th className="px-6 py-3.5">Armada Driver</th>
              <th className="px-6 py-3.5 text-center">Kuantitas Muat</th>
              <th className="px-6 py-3.5 text-center">Status Distribusi</th>
              <th className="px-6 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {sales.map((item) => {
              const isDelivered = item.delivery?.status === "DITERIMA";
              const isShipped = item.delivery?.status === "DIKIRIM";
              const hasDriver = !!item.delivery?.driverName;

              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* No Surat Jalan */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                      item.delivery?.suratJalanNo 
                        ? "bg-slate-100 text-slate-800" 
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      {item.delivery?.suratJalanNo || "BELUM DIPROSES"}
                    </span>
                  </td>

                  {/* Tujuan Bongkar */}
                  <td className="px-6 py-4">
                    <span className="block font-semibold text-slate-900">{item.customerName}</span>
                    <span className="text-xs text-slate-400 block max-w-xs truncate mt-0.5" title={item.delivery?.deliveryAddress || ""}>
                      {item.delivery?.deliveryAddress || "Alamat belum ditentukan"}
                    </span>
                  </td>

                  {/* Armada Driver */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hasDriver ? (
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-slate-800 text-sm">{item.delivery?.driverName}</span>
                        <span className="self-start text-[11px] bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-600 border border-slate-200/60">
                          {item.delivery?.plateNumber || "-"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Belum Ditunjuk</span>
                    )}
                  </td>

                  {/* Kuantitas Muat */}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-900">{item.quantity.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-normal"> lbr</span>
                    <span className="block text-[11px] text-slate-400 font-normal mt-0.5">
                    {item.bagType?.name || "Tipe Karung Tidak Terdefinisi"}
                    </span>
                  </td>

                  {/* Status Distribusi */}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center text-[11px] px-2.5 py-1 rounded-full font-bold uppercase border tracking-wide ${
                      isDelivered 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60" 
                        : isShipped 
                          ? "bg-blue-50 text-blue-700 border-blue-200/60" 
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        isDelivered ? "bg-emerald-500" : isShipped ? "bg-blue-500" : "bg-amber-500"
                      }`} />
                      {item.delivery?.status || "DIPROSES"}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        onClick={() => onManageDriver(item)} 
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> 
                        Atur Jalan
                      </button>
                      
                      <button 
                        onClick={() => triggerPrintSuratJalan(item)} 
                        disabled={!hasDriver} 
                        className="bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm shadow-emerald-600/10 transition-all"
                        title={!hasDriver ? "Tunjuk driver terlebih dahulu untuk mencetak" : "Cetak Surat Jalan"}
                      >
                        <Printer className="w-3.5 h-3.5" /> 
                        Cetak SJ
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}