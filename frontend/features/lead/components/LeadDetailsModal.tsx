import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  DollarSign,
  Flag,
  User,
  Tag,
  FileText,
  Activity,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { Lead } from "../types/lead-types";
import { cn } from "@/lib/utils";
import { ConvertToDealModal } from "@/features/deal/components/ConvertToDealModal";
import { useState } from "react";
import { EditLeadModal } from "./EditLeadModal";
import useUpdateLead from "../hooks/useUpdateLead";
import { useRouter } from "next/navigation";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
  workspaceId: string;
  pipelineId: string;
}

const priorityConfig = {
  LOW: {
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    label: "Low",
    icon: Flag,
  },
  MEDIUM: {
    color: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    label: "Medium",
    icon: Flag,
  },
  HIGH: {
    color: "bg-orange-500/10 text-orange-700 border-orange-200",
    label: "High",
    icon: Flag,
  },
  URGENT: {
    color: "bg-red-500/10 text-red-700 border-red-200",
    label: "Urgent",
    icon: AlertCircle,
  },
};

const statusConfig = {
  OPEN: {
    color: "bg-green-500/10 text-green-700 border-green-200",
    label: "Open",
  },
  CONTACTED: {
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    label: "Contacted",
  },
  QUALIFIED: {
    color: "bg-purple-500/10 text-purple-700 border-purple-200",
    label: "Qualified",
  },
  LOST: {
    color: "bg-gray-500/10 text-gray-700 border-gray-200",
    label: "Lost",
  },
};

const sourceLabels = {
  WEBSITE: "Website",
  REFERRAL: "Referral",
  COLD_CALL: "Cold Call",
  EMAIL: "Email",
  SOCIAL_MEDIA: "Social Media",
  EVENT: "Event",
  OTHER: "Other",
};

export function LeadDetailsModal({
  isOpen,
  onClose,
  lead,
  workspaceId,
  pipelineId,
}: LeadDetailsModalProps) {
  const router = useRouter();
  const updateLeadMutation = useUpdateLead(workspaceId, pipelineId, lead?._id);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!lead) return null;

  const priority = priorityConfig[lead.priority];
  const status = statusConfig[lead.status];
  const PriorityIcon = priority.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">
                {lead.title}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Lead #{lead._id.slice(-6)}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-1", priority.color)}
              >
                <PriorityIcon size={12} className="mr-1" />
                {priority.label}
              </Badge>
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-1", status.color)}
              >
                {status.label}
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
          </div>
        </DialogHeader>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="md:col-span-2 space-y-4">
            {/* Contact Information */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                <User size={14} />
                Contact
              </h3>
              {lead.contactId ? (
                <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {lead.contactId.name.charAt(0).toUpperCase()}
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
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground italic">
                    No contact assigned
                  </p>
                </div>
              )}
            </div>

            {/* Lead Value & Source */}
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
                    {lead.source ? sourceLabels[lead.source] : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            {lead.quickNote && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                  <FileText size={12} />
                  Note
                </h3>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
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
                  {lead.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {lead.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{lead.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Stats */}
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
                        {
                          month: "short",
                          day: "numeric",
                        },
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
          </div>
        </div>

        <Separator />

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              router.push(`/dashboard/pipeline/leads/${lead._id}`);
            }}
          >
            View Details
          </Button>
          <Button variant="default" onClick={() => setIsEditModalOpen(true)}>
            Edit
          </Button>
          <Button variant="default" onClick={() => setIsConvertModalOpen(true)}>
            Convert to Deal
          </Button>
        </DialogFooter>

        <ConvertToDealModal
          isOpen={isConvertModalOpen}
          onClose={() => setIsConvertModalOpen(false)}
          lead={lead}
          workspaceId={workspaceId}
          pipelineId={pipelineId}
          onSuccess={onClose}
        />

        <EditLeadModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          lead={lead}
          workspaceId={workspaceId}
          pipelineId={pipelineId}
          onSubmit={async (data) => {
            updateLeadMutation.mutate(data);
            setIsEditModalOpen(false);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
