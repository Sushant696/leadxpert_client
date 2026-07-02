import { z } from "zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Lead,
  UpdateLeadPayload,
  LeadPriority,
  LeadStatus,
  LeadSource,
  Currency,
} from "../types/lead-types";
import useGetLeadContacts from "../hooks/useGetLeadContacts";
import type { Contact } from "@/features/workspace/types/contact-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const NONE_CONTACT_VALUE = "__none_contact__";

const editLeadSchema = z.object({
  contactId: z.string().optional().nullable(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  value: z.number().min(0, "Value must be positive"),
  currency: z.enum(["USD", "EUR", "GBP", "NPR"] as const),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"] as const),
  source: z
    .enum([
      "WEBSITE",
      "REFERRAL",
      "COLD_CALL",
      "EMAIL",
      "SOCIAL_MEDIA",
      "EVENT",
      "OTHER",
    ] as const)
    .optional()
    .nullable(),
  status: z.enum(["OPEN", "CONTACTED", "QUALIFIED", "LOST"] as const),
  assignedTo: z.string().optional().nullable(),
  nextFollowUpAt: z.string().optional().nullable(),
  tags: z.array(z.string()).min(0),
  quickNote: z.string().optional().nullable(),
  lostReason: z.string().optional().nullable(),
});

type EditLeadFormData = z.infer<typeof editLeadSchema>;

const PRIORITIES: {
  value: LeadPriority;
  label: string;
  activeClass: string;
}[] = [
  {
    value: "LOW",
    label: "Low",
    activeClass: "border-green-500 bg-green-500/10 text-green-400",
  },
  {
    value: "MEDIUM",
    label: "Medium",
    activeClass: "border-amber-500 bg-amber-500/10 text-amber-400",
  },
  {
    value: "HIGH",
    label: "High",
    activeClass: "border-orange-500 bg-orange-500/10 text-orange-400",
  },
  {
    value: "URGENT",
    label: "Urgent",
    activeClass: "border-red-500 bg-red-500/10 text-red-400",
  },
];

const STATUSES: LeadStatus[] = ["OPEN", "CONTACTED", "QUALIFIED", "LOST"];
const CURRENCIES: Currency[] = ["NPR", "USD", "EUR", "GBP"];
const SOURCES: LeadSource[] = [
  "WEBSITE",
  "REFERRAL",
  "COLD_CALL",
  "EMAIL",
  "SOCIAL_MEDIA",
  "EVENT",
  "OTHER",
];

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
  workspaceId: string;
  pipelineId: string;
  onSubmit: (payload: UpdateLeadPayload) => Promise<void>;
  isSubmitting?: boolean;
  members?: { _id: string; name: string; email: string }[];
}

export function EditLeadModal({
  isOpen,
  onClose,
  lead,
  workspaceId,
  onSubmit,
  isSubmitting = false,
  members = [],
}: EditLeadModalProps) {
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EditLeadFormData>({
    resolver: zodResolver(editLeadSchema),
    defaultValues: {
      contactId: lead.contactId?._id ?? null,
      title: lead.title,
      value: lead.value,
      currency: lead.currency,
      priority: lead.priority,
      source: lead.source ?? null,
      status: lead.status,
      assignedTo: lead.assignedTo?._id ?? null,
      nextFollowUpAt: lead.nextFollowUpAt
        ? new Date(lead.nextFollowUpAt).toISOString().slice(0, 16)
        : null,
      tags: lead.tags ?? [],
      quickNote: lead.quickNote ?? null,
      lostReason: lead.lostReason ?? null,
    },
  });

  const { data: contactsData = [] } = useGetLeadContacts(workspaceId);

  // Re-populate when lead changes
  useEffect(() => {
    reset({
      title: lead.title,
      value: lead.value,
      currency: lead.currency,
      priority: lead.priority,
      source: lead.source ?? null,
      status: lead.status,
      assignedTo: lead.assignedTo?._id ?? null,
      nextFollowUpAt: lead.nextFollowUpAt
        ? new Date(lead.nextFollowUpAt).toISOString().slice(0, 16)
        : null,
      tags: lead.tags ?? [],
      quickNote: lead.quickNote ?? null,
      lostReason: lead.lostReason ?? null,
    });
  }, [
    lead._id,
    lead.assignedTo?._id,
    lead.currency,
    lead.lostReason,
    lead.nextFollowUpAt,
    lead.priority,
    lead.quickNote,
    lead.source,
    lead.status,
    lead.tags,
    lead.title,
    lead.value,
    reset,
  ]);

  // const watchedPriority = watch("priority");
  const watchedStatus = watch("status");
  const watchedTags = watch("tags");

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    const current = getValues("tags");
    if (current.includes(trimmed)) return;
    setValue("tags", [...current, trimmed]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      getValues("tags").filter((t) => t !== tag),
    );
  };

  const handleFormSubmit: SubmitHandler<EditLeadFormData> = async (data) => {
    const payload: UpdateLeadPayload = {
      title: data.title,
      value: data.value,
      currency: data.currency,
      priority: data.priority,
      source: data.source ?? undefined,
      status: data.status,
      assignedTo: data.assignedTo ?? null,
      nextFollowUpAt: data.nextFollowUpAt
        ? new Date(data.nextFollowUpAt).toISOString()
        : null,
      tags: data.tags,
      quickNote: data.quickNote ?? undefined,
      lostReason:
        data.status === "LOST" ? (data.lostReason ?? undefined) : undefined,
    };
    await onSubmit(payload);
  };

  const handleClose = () => {
    reset();
    setTagInput("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-140 max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6 pt-2"
        >
          <Section label="Contact">
            <Controller
              name="contactId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || NONE_CONTACT_VALUE}
                  onValueChange={(value) =>
                    field.onChange(
                      value === NONE_CONTACT_VALUE ? null : value,
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a contact (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE_CONTACT_VALUE}>
                      None (No contact)
                    </SelectItem>
                    {contactsData.map((contact: Contact) => (
                      <SelectItem key={contact._id} value={contact._id}>
                        {contact.name} {contact.email && `(${contact.email})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Section>

          <Section label="Basic Info">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Lead title"
                />
                {errors.title && <FieldError msg={errors.title.message} />}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="value">Value *</Label>
                  <Input
                    id="value"
                    type="number"
                    min={0}
                    step="any"
                    {...register("value")}
                    placeholder="0"
                  />
                  {errors.value && <FieldError msg={errors.value.message} />}
                </div>

                <div className="space-y-1.5">
                  <Label>Currency</Label>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section label="Priority">
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-4 gap-2">
                  {PRIORITIES.map(({ value, label, activeClass }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => field.onChange(value)}
                      className={cn(
                        "py-2 rounded-lg border text-xs font-semibold transition-all",
                        "border-border bg-muted/30 text-muted-foreground hover:border-border/80",
                        field.value === value && activeClass,
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            />
          </Section>

          <Separator />

          <Section label="Status & Source">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Source</Label>
                <Controller
                  name="source"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? "__none__"}
                      onValueChange={(v) =>
                        field.onChange(v === "__none__" ? null : v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">— None —</SelectItem>
                        {SOURCES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Lost reason*/}
            {watchedStatus === "LOST" && (
              <div className="space-y-1.5 mt-3">
                <Label htmlFor="lostReason">Lost Reason</Label>
                <Input
                  id="lostReason"
                  {...register("lostReason")}
                  placeholder="Why was this lead lost?"
                />
              </div>
            )}
          </Section>

          <Separator />

          <Section label="Assignment & Follow-up">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Assigned To</Label>
                <Controller
                  name="assignedTo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? "__none__"}
                      onValueChange={(v) =>
                        field.onChange(v === "__none__" ? null : v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Unassigned" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">— Unassigned —</SelectItem>
                        {members.map((m) => (
                          <SelectItem key={m._id} value={m._id}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="nextFollowUpAt">Next Follow-up</Label>
                <Input
                  id="nextFollowUpAt"
                  type="datetime-local"
                  {...register("nextFollowUpAt")}
                />
              </div>
            </div>
          </Section>

          <Separator />

          <Section label="Tags">
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Type a tag and press Enter..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                size="sm"
              >
                Add
              </Button>
            </div>
            {watchedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {watchedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </Section>

          <Separator />

          <Section label="Quick Note">
            <Textarea
              {...register("quickNote")}
              placeholder="Add a quick note..."
              rows={3}
            />
          </Section>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-primary/70">
        {label}
      </p>
      {children}
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="text-xs text-destructive">{msg}</p> : null;
}
