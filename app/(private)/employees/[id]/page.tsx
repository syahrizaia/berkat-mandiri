import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EmployeeDetailView from "@/components/EmployeeDetailView";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EmployeeDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const employeeId = resolvedParams.id;

  // Ambil data karyawan beserta riwayat log kerja dan detail jenis karungnya
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
    include: {
      workLogs: {
        orderBy: { date: "desc" },
        include: {
          bagType: true,
        },
      },
    },
  });

  if (!employee) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <EmployeeDetailView employee={employee} />
    </div>
  );
}