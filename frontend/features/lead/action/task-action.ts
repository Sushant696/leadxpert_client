"use server";

import { taskApi } from "../api/task-api";
import {
  CreateTaskPayload,
  GetAllTasksFilters,
  UpdateTaskPayload,
} from "../types/task-types";

export async function createTaskAction(
  workspaceId: string,
  data: CreateTaskPayload,
) {
  const response = await taskApi.createTask(workspaceId, data);
  if (!response.success) {
    throw new Error(response.message || "Failed to create task");
  }
  return response.data.task;
}

export async function getAllTasksAction(
  workspaceId: string,
  filters?: GetAllTasksFilters,
) {
  const response = await taskApi.getAllTasks(workspaceId, filters);
  console.log(response, "donedonedone")
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch tasks");
  }
  return response.data.tasks;
}

export async function getTasksByEntityAction(
  workspaceId: string,
  entityType: string,
  entityId: string,
) {
  const response = await taskApi.getTasksByEntity(
    workspaceId,
    entityType,
    entityId,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch tasks");
  }
  return response.data.tasks;
}

export async function updateTaskAction(
  workspaceId: string,
  taskId: string,
  data: UpdateTaskPayload,
) {
  const response = await taskApi.updateTask(workspaceId, taskId, data);
  if (!response.success) {
    throw new Error(response.message || "Failed to update task");
  }
  return response.data.task;
}

export async function completeTaskAction(
  workspaceId: string,
  taskId: string,
) {
  const response = await taskApi.completeTask(workspaceId, taskId);
  if (!response.success) {
    throw new Error(response.message || "Failed to complete task");
  }
  return response.data.task;
}

export async function deleteTaskAction(
  workspaceId: string,
  taskId: string,
) {
  const response = await taskApi.deleteTask(workspaceId, taskId);
  if (!response.success) {
    throw new Error(response.message || "Failed to delete task");
  }
  return true;
}
