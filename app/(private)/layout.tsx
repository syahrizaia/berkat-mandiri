import FooterPrivate from "@/components/FooterPrivate";
import SidebarPrivate from "@/components/SidebarPrivate";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent relative selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Sidebar macOS Sonoma Liquid Glass Style */}
      <SidebarPrivate />

      <div className="md:pl-72 flex flex-col min-h-screen relative z-10 transition-all duration-300">
        
        {/* Main Content Area */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <FooterPrivate />
      </div>
    </div>
  );
}