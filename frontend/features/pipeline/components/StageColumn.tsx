import { useState } from "react";
import { Users, MoreVertical, Trash2 } from "lucide-react";
import { PipelineStageRef } from "../types/pipeline-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUpdatePipelineStage from "../hooks/useUpdatePipelineStage";
import useDeletePipelineStage from "../hooks/useDeletePipelineStage";

interface StageColumnProps {
  stage: PipelineStageRef;
  workspaceId: string;
  pipelineId: string;
}

export function StageColumn({
  stage,
  workspaceId,
  pipelineId,
}: StageColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [stageName, setStageName] = useState(stage.name);

  const updateStageMutation = useUpdatePipelineStage(
    workspaceId,
    pipelineId,
    stage._id,
  );
  const deleteStageMutation = useDeletePipelineStage(workspaceId, pipelineId);

  const handleNameChange = () => {
    if (stageName.trim() === stage.name) {
      setIsEditing(false);
      return;
    }

    if (stageName.trim().length === 0) {
      setStageName(stage.name);
      setIsEditing(false);
      return;
    }

    // Only mutate if not already pending
    if (updateStageMutation.isPending) {
      return;
    }

    updateStageMutation.mutate(
      {
        name: stageName.trim(),
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: () => {
          setStageName(stage.name);
          setIsEditing(false);
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setStageName(stage.name);
      setIsEditing(false);
    }
  };

  const handleDeleteStage = () => {
    if (
      confirm(
        "Are you sure you want to delete this stage? This action cannot be undone.",
      )
    ) {
      deleteStageMutation.mutate(stage._id);
    }
  };

  return (
    <div className="shrink-0 w-72 flex flex-col gap-2">
      <div className="flex items-center justify-between px-3 py-2.5 bg-card border border-border rounded-xl">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: stage.color }}
          />
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              onBlur={handleNameChange}
              onKeyDown={handleKeyDown}
              disabled={updateStageMutation.isPending}
              className="text-sm font-semibold text-primary bg-surface border border-primary rounded px-2 py-0.5 outline-none flex-1 min-w-0 disabled:opacity-50"
              placeholder="Stage name"
            />
          ) : (
            <span
              onDoubleClick={() => setIsEditing(true)}
              className="text-sm font-semibold text-primary truncate cursor-pointer hover:opacity-75 transition-opacity"
            >
              {stageName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
            {stage.leadCount}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-5 h-5 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-primary transition-colors focus:outline-none">
                <MoreVertical size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setIsEditing(true)}
                className="text-xs cursor-pointer"
              >
                Edit Stage
              </DropdownMenuItem>

              <DropdownMenuItem className="text-xs cursor-pointer">
                View Details
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-xs cursor-pointer">
                Remove All Leads
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-xs cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                onClick={handleDeleteStage}
                disabled={deleteStageMutation.isPending}
              >
                <Trash2 size={12} className="mr-2" />
                {deleteStageMutation.isPending ? "Deleting..." : "Delete Stage"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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