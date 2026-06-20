import { Plus, Users } from "lucide-react";
import { PipelineStageRef } from "../types/pipeline-types";

export function StageColumn({ stage }: { stage: PipelineStageRef }) {
  return (
    <div className="shrink-0 w-72 flex flex-col gap-2">
      <div className="flex items-center justify-between px-3 py-2.5 bg-card border border-border rounded-xl">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: stage.color }}
          />
          <span className="text-sm font-semibold text-primary truncate">
            {stage.name}
          </span>
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
        <p className="text-xs text-muted-foreground font-medium">
          No leads yet
        </p>
        <p className="text-[10px] text-muted-foreground/60">Drag leads here</p>
      </div>
    </div>
  );
}
