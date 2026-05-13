"use client"

import { useState } from "react"

import SourceChannelPage from "./source-channel/page"
import CompanySetup from "@/features/auth/components/CompanySetup"
import VerifyCodePage from "@/features/auth/components/VerifyCode"
import SignupEmail from "@/features/auth/components/SignupWithEmail"
import PersonalDetailsForm from "@/features/auth/components/PersonalDetails"

type RegistrationStep = "email" | "code" | "personal" | "profile" | "company" | "source"

export interface RegistrationData {
  email: string
  firstName: string
  lastName: string
  dob: string
  password: string
  companyName?: string
  userRole?: string
  sourceChannel?: string
}

export default function Register() {
  const [step, setStep] = useState<RegistrationStep>("email")
  const [registrationData, setRegistrationData] = useState<Partial<RegistrationData>>({})

  const handleEmailSubmit = (email: string) => {
    setRegistrationData((prev) => ({ ...prev, email }))
    setStep("code")
  }

  const handleCodeVerify = () => {
    setStep("personal")
  }

  const handlePersonalSubmit = (data: { firstName: string; lastName: string; dob: string }) => {
    setRegistrationData((prev) => ({ ...prev, ...data }))
    setStep("profile")
  }

  const handleBack = () => {
    switch (step) {
      case "code":
        setStep("email")
        break
      case "personal":
        setStep("code")
        break
      case "profile":
        setStep("personal")
        break
      case "company":
        setStep("profile")
        break
      case "source":
        setStep("company")
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 flex justify-center">
      <div className="w-full max-w-md">
        {step === "email" && <SignupEmail onEmailSubmit={handleEmailSubmit} />}
        {step === "code" && registrationData.email && (
          <VerifyCodePage email={registrationData.email} onCodeVerify={handleCodeVerify} onBack={handleBack} />
        )}
        {step === "personal" && (
          <PersonalDetailsForm email={registrationData.email || ""} onSubmit={handlePersonalSubmit} onBack={handleBack} />
        )}
        {step === "company" && (
          <CompanySetup
          />
        )}
        {step === "source" && (
          <SourceChannelPage
          />
        )}
      </div>
    </div>
  )
}

