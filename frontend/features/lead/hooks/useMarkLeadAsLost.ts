import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { markLeadAsLostAction } from "../action/lead-action";
import { MarkLeadAsLostPayload } from "../types/lead-types";

const useMarkLeadAsLost = (
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["mark-lead-lost", leadId],
    mutationFn: (data: MarkLeadAsLostPayload) =>
      markLeadAsLostAction(workspaceId, pipelineId, leadId, data),
    onSuccess: () => {
      showToast.success("Lead marked as lost");
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
      console.error("Error marking lead as lost:", error);
    },
  });
};

export default useMarkLeadAsLost;
