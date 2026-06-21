"use client";

import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCreatePipelineStage from "../hooks/useCreatePipelineStage";
import {
  CreatePipelineStagePayload,
  StageType,
} from "../types/pipeline-stage.types";
import { CreatePipelineStageSchema } from "../validators/pipelin-stage-validators";

interface CreatePipelineStageModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  workspaceId: string;
  pipelineId: string;
}

const PRESET_COLORS = [
  { hex: "#3B82F6", label: "Blue" },
  { hex: "#10B981", label: "Green" },
  { hex: "#F59E0B", label: "Amber" },
  { hex: "#EF4444", label: "Red" },
  { hex: "#8B5CF6", label: "Purple" },
  { hex: "#EC4899", label: "Pink" },
  { hex: "#06B6D4", label: "Cyan" },
  { hex: "#F97316", label: "Orange" },
];

const STAGE_TYPES = [
  { value: StageType.OPEN, label: "Open", description: "Active leads" },
  { value: StageType.WON, label: "Won", description: "Closed deals" },
  { value: StageType.LOST, label: "Lost", description: "Lost leads" },
];

function CreatePipelineStageModal({
  isOpen,
  setIsOpen,
  workspaceId,
  pipelineId,
}: CreatePipelineStageModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreatePipelineStageSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3B82F6",
      type: StageType.OPEN,
    },
  });

  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [selectedType, setSelectedType] = useState(StageType.OPEN);

  const createStageMutation = useCreatePipelineStage(workspaceId, pipelineId);

  const onSubmit = async (data: CreatePipelineStagePayload) => {
    const payload = {
      name: data.name,
      description: data.description || null,
      color: data.color,
      type: data.type,
    };

    createStageMutation.mutate(payload, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
        setSelectedColor("#3B82F6");
        setSelectedType(StageType.OPEN);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <div className="relative">
          <div className="flex items-start gap-3">
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight">
                Create Pipeline Stage
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-sm">
                Add a new stage to define your lead workflow steps.
              </DialogDescription>
            </div>
          </div>
        </div>
        <Separator />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto space-y-5 px-2 pb-4"
        >
          {/* Stage Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="stage-name"
              className="text-sm font-semibold text-foreground"
            >
              Stage Name <span className="text-accent">*</span>
            </Label>
            <Input
              {...register("name")}
              id="stage-name"
              placeholder="e.g., Qualification, Proposal, Negotiation"
              className="h-10 rounded-lg border-border/70 bg-surface focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors placeholder:text-muted-foreground/60"
            />
            {errors.name && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                {errors.name?.message?.toString()}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="stage-desc"
              className="text-sm font-semibold text-foreground"
            >
              Description{" "}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                Optional
              </span>
            </Label>
            <textarea
              {...register("description")}
              id="stage-desc"
              placeholder="What happens in this stage? E.g., Leads are qualified and assessed"
              rows={2}
              className="w-full px-3 py-2.5 border border-border/70 rounded-lg bg-surface text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground/60"
            />
            {errors.description && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                {errors.description?.message?.toString()}
              </p>
            )}
          </div>

          {/* Stage Type */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">
              Stage Type <span className="text-accent">*</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {STAGE_TYPES.map(({ value, label, description }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setValue("type", value);
                    setSelectedType(value);
                  }}
                  className={cn(
                    "relative p-3 rounded-lg border-2 transition-all text-left",
                    selectedType === value
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-border bg-surface",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {description}
                      </p>
                    </div>
                    {selectedType === value && (
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            {errors.type && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                {errors.type?.message?.toString()}
              </p>
            )}
          </div>
          {/* Color Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">
              Stage Color
            </Label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map(({ hex, label }) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => {
                    setValue("color", hex);
                    setSelectedColor(hex);
                  }}
                  title={label}
                  className="relative w-8 h-8 rounded-full transition-transform duration-150 hover:scale-110 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-offset-background focus:ring-primary"
                  style={{ backgroundColor: hex }}
                >
                  {selectedColor === hex && (
                    <Check
                      className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow"
                      strokeWidth={3}
                    />
                  )}
                </button>
              ))}

              {/* Custom color input */}
              <div className="relative ml-1 group">
                <input
                  type="color"
                  {...register("color")}
                  onChange={(e) => {
                    setValue("color", e.target.value);
                    setSelectedColor(e.target.value);
                  }}
                  className="w-8 h-8 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
                  title="Custom color"
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-lg leading-none select-none cursor-pointer hover:border-primary transition-colors"
                  style={
                    !PRESET_COLORS.some((c) => c.hex === selectedColor)
                      ? {
                          backgroundColor: selectedColor,
                          borderColor: selectedColor,
                        }
                      : {}
                  }
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </form>

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              reset();
            }}
            className="gap-1.5"
          >
            <X size={14} />
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit(onSubmit)}
            disabled={createStageMutation.isPending}
            className="gap-1.5"
          >
            {createStageMutation.isPending ? (
              <>
                <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Check size={14} />
                Create Stage
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePipelineStageModal;
