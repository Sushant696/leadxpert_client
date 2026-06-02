import { redirect } from 'next/navigation'

import { getCurrentUserAction } from "@/features/auth/auth-action"
import { UserRoles } from '@/types/user'


// get back and automatically protect all admin routes make an utility function later
// than when the user is redirected to unauthorized page than show the toast according to the type of user he is also 
// create a good looking unauthorized page
// also delete all the cookies and local storage when redirected to unauthorized page

async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const result = await getCurrentUserAction()
  if (!result.success || result.sessionExpired || !result.data) {
    redirect('/login?session=expired')
  }

  if (result.data.role !== UserRoles.ADMIN) {
    redirect('/unauthorized')
  }

  return (
    <div className="flex h-screen bg-white">
      {children}
    </div>
  )
}



export default AdminLayout 
