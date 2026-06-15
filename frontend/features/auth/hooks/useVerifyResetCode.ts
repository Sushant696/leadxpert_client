"use client";

import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import { verifyResetCodeAction } from "../auth-action";

export function useVerifyResetCode() {
  return useMutation({
    mutationFn: verifyResetCodeAction,
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
