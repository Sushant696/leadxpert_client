"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  X,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSendVerification } from "@/features/auth/hooks/useSendVerification";
import { useVerifyEmail } from "@/features/auth/hooks/useVerifyEmail";
import useAuthStore from "@/store/auth-store";

interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "send" | "verify" | "success";

const OTP_LENGTH = 6;

export function VerifyEmailModal({ isOpen, onClose }: VerifyEmailModalProps) {
  const { user } = useAuthStore();
  const [step, setStep] = useState<Step>("send");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const sendVerificationMutation = useSendVerification();
  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("send");
        setOtp(Array(OTP_LENGTH).fill(""));
        setCountdown(0);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === "verify") {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleSend = () => {
    sendVerificationMutation.mutate(undefined, {
      onSuccess: () => {
        setStep("verify");
        setCountdown(60);
      },
    });
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    sendVerificationMutation.mutate(undefined, {
      onSuccess: () => {
        setCountdown(60);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      },
    });
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return;
    verifyEmailMutation.mutate(
      { code },
      {
        onSuccess: () => {
          setStep("success");
          setTimeout(() => onClose(), 2000);
        },
      }
    );
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (digit && index === OTP_LENGTH - 1) {
      const allFilled = newOtp.every((d) => d !== "");
      if (allFilled) {
        setTimeout(() => {
          const code = newOtp.join("");
          verifyEmailMutation.mutate(
            { code: code },
            { onSuccess: () => { setStep("success"); setTimeout(() => onClose(), 2000); } }
          );
        }, 100);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < OTP_LENGTH) newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex((d) => !d);
    const focusIndex = nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const otpFilled = otp.every((d) => d !== "");
  const isSending = sendVerificationMutation.isPending;
  const isVerifying = verifyEmailMutation.isPending;

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      style={{ animation: "fadeIn 0.2s ease" }}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border/60 overflow-hidden"
        style={{ animation: "slideUp 0.25s ease" }}
      >
        <div className="h-1.5 w-full bg-linear-to-r from-primary-dark via-primary to-primary-light" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-variant transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          {step === "send" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Verify your email</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    We&apos;ll send a 6-digit code to
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 flex gap-3">
                <div className="w-5 h-5 rounded-full bg-warning/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-warning text-[10px] font-black">!</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Verifying your email helps secure your account and enables all LeadXpert features.
                </p>
              </div>

              <Button
                onClick={handleSend}
                disabled={isSending}
                className="w-full gap-2"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  <>
                    Send verification code
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Enter the code</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sent to{" "}
                    <span className="font-semibold text-foreground">{user?.email}</span>
                  </p>
                </div>
              </div>

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
                    disabled={isVerifying}
                    className={`
                      w-11 h-13 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all
                      bg-surface-variant/40
                      disabled:opacity-50
                      ${digit
                        ? "border-primary text-foreground bg-primary/5"
                        : "border-border text-foreground"
                      }
                      focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-primary/5
                      ${verifyEmailMutation.isError ? "border-error/60 bg-error/5" : ""}
                    `}
                    style={{ height: "3.25rem" }}
                  />
                ))}
              </div>

              {verifyEmailMutation.isError && (
                <p className="text-center text-xs text-error font-medium">
                  Invalid code. Please check and try again.
                </p>
              )}

              <Button
                onClick={handleVerify}
                disabled={!otpFilled || isVerifying}
                className="w-full gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify email
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Resend code in{" "}
                    <span className="font-bold text-foreground tabular-nums">
                      {countdown}s
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={isSending}
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1.5 mx-auto disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSending ? "animate-spin" : ""}`} />
                    Resend code
                  </button>
                )}
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center border border-success/20">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Email verified!</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Your account is now fully verified.
                </p>
              </div>
              <div className="w-full bg-success/5 border border-success/20 rounded-xl p-3">
                <p className="text-xs text-success font-medium">
                  ✓ Closing automatically...
                </p>
              </div>
            </div>
          )}
        </div>

        {step !== "success" && (
          <div className="flex justify-center gap-1.5 pb-6">
            {(["send", "verify"] as Step[]).map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${step === s ? "w-6 bg-primary" : "w-1.5 bg-border"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
