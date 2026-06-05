async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-white">
      {children}
    </div>
  )
}



export default AdminLayout 
