import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import { bulkCreatePipelineStageAction } from "../action/pipeline-stage-action";

function useBulkCreatePipelineStage(workspaceId: string, pipelineId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationKey: ["bulkCreatePipelineStage", workspaceId, pipelineId],
      mutationFn: (id: string) => bulkCreatePipelineStageAction(workspaceId, pipelineId, id),
      onSuccess: () => {
        showToast.success("Pipeline stage created successfully");
        queryClient.invalidateQueries({
          queryKey: ["pipeline", workspaceId, pipelineId],
        });
      },
      onError: (error: Error | any) => {
        showToast.error(error.message);
        console.error("Error creating pipeline stage:", error);
      },
    }

  )
}

export default useBulkCreatePipelineStage
