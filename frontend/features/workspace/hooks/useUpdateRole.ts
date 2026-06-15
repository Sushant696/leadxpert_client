import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoleAction } from "../action/members-action";
import { UpdateMemberRoleType } from "../types/member-type";
import { showToast } from "@/components/showToast";
interface UseUpdateRoleProps {
  workspaceId: string;
  data: UpdateMemberRoleType;
}

function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateRole"],
    mutationFn: async ({ workspaceId, data }: UseUpdateRoleProps) => {
      return await updateRoleAction(workspaceId, data);
    },
    onSuccess: (data) => {
      showToast.success("Member role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      showToast.error(error.message)
      console.error("Failed to update member role:", error);
    },
  })
}

export { useUpdateRole };
