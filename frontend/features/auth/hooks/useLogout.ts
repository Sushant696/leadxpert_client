"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logoutAction } from "../auth-action";
import useAuthStore from "@/store/auth-store";
import { showToast } from "@/components/showToast";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((s) => s.clearUser);

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      showToast.success("Logged out successfully!");
      router.push("/login");
    },

    onError: (error: Error) => {
      showToast.error("Logout failed");
    },
  });
}
