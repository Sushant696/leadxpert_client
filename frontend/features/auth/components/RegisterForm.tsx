'use client'

import { useState } from "react"
import { Google } from "iconsax-reactjs"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { registerSchema, TregisterForm } from "../auth.types"

function RegisterForm() {
  const navigate = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TregisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: TregisterForm) => {
    alert("User created successfully")
    navigate.push("/login")
    reset()
  }

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth flow
  }

  return (
    <div className="w-full rounded">
      <div className="space-y-4 p-4 sm:p-6">
        <Button
          type="button"
          onClick={handleGoogleSignUp}
          variant="outline"
          className="w-full h-11 border-1 border-input rounded-md hover:bg-secondary/50 text-foreground font-medium bg-transparent"
        >
          <Google variant="Bulk" className="h-5 w-5" />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-xs text-muted-foreground font-medium">or with email</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
              First Name*
            </Label>
            <Input id="firstName" type="text" placeholder="Jane" className="h-10" {...register("firstName")} />
            {errors.firstName && (
              <span className="text-xs text-destructive font-medium">{errors.firstName.message}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname" className="text-sm font-medium text-foreground">
              Last Name*
            </Label>
            <Input id="lastname" type="text" placeholder="Smith" className="h-10" {...register("lastname")} />
            {errors.lastname && <span className="text-xs text-destructive font-medium">{errors.lastname.message}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address*
          </Label>
          <Input id="email" type="email" placeholder="name@company.com" className="h-10" {...register("email")} />
          {errors.email && <span className="text-xs text-destructive font-medium">{errors.email.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password*
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              {...register("password")}
              className="h-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <span className="text-xs text-destructive font-medium">{errors.password.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            Confirm Password*
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className="h-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-destructive font-medium">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border border-input bg-background checked:bg-primary checked:border-primary cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
            I agree to the <span className="text-primary font-medium hover:underline">Terms and Conditions</span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
