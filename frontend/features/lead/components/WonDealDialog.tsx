"use client";

import { z } from "zod";
import { useState, KeyboardEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trophy, X } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllMembers } from "@/features/workspace/hooks/useGetAllMembers";
import { Member } from "@/features/workspace/types/member-type";
import { Lead, DealDetailsPayload } from "../types/lead-types";

const NONE_ASSIGNEE_VALUE = "__none_assignee__";

// Deal currencies supported by the backend Deal schema.
const DEAL_CURRENCIES = ["NPR", "USD", "INR", "GBP", "AUD", "CAD"] as const;
const PAYMENT_TYPES = [
  { value: "ONE_TIME", label: "One-time" },
  { value: "INSTALLMENT", label: "Installment" },
  { value: "RETAINER", label: "Retainer" },
  { value: "MILESTONE", label: "Milestone" },
] as const;

const wonDealSchema = z.object({
  title: z.string().min(1, "Deal title is required").max(200),
  value: z.number().min(0, "Value must be positive"),
  currency: z.enum(DEAL_CURRENCIES),
  paymentType: z.enum(["ONE_TIME", "INSTALLMENT", "RETAINER", "MILESTONE"]),
  advancePaid: z.number().min(0).optional(),
  serviceDescription: z.string().max(2000).optional(),
  startDate: z.string().optional(),
  expectedEndDate: z.string().optional(),
  assignedTo: z.string().optional().nullable(),
});

type WonDealFormData = z.infer<typeof wonDealSchema>;

interface WonDealDialogProps {
  open: boolean;
  lead: Lead;
  workspaceId: string;
  /** Cancel — reverts the card (no move performed). */
  onClose: () => void;
  /** Resolves the move mutation with the deal details. Throws on failure. */
  onConfirm: (dealDetails: DealDetailsPayload) => Promise<unknown>;
}

export function WonDealDialog({
  open,
  lead,
  workspaceId,
  onClose,
  onConfirm,
}: WonDealDialogProps) {
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [deliverableInput, setDeliverableInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: membersData } = useGetAllMembers(workspaceId);
  const members: Member[] = membersData?.members ?? [];

  const defaultCurrency = (
    DEAL_CURRENCIES as readonly string[]
  ).includes(lead.currency)
    ? (lead.currency as (typeof DEAL_CURRENCIES)[number])
    : "NPR";

  const { register, handleSubmit, control, formState } =
    useForm<WonDealFormData>({
      resolver: zodResolver(wonDealSchema),
      defaultValues: {
        title: `${lead.title} - Deal`,
        value: lead.value ?? 0,
        currency: defaultCurrency,
        paymentType: "INSTALLMENT",
        assignedTo: lead.assignedTo?._id ?? null,
      },
    });

  const addDeliverable = () => {
    const trimmed = deliverableInput.trim();
    if (trimmed && !deliverables.includes(trimmed)) {
      setDeliverables((prev) => [...prev, trimmed]);
    }
    setDeliverableInput("");
  };

  const onDeliverableKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addDeliverable();
    } else if (
      e.key === "Backspace" &&
      !deliverableInput &&
      deliverables.length
    ) {
      setDeliverables((prev) => prev.slice(0, -1));
    }
  };

  const onSubmit = async (data: WonDealFormData) => {
    const payload: DealDetailsPayload = {
      title: data.title,
      value: data.value,
      currency: data.currency,
      paymentType: data.paymentType,
      advancePaid: data.advancePaid,
      serviceDescription: data.serviceDescription?.trim() || null,
      deliverables,
      startDate: data.startDate || null,
      expectedEndDate: data.expectedEndDate || null,
      assignedTo:
        data.assignedTo && data.assignedTo !== NONE_ASSIGNEE_VALUE
          ? data.assignedTo
          : null,
    };

    try {
      setSubmitting(true);
      await onConfirm(payload);
      // On success the parent invalidates & the card lands in the Won stage.
      onClose();
    } catch {
      // The move mutation's onError already toasted + reverted the card.
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const isBusy = submitting || formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !isBusy && onClose()}>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Trophy size={18} className="text-emerald-500" />
            Convert to Deal
          </DialogTitle>
          <DialogDescription>
            Moving <span className="font-medium">{lead.title}</span> to a Won
            stage creates a deal. Review the details below.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="deal-title" className="text-sm font-semibold">
              Deal Title <span className="text-accent">*</span>
            </Label>
            <Input
              id="deal-title"
              {...register("title")}
              className="text-sm"
            />
            {formState.errors.title && (
              <p className="text-xs text-destructive">
                {formState.errors.title.message}
              </p>
            )}
          </div>

          {/* Value & Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deal-value" className="text-sm font-semibold">
                Value <span className="text-accent">*</span>
              </Label>
              <Input
                id="deal-value"
                {...register("value", { valueAsNumber: true })}
                type="number"
                className="text-sm"
              />
              {formState.errors.value && (
                <p className="text-xs text-destructive">
                  {formState.errors.value.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">
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
                      {DEAL_CURRENCIES.map((c) => (
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

          {/* Payment type & advance */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Payment Type <span className="text-accent">*</span>
              </Label>
              <Controller
                name="paymentType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_TYPES.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advancePaid" className="text-sm font-semibold">
                Advance Paid
              </Label>
              <Input
                id="advancePaid"
                {...register("advancePaid", { valueAsNumber: true })}
                type="number"
                placeholder="0"
                className="text-sm"
              />
            </div>
          </div>

          {/* Service description */}
          <div className="space-y-2">
            <Label
              htmlFor="serviceDescription"
              className="text-sm font-semibold"
            >
              Service Description
            </Label>
            <Textarea
              id="serviceDescription"
              {...register("serviceDescription")}
              placeholder="What is being delivered under this deal?"
              className="text-sm min-h-20"
            />
          </div>

          {/* Deliverables chip input */}
          <div className="space-y-2">
            <Label htmlFor="deliverables" className="text-sm font-semibold">
              Deliverables
            </Label>
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2">
              {deliverables.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs"
                >
                  {d}
                  <button
                    type="button"
                    onClick={() =>
                      setDeliverables((prev) => prev.filter((x) => x !== d))
                    }
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input
                id="deliverables"
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                onKeyDown={onDeliverableKeyDown}
                onBlur={addDeliverable}
                placeholder={
                  deliverables.length ? "" : "Type and press Enter…"
                }
                className="flex-1 min-w-24 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-semibold">
                Start Date
              </Label>
              <Input
                id="startDate"
                {...register("startDate")}
                type="date"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="expectedEndDate"
                className="text-sm font-semibold"
              >
                Expected End Date
              </Label>
              <Input
                id="expectedEndDate"
                {...register("expectedEndDate")}
                type="date"
                className="text-sm"
              />
            </div>
          </div>

          {/* Assigned to */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Assigned To</Label>
            <Controller
              name="assignedTo"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ?? NONE_ASSIGNEE_VALUE}
                  onValueChange={(v) =>
                    field.onChange(v === NONE_ASSIGNEE_VALUE ? null : v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE_ASSIGNEE_VALUE}>
                      — Unassigned —
                    </SelectItem>
                    {members.map((m) => (
                      <SelectItem key={m.user.id} value={m.user.id}>
                        {m.user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isBusy}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isBusy} className="gap-2">
              {isBusy ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Converting…
                </>
              ) : (
                <>
                  <Trophy size={16} />
                  Create Deal
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
