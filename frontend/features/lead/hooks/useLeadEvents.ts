import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

// Event shape mirrors the backend's src/lib/eventBus.ts LeadEvent.
type LeadEventType = "activity" | "note" | "task" | "score";

interface LeadEventPayload {
  leadId: string;
  type: LeadEventType;
  at: string;
}

interface UseLeadEventsParams {
  leadId: string;
  workspaceId: string;
  pipelineId: string;
  entityType?: string;
  enabled?: boolean;
}

// Subscribes to the SSE proxy route for a single lead and invalidates the
// matching react-query caches on each event — the payload only ever carries
// { leadId, type }, so the frontend always refetches through its existing
// hooks rather than trusting a duplicated copy of the data.
//
// Written generically (explicit params, one entry point) so a future feed
// (e.g. a workspace/dashboard channel) can follow the same shape without
// copy-pasting the EventSource plumbing.
function useLeadEvents({
  leadId,
  workspaceId,
  pipelineId,
  entityType = "LEAD",
  enabled = true,
}: UseLeadEventsParams) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !leadId || !workspaceId || !pipelineId) return;

    const url = `/api/leads/${leadId}/events?workspaceId=${workspaceId}&pipelineId=${pipelineId}`;
    const source = new EventSource(url);

    source.onmessage = (event) => {
      let payload: LeadEventPayload;
      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }

      switch (payload.type) {
        case "activity":
          queryClient.invalidateQueries({
            queryKey: ["activities", workspaceId, entityType, leadId],
          });
          break;
        case "note":
          queryClient.invalidateQueries({
            queryKey: ["notes", workspaceId, entityType, leadId],
          });
          break;
        case "task":
          queryClient.invalidateQueries({ queryKey: ["tasks", workspaceId] });
          break;
        case "score":
          queryClient.invalidateQueries({ queryKey: ["leads", workspaceId] });
          break;
      }
    };

    return () => {
      source.close();
    };
  }, [leadId, workspaceId, pipelineId, entityType, enabled, queryClient]);
}

export default useLeadEvents;
