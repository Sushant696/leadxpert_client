"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2, UserPlus, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/components/showToast";
import useCreateLead from "../hooks/useCreateLead";
import {
  CreateLeadPayload,
  LeadPriority,
  LeadSource,
} from "../types/lead-types";
import { Contact } from "@/features/workspace/types/contact-types";
import useGetLeadContacts from "../hooks/useGetLeadContacts";
import useCreateLeadContact from "../hooks/useCreateLeadContact";

const NONE_CONTACT_VALUE = "__none_contact__";
const NONE_SOURCE_VALUE = "__none_source__";

const createLeadSchema = z.object({
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
    .optional(),
  quickNote: z.string().optional(),
  tags: z.string().optional(),
  nextFollowUpAt: z.string().optional(),
});

const quickContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
});

type CreateLeadFormData = z.infer<typeof createLeadSchema>;
type QuickContactFormData = z.infer<typeof quickContactSchema>;

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  pipelineId: string;
  stageId?: string;
}

export function CreateLeadModal({
  isOpen,
  onClose,
  workspaceId,
  pipelineId,
  stageId,
}: CreateLeadModalProps) {
  const [showQuickContact, setShowQuickContact] = useState(false);

  const { register, handleSubmit, control, reset, setValue } =
    useForm<CreateLeadFormData>({
      resolver: zodResolver(createLeadSchema),
      defaultValues: {
        currency: "NPR",
        priority: "MEDIUM",
      },
    });

  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    reset: resetContact,
    formState: { errors: contactErrors },
  } = useForm<QuickContactFormData>({
    resolver: zodResolver(quickContactSchema),
  });

  const createLeadMutation = useCreateLead(workspaceId, pipelineId);
  const { data: contactsData = [] } = useGetLeadContacts(workspaceId);
  const createContactMutation = useCreateLeadContact(workspaceId);

  const onSubmitQuickContact = (data: QuickContactFormData) => {
    createContactMutation.mutate(
      {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
      },
      {
        onSuccess: (newContact) => {
          if (newContact?._id) {
            setValue("contactId", newContact._id);
          }
          showToast.success("Contact created successfully");
          setShowQuickContact(false);
          resetContact();
        },
        onError: (error: Error) => {
          showToast.error(error.message || "Failed to create contact");
        },
      },
    );
  };

  const onSubmit = async (data: CreateLeadFormData) => {
    const payload: CreateLeadPayload = {
      contactId:
        data.contactId && data.contactId !== NONE_CONTACT_VALUE
          ? data.contactId
          : undefined,
      stageId: stageId,
      title: data.title,
      value: data.value,
      currency: data.currency,
      priority: data.priority as LeadPriority,
      source: data.source as LeadSource | undefined,
      quickNote: data.quickNote,
      tags: data.tags
        ? data.tags.split(",").map((tag) => tag.trim())
        : undefined,
      nextFollowUpAt: data.nextFollowUpAt,
    };

    createLeadMutation.mutate(payload, {
      onSuccess: () => {
        showToast.success("Lead created successfully");
        reset();
        onClose();
      },
      onError: (error) => {
        showToast.error(error.message || "Failed to create lead");
      },
    });
  };

  const handleClose = () => {
    reset();
    resetContact();
    setShowQuickContact(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Lead
          </DialogTitle>
          <DialogDescription>
            {stageId
              ? "Add a new lead to this stage"
              : "Add a new lead to your pipeline (will be placed in the first stage)"}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Contact Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="contact" className="text-sm font-semibold">
                Contact{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (Optional)
                </span>
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowQuickContact(!showQuickContact)}
                className="h-8 gap-1.5"
              >
                {showQuickContact ? (
                  <>
                    <X size={14} />
                    Cancel
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    New Contact
                  </>
                )}
              </Button>
            </div>

            {showQuickContact ? (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Quickly create a new contact
                </p>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Name *</Label>
                    <Input
                      {...registerContact("name")}
                      placeholder="Contact name"
                      className="h-9 text-sm"
                    />
                    {contactErrors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {contactErrors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Email</Label>
                      <Input
                        {...registerContact("email")}
                        type="email"
                        placeholder="email@example.com"
                        className="h-9 text-sm"
                      />
                      {contactErrors.email && (
                        <p className="text-xs text-destructive mt-1">
                          {contactErrors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs">Phone</Label>
                      <Input
                        {...registerContact("phone")}
                        placeholder="+977 98..."
                        className="h-9 text-sm"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleSubmitContact(onSubmitQuickContact)}
                    disabled={createContactMutation.isPending}
                    size="sm"
                    className="w-full h-9"
                  >
                    {createContactMutation.isPending ? (
                      <>
                        <Loader2 size={14} className="animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus size={14} className="mr-2" />
                        Create & Select Contact
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <Controller
                name="contactId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || NONE_CONTACT_VALUE}
                    onValueChange={(value) =>
                      field.onChange(
                        value === NONE_CONTACT_VALUE ? undefined : value,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a contact (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE_CONTACT_VALUE}>
                        None (Skip contact)
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
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">
              Lead Title <span className="text-accent">*</span>
            </Label>
            <Input
              {...register("title")}
              placeholder="e.g., Enterprise Software License"
              className="text-sm"
            />
          </div>

          {/* Value & Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value" className="text-sm font-semibold">
                Value <span className="text-accent">*</span>
              </Label>
              <Input
                {...register("value", { valueAsNumber: true })}
                type="number"
                placeholder="0"
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-semibold">
                Currency <span className="text-accent">*</span>
              </Label>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="NPR">NPR (₨)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Priority & Source */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-semibold">
                Priority <span className="text-accent">*</span>
              </Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source" className="text-sm font-semibold">
                Source
              </Label>
              <Controller
                name="source"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || NONE_SOURCE_VALUE}
                    onValueChange={(value) =>
                      field.onChange(
                        value === NONE_SOURCE_VALUE ? undefined : value,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE_SOURCE_VALUE}>None</SelectItem>
                      <SelectItem value="WEBSITE">Website</SelectItem>
                      <SelectItem value="REFERRAL">Referral</SelectItem>
                      <SelectItem value="COLD_CALL">Cold Call</SelectItem>
                      <SelectItem value="EMAIL">Email</SelectItem>
                      <SelectItem value="SOCIAL_MEDIA">Social Media</SelectItem>
                      <SelectItem value="EVENT">Event</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Quick Note */}
          <div className="space-y-2">
            <Label htmlFor="quickNote" className="text-sm font-semibold">
              Quick Note
            </Label>
            <Input
              {...register("quickNote")}
              placeholder="Add any quick notes about this lead..."
              className="text-sm"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-semibold">
              Tags (comma-separated)
            </Label>
            <Input
              {...register("tags")}
              placeholder="e.g., Enterprise, Q1 2026, Negotiating"
              className="text-sm"
            />
          </div>

          {/* Next Follow-up */}
          <div className="space-y-2">
            <Label htmlFor="nextFollowUpAt" className="text-sm font-semibold">
              Next Follow-up Date
            </Label>
            <Input
              {...register("nextFollowUpAt")}
              type="date"
              className="text-sm"
            />
          </div>

          <Separator />

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={createLeadMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createLeadMutation.isPending}
              className="gap-2"
            >
              {createLeadMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Create Lead
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
