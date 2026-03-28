import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/sonner"; // Assuming Sonner is installed as per plan

export const metadata = {
  title: "Admin Dashboard | NepalTravel",
  description: "Admin panel for managing treks and bookings",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden admin-surface">
      {/* Sidebar */}
      <aside className="hidden md:flex border-r border-admin-card-border">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header - Mobile Sidebar Trigger could go here */}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
