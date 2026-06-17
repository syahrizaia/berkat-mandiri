import FooterPrivate from "@/components/FooterPrivate";
import SidebarPrivate from "@/components/SidebarPrivate";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar tetap fixed */}
      <SidebarPrivate />

      <div className="md:pl-64 flex flex-col min-h-screen">
        
        {/* Main content akan memenuhi sisa ruang (flex-grow) */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer akan selalu berada di bawah karena flex-grow pada main */}
        <FooterPrivate />
      </div>
    </div>
  );
}