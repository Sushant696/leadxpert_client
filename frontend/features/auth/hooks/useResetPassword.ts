"use client";

import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { resetPasswordAction } from "../auth-action";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: () => {
      showToast.success("Password reset successfully!");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
