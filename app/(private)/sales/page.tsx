import { prisma } from "@/lib/prisma";
import SalesClientWrapper from "./_components/SalesClientWrapper";

export type { SaleWithRelations } from "./_components/SalesClientWrapper";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    timeframe?: string;
  }>;
}

export default async function SalesPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const rawTimeframe = resolvedSearchParams?.timeframe || "bulan";
  const timeframe = (["hari", "pekan", "bulan", "tahun"].includes(rawTimeframe)
    ? rawTimeframe
    : "bulan") as "hari" | "pekan" | "bulan" | "tahun";

  // 1. Hitung Batas Tanggal Filter di Server
  const now = new Date();
  let startDate = new Date();

  switch (timeframe) {
    case "hari":
      startDate.setHours(0, 0, 0, 0);
      break;
    case "pekan":
      startDate.setDate(now.getDate() - 7);
      break;
    case "bulan":
      startDate.setDate(now.getDate() - 30);
      break;
    case "tahun":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate.setDate(now.getDate() - 30);
  }

  // 2. Query Langsung dari Database Neon PostgreSQL di Server (RSC)
  const [sales, bagTypes] = await Promise.all([
    prisma.sale.findMany({
      where: {
        date: { gte: startDate },
      },
      include: {
        bagType: {
          select: {
            id: true,
            name: true,
            sku: true,
          },
        },
        delivery: {
          select: {
            id: true,
            suratJalanNo: true,
            driverName: true,
            plateNumber: true,
            deliveryAddress: true,
            status: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.bagType.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        currentStock: true,
      },
      orderBy: { name: "asc" },
    }),
  ]);

  // 3. Serialisasi Data Transfer Object (DTO) Bersih
  const serializedSales = sales.map((s) => ({
    id: s.id,
    invoiceNumber: s.invoiceNumber,
    date: s.date.toISOString(),
    customerName: s.customerName,
    bagTypeId: s.bagTypeId,
    quantity: s.quantity,
    pricePerPiece: s.pricePerPiece,
    totalAmount: s.totalAmount,
    paymentStatus: s.paymentStatus as "LUNAS" | "PENDING",
    bagType: s.bagType,
    delivery: s.delivery,
  }));

  // Render langsung ke layar tanpa ada pemanggilan Fetch/XHR di browser
  return (
    <SalesClientWrapper
      sales={serializedSales}
      bagTypes={bagTypes}
      timeframe={timeframe}
    />
  );
}