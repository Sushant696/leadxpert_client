"use client";

import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";

import { sendVerificationAction } from "../auth-action";

export function useSendVerification() {
  return useMutation({
    mutationFn: sendVerificationAction,
    onSuccess: () => {
      showToast.success("Verification email sent! Check your inbox.");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
