import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Lead } from "@/features/lead/types/lead-types";
import { useCreateDeal } from "../hooks/useCreateDeal";
import { PaymentType, Currency } from "../types/deal-types";
import { showToast } from "@/components/showToast";

interface ConvertToDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  workspaceId: string;
  pipelineId: string;
  onSuccess?: () => void;
}

export function ConvertToDealModal({
  isOpen,
  onClose,
  lead,
  workspaceId,
  onSuccess,
}: ConvertToDealModalProps) {
  const [dealTitle, setDealTitle] = useState(lead?.title || "");
  const [dealValue, setDealValue] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PaymentType.INSTALLMENT,
  );
  const [currency, setCurrency] = useState<Currency>(Currency.NPR);
  const [expectedEndDate, setExpectedEndDate] = useState("");

  const createDealMutation = useCreateDeal(workspaceId);

  const handleConvert = async () => {
    if (!lead || !dealTitle.trim()) {
      showToast.error("Deal title is required");
      return;
    }

    createDealMutation.mutate(
      {
        leadId: lead._id,
        title: dealTitle,
        value: dealValue,
        paymentType,
        currency,
        expectedEndDate: expectedEndDate ? new Date(expectedEndDate) : null,
      },
      {
        onSuccess: () => {
          showToast.success("Deal created successfully");
          resetForm();
          onClose();
          onSuccess?.();
        },
        onError: (error: Error) => {
          showToast.error(error.message || "Failed to create deal");
        },
      },
    );
  };

  const resetForm = () => {
    setDealTitle(lead?.title || "");
    setDealValue(0);
    setPaymentType(PaymentType.INSTALLMENT);
    setCurrency(Currency.NPR);
    setExpectedEndDate("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Convert Lead to Deal</DialogTitle>
          <DialogDescription>
            Create a deal from the lead &quot;{lead?.title}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="deal-title" className="text-sm">
              Deal Title
            </Label>
            <Input
              id="deal-title"
              placeholder="Enter deal name"
              value={dealTitle}
              onChange={(e) => setDealTitle(e.target.value)}
              disabled={createDealMutation.isPending}
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="deal-value" className="text-sm">
                Deal Value
              </Label>
              <Input
                id="deal-value"
                type="number"
                placeholder="0"
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                disabled={createDealMutation.isPending}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="currency" className="text-sm">
                Currency
              </Label>
              <Select
                value={currency}
                onValueChange={(value: string) => setCurrency(value as any)}
                disabled={createDealMutation.isPending}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NPR">NPR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="payment-type" className="text-sm">
              Payment Type
            </Label>
            <Select
              value={paymentType}
              onValueChange={(value: string) => setPaymentType(value as any)}
              disabled={createDealMutation.isPending}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ONE_TIME">One Time</SelectItem>
                <SelectItem value="INSTALLMENT">Installment</SelectItem>
                <SelectItem value="RETAINER">Retainer</SelectItem>
                <SelectItem value="MILESTONE">Milestone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="expected-date" className="text-sm">
              Expected Close Date
            </Label>
            <Input
              id="expected-date"
              type="date"
              value={expectedEndDate}
              onChange={(e) => setExpectedEndDate(e.target.value)}
              disabled={createDealMutation.isPending}
              className="mt-1.5"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={createDealMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConvert}
            disabled={createDealMutation.isPending}
          >
            {createDealMutation.isPending ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert to Deal"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
