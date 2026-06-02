import { redirect } from "next/navigation"
import { getCurrentUserAction, logoutAction } from "@/features/auth/auth-action"

async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const result = await getCurrentUserAction()

  if (!result.success || result.sessionExpired || !result.data) {
    await logoutAction();
    redirect('/login?session=expired')
  }

  if (!result.data) {
    redirect('/login')
  }

  return (
    <>{children}</>
  )
}

export default layout
