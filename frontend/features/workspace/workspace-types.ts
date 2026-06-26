import { RESOURCE_BASED_ROLES } from "@/types/user";

export interface Workspace {
  _id: string;
  name: string;
  slug: string;
  owner: string;
  teamSize: number | null;
  businessType: string | null;
  profilePicture: string | null;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  workspace: Workspace,
  role: RESOURCE_BASED_ROLES
}

export interface TransformedWorkspace {
  id: string;
  name: string;
  slug: string;
  role: RESOURCE_BASED_ROLES;
  profilePicture: string | undefined;
}

export interface getAllWorkspacesResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    workspaces: [
      workspace: Workspace,
      role: string
    ];
  };
}

export interface CreateWorkspaceResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    workspace: Workspace;
  };
}

export interface CreateWorkspacePayload {
  name: string;
  profilePicture?: string;
  businessType?: string;
  teamSize?: number;
}

export interface updateWorkspacePayload {
  name?: string;
  profilePicture?: string;
  businessType?: string;
  teamSize?: number;
}

export interface DashboardStats {
  leads: {
    total: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
  };
  deals: {
    total: number;
    byStatus: Record<string, number>;
    totalValue: number;
  };
  tasks: {
    total: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
    dueToday: number;
    overdue: number;
  };
  recentActivities: Array<{
    _id: string;
    type: string;
    description?: string;
    entityType: "LEAD" | "DEAL";
    entityId: string;
    createdAt: string;
    performedBy: {
      _id: string;
      name: string;
      email: string;
      profilePicture?: string;
    };
  }>;
  conversionRate: number;
}
