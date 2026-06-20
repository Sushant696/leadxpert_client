import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trash2, AlertTriangle } from "lucide-react";
import { useForm, Controller, useWatch } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  BusinessVertical,
  Pipeline,
} from "../../types/pipeline-types";
import {
  AVAILABLE_CURRENCIES,
  PRESET_COLORS,
  VERTICAL_ICONS,
  VERTICAL_LABELS,
} from "../../types/sharedTypes";
import {
  PipelineSettingsSchema,
  TPipelineSettingsForm
} from "../../validators/pipeline-validators";

interface PipelineTypes extends Pipeline {
  dealCount?: number;
  activeDeals?: number;
}

interface PipelineSettingsModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pipeline: PipelineTypes;
  workspaceId?: string;
}

function PipelineSettingsModal({
  isOpen,
  setIsOpen,
  pipeline,
}: PipelineSettingsModalProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm<TPipelineSettingsForm>({
    resolver: zodResolver(PipelineSettingsSchema),
    defaultValues: {
      name: pipeline.name,
      description: pipeline.description || "",
      color: pipeline.color,
      vertical: pipeline.vertical,
      currency: pipeline.currency,
    },
  });

  const selectedColor = useWatch({ control, name: "color" });
  const selectedVertical = useWatch({ control, name: "vertical" });
  const selectedCurrency = useWatch({ control, name: "currency" });

  const onSubmit = async (data: TPipelineSettingsForm) => {
    console.log("Updating pipeline:", data);
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log("Deleting pipeline:", pipeline?._id);
    setShowDeleteDialog(false);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl! max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl shadow-md"
                  style={{ backgroundColor: pipeline.color }}
                >
                  {VERTICAL_ICONS[pipeline.vertical]}
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold tracking-tight">
                    Pipeline Settings
                  </DialogTitle>
                  <DialogDescription className="mt-1 flex items-center gap-2">
                    <span>{pipeline.name}</span>
                    {pipeline.dealCount !== undefined && (
                      <Badge variant="secondary" className="text-xs">
                        {pipeline.activeDeals || 0} active deals
                      </Badge>
                    )}
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          <Separator />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto space-y-5 px-2 py-1"
          >
            <div className="space-y-1.5">
              <Label htmlFor="pipeline-name" className="text-sm font-semibold">
                Pipeline Name <span className="text-accent">*</span>
              </Label>
              <Input
                {...register("name")}
                id="pipeline-name"
                placeholder="e.g., IT Consultancy Sales"
                className="h-10 rounded-lg"
              />
              {errors.name && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pipeline-desc" className="text-sm font-semibold">
                Description{" "}
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  Optional
                </span>
              </Label>
              <textarea
                {...register("description")}
                id="pipeline-desc"
                placeholder="What kind of leads does this pipeline track?"
                rows={3}
                className="w-full px-3 py-2.5 border border-border/70 rounded-lg bg-surface text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground/60"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Pipeline Color</Label>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_COLORS.map(({ hex, label }) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() =>
                      setValue("color", hex, { shouldDirty: true })
                    }
                    title={label}
                    className="relative w-8 h-8 rounded-full transition-transform duration-150 hover:scale-110 focus:outline-none"
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

                <div className="relative ml-1 group">
                  <input
                    type="color"
                    {...register("color")}
                    className="w-8 h-8 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
                    onChange={(e) =>
                      setValue("color", e.target.value, { shouldDirty: true })
                    }
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-lg leading-none select-none"
                    style={
                      !PRESET_COLORS.some((c) => c.hex === selectedColor)
                        ? {
                          backgroundColor: selectedColor,
                          borderColor: selectedColor,
                        }
                        : {}
                    }
                  >
                    {PRESET_COLORS.some((c) => c.hex === selectedColor) ? (
                      "+"
                    ) : (
                      <Check className="h-4 w-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>

                <div className="ml-2 flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded-md shadow-sm border border-white/20"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    {selectedColor}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Business Vertical</Label>
              <Controller
                name="vertical"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-4 gap-2">
                    {Object.values(BusinessVertical).map((vertical) => (
                      <button
                        key={vertical}
                        type="button"
                        onClick={() => field.onChange(vertical)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-200",
                          selectedVertical === vertical
                            ? "border-primary bg-primary/10"
                            : "border-border/50 bg-surface hover:border-border hover:bg-muted",
                        )}
                      >
                        <span className="text-3xl">
                          {VERTICAL_ICONS[vertical]}
                        </span>
                        <span className="text-xs font-medium text-center leading-tight text-foreground">
                          {VERTICAL_LABELS[vertical]}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Currency</Label>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-5 gap-2">
                    {AVAILABLE_CURRENCIES.map(({ code, label, symbol }) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => field.onChange(code)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border-2 transition-all duration-200",
                          selectedCurrency === code
                            ? "border-primary bg-primary/10"
                            : "border-border/50 bg-surface hover:border-border hover:bg-muted",
                        )}
                      >
                        <span className="text-xl font-semibold">{symbol}</span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Danger Zone
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Irreversible actions that affect this pipeline
                </p>
              </div>

              <div className="border border-destructive/30 bg-destructive/5 p-4 rounded-lg">
                <button
                  type="button"
                  onClick={() => setShowDeleteDialog(true)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg border border-destructive/40 hover:bg-destructive/10 transition-colors text-left"
                >
                  <Trash2 className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-destructive">
                      Delete Pipeline
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Permanently delete this pipeline and all its deals,
                      activities, and historical data
                    </div>
                  </div>
                </button>

                <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg mt-3">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Warning:
                    </span>{" "}
                    Deleting a pipeline will permanently remove all associated
                    deals, activities, and historical data. This action cannot
                    be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 pb-2">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1 h-10 rounded-xl border-border/70 hover:bg-surface-variant font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 rounded-xl font-semibold gap-2 shadow-md transition-all duration-150 hover:shadow-lg hover:brightness-110"
                disabled={!isDirty}
                style={{
                  background: isDirty
                    ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)"
                    : undefined,
                  color: "white",
                }}
              >
                Save Changes
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete Pipeline?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2">
              <p>
                You are about to permanently delete{" "}
                <strong>{pipeline.name}</strong>.
              </p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Make sure to check these before deleting:
                </p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>No Stages are there in this pipeline</li>
                  <li>No deals are there in this pipeline</li>
                </ul>
              </div>
              <p className="text-sm font-semibold text-destructive">
                This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Pipeline
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default PipelineSettingsModal;
