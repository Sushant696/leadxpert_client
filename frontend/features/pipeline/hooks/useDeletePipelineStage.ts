import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { deletePipelineStageAction } from "../action/pipeline-stage-action";

const useDeletePipelineStage = (workspaceId: string, pipelineId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-pipeline-stage", workspaceId, pipelineId],
    mutationFn: (stageId: string) =>
      deletePipelineStageAction(workspaceId, pipelineId, stageId),
    onSuccess: () => {
      showToast.success("Pipeline stage deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["pipeline", workspaceId, pipelineId],
      });
    },
    onError: (error: Error | any) => {
      showToast.error(error.message);
      console.error("Error deleting pipeline stage:", error);
    },
  });
};

export default useDeletePipelineStage;
