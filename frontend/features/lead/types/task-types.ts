export type TaskType =
  | "CALL"
  | "VIBER"
  | "WHATSAPP"
  | "EMAIL"
  | "MEETING"
  | "FOLLOW_UP"
  | "DEMO"
  | "DOCUMENT"
  | "OTHER";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  _id: string;
  workspaceId: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  entityType: "LEAD" | "DEAL";
  entityId: string;
  title: string;
  description?: string | null;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string | null;
  reminderAt?: string | null;
  completedAt?: string | null;
  completedBy?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  resultedInContact: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  entityType: "LEAD" | "DEAL";
  entityId: string;
  type?: TaskType;
  priority?: TaskPriority;
  dueDate?: string | null;
  assignedTo?: string | null;
  description?: string | null;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string | null;
  type?: TaskType;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string | null;
  assignedTo?: string | null;
}

export interface GetAllTasksFilters {
  status?: TaskStatus;
  entityType?: string;
  entityId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type CreateTaskResponse = ApiResponse<{ task: Task }>;
export type GetTasksResponse = ApiResponse<{ tasks: Task[] }>;
export type UpdateTaskResponse = ApiResponse<{ task: Task }>;
export type CompleteTaskResponse = ApiResponse<{ task: Task }>;
export type DeleteTaskResponse = ApiResponse<null>;
