import { showToast } from "@/components/showToast";
import useAuthStore from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query"
import { updateProfileAction } from "../auth-action";

const useUpdateUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateProfileAction,
    onSuccess: (data) => {
      setUser({ ...data.data });
      showToast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating user:', error);
    },
  })
}

export default useUpdateUser
