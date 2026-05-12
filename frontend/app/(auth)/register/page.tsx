"use client"

import { useState } from "react"

import RegisterForm from "@/features/auth/components/RegisterForm"
import SignupEmail from "@/features/auth/components/RegisterWithEmail"

function Register() {
  const [step, setStep] = useState<"email" | "form">("email")

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 flex  justify-center">
      <div className="w-full max-w-md">
        {step === "email" ? (
          <SignupEmail />
        ) : (
          <div>
            <button
              onClick={() => setStep("email")}
              className="mb-6 text-sm text-muted-foreground hover:text-foreground underline"
            >
              ← Back
            </button>
            <RegisterForm />
          </div>
        )}
      </div>
    </div>
  )
}

export default Register

