import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { createPipelineAction } from "../action/pipeline-action";
import { CreatePipelinePayload } from "../types/pipeline-types";
import { useRouter } from "next/navigation";

const useCreatePipeline = (workspaceId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["create-pipeline", workspaceId],
    mutationFn: (data: CreatePipelinePayload) =>
      createPipelineAction(workspaceId, data),
    onSuccess: (response) => {
      router.push(`/dashboard/pipeline/${response.pipeline._id}`);
      console.log("Pipeline created:", response.pipeline._id);
      showToast.success("Pipeline created successfully");
      queryClient.invalidateQueries({ queryKey: ["pipelines", workspaceId] });
    },
    onError: (error: Error | any) => {
      showToast.error(error.message);
      console.error("Error creating pipeline:", error);
    },
  });
};

export default useCreatePipeline;
