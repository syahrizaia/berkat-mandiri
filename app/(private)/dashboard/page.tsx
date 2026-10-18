import { getDashboardData } from "@/lib/dashboard-service";
import DashboardClientView from "./_components/DashboardClientView";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Ambil seluruh data dashboard langsung di server side (Neon PostgreSQL + ML)
  // Tidak ada request HTTP/XHR/Fetch yang dipicu di tab Network browser!
  const data = await getDashboardData();

  return <DashboardClientView data={data} />;
}