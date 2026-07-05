"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Flame, Mail, Phone, ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useGetHotLeadsToday from "../hooks/useGetHotLeadsToday";

interface FocusTodayWidgetProps {
  workspaceId: string;
  days?: number;
}

export function FocusTodayWidget({ workspaceId, days = 3 }: FocusTodayWidgetProps) {
  const router = useRouter();
  const { data: leads = [], isLoading } = useGetHotLeadsToday(workspaceId, days);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-orange-500" />
          <CardTitle className="text-base">Focus Today</CardTitle>
        </div>
        <CardDescription>
          High-priority leads not contacted in {days}+ days, ranked by ML score.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : leads.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Nothing urgent — every high-priority lead has been contacted recently.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {leads.map((lead) => (
              <div key={lead.leadId} className="flex items-center gap-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{lead.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {lead.contact?.name ?? "No contact"} ·{" "}
                    {lead.lastContactedAt
                      ? `Last contacted ${formatDistanceToNow(new Date(lead.lastContactedAt), { addSuffix: true })}`
                      : "Never contacted"}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-bold text-orange-600 bg-orange-500/10 rounded-full px-2 py-0.5">
                  {Math.round(lead.mlScore)}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    disabled={!lead.contact?.phone}
                    onClick={() => (window.location.href = `tel:${lead.contact?.phone}`)}
                    aria-label="Call"
                  >
                    <Phone size={13} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    disabled={!lead.contact?.email}
                    onClick={() => (window.location.href = `mailto:${lead.contact?.email}`)}
                    aria-label="Email"
                  >
                    <Mail size={13} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => router.push(`/dashboard/leads/${lead.leadId}`)}
                    aria-label="View lead"
                  >
                    <ArrowRight size={13} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
