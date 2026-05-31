import { getCurrentUserAction } from "@/features/auth/auth-action"
import { clearAuthCookies } from "@/lib/auth/cookies"
import { redirect } from "next/navigation"

async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const result = await getCurrentUserAction()
  console.log('layout getCurrentUserAction result:', result)
  if (!result.success || result.sessionExpired) {
    await clearAuthCookies()
    redirect('/login')
  }
  return (
    <>{children}</>
  )
}

export default layout
