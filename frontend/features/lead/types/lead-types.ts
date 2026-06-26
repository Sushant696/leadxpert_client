export type LeadPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type LeadStatus = "OPEN" | "CONTACTED" | "QUALIFIED" | "LOST";
export type LeadSource =
  | "WEBSITE"
  | "REFERRAL"
  | "COLD_CALL"
  | "EMAIL"
  | "SOCIAL_MEDIA"
  | "EVENT"
  | "OTHER";
export type Currency = "USD" | "EUR" | "GBP" | "NPR";

export interface Lead {
  _id: string;
  workspaceId: string;
  pipelineId: string;
  stageId: {
    _id: string;
    name: string;
  };
  contactId?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
  } | null;
  createdBy: string;
  title: string;
  value: number;
  currency: Currency;
  priority: LeadPriority;
  source?: LeadSource | null;
  status: LeadStatus;
  tags: string[];
  quickNote?: string | null;
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  nextFollowUpAt?: string | null;
  lastContactedAt?: string | null;
  isRotten: boolean;
  stageEnteredAt: string;
  stageHistory: StageHistoryEntry[];
  isConverted: boolean;
  convertedAt?: string | null;
  convertedBy?: string | null;
  lostReason?: string | null;
  taskCount: number;
  noteCount: number;
  activityCount: number;
  mlScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface StageHistoryEntry {
  stageId: string;
  stageName: string;
  enteredAt: string;
  exitedAt?: string | null;
  timeSpentMs: number;
  movedBy?: string | null;
}

export interface CreateLeadPayload {
  contactId?: string | null;
  stageId?: string;
  title: string;
  value: number;
  currency: Currency;
  priority: LeadPriority;
  source?: LeadSource;
  assignedTo?: string;
  nextFollowUpAt?: string;
  tags?: string[];
  quickNote?: string;
}

export interface UpdateLeadPayload {
  title?: string;
  value?: number;
  currency?: Currency;
  priority?: LeadPriority;
  source?: LeadSource;
  status?: LeadStatus;
  assignedTo?: string | null;
  nextFollowUpAt?: string | null;
  tags?: string[];
  quickNote?: string;
  lostReason?: string;
}

export interface MoveLeadToStagePayload {
  stageId: string;
}

export interface AssignLeadPayload {
  userId: string;
}

export interface MarkLeadAsLostPayload {
  lostReason?: string;
}

// Query Options
export interface GetLeadsOptions {
  stageId?: string;
  assignedTo?: string;
  search?: string;
  view?: "kanban" | "list";
  page?: number;
  limit?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type CreateLeadResponse = ApiResponse<{ lead: Lead }>;
export type GetLeadsResponse = ApiResponse<{ leads: Lead[] }>;
export type GetLeadByIdResponse = ApiResponse<{ lead: Lead }>;
export type UpdateLeadResponse = ApiResponse<{ lead: Lead }>;
export type MoveLeadResponse = ApiResponse<{ lead: Lead }>;
export type AssignLeadResponse = ApiResponse<{ lead: Lead }>;
export type ConvertLeadResponse = ApiResponse<{ lead: Lead }>;
export type MarkLeadAsLostResponse = ApiResponse<{ lead: Lead }>;
export type ArchiveLeadResponse = ApiResponse<Record<string, never>>;
