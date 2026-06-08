export interface Workspace {
  _id: string;
  name: string;
  slug: string;
  owner: string;
  businessType: string | null;
  teamSize: number | null;
  members: string[];
  createdAt: string;
  updatedAt: string;
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
  businessType?: string;
  teamSize?: number;
}
