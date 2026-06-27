"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRegister } from "../hooks/useRegister";
import { registerSchema, TregisterForm } from "../auth-validators";

function RegisterForm() {
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<TregisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: TregisterForm) => {
    registerMutation.mutate(data);
    if (isSubmitSuccessful) reset();
  };

  return (
    <div className="w-full">
      {/* Email/Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-foreground"
            >
              First Name*
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Jane"
              className="h-11 bg-background border-input focus:border-primary"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-xs text-destructive font-medium">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastname"
              className="text-sm font-medium text-foreground"
            >
              Last Name*
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Smith"
              className="h-11 bg-background border-input focus:border-primary"
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-xs text-destructive font-medium">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address*
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="h-11 bg-background border-input focus:border-primary"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-destructive font-medium">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password*
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              {...register("password")}
              className="h-11 pr-10 bg-background border-input focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-destructive font-medium">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password*
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className="h-11 pr-10 bg-background border-input focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-destructive font-medium">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 mt-0.5 rounded border border-input bg-background checked:bg-primary checked:border-primary cursor-pointer"
          />
          <label
            htmlFor="terms"
            className="text-xs text-muted-foreground cursor-pointer leading-relaxed"
          >
            I agree to the{" "}
            <span className="text-primary font-medium hover:underline">
              Terms and Conditions
            </span>{" "}
            and{" "}
            <span className="text-primary font-medium hover:underline">
              Privacy Policy
            </span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-all"
        >
          {isSubmitting ? "Creating your account..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
