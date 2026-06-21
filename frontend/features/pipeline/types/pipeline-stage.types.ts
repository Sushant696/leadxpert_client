export enum StageType {
  OPEN = "OPEN",
  WON = "WON",
  LOST = "LOST",
}

export interface PipelineStage {
  _id: string;
  pipelineId: string;
  workspaceId: string;
  name: string;
  description?: string | null;
  color: string;
  type: StageType;
  probability: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePipelineStagePayload {
  name: string;
  description?: string | null;
  color?: string;
  type?: StageType;
  probability?: number;
}

export interface UpdatePipelineStagePayload {
  name?: string;
  description?: string | null;
  color?: string;
  type?: StageType;
  probability?: number;
}

export interface ReorderPipelineStagesPayload {
  stageIds: string[];
}

export interface CreatePipelineStageResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    stage: PipelineStage;
  };
}

export interface UpdatePipelineStageResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    stage: PipelineStage;
  };
}

export interface ReorderPipelineStagesResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    stageOrder: string[];
  };
}

export interface DeletePipelineStageResponse {
  status: number;
  message: string;
  success: boolean;
}
