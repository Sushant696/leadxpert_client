import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteUserAction } from "../user-action"

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: (userId: string) => deleteUserAction(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    }
  })
}

export default useDeleteUser;
