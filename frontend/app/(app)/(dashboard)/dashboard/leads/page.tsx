'use client'

import useGetCurrentUser from "@/features/auth/hooks/useGetCurrentUser"

function Leads() {
  const { data } = useGetCurrentUser()
  return (
    <div>
      leads
    </div>
  )
}

export default Leads
