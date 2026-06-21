import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { reorderPipelineStagesAction } from "../action/pipeline-stage-action";
import { ReorderPipelineStagesPayload } from "../types/pipeline-stage.types";

const useReorderPipelineStages = (workspaceId: string, pipelineId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["reorder-pipeline-stages", workspaceId, pipelineId],
    mutationFn: (data: ReorderPipelineStagesPayload) =>
      reorderPipelineStagesAction(workspaceId, pipelineId, data),
    onSuccess: () => {
      showToast.success("Pipeline stages reordered successfully");
      queryClient.invalidateQueries({
        queryKey: ["pipeline", workspaceId, pipelineId],
      });
    },
    onError: (error: Error | any) => {
      showToast.error(error.message);
      console.error("Error reordering pipeline stages:", error);
    },
  });
};

export default useReorderPipelineStages;
