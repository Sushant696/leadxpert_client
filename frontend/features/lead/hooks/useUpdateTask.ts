import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { updateTaskAction } from "../action/task-action";
import { UpdateTaskPayload } from "../types/task-types";

const useUpdateTask = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-task", workspaceId],
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskPayload }) =>
      updateTaskAction(workspaceId, taskId, data),
    onSuccess: () => {
      showToast.success("Task updated");
      queryClient.invalidateQueries({
        queryKey: ["tasks", workspaceId],
      });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
};

export default useUpdateTask;
