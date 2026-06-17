"use client";

import {
  TrendingUp,
  Users,
  Trophy,
  XCircle,
  DollarSign,
  Star,
  Archive,
  Globe,
  Lock,
  Users2,
  Plus,
  Filter,
  Settings2,
} from "lucide-react";
import { useParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useWorkspaceStore from "@/store/workspace-store";
import useGetSinglePipeline from "@/features/pipeline/hooks/useGetSinglePipeline";
import { PipelineStageRef } from "@/features/pipeline/types/pipeline-types";

function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  colorClass: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="text-base font-bold text-primary">{value}</p>
      </div>
    </div>
  );
}

function StageColumn({ stage }: { stage: PipelineStageRef }) {
  return (
    <div className="shrink-0 w-72 flex flex-col gap-2">
      <div className="flex items-center justify-between px-3 py-2.5 bg-card border border-border rounded-xl">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: stage.color }}
          />
          <span className="text-sm font-semibold text-primary truncate">{stage.name}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
            {stage.leadCount}
          </span>
          <button className="w-5 h-5 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
            <Plus size={12} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-105 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 bg-card/50">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <Users size={14} className="text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground font-medium">No leads yet</p>
        <p className="text-[10px] text-muted-foreground/60">Drag leads here</p>
      </div>
    </div>
  );
}

function PipelineSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="shrink-0 px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="h-5 bg-muted rounded w-48" />
            <div className="h-3 bg-muted rounded w-72" />
            <div className="flex gap-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-5 w-16 bg-muted rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="shrink-0 px-6 py-4 border-b border-border">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex gap-4 p-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-72 h-120 bg-muted rounded-xl shrink-0" />
        ))}
      </div>
    </div>
  );
}

function VisibilityIcon({ visibility }: { visibility: string }) {
  if (visibility === "PRIVATE") return <Lock size={10} />;
  if (visibility === "MEMBERS_ONLY") return <Users2 size={10} />;
  return <Globe size={10} />;
}

function PipelineDashboard() {
  const { pipeline: pipelineId } = useParams<{ pipeline: string }>();
  const { workspace } = useWorkspaceStore();

  const { data: pipeline, isLoading } = useGetSinglePipeline(
    workspace?.id ?? "",
    pipelineId
  );

  if (isLoading) return <PipelineSkeleton />;

  if (!pipeline) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Pipeline not found.
      </div>
    );
  }

  const { stats } = pipeline;

  const formatValue = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: pipeline.currency,
      maximumFractionDigits: 0,
    }).format(val);

  const statCards = [
    { label: "Total Leads",  value: stats.totalLeads,           icon: Users,      colorClass: "bg-blue-100 text-blue-600" },
    { label: "Open Leads",   value: stats.openLeads,            icon: TrendingUp, colorClass: "bg-amber-100 text-amber-600" },
    { label: "Won Leads",    value: stats.wonLeads,             icon: Trophy,     colorClass: "bg-green-100 text-green-600" },
    { label: "Lost Leads",   value: stats.lostLeads,            icon: XCircle,    colorClass: "bg-red-100 text-red-600" },
    { label: "Total Value",  value: formatValue(stats.totalValue), icon: DollarSign, colorClass: "bg-purple-100 text-purple-600" },
    { label: "Won Value",    value: formatValue(stats.wonValue),   icon: Star,       colorClass: "bg-emerald-100 text-emerald-600" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">

      <div className="shrink-0 px-6 pt-2 pb-4 border-b border-border bg-surface">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{
                backgroundColor: pipeline.color + "22",
                border: `2px solid ${pipeline.color}`,
              }}
            >
              {pipeline.icon ?? pipeline.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-primary leading-tight">
                  {pipeline.name}
                </h1>
                {pipeline.isArchived && (
                  <Badge variant="secondary" className="text-[10px] gap-1">
                    <Archive size={10} /> Archived
                  </Badge>
                )}
              </div>

              {pipeline.description && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {pipeline.description}
                </p>
              )}

              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <Badge variant="outline" className="text-[10px]">
                  {pipeline.currency}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {pipeline.vertical.replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="text-[10px] gap-1">
                  <VisibilityIcon visibility={pipeline.visibility} />
                  {pipeline.visibility.replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {pipeline.stages.length} stage{pipeline.stages.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <Filter size={13} /> Filter
            </Button>
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <Settings2 size={13} /> Settings
            </Button>
            <Button size="sm" className="text-xs gap-1.5">
              <Plus size={13} /> Add Lead
            </Button>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-6 py-4 border-b border-border">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {statCards.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 p-6 h-full">
          {pipeline.stages.map((stage) => (
            <StageColumn key={stage._id} stage={stage} />
          ))}

          <div className="shrink-0 w-72 pt-0.5">
            <button className="w-full h-11 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium hover:border-primary hover:text-primary transition-colors">
              <Plus size={14} /> Add Stage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PipelineDashboard;