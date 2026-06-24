import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { completeTaskAction } from "../action/task-action";

const useCompleteTask = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["complete-task", workspaceId],
    mutationFn: (taskId: string) => completeTaskAction(workspaceId, taskId),
    onSuccess: () => {
      showToast.success("Task completed");
      queryClient.invalidateQueries({
        queryKey: ["tasks", workspaceId],
      });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
};

export default useCompleteTask;
