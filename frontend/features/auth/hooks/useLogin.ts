"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginAction } from "../auth-action";
import useAuthStore from "@/store/auth-store";
import { UserRoles } from "@/types/user";
import { showToast } from "@/components/showToast";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await loginAction(credentials);

      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (data) => {
      const { role, ...userData } = data;
      setUser({
        ...userData,
      });
      queryClient.invalidateQueries({ queryKey: ["mee"] });
      if (data.role?.toUpperCase() === UserRoles.ADMIN) {
        router.push("/admin/");
      } else {
        router.push("/dashboard/");
      }
      showToast.success("Login successful!");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
