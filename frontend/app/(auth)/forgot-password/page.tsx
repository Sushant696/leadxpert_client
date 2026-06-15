"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { useVerifyResetCode } from "@/features/auth/hooks/useVerifyResetCode";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  TforgotPasswordForm,
  TresetPasswordForm,
} from "@/features/auth/auth-validators";

type Step = "email" | "code" | "password" | "success";

const StepDots = ({ current }: { current: Step }) => {
  const steps: Step[] = ["email", "code", "password"];
  return (
    <div className="flex justify-center gap-1.5 pb-6">
      {steps.map((s) => (
        <div
          key={s}
          className={`h-1.5 rounded-full transition-all duration-300 ${current === s
            ? "w-6 bg-primary"
            : steps.indexOf(current) > steps.indexOf(s)
              ? "w-1.5 bg-primary/40"
              : "w-1.5 bg-border"
            }`}
        />
      ))}
    </div>
  );
};

const OTP_LENGTH = 6;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [savedEmail, setSavedEmail] = useState("");
  const [savedCode, setSavedCode] = useState("");

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [showPassword, setShowPassword] = useState(false);

  const forgotMutation = useForgotPassword();
  const verifyMutation = useVerifyResetCode();
  const resetMutation = useResetPassword();

  const emailForm = useForm<TforgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const passwordForm = useForm<TresetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", code: "", newPassword: "" },
  });
  const passwordValue = passwordForm.watch("newPassword", "");

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  useEffect(() => {
    if (step === "code") setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [step]);

  useEffect(() => {
    if (step === "success") setTimeout(() => router.push("/login"), 2500);
  }, [step, router]);

  const handleEmailSubmit = (data: TforgotPasswordForm) => {
    forgotMutation.mutate(data, {
      onSuccess: () => {
        setSavedEmail(data.email);
        setOtp(Array(OTP_LENGTH).fill(""));
        setCountdown(60);
        setStep("code");
      },
    });
  };

  const handleResend = () => {
    forgotMutation.mutate({ email: savedEmail }, {
      onSuccess: () => {
        setOtp(Array(OTP_LENGTH).fill(""));
        setCountdown(60);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      },
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) { const next = [...otp]; next[index] = ""; setOtp(next); }
      else if (index > 0) inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { if (i < OTP_LENGTH) next[i] = ch; });
    setOtp(next);
    const firstEmpty = next.findIndex((d) => !d);
    inputRefs.current[firstEmpty === -1 ? OTP_LENGTH - 1 : firstEmpty]?.focus();
  };

  const handleVerifyCode = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return;
    verifyMutation.mutate({ email: savedEmail, code }, {
      onSuccess: () => {
        setSavedCode(code);
        passwordForm.reset({ email: savedEmail, code, newPassword: "" });
        setStep("password");
      },
    });
  };

  const handlePasswordSubmit = (data: TresetPasswordForm) => {
    resetMutation.mutate(
      { email: savedEmail, code: savedCode, newPassword: data.newPassword },
      { onSuccess: () => setStep("success") }
    );
  };

  const otpFilled = otp.every((d) => d !== "");

  const inputCls = (hasError?: boolean) => `
    w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium
    bg-surface-variant/30 outline-none transition-all
    placeholder:text-muted-foreground/50
    focus:ring-2 focus:ring-primary/20 focus:border-primary
    disabled:opacity-60
    ${hasError ? "border-error/60 bg-error/5 focus:ring-error/20 focus:border-error" : "border-border"}
  `;

  const fieldError = (msg?: string) =>
    msg ? (
      <p className="text-xs text-error font-medium flex items-center gap-1 mt-1">
        <span className="w-1 h-1 rounded-full bg-error inline-block" />
        {msg}
      </p>
    ) : null;

  return (
    <div className="mt-20 bg-background flex items-center justify-center p-4 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div
          className="bg-surface rounded-2xl border border-border/60 shadow-xl overflow-hidden"
          style={{ animation: "slideUp 0.3s ease" }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light" />

          <div className="p-8 space-y-8">

            {step === "email" && (
              <>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <ShieldAlert className="w-8 h-8 text-primary" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-surface" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Forgot your password?</h1>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs mx-auto">
                      Enter your email and we'll send you a 6-digit reset code.
                    </p>
                  </div>
                </div>

                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="you@company.com"
                        {...emailForm.register("email")}
                        disabled={forgotMutation.isPending}
                        className={inputCls(!!emailForm.formState.errors.email)}
                      />
                    </div>
                    {fieldError(emailForm.formState.errors.email?.message)}
                  </div>
                  <Button type="submit" disabled={forgotMutation.isPending} className="w-full gap-2">
                    {forgotMutation.isPending
                      ? <><Loader2 className="w-4 h-4 animate-spin" />Sending code...</>
                      : <>Send reset code<ArrowRight className="w-4 h-4" /></>}
                  </Button>
                </form>

                <div className="text-center pt-2 border-t border-border/50">
                  <Link href="/login" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1.5 font-medium">
                    <ArrowLeft className="w-3.5 h-3.5" />Back to login
                  </Link>
                </div>
              </>
            )}

            {step === "code" && (
              <>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Check your email</h1>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      We sent a 6-digit code to{" "}
                      <span className="font-semibold text-foreground">{savedEmail}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center gap-2.5" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        disabled={verifyMutation.isPending}
                        style={{ height: "3.25rem" }}
                        className={`
                          w-11 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all
                          bg-surface-variant/40 disabled:opacity-50
                          focus:ring-2 focus:ring-primary/20 focus:bg-primary/5
                          ${digit ? "border-primary text-foreground bg-primary/5" : "border-border"}
                          ${verifyMutation.isError ? "border-error/60 bg-error/5" : ""}
                        `}
                      />
                    ))}
                  </div>
                  {verifyMutation.isError && (
                    <p className="text-center text-xs text-error font-medium">
                      Invalid or expired code. Please try again.
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleVerifyCode}
                  disabled={!otpFilled || verifyMutation.isPending}
                  className="w-full gap-2"
                >
                  {verifyMutation.isPending
                    ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying...</>
                    : <>Verify code<ArrowRight className="w-4 h-4" /></>}
                </Button>

                <div className="text-center space-y-3">
                  {countdown > 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Resend code in{" "}
                      <span className="font-bold text-foreground tabular-nums">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResend}
                      disabled={forgotMutation.isPending}
                      className="text-xs text-primary font-semibold hover:underline flex items-center gap-1.5 mx-auto disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${forgotMutation.isPending ? "animate-spin" : ""}`} />
                      Resend code
                    </button>
                  )}
                  <button
                    onClick={() => setStep("email")}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto"
                  >
                    <ArrowLeft className="w-3 h-3" />Wrong email?
                  </button>
                </div>
              </>
            )}

            {step === "password" && (
              <>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <KeyRound className="w-8 h-8 text-primary" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-surface" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Set new password</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                      Choose a strong password you haven't used before.
                    </p>
                  </div>
                </div>

                <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-5">
                  <input type="hidden" {...passwordForm.register("email")} />
                  <input type="hidden" {...passwordForm.register("code")} />

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">New password</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        {...passwordForm.register("newPassword")}
                        disabled={resetMutation.isPending}
                        className={`${inputCls(!!passwordForm.formState.errors.newPassword)} pr-11`}
                      />
                      <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {fieldError(passwordForm.formState.errors.newPassword?.message)}
                  </div>

                  <Button type="submit" disabled={resetMutation.isPending} className="w-full gap-2 mt-2">
                    {resetMutation.isPending
                      ? <><Loader2 className="w-4 h-4 animate-spin" />Resetting password...</>
                      : <>Reset password<ArrowRight className="w-4 h-4" /></>}
                  </Button>
                </form>
              </>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center text-center space-y-5 py-4" style={{ animation: "slideUp 0.25s ease" }}>
                <div className="w-16 h-16 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Password updated!</h2>
                  <p className="text-sm text-muted-foreground mt-2">Your password has been reset successfully.</p>
                </div>
                <div className="w-full bg-success/5 border border-success/20 rounded-xl p-3">
                  <p className="text-xs text-success font-medium flex items-center justify-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Redirecting to login...
                  </p>
                </div>
              </div>
            )}
          </div>

          {step !== "success" && <StepDots current={step} />}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help?{" "}
          <a href="mailto:support@leadxpert.com" className="text-primary hover:underline font-medium">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
