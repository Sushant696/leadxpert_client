export interface HotLead {
  leadId: string;
  title: string;
  value: number;
  currency: string;
  mlScore: number;
  lastContactedAt: string | null;
  stageName: string | null;
  contact: { name: string; email: string | null; phone: string | null } | null;
  assignedTo: { name: string } | null;
}

export interface StageFunnelStage {
  stageId: string;
  stageName: string;
  color: string;
  currentLeadCount: number;
  avgTimeSpentMs: number | null;
}

export interface StageFunnel {
  pipelineId: string | null;
  pipelineName: string | null;
  stages: StageFunnelStage[];
}

export type ScoreTier = "HIGH" | "MEDIUM" | "LOW" | "UNSCORED";

export interface ScoreCalibrationTier {
  tier: ScoreTier;
  total: number;
  converted: number;
  lost: number;
  open: number;
  conversionRate: number;
}

export interface ConfusionMatrixGridRow {
  tier: "HIGH" | "MEDIUM" | "LOW";
  converted: number;
  lost: number;
  total: number;
}

export interface ConfusionMatrix {
  grid: ConfusionMatrixGridRow[];
  binary: {
    positiveClass: string;
    truePositive: number;
    falsePositive: number;
    falseNegative: number;
    trueNegative: number;
    precision: number;
    recall: number;
    f1: number;
    accuracy: number;
  };
  note: string;
}

export interface PriorityMismatchLead {
  leadId: string;
  title: string;
  value: number;
  currency: string;
  mlScore: number;
  mlPriority: string;
  humanPriority: string;
  contactName: string | null;
  assignedToName: string | null;
}

export interface AtRiskValueByStage {
  stageId: string;
  stageName: string | null;
  count: number;
  value: number;
}

export interface AtRiskValue {
  count: number;
  value: number;
  byStage: AtRiskValueByStage[];
}

export interface FeatureImportanceItem {
  feature: string;
  importance: number;
}

export interface FeatureImportanceResponse {
  model: string;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1: number;
    aucRoc: number;
  };
  features: FeatureImportanceItem[];
}

export interface SourcePerformanceRow {
  source: string;
  total: number;
  converted: number;
  conversionRate: number;
  avgValue: number;
  avgMlScore: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
