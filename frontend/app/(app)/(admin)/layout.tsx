import AdminSidebar from "@/features/user/components/sidebar"
import TopBar from "@/components/navigation_dashboard/topbar/topbar"

async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-screen bg-white">
      {/* Fixed Sidebar */}
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <TopBar />
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
