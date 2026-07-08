"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Pin, Send } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useGetNotes from "../hooks/useGetNotes";
import useCreateNote from "../hooks/useCreateNote";

interface NotesPanelProps {
  workspaceId: string;
  pipelineId: string;
  leadId: string;
}

export function NotesPanel({ workspaceId, pipelineId, leadId }: NotesPanelProps) {
  const [content, setContent] = useState("");
  const { data: notes = [], isLoading } = useGetNotes(workspaceId, "LEAD", leadId);
  const createNoteMutation = useCreateNote(workspaceId, pipelineId);

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleSubmit = () => {
    if (!content.trim() || createNoteMutation.isPending) return;
    createNoteMutation.mutate(
      { content: content.trim(), entityType: "LEAD", entityId: leadId },
      { onSuccess: () => setContent("") },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
          }}
          placeholder="Write a note… (Ctrl+Enter to save)"
          rows={2}
          className="text-sm resize-none"
          disabled={createNoteMutation.isPending}
        />
        <Button
          size="icon-sm"
          onClick={handleSubmit}
          disabled={!content.trim() || createNoteMutation.isPending}
          className="shrink-0"
          aria-label="Save note"
        >
          {createNoteMutation.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading notes…</p>
      ) : sortedNotes.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No notes yet.</p>
      ) : (
        <div className="space-y-2.5">
          {sortedNotes.map((note) => (
            <div
              key={note._id}
              className="rounded-lg border border-border bg-muted/20 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  {note.isPinned && (
                    <Pin size={11} className="text-primary shrink-0" />
                  )}
                  {note.createdBy?.name ?? "Someone"}
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">
                  {formatDistanceToNow(new Date(note.createdAt), {
                    addSuffix: true,
                  })}
                  {note.isEdited && " · edited"}
                </span>
              </div>
              <p className="text-sm text-foreground mt-1.5 whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
