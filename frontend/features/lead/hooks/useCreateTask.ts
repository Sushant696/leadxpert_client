import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { createTaskAction } from "../action/task-action";
import { CreateTaskPayload } from "../types/task-types";

const useCreateTask = (workspaceId: string, pipelineId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-task", workspaceId],
    mutationFn: (data: CreateTaskPayload) =>
      createTaskAction(workspaceId, data),
    onSuccess: (_data, variables) => {
      showToast.success("Task created");
      queryClient.invalidateQueries({
        queryKey: ["tasks", workspaceId, variables.entityType, variables.entityId],
      });
      // Invalidate leads to refresh taskCount on the card
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
};

export default useCreateTask;
