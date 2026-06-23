import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { moveLeadToStageAction } from "../action/lead-action";
import { MoveLeadToStagePayload } from "../types/lead-types";

const useMoveLeadToStage = (
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["move-lead", leadId],
    mutationFn: (data: MoveLeadToStagePayload) =>
      moveLeadToStageAction(workspaceId, pipelineId, leadId, data),
    onSuccess: () => {
      showToast.success("Lead moved successfully");
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
      console.error("Error moving lead:", error);
    },
  });
};

export default useMoveLeadToStage;
