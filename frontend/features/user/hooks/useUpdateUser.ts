import useAuthStore from "@/store/auth-store";
import { showToast } from "@/components/showToast";
import { useMutation } from "@tanstack/react-query"
import { updateProfileAction } from "../user-action";

const useUpdateUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateProfileAction,
    onSuccess: (data) => {
      const { role, ...userData } = data.data;
      setUser({
        ...userData,
      });
      showToast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating user:', error);
    },
  })
}

export default useUpdateUser
