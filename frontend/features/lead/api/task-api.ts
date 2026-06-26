import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import {
  CreateTaskPayload,
  CreateTaskResponse,
  GetTasksResponse,
  GetAllTasksFilters,
  UpdateTaskPayload,
  UpdateTaskResponse,
  CompleteTaskResponse,
  DeleteTaskResponse,
} from "../types/task-types";

const taskApi = {
  createTask: async (
    workspaceId: string,
    data: CreateTaskPayload,
  ): Promise<CreateTaskResponse> => {
    return await apiWrapper.post(
      apiURLs.TASK.create(workspaceId),
      data,
    );
  },

  getAllTasks: async (
    workspaceId: string,
    filters?: GetAllTasksFilters,
  ): Promise<GetTasksResponse> => {
    return await apiWrapper.get(
      apiURLs.TASK.getAll(workspaceId),
      filters,
    );
  },

  getTasksByEntity: async (
    workspaceId: string,
    entityType: string,
    entityId: string,
  ): Promise<GetTasksResponse> => {
    return await apiWrapper.get(
      apiURLs.TASK.getAll(workspaceId),
      { entityType, entityId },
    );
  },

  updateTask: async (
    workspaceId: string,
    taskId: string,
    data: UpdateTaskPayload,
  ): Promise<UpdateTaskResponse> => {
    return await apiWrapper.patch(
      apiURLs.TASK.update(workspaceId, taskId),
      data,
    );
  },

  completeTask: async (
    workspaceId: string,
    taskId: string,
  ): Promise<CompleteTaskResponse> => {
    return await apiWrapper.patch(
      apiURLs.TASK.complete(workspaceId, taskId),
    );
  },

  deleteTask: async (
    workspaceId: string,
    taskId: string,
  ): Promise<DeleteTaskResponse> => {
    return await apiWrapper.delete(
      apiURLs.TASK.delete(workspaceId, taskId),
    );
  },
};

export { taskApi };
