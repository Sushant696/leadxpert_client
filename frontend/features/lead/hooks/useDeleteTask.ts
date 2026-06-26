import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { deleteTaskAction } from "../action/task-action";

const useDeleteTask = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-task", workspaceId],
    mutationFn: (taskId: string) => deleteTaskAction(workspaceId, taskId),
    onSuccess: () => {
      showToast.success("Task deleted");
      queryClient.invalidateQueries({
        queryKey: ["tasks", workspaceId],
      });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
};

export default useDeleteTask;
