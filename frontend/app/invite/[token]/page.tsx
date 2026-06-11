'use client'
import { useJoinWorkspace } from '@/features/auth/hooks/useJoinWorkspace'
import { useParams} from 'next/navigation'
import { useEffect, useRef } from 'react'

function Token() {
  const params = useParams()
  const token = typeof params.token === 'string' ? params.token : null
  const joinWorkspaceMutation = useJoinWorkspace(token || "")
  const hasMutated = useRef(false)

  useEffect(() => {
    if (token && typeof token === 'string' && !hasMutated.current) {
      hasMutated.current = true
      joinWorkspaceMutation.mutate()
    }
  }, [joinWorkspaceMutation, token])

  if (joinWorkspaceMutation.isPending) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full' />
      </div>
    )
  }

  if (joinWorkspaceMutation.isError) {
    const error = joinWorkspaceMutation.error

    if (
      error?.message === 'Please login to continue' ||
      error?.message === 'Your session has expired. Please login again.'
    ) {
      return <div className='flex items-center justify-center min-h-screen'>
        Redirecting to login...
      </div>
    }

    console.error('Error joining workspace:', error);
    return <div className='flex items-center justify-center min-h-screen'>
      Error: {error instanceof Error ? error.message : 'An error occurred'}
    </div>
  }

  if (joinWorkspaceMutation.isSuccess) {
    return <div className='flex items-center justify-center min-h-screen'>
      Successfully joined workspace! Redirecting...
    </div>
  }

  return null
}

export default Token
