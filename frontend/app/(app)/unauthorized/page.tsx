'use server'
import { Suspense } from 'react'
import UnauthorizedClient from '../(public)/_unauthorized/_unauthorizedClient'

export default async function UnauthorizedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnauthorizedClient />
    </Suspense>
  )
}
