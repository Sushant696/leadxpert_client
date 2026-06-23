import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { assignLeadToUserAction } from "../action/lead-action";
import { AssignLeadPayload } from "../types/lead-types";

const useAssignLeadToUser = (
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["assign-lead", leadId],
    mutationFn: (data: AssignLeadPayload) =>
      assignLeadToUserAction(workspaceId, pipelineId, leadId, data),
    onSuccess: () => {
      showToast.success("Lead assigned successfully");
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
      console.error("Error assigning lead:", error);
    },
  });
};

export default useAssignLeadToUser;
