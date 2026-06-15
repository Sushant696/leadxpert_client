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
  const token = useAuthStore((s) => s.token);
  const setInviteToken = useAuthStore((s) => s.setInviteToken)

  return useMutation({
    mutationFn: loginAction,
    onSuccess: async (user) => {
      const { role, _id, ...userData } = user;
      setUser(userData);
      queryClient.invalidateQueries({ queryKey: ["mee"] });

      showToast.success("Login successful!");

      if (role?.toUpperCase() === UserRoles.ADMIN) {
        router.push("/admin/");
      } else {
        if (token?.token) {
          setInviteToken({ token: token.token });
        }
        router.push("/dashboard");
      }
    },

    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
