export type LeadPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type MlPriority = "HIGH" | "MEDIUM" | "LOW";

// Raw 14-feature vector the ML service scored the lead on, echoed back on the
// Lead for explainability. Categorical features are strings; the rest numeric.
export interface ScoreFeatures {
  lead_source?: string;
  business_vertical?: string;
  human_priority?: string;
  lead_value?: number;
  days_in_pipeline?: number;
  time_in_current_stage?: number;
  days_since_last_contact?: number;
  activity_count?: number;
  task_count?: number;
  note_count?: number;
  stage_index?: number;
  stage_probability?: number;
  is_rotten?: number;
  has_upcoming_task?: number;
}
export type LeadStatus = "OPEN" | "WON" | "LOST" | "ARCHIVED";

export type LostReasonTag =
  | "PRICE"
  | "COMPETITOR"
  | "NO_RESPONSE"
  | "NOT_QUALIFIED"
  | "TIMING"
  | "BUDGET_ISSUE"
  | "CHANGED_MIND"
  | "DUPLICATE"
  | "OTHER";

export type PaymentType =
  | "ONE_TIME"
  | "INSTALLMENT"
  | "RETAINER"
  | "MILESTONE";
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
  // Populated from the backend. Can be null if the lead's stage was deleted
  // (the populate resolves to null), so callers must guard before dereferencing.
  stageId: {
    _id: string;
    name: string;
  } | null;
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
  // Permanent "this lead has a Deal" marker. Stays true even after a reopen,
  // so the board can block a second conversion client-side.
  hasDeal?: boolean;
  lostReason?: string | null;
  lostReasonTag?: LostReasonTag | null;
  taskCount: number;
  noteCount: number;
  activityCount: number;
  // ML scoring fields — populated by the backend scoring service. `mlPriority`
  // is null and `mlScore` 0 until a lead has been scored for the first time.
  mlScore: number;
  mlPriority?: MlPriority | null;
  lastScoredAt?: string | null;
  scoreFeatures?: ScoreFeatures | null;
  // Append-only history of past scores, powering the score trend chart. The
  // detail endpoint returns a lightweight { score, scoredAt } series; the list
  // endpoint may carry the fuller entry, so priority/features are optional.
  scoreHistory?: ScoreHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface ScoreHistoryEntry {
  score: number;
  scoredAt: string;
  priority?: MlPriority | null;
  features?: ScoreFeatures | null;
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

// Currencies supported by the backend Deal schema (a superset of the lead
// currencies used elsewhere in the UI).
export type DealCurrency = "NPR" | "USD" | "INR" | "GBP" | "AUD" | "CAD";

// Deal details captured by the Won dialog when a lead is dropped on a WON
// stage. Sent alongside the stage move; the backend creates the Deal.
export interface DealDetailsPayload {
  title: string;
  value: number;
  currency: DealCurrency;
  paymentType: PaymentType;
  advancePaid?: number;
  serviceDescription?: string | null;
  deliverables?: string[];
  startDate?: string | null;
  expectedEndDate?: string | null;
  assignedTo?: string | null;
}

export interface MoveLeadToStagePayload {
  stageId: string;
  // Populated only when the target stage is a WON-type stage.
  dealDetails?: DealDetailsPayload;
  // Populated only when the target stage is a LOST-type stage.
  lostReason?: string;
  lostReasonTag?: LostReasonTag;
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

// The ML re-score endpoint returns a bare object (no { success, data } envelope).
// On a skipped lead only { leadId, message } come back.
export interface ScoreLeadResponse {
  leadId: string;
  mlScore?: number;
  mlPriority?: MlPriority;
  conversionProbability?: number;
  topFeatures?: { feature: string; importance: number }[];
  scoredAt?: string;
  message?: string;
}
