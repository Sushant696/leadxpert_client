"use client";

import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import { forgotPasswordAction } from "../auth-action";

export function useForgotPassword() {

  return useMutation({
    mutationFn: forgotPasswordAction,
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
