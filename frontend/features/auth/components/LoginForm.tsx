'use client'

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { loginSchema, TloginForm } from "../auth.types"

function LoginForm() {
  const navigate = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TloginForm>(
    { resolver: zodResolver(loginSchema) }
  )

  const onSubmit = async (data: TloginForm) => {
    alert("LoggedIn Successfully");
    console.log(data)
    navigate.push("/dashboard")
    reset();
  }

  return (
    <div>
      <form className=" space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email address
          </Label>
          <Input
            type="email" placeholder="name@company.com"
            className="h-11"
            {...register("email",)}
          />
          {
            errors.email &&
            <span className="text-red-500">{errors.email.message}</span>
          }
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <Link href="/" className="text-sm text-primary hover:text-primary-dark transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="pr-10 h-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {
            errors.password &&
            <span className="text-red-500">{errors.password.message}</span>
          }
        </div>

        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
            Remember me
          </label>
        </div>

        <Button
          disabled={isSubmitting}
          className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-medium"
        >
          {isSubmitting ? "Signing in..." : "Log in"}
        </Button>
      </form>
    </div >
  )
}

export default LoginForm
