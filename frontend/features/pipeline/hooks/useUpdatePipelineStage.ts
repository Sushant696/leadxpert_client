import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { updatePipelineStageAction } from "../action/pipeline-stage-action";
import { UpdatePipelineStagePayload } from "../types/pipeline-stage.types";

const useUpdatePipelineStage = (
  workspaceId: string,
  pipelineId: string,
  stageId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-pipeline-stage", workspaceId, pipelineId, stageId],
    mutationFn: (data: UpdatePipelineStagePayload) =>
      updatePipelineStageAction(workspaceId, pipelineId, stageId, data),
    onSuccess: () => {
      showToast.success("Pipeline stage updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["pipeline", workspaceId, pipelineId],
      });
    },
    onError: (error: Error | any) => {
      showToast.error(error.message);
      console.error("Error updating pipeline stage:", error);
    },
  });
};

export default useUpdatePipelineStage;
