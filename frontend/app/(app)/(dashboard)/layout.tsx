import TopBar from "@/components/navigation_dashboard/topbar/topbar"
import Sidebar from "@/components/navigation_dashboard/sidebar/mainSidebar"

async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-screen bg-white">
      {/* Fixed Sidebar (Desktop only) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation 

        */}
        <TopBar />
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
export default DashboardLayout
