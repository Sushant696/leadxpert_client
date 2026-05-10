'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      console.log("Login attempt:", { email, password })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-5">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </Label>
          <a href="#" className="text-sm text-primary hover:text-primary-dark transition-colors">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </div>

      {/* Remember Me */}
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

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-medium"
      >
        {isLoading ? "Signing in..." : "Log in"}
      </Button>
    </div>
  )
}

export default LoginForm
