import Sidebar from "@/components/navigation_dashboard/sidebar/mainSidebar"
import TopBar from "@/components/navigation_dashboard/topbar/topbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

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
