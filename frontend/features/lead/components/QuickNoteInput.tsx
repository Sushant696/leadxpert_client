"use client";

import { useState, useRef } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import useCreateNote from "../hooks/useCreateNote";
import { Textarea } from "@/components/ui/textarea";

interface QuickNoteInputProps {
  leadId: string;
  workspaceId: string;
  pipelineId: string;
  noteCount: number;
  lastNote?: string | null;
}

export function QuickNoteInput({
  leadId,
  workspaceId,
  pipelineId,
  lastNote,
}: QuickNoteInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const createNoteMutation = useCreateNote(workspaceId, pipelineId);

  // Preview comes from the lead's denormalized `quickNote` (passed as `lastNote`),
  // which is already on the lead payload. We deliberately do NOT fetch the full
  // notes list per card here — that caused one network request per lead card on
  // board load (N+1). Full notes are loaded lazily in the lead details modal.
  const previewText = lastNote;

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(true);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleSave = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (!noteText.trim() || createNoteMutation.isPending) return;

    createNoteMutation.mutate(
      {
        content: noteText.trim(),
        entityType: "LEAD",
        entityId: leadId,
      },
      {
        onSuccess: () => {
          setNoteText("");
          setIsExpanded(false);
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSave(e);
    } else if (e.key === "Escape") {
      e.stopPropagation();
      setNoteText("");
      setIsExpanded(false);
    }
  };

  const handleBlur = () => {
    if (!noteText.trim()) {
      setIsExpanded(false);
    }
  };

  if (isExpanded) {
    return (
      <div
        className="space-y-1.5"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Textarea
          ref={textareaRef}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Add a quick note..."
          rows={2}
          className="text-xs min-h-13 max-h-20 resize-none"
          disabled={createNoteMutation.isPending}
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">
            Ctrl+Enter to save · Esc to cancel
          </span>
          <button
            onClick={handleSave}
            disabled={!noteText.trim() || createNoteMutation.isPending}
            className={cn(
              "flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md transition-colors",
              noteText.trim()
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
          >
            {createNoteMutation.isPending ? (
              <Loader2 size={10} className="animate-spin" />
            ) : (
              <Send size={10} />
            )}
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleExpand}
      onPointerDown={(e) => e.stopPropagation()}
      className="group/note cursor-pointer"
    >
      {previewText ? (
        <div className="flex items-start gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <MessageSquare size={11} className="mt-0.5 shrink-0" />
          <p className="line-clamp-1 flex-1 italic">{previewText}</p>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          <MessageSquare size={11} />
          <span>Add note...</span>
        </div>
      )}
    </div>
  );
}
