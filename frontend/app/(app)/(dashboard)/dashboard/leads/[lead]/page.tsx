"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  Calendar,
  CheckSquare,
  Clock,
  DollarSign,
  FileText,
  Layers,
  Pencil,
  Repeat,
  StickyNote,
  Tag,
  TrendingUp,
  User,
  UserCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import useWorkspaceStore from "@/store/workspace-store";
import useGetLeadDetail from "@/features/lead/hooks/useGetLeadDetail";
import useUpdateLead from "@/features/lead/hooks/useUpdateLead";
import useLeadEvents from "@/features/lead/hooks/useLeadEvents";
import { ScoreDetailPanel } from "@/features/lead/components/ScoreDetailPanel";
import { ScoreTrendChart } from "@/features/lead/components/ScoreTrendChart";
import { ActivityFeed } from "@/features/lead/components/ActivityFeed";
import { NotesPanel } from "@/features/lead/components/NotesPanel";
import { TasksPanel } from "@/features/lead/components/TasksPanel";
import { EditLeadModal } from "@/features/lead/components/EditLeadModal";
import { ConvertToDealModal } from "@/features/deal/components/ConvertToDealModal";

const sourceLabels: Record<string, string> = {
  WEBSITE: "Website",
  REFERRAL: "Referral",
  COLD_CALL: "Cold Call",
  EMAIL: "Email",
  SOCIAL_MEDIA: "Social Media",
  EVENT: "Event",
  OTHER: "Other",
};

const priorityColor: Record<string, string> = {
  LOW: "bg-blue-500/10 text-blue-700 border-blue-200",
  MEDIUM: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  HIGH: "bg-orange-500/10 text-orange-700 border-orange-200",
  URGENT: "bg-red-500/10 text-red-700 border-red-200",
};

const statusColor: Record<string, string> = {
  OPEN: "bg-green-500/10 text-green-700 border-green-200",
  CONTACTED: "bg-blue-500/10 text-blue-700 border-blue-200",
  QUALIFIED: "bg-purple-500/10 text-purple-700 border-purple-200",
  LOST: "bg-gray-500/10 text-gray-700 border-gray-200",
};

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <Icon size={13} />
        {label}
      </span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors",
        active
          ? "border-primary/40 bg-primary/5"
          : "border-border hover:bg-muted/40",
      )}
    >
      <Icon size={16} className={active ? "text-primary" : "text-muted-foreground"} />
      <span className="text-lg font-bold text-foreground leading-none">{count}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </button>
  );
}

function Page() {
  const params = useParams();
  const router = useRouter();
  const workspace = useWorkspaceStore((state) => state.workspace);

  const workspaceId = workspace?.id || "";
  const leadId = params.lead as string;

  // The route only carries the lead id (no pipeline id), so we fetch the single
  // lead through the workspace-scoped detail endpoint. The response includes the
  // lead's pipelineId, which the edit/convert/SSE hooks below derive from it.
  const { data: lead, isLoading } = useGetLeadDetail(workspaceId, leadId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("activity");
  // Lead carries its own workspace/pipeline ids; fall back to route/store values
  // while the lead is still loading so hook order stays stable.
  const updateLeadMutation = useUpdateLead(
    lead?.workspaceId ?? workspaceId,
    lead?.pipelineId ?? "",
    lead?._id ?? leadId,
  );

  useLeadEvents({
    leadId: lead?._id ?? leadId,
    workspaceId: lead?.workspaceId ?? workspaceId,
    pipelineId: lead?.pipelineId ?? "",
    enabled: !!lead,
  });

  // With a rich score history the trend reads best full-width on top; with only
  // a few points a small chart beside the score card looks less stretched.
  const FULL_WIDTH_MIN_POINTS = 6;
  const scorePointCount = lead?.scoreHistory?.length ?? 0;
  const isFullWidthTrend = scorePointCount >= FULL_WIDTH_MIN_POINTS;

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">Loading lead…</div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-full text-center p-6">
        <p className="text-sm text-muted-foreground">
          Lead not found in this workspace.
        </p>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={14} /> Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 border-b border-border bg-background/95 backdrop-blur px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => router.back()}
                aria-label="Go back"
              >
                <ArrowLeft size={16} />
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  {lead.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Lead #{lead._id.slice(-6)} · Created{" "}
                  {new Date(lead.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    {lead.stageId?.name ?? "No stage"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-1",
                      priorityColor[lead.priority],
                    )}
                  >
                    {lead.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn("text-xs px-2 py-1", statusColor[lead.status])}
                  >
                    {lead.status}
                  </Badge>
                  {lead.isConverted && (
                    <Badge variant="default" className="text-xs px-2 py-1">
                      Converted{" "}
                      {lead.convertedAt &&
                        new Date(lead.convertedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                    </Badge>
                  )}
                  {lead.isRotten && (
                    <Badge variant="destructive" className="text-xs px-2 py-1">
                      Rotten
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditOpen(true)}
              >
                <Pencil size={14} /> Edit
              </Button>
              {!lead.isConverted && (
                <Button size="sm" onClick={() => setIsConvertOpen(true)}>
                  <Repeat size={14} /> Convert to Deal
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Score trend — full-width on top only when there's a rich history.
            With few points it drops into the left column below (beside the
            score card) so a small chart isn't stretched across the page. */}
        {isFullWidthTrend && (
          <div className="px-1">
            <ScoreTrendChart lead={lead} chartHeightClassName="h-64" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-1">
          {/* Left column — main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compact trend sits at the top of the left column, level with the
                score card in the sidebar, and flows straight into the cards
                below it (no dead space under a short chart). */}
            {!isFullWidthTrend && <ScoreTrendChart lead={lead} />}
            <Card>
              <CardContent className="p-5 space-y-5">
                {/* Contact */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <User size={13} />
                    Contact
                  </h3>
                  {lead.contactId ? (
                    <div className="bg-muted/30 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                        {lead?.contactId?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {lead.contactId.name}
                        </p>
                        {lead.contactId.email && (
                          <p className="text-xs text-muted-foreground truncate">
                            {lead.contactId.email}
                          </p>
                        )}
                        {lead.contactId.phone && (
                          <p className="text-xs text-muted-foreground">
                            {lead.contactId.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground italic">
                        No contact assigned
                      </p>
                    </div>
                  )}
                </div>

                {/* Value & source */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <DollarSign size={12} />
                      Value
                    </div>
                    <p className="text-2xl font-bold text-accent">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: lead.currency,
                        maximumFractionDigits: 0,
                      }).format(lead.value)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <TrendingUp size={12} />
                      Source
                    </div>
                    <p className="text-sm font-medium mt-1.5">
                      {lead.source
                        ? sourceLabels[lead.source] ?? lead.source
                        : "—"}
                    </p>
                  </div>
                </div>

                {/* Lost reason */}
                {lead.status === "LOST" && lead.lostReason && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-destructive uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={12} />
                      Lost Reason
                    </h3>
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">
                        {lead.lostReason}
                      </p>
                    </div>
                  </div>
                )}

                {/* Quick note */}
                {lead.quickNote && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <FileText size={12} />
                      Note
                    </h3>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">
                        {lead.quickNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {lead.tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Tag size={12} />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {lead.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs px-2 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity / Notes / Tasks */}
            <Card>
              <CardContent className="p-5">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="activity" className="gap-1.5">
                      <Activity size={13} />
                      Activity
                      <Badge variant="secondary" className="text-[10px] px-1.5">
                        {lead.activityCount}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="gap-1.5">
                      <StickyNote size={13} />
                      Notes
                      <Badge variant="secondary" className="text-[10px] px-1.5">
                        {lead.noteCount}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="gap-1.5">
                      <CheckSquare size={13} />
                      Tasks
                      <Badge variant="secondary" className="text-[10px] px-1.5">
                        {lead.taskCount}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="activity" className="pt-4">
                    <ActivityFeed workspaceId={lead.workspaceId} leadId={lead._id} />
                  </TabsContent>

                  <TabsContent value="notes" className="pt-4">
                    <NotesPanel
                      workspaceId={lead.workspaceId}
                      pipelineId={lead.pipelineId}
                      leadId={lead._id}
                    />
                  </TabsContent>

                  <TabsContent value="tasks" className="pt-4">
                    <TasksPanel
                      workspaceId={lead.workspaceId}
                      pipelineId={lead.pipelineId}
                      leadId={lead._id}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right column — score + details + stats */}
          <div className="space-y-6">
            <ScoreDetailPanel lead={lead} />

            <Card>
              <CardHeader className="px-5">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 space-y-3">
                {lead.assignedTo && (
                  <InfoRow icon={UserCheck} label="Assigned To" value={lead.assignedTo.name} />
                )}
                {lead.nextFollowUpAt && (
                  <InfoRow
                    icon={Calendar}
                    label="Follow-up"
                    value={new Date(lead.nextFollowUpAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  />
                )}
                {lead.lastContactedAt && (
                  <InfoRow
                    icon={Clock}
                    label="Last Contacted"
                    value={new Date(lead.lastContactedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  />
                )}
                <InfoRow
                  icon={Layers}
                  label="In Current Stage"
                  value={`Since ${new Date(lead.stageEnteredAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}`}
                />
                {!lead.assignedTo && !lead.nextFollowUpAt && !lead.lastContactedAt && (
                  <p className="text-xs text-muted-foreground italic">
                    No additional details yet.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="px-5">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Activity Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5">
                <div className="grid grid-cols-3 gap-2">
                  <StatTile
                    icon={Activity}
                    label="Activity"
                    count={lead.activityCount}
                    active={activeTab === "activity"}
                    onClick={() => setActiveTab("activity")}
                  />
                  <StatTile
                    icon={StickyNote}
                    label="Notes"
                    count={lead.noteCount}
                    active={activeTab === "notes"}
                    onClick={() => setActiveTab("notes")}
                  />
                  <StatTile
                    icon={CheckSquare}
                    label="Tasks"
                    count={lead.taskCount}
                    active={activeTab === "tasks"}
                    onClick={() => setActiveTab("tasks")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <EditLeadModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          lead={lead}
          workspaceId={lead.workspaceId}
          pipelineId={lead.pipelineId}
          onSubmit={async (data) => {
            await updateLeadMutation.mutateAsync(data);
            setIsEditOpen(false);
          }}
        />
      )}

      {isConvertOpen && (
        <ConvertToDealModal
          isOpen={isConvertOpen}
          onClose={() => setIsConvertOpen(false)}
          lead={lead}
          workspaceId={lead.workspaceId}
          pipelineId={lead.pipelineId}
        />
      )}
    </div>
  );
}

export default Page;
