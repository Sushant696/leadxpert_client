"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, XCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { Lead, LostReasonTag } from "../types/lead-types";

const LOST_REASON_TAGS: { value: LostReasonTag; label: string }[] = [
  { value: "PRICE", label: "Price" },
  { value: "COMPETITOR", label: "Competitor" },
  { value: "NO_RESPONSE", label: "No Response" },
  { value: "NOT_QUALIFIED", label: "Not Qualified" },
  { value: "TIMING", label: "Timing" },
  { value: "BUDGET_ISSUE", label: "Budget Issue" },
  { value: "CHANGED_MIND", label: "Changed Mind" },
  { value: "DUPLICATE", label: "Duplicate" },
  { value: "OTHER", label: "Other" },
];

const lostReasonSchema = z.object({
  lostReason: z.string().min(1, "A reason is required").max(500),
  lostReasonTag: z.enum([
    "PRICE",
    "COMPETITOR",
    "NO_RESPONSE",
    "NOT_QUALIFIED",
    "TIMING",
    "BUDGET_ISSUE",
    "CHANGED_MIND",
    "DUPLICATE",
    "OTHER",
  ]),
});

type LostReasonFormData = z.infer<typeof lostReasonSchema>;

interface LostReasonDialogProps {
  open: boolean;
  lead: Lead;
  /** Cancel — reverts the card (no move performed). */
  onClose: () => void;
  /** Resolves the move mutation with the lost reason. Throws on failure. */
  onConfirm: (data: {
    lostReason: string;
    lostReasonTag: LostReasonTag;
  }) => Promise<unknown>;
}

export function LostReasonDialog({
  open,
  lead,
  onClose,
  onConfirm,
}: LostReasonDialogProps) {
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, control, formState } =
    useForm<LostReasonFormData>({
      resolver: zodResolver(lostReasonSchema),
    });

  const onSubmit = async (data: LostReasonFormData) => {
    try {
      setSubmitting(true);
      await onConfirm({
        lostReason: data.lostReason,
        lostReasonTag: data.lostReasonTag,
      });
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
      <DialogContent className="max-w-lg!">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <XCircle size={18} className="text-destructive" />
            Mark as Lost
          </DialogTitle>
          <DialogDescription>
            Record why <span className="font-medium">{lead.title}</span> was
            lost.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Reason Tag <span className="text-accent">*</span>
            </Label>
            <Controller
              name="lostReasonTag"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOST_REASON_TAGS.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {formState.errors.lostReasonTag && (
              <p className="text-xs text-destructive">
                Please select a reason tag.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lostReason" className="text-sm font-semibold">
              Details <span className="text-accent">*</span>
            </Label>
            <Textarea
              id="lostReason"
              {...register("lostReason")}
              placeholder="Add context on why this lead was lost…"
              className="text-sm min-h-24"
            />
            {formState.errors.lostReason && (
              <p className="text-xs text-destructive">
                {formState.errors.lostReason.message}
              </p>
            )}
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
            <Button
              type="submit"
              variant="destructive"
              disabled={isBusy}
              className="gap-2"
            >
              {isBusy ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <XCircle size={16} />
                  Mark as Lost
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
