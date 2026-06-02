import { redirect } from "next/navigation"
import { getCurrentUserAction } from "@/features/auth/auth-action"
import { UserRoles } from "@/types/user"

async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const result = await getCurrentUserAction()

  if (!result.success || result.sessionExpired || !result.data) {
    redirect('/login?session=expired')
  }

  if (result.data.role !== UserRoles.USER) {
    redirect('/unauthorized')
  }

  return (
    <>{children}</>
  )
}

export default layout
