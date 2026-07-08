export type ActivityType =
  | "LEAD_CREATED"
  | "LEAD_UPDATED"
  | "STAGE_CHANGED"
  | "STATUS_CHANGED"
  | "ASSIGNED"
  | "UNASSIGNED"
  | "PRIORITY_CHANGED"
  | "SCORE_UPDATED"
  | "NOTE_ADDED"
  | "NOTE_EDITED"
  | "NOTE_DELETED"
  | "TASK_CREATED"
  | "TASK_COMPLETED"
  | "TASK_REOPENED"
  | "TASK_DELETED"
  | "ATTACHMENT_ADDED"
  | "ATTACHMENT_DELETED"
  | "LEAD_CONVERTED"
  | "LEAD_LOST"
  | "FOLLOW_UP_SCHEDULED"
  | "ROTTEN_FLAGGED"
  | "ROTTEN_CLEARED"
  | "TAG_ADDED"
  | "TAG_REMOVED"
  | "CUSTOM";

export interface Activity {
  _id: string;
  workspaceId: string;
  performedBy: {
    _id: string;
    name: string;
    email: string;
  };
  entityType: "LEAD" | "DEAL";
  entityId: string;
  type: ActivityType;
  description?: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type GetActivitiesResponse = ApiResponse<{ activities: Activity[] }>;
