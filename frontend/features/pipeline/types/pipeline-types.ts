export enum BusinessVertical {
  EDUCATION_CONSULTANCY = "EDUCATION_CONSULTANCY",
  DIGITAL_MARKETING = "DIGITAL_MARKETING",
  IT_SOFTWARE = "IT_SOFTWARE",
  LEGAL_FINANCIAL = "LEGAL_FINANCIAL",
  REAL_ESTATE = "REAL_ESTATE",
  RECRUITMENT = "RECRUITMENT",
  EVENT_MANAGEMENT = "EVENT_MANAGEMENT",
  GENERAL = "GENERAL",
}

export enum PipelineVisibility {
  WORKSPACE = "WORKSPACE",
  PRIVATE = "PRIVATE",
  MEMBERS_ONLY = "MEMBERS_ONLY",
}

export enum Currency {
  NPR = "NPR",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  INR = "INR",
}

export interface PipelineStats {
  totalLeads: number;
  openLeads: number;
  wonLeads: number;
  lostLeads: number;
  totalValue: number;
  wonValue: number;
}

export interface Pipeline {
  _id: string;
  workspaceId: string;
  name: string;
  description?: string | null;
  color: string;
  icon?: string | null;
  currency: Currency;
  vertical: BusinessVertical;
  visibility: PipelineVisibility;
  isArchived: boolean;
  createdBy: string;
  memberIds: string[];
  stageOrder: string[];
  stats: PipelineStats;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineSummary {
  _id: string;
  name: string;
  color: string;
  icon?: string | null;
  workspaceId: string;
}

export interface PipelineStageRef {
  _id: string;
  pipelineId: string;
  workspaceId: string;
  name: string;
  description?: string | null;
  color: string;
  type: "OPEN" | "WON" | "LOST";
  order?: number;
  probability: number;
  leadCount: number;
  totalValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineWithStages extends Pipeline {
  stages: PipelineStageRef[];
}


export interface CreatePipelinePayload {
  name: string;
  description?: string | null;
  color?: string;
  icon?: string | null;
  vertical?: BusinessVertical;
  currency?: Currency;
  visibility?: PipelineVisibility;
  memberIds?: string[];
}

export interface UpdatePipelinePayload {
  name?: string;
  description?: string | null;
  color?: string;
  icon?: string | null;
  vertical?: BusinessVertical;
  currency?: Currency;
  visibility?: PipelineVisibility;
  memberIds?: string[];
}


export interface CreatePipelineResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    pipeline: Pipeline;
  };
}

export interface UpdatePipelineResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    pipeline: Pipeline;
  };
}

export interface GetPipelinesResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    pipelines: PipelineSummary[];
  };
}

export interface GetSinglePipelineResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    pipeline: PipelineWithStages;
  };
}

export interface DeletePipelineResponse {
  status: number;
  message: string;
  success: boolean;
}
