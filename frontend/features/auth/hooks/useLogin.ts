"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserRoles } from "@/types/user";
import { loginAction } from "../auth-action";
import useAuthStore from "@/store/auth-store";
import { showToast } from "@/components/showToast";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginAction,
    onSuccess: (user) => {
      const { role, ...userData } = user;
      setUser(userData);
      queryClient.invalidateQueries({ queryKey: ["mee"] });

      if (role?.toUpperCase() === UserRoles.ADMIN) {
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
