import Link from "next/link"
import type React from "react"
import { Google, TableDocument } from "iconsax-reactjs"
import { useRouter } from "next/navigation"

function SignupEmail() {

  const navigate = useRouter()

  const handleEmailVerify = async (e: React.FormEvent) => {
  }

  const handleGoogleSignup = () => {
    console.log("Google signup clicked")
  }

  return (
    <div className="w-full max-w-md mt-6 md:mt-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Create your free account</h1>
        <p className="text-sm text-muted-foreground">100% free. No credit card needed.</p>
      </div>

      <div className="space-y-3 mb-6">
        <button
          onClick={handleGoogleSignup}
          className="w-full border border-border rounded-lg px-4 py-3 flex items-center justify-center gap-3 hover:bg-secondary/50 transition-colors"
        >
          <Google variant="Bulk" />
          <span className="text-sm font-medium text-foreground">Continue with Google</span>
        </button>
        <button
          onClick={() => navigate.push("/register/classic")}
          className="w-full border border-border rounded-lg px-4 py-3 flex items-center justify-center gap-3 hover:bg-secondary/50 transition-colors"
        >
          <TableDocument variant="Bulk" />
          <span className="text-sm font-medium text-foreground">Signup with classic register form</span>
        </button>

      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-medium text-muted-foreground uppercase">Or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleEmailVerify} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
            Email address <span className="text-destructive">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="flex-1 px-3 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <button
              type="submit"
              className="p-2 rounded px-8 border text-white bg-black g-primary text-primary-foreground hover:bg-primary/90"
            >
              Verify
            </button>
          </div>
        </div>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        We may contact you with relevant content, products, and services. You can unsubscribe at any time. Learn more in
        our{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
      </p>

      <p className="text-center mt-6 text-sm text-foreground">
        Have an account?{" "}
        <Link href="/login" className="font-semibold underline hover:text-primary">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignupEmail
