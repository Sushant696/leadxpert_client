import { showToast } from "@/components/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfileAction } from "../user-action";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateProfileAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mee'] });
      showToast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating user:', error);
    },
  })
}

export default useUpdateUser
