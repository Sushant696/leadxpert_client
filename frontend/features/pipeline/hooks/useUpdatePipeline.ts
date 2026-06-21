import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { updatePipelineAction } from "../action/pipeline-action";
import { UpdatePipelinePayload } from "../types/pipeline-types";

const useUpdatePipeline = (workspaceId: string, pipelineId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-pipeline", workspaceId, pipelineId],
    mutationFn: (data: UpdatePipelinePayload) =>
      updatePipelineAction(workspaceId, pipelineId, data),
    onSuccess: () => {
      showToast.success("Pipeline updated successfully");
      queryClient.invalidateQueries({ queryKey: ["pipelines", workspaceId] });
      queryClient.invalidateQueries({
        queryKey: ["pipeline", workspaceId, pipelineId],
      });
    },
    onError: (error: Error | any) => {
      showToast.error(error.message);
      console.error("Error updating pipeline:", error);
    },
  });
};

export default useUpdatePipeline;
