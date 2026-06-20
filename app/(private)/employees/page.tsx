import { prisma } from "@/lib/prisma";
import EmployeeClient from "@/components/EmployeeClient";

export const dynamic = "force-dynamic";

export default async function EmployeesPage() {
  // Ambil data karyawan langsung dari database PostgreSQL
  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Konversi data agar aman dilempar dari Server ke Client Component
  const serializedEmployees = employees.map((emp) => ({
    ...emp,
    createdAt: emp.createdAt.toISOString(),
  }));

  return <EmployeeClient initialData={serializedEmployees} />;
}