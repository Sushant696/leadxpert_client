"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowLeft } from "iconsax-reactjs"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

interface VerifyCodeProps {
  email: string
  onCodeVerify: () => void
  onBack: () => void
}

function VerifyCodePage({ email, onCodeVerify, onBack }: VerifyCodeProps) {
  const navigate = useRouter()
  const [code, setCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(300)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
    }, 500)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-md mx-auto border border-primary/10 mt-6 md:mt-12 ">
      <div className="w-full  p-4 ">
        <Button
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors text-white"
          onClick={onBack}
        >
          <ArrowLeft className="text-white" size={18} />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify your email</h1>
          <p className="text-sm text-muted-foreground">We sent a code to </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-semibold text-foreground mb-2">
              Verification code <span className="text-destructive">*</span>
            </label>
            <input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              required
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-center tracking-widest text-lg"
            />
          </div>

          <button
            type="submit"
            onClick={() => navigate.push("/register/personal-info")}
            disabled={isVerifying || code.length !== 6}
            className="w-full px-4 py-2.5 rounded text-white bg-black hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Code expires in{" "}
            <span className={timeLeft < 60 ? "text-destructive font-semibold" : "font-semibold text-foreground"}>
              {formatTime(timeLeft)}
            </span>
          </p>
          <button className="text-sm text-primary hover:underline font-medium">Resend code</button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          Didn't receive the code? Check your spam folder or{" "}
          <button className="underline hover:text-foreground">
            try another email
          </button>
        </p>
      </div>
    </div>
  )
}
export default VerifyCodePage
