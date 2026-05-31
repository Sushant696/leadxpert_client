"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserRole } from "@/types/user";
import { loginAction } from "../auth-action";
import useAuthStore from "@/store/auth-store";
import { showToast } from "@/components/showToast";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await loginAction(credentials);

      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (data) => {
      setUser({
        ...data,
        role: data.role?.toUpperCase() as UserRole,
      });
      queryClient.invalidateQueries({ queryKey: ["mee"] });
      showToast.success("Login successful!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
