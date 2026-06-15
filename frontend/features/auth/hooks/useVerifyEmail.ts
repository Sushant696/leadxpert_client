"use client";

import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import { verifyEmailAction } from "../auth-action";

export function useVerifyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmailAction,
    onSuccess: () => {
      showToast.success("Email verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["mee"] });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
