import { useState } from "react";
import { Flag, Calendar, MessageSquare, CheckSquare, Plus } from "lucide-react";
import { useDraggable } from "@dnd-kit/react";
import { Lead } from "../types/lead-types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { QuickTaskModal } from "./QuickTaskModal";
import { QuickNoteInput } from "./QuickNoteInput";
import { ScoreBadge } from "./ScoreBadge";

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
  workspaceId: string;
  pipelineId: string;
}

const priorityConfig = {
  LOW: { color: "bg-blue-500/10 text-blue-600" },
  MEDIUM: { color: "bg-yellow-500/10 text-yellow-600" },
  HIGH: { color: "bg-orange-500/10 text-orange-600" },
  URGENT: { color: "bg-red-500/10 text-red-600" },
};

export function LeadCard({
  lead,
  onClick,
  workspaceId,
  pipelineId,
}: LeadCardProps) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const { ref, isDragging } = useDraggable({
    id: lead._id,
    data: {
      type: "Lead",
      lead,
    },
  });

  const priority = priorityConfig[lead.priority];

  const handleAddTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTaskModalOpen(true);
  };

  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "group bg-card border border-border rounded-lg p-3 hover:shadow-md hover:border-primary/50 transition-all cursor-move space-y-2",
          isDragging && "opacity-50 shadow-lg border-primary",
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-foreground line-clamp-2 flex-1">
            {lead.title}
          </h4>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge
              variant="outline"
              className={cn("text-xs px-2 py-0.5", priority.color)}
            >
              <Flag size={10} className="mr-1" />
              {lead.priority}
            </Badge>
            <ScoreBadge
              mlScore={lead.mlScore}
              mlPriority={lead.mlPriority ?? null}
              showScore={false}
            />
          </div>
        </div>

        {lead.contactId && (
          <p className="text-xs text-muted-foreground truncate">
            👤 {lead?.contactId?.name}
          </p>
        )}

        {/* Quick Note Section */}
        <QuickNoteInput
          leadId={lead._id}
          workspaceId={workspaceId}
          pipelineId={pipelineId}
          noteCount={lead.noteCount}
          lastNote={lead.quickNote}
        />

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          {lead.nextFollowUpAt ? (
            <div className="flex items-center gap-1">
              <Calendar size={11} />
              <span>
                {new Date(lead.nextFollowUpAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground/50">No follow-up</span>
          )}

          <div className="flex items-center gap-2">
            {lead.noteCount > 0 && (
              <div className="flex items-center gap-0.5">
                <MessageSquare size={11} />
                <span>{lead.noteCount}</span>
              </div>
            )}
            <div className="flex items-center gap-0.5">
              <CheckSquare size={11} />
              <span>{lead.taskCount}</span>
            </div>
            {/* Quick Add Task Button */}
            <button
              onClick={handleAddTask}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex items-center gap-0.5 text-muted-foreground/50 hover:text-primary opacity-0 group-hover:opacity-100 transition-all ml-1"
              title="Add task"
            >
              <Plus size={11} />
            </button>
          </div>
        </div>

        {lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {lead.tags.slice(0, 2).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 font-normal"
              >
                {tag}
              </Badge>
            ))}
            {lead.tags.length > 2 && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground"
              >
                +{lead.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Quick Task Modal — mounted only while open so a board of N cards
          doesn't keep N idle modal components (each with its own form/mutation
          hooks) alive. */}
      {isTaskModalOpen && (
        <QuickTaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          leadId={lead._id}
          workspaceId={workspaceId}
          pipelineId={pipelineId}
        />
      )}
    </>
  );
}
