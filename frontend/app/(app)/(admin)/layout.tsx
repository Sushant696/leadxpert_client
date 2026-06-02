import Sidebar from "@/components/navigation_dashboard/sidebar/mainSidebar"
import TopBar from "@/components/navigation_dashboard/topbar/topbar"
import { protectAdminRoute } from "@/lib/auth/route-protection"

async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  await protectAdminRoute()
  return (
    <div className="flex h-screen bg-white">
      {/* Fixed Sidebar */}
      <Sidebar />
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
