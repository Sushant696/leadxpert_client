import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import {
  removeMemberFromWorkspaceAction
} from "../action/members-action";

interface RemoveWorkspaceUserParams {
  workspaceId: string;
  userId: string;
}

function useRemoveWorkspaceUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["removeUser"],
    mutationFn: async ({
      workspaceId,
      userId,
    }: RemoveWorkspaceUserParams) => { await removeMemberFromWorkspaceAction(workspaceId, userId) },
    onSuccess: () => {
      showToast.success("User removed from workspace successfully");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      showToast.error(error.message)
      console.error("Failed to delete user from workspace:", error);
    },
  })
}

export { useRemoveWorkspaceUser };
