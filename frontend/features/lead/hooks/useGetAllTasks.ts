import { useQuery } from "@tanstack/react-query";
import { getAllTasksAction } from "../action/task-action";
import { GetAllTasksFilters } from "../types/task-types";

const useGetAllTasks = (workspaceId: string, filters?: GetAllTasksFilters) => {
  return useQuery({
    queryKey: ["tasks", workspaceId, filters],
    queryFn: () => getAllTasksAction(workspaceId, filters),
    enabled: !!workspaceId,
  });
};

export default useGetAllTasks;
