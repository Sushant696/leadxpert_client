import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { updateLeadAction } from "../action/lead-action";
import { UpdateLeadPayload } from "../types/lead-types";

const useUpdateLead = (
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-lead", leadId],
    mutationFn: (data: UpdateLeadPayload) =>
      updateLeadAction(workspaceId, pipelineId, leadId, data),
    onSuccess: () => {
      showToast.success("Lead updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
      console.error("Error updating lead:", error);
    },
  });
};

export default useUpdateLead;
