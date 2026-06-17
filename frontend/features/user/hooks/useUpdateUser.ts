import { showToast } from "@/components/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfileAction } from "../user-action";
import useAuthStore from "@/store/auth-store";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateProfileAction,
    onSuccess: (data) => {
      const { role, ...userData } = data?.data;
      setUser({ ...userData });
      queryClient.invalidateQueries({ queryKey: ['mee'] });
      showToast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating user:', error);
    },
  })
}

export default useUpdateUser
