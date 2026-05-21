import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import { registerAction } from "../auth-action";
import { RegisterData } from "../auth.types";

export function useRegister() {
  const router = useRouter();
  console.log("not working or what")
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const result = await registerAction(data);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    onSuccess: () => {
      showToast.success("Registration successful! Please login.");
      router.push("/login");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
