'use client'

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import useAuthStore from "@/store/auth-store";
import { getCurrentUserAction } from "@/features/auth/auth-action";

function useGetCurrentUser() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  return useQuery({
    queryKey: ["mee"],
    queryFn: async () => {
      const result = await getCurrentUserAction();
      if (!result.success) {
        // Handle session expiration
        if (result.sessionExpired) {
          router.push('/login?session=expired');
        }
        throw new Error(result.error || result.message);
      }
      const { role, ...userData } = result.data;
      setUser({
        ...userData,
      });
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: false,
  });
}

export default useGetCurrentUser;
