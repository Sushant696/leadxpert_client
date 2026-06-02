'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ShieldX, ArrowLeft, Home, Mail, AlertCircle } from 'lucide-react'
import useAuthStore from '@/store/auth-store'


function UnauthorizedClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const type = searchParams.get('type')
  const clearUser = useAuthStore(state => state.clearUser)

  useEffect(() => {
    clearUser()
    localStorage.clear()
  }, [clearUser])

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-primary opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/4 h-72 w-72 rounded-full bg-secondary opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Error Code */}
        <div className="mb-6 text-center">
          <h1 className="text-8xl font-bold text-foreground mb-2 tracking-tight">
            403
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary via-accent to-secondary rounded-full"></div>
        </div>

        {/* Title & Message */}
        <div className="mb-8 text-center max-w-md">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Access Denied
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {type === 'admin'
              ? "This area is restricted to administrators only. You don't have the required permissions to access this resource."
              : "You don't have the necessary permissions to access this resource. Please contact support if you believe this is an error."
            }
          </p>
        </div>

        {/* Info Card */}
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-border bg-card px-6 py-4 shadow-lg max-w-md">
          <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
          <div className="text-sm text-card-foreground">
            <p className="font-semibold mb-1">What happened?</p>
            <p className="text-muted-foreground">
              Your account doesn't have permission to view this page. All authentication data has been cleared for security.
            </p>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-px w-12 bg-border"></div>
            <Mail className="h-4 w-4" />
            <div className="h-px w-12 bg-border"></div>
          </div>
          <p className="text-sm text-muted-foreground">
            Need assistance?{' '}
            <a
              href="mailto:support@example.com"
              className="text-primary hover:text-primary-dark underline decoration-primary/30 hover:decoration-primary transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Error Reference: {Math.random().toString(36).substring(2, 15).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedClient
