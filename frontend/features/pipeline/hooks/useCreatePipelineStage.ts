import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { createPipelineStageAction } from "../action/pipeline-stage-action";
import { CreatePipelineStagePayload } from "../types/pipeline-stage.types";

const useCreatePipelineStage = (workspaceId: string, pipelineId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-pipeline-stage", workspaceId, pipelineId],
    mutationFn: (data: CreatePipelineStagePayload) =>
      createPipelineStageAction(workspaceId, pipelineId, data),
    onSuccess: (data) => {
      showToast.success("Pipeline stage created successfully");
      // Part 2: nudge the user when the pipeline still lacks a WON/LOST stage,
      // since leads can't be won/lost without the matching terminal stage.
      const warnings = (data as { pipelineStage?: { warnings?: string[] } })
        ?.pipelineStage?.warnings;
      warnings?.forEach((w) => showToast.info(w));
      queryClient.invalidateQueries({
        queryKey: ["pipeline", workspaceId, pipelineId],
      });
    },
    onError: (error: Error | any) => {
      showToast.error(error.message);
      console.error("Error creating pipeline stage:", error);
    },
  });
};

export default useCreatePipelineStage;
