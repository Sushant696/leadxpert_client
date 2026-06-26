import { useState } from "react";
import { Users, MoreVertical, Trash2, Loader2 } from "lucide-react";
import { PipelineStageRef } from "../types/pipeline-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useUpdatePipelineStage from "../hooks/useUpdatePipelineStage";
import useDeletePipelineStage from "../hooks/useDeletePipelineStage";
import { LeadCard } from "@/features/lead/components/LeadCard";
import { LeadDetailsModal } from "@/features/lead/components/LeadDetailsModal";
import { CreateLeadModal } from "@/features/lead/components/CreateLeadModal";
import { Lead } from "@/features/lead/types/lead-types";

interface StageColumnProps {
  stage: PipelineStageRef;
  workspaceId: string;
  pipelineId: string;
  leads: Lead[];
  isLoadingLeads: boolean;
  isDropTarget?: boolean;
}

export function StageColumn({
  stage,
  workspaceId,
  pipelineId,
  leads,
  isLoadingLeads,
  isDropTarget = false,
}: StageColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [stageName, setStageName] = useState(stage.name);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isCreateLeadModalOpen, setIsCreateLeadModalOpen] = useState(false);

  const updateStageMutation = useUpdatePipelineStage(
    workspaceId,
    pipelineId,
    stage._id,
  );
  const deleteStageMutation = useDeletePipelineStage(workspaceId, pipelineId);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsLeadModalOpen(true);
  };

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
    setDeleteDialogOpen(true);
  };

  const confirmDeleteStage = () => {
    deleteStageMutation.mutate(stage._id);
  };

  return (
    <>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Stage</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-error">{stage.name}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteStageMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteStage}
              disabled={deleteStageMutation.isPending}
              className=""
            >
              {deleteStageMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="shrink-0 w-80 h-full min-h-0 flex flex-col gap-2">
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
                  onClick={() => setIsCreateLeadModalOpen(true)}
                  className="text-xs cursor-pointer"
                >
                  Add Lead
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsEditing(true)}
                  className="text-xs cursor-pointer"
                >
                  Edit Stage
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
                  {deleteStageMutation.isPending
                    ? "Deleting..."
                    : "Delete Stage"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Leads Container */}
        <div
          className={`flex-1 min-h-0 rounded-xl flex flex-col gap-2 overflow-y-auto pr-1 transition-colors scrollbar-hide ${
            isDropTarget ? "bg-success/5 border-2 border-success" : "border-0"
          }`}
        >
          {isLoadingLeads ? (
            <div className="flex items-center justify-center h-40">
              <Loader2
                size={20}
                className="animate-spin text-muted-foreground"
              />
            </div>
          ) : leads.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 bg-card/50 h-40">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Users size={14} className="text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                No leads yet
              </p>
              <p className="text-[10px] text-muted-foreground/60">
                Drag leads here
              </p>
            </div>
          ) : (
            <>
              {leads.map((lead) => (
                <LeadCard
                  key={lead._id}
                  lead={lead}
                  onClick={() => handleLeadClick(lead)}
                  workspaceId={workspaceId}
                  pipelineId={pipelineId}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Lead Details Modal */}
      <LeadDetailsModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
        workspaceId={workspaceId}
        pipelineId={pipelineId}
      />

      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={isCreateLeadModalOpen}
        onClose={() => setIsCreateLeadModalOpen(false)}
        workspaceId={workspaceId}
        pipelineId={pipelineId}
        stageId={stage._id}
      />
    </>
  );
}
