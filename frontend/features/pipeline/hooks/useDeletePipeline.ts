import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { deletePipelineAction } from "../action/pipeline-action";

const useDeletePipeline = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-pipeline", workspaceId],
    mutationFn: (pipelineId: string) =>
      deletePipelineAction(workspaceId, pipelineId),
    onSuccess: () => {
      showToast.success("Pipeline deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["pipelines", workspaceId] });
    },
    onError: (error: Error | any) => {
      showToast.error(error.message);
      console.error("Error deleting pipeline:", error);
    },
  });
};

export default useDeletePipeline;
