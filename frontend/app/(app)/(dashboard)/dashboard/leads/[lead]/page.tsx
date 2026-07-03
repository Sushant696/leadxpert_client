"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Activity,
  Calendar,
  CheckSquare,
  DollarSign,
  FileText,
  Pencil,
  Repeat,
  Tag,
  TrendingUp,
  User,
  UserCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useWorkspaceStore from "@/store/workspace-store";
import { useGetAllLeads } from "@/features/lead/hooks/useGetAllLeads";
import useUpdateLead from "@/features/lead/hooks/useUpdateLead";
import { ScoreDetailPanel } from "@/features/lead/components/ScoreDetailPanel";
import { EditLeadModal } from "@/features/lead/components/EditLeadModal";
import { ConvertToDealModal } from "@/features/deal/components/ConvertToDealModal";

// Mirrors the source label map used in the lead detail modal.
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

function Page() {
  const params = useParams();
  const router = useRouter();
  const workspace = useWorkspaceStore((state) => state.workspace);

  const workspaceId = workspace?.id || "";
  const leadId = params.lead as string;

  // The route only carries the lead id (no pipeline id), so we reuse the
  // workspace-level leads query and pick the lead out of it rather than the
  // pipeline-scoped getLeadById endpoint.
  const { data: leads = [], isLoading } = useGetAllLeads(workspaceId);
  const lead = leads.find((l) => l._id === leadId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  // Lead carries its own workspace/pipeline ids; fall back to route/store values
  // while the lead is still loading so hook order stays stable.
  const updateLeadMutation = useUpdateLead(
    lead?.workspaceId ?? workspaceId,
    lead?.pipelineId ?? "",
    lead?._id ?? leadId,
  );

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
      <div className="space-y-6">
        {/* Header */}
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
              <h1 className="text-2xl font-bold text-foreground leading-tight">
                {lead.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Lead #{lead._id.slice(-6)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <div className="flex items-center gap-2 flex-wrap">
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
                  Converted
                </Badge>
              )}
              {lead.isRotten && (
                <Badge variant="destructive" className="text-xs px-2 py-1">
                  Rotten
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
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

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column — main info */}
          <div className="md:col-span-2 space-y-4">
            {/* Contact */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                <User size={14} />
                Contact
              </h3>
              {lead.contactId ? (
                <div className="bg-muted/30 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {lead?.contactId?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-primary">
                      {lead.contactId.name}
                    </p>
                    {lead.contactId.email && (
                      <p className="text-xs text-muted-foreground">
                        {lead.contactId.email}
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
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                  <DollarSign size={12} />
                  Value
                </h3>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-accent">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: lead.currency,
                      maximumFractionDigits: 0,
                    }).format(lead.value)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp size={12} />
                  Source
                </h3>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm font-medium">
                    {lead.source
                      ? sourceLabels[lead.source] ?? lead.source
                      : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick note */}
            {lead.quickNote && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
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
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
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
          </div>

          {/* Right column — stats + ML score */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">
                Info
              </h3>

              {lead.assignedTo && (
                <div className="text-xs">
                  <p className="font-medium text-muted-foreground mb-1">
                    Assigned To
                  </p>
                  <div className="flex items-center gap-2">
                    <UserCheck size={12} className="text-muted-foreground" />
                    <span className="font-medium">{lead.assignedTo.name}</span>
                  </div>
                </div>
              )}

              {lead.nextFollowUpAt && (
                <div className="text-xs">
                  <p className="font-medium text-muted-foreground mb-1">
                    Follow-up
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-muted-foreground" />
                    <span className="font-medium">
                      {new Date(lead.nextFollowUpAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" },
                      )}
                    </span>
                  </div>
                </div>
              )}

              <Separator className="my-2" />

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Activity size={12} />
                    Activities
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {lead.activityCount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <CheckSquare size={12} />
                    Tasks
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {lead.taskCount}
                  </Badge>
                </div>
              </div>
            </div>

            <ScoreDetailPanel lead={lead} />
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
