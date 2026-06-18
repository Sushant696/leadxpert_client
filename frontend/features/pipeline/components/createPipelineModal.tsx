"use client"

import { ArrowRight, Check } from "lucide-react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useCreatePipeline from "../hooks/useCreatePipeline";
import { CreatePipelineSchema, TCreatePipelineForm } from "../validators/pipeline-validators";
import {
  BusinessVertical,
  Currency,
  PipelineVisibility,
  CreatePipelinePayload,
} from "../types/pipeline-types";
import { Separator } from "@/components/ui/separator";

interface CreatePipelineModalProps {
  workspaceId: string;
  setIsCreatePipelineOpen: Dispatch<SetStateAction<boolean>>;
}

const VERTICAL_LABELS: Record<BusinessVertical, string> = {
    [BusinessVertical.GENERAL]: "General",
    [BusinessVertical.REAL_ESTATE]: "Real Estate",
    [BusinessVertical.IT_SOFTWARE]: "IT & Software",
    [BusinessVertical.LEGAL_FINANCIAL]: "Legal & Financial",
    [BusinessVertical.RECRUITMENT]: "Recruitment",
    [BusinessVertical.EVENT_MANAGEMENT]: "Event Management",
    [BusinessVertical.EDUCATION_CONSULTANCY]: "Education Consultancy",
    [BusinessVertical.DIGITAL_MARKETING]: "Digital Marketing"
};

const VERTICAL_ICONS: Record<BusinessVertical, string> = {
    [BusinessVertical.GENERAL]: "⚡",
    [BusinessVertical.REAL_ESTATE]: "🏢",
    [BusinessVertical.IT_SOFTWARE]: "💻",
    [BusinessVertical.LEGAL_FINANCIAL]: "⚖️",
    [BusinessVertical.RECRUITMENT]: "👥",
    [BusinessVertical.EVENT_MANAGEMENT]: "🎪",
    [BusinessVertical.EDUCATION_CONSULTANCY]: "🎓",
    [BusinessVertical.DIGITAL_MARKETING]: "📱"
};

const PRESET_COLORS = [
  { hex: "#1E40AF", label: "Ocean" },
  { hex: "#3B82F6", label: "Sky" },
  { hex: "#F97316", label: "Ember" },
  { hex: "#EF4444", label: "Crimson" },
  { hex: "#10B981", label: "Jade" },
  { hex: "#8B5CF6", label: "Violet" },
  { hex: "#EC4899", label: "Rose" },
  { hex: "#F59E0B", label: "Gold" },
];

const AVAILABLE_CURRENCIES = [
  { code: Currency.NPR, label: "NPR", symbol: "₨" },
  { code: Currency.USD, label: "USD", symbol: "$" },
  { code: Currency.EUR, label: "EUR", symbol: "€" },
  { code: Currency.GBP, label: "GBP", symbol: "£" },
  { code: Currency.INR, label: "INR", symbol: "₹" },
];

function CreatePipelineModal({ workspaceId, setIsCreatePipelineOpen }: CreatePipelineModalProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TCreatePipelineForm>({
    resolver: zodResolver(CreatePipelineSchema),
    defaultValues: {
      color: "#1E40AF",
      currency: Currency.NPR,
      vertical: BusinessVertical.GENERAL,
      visibility: PipelineVisibility.WORKSPACE,
    },
  });

  const createPipelineMutation = useCreatePipeline(workspaceId);
  const selectedColor = useWatch({ control, name: "color", defaultValue: "#1E40AF" });
  const selectedVertical = useWatch({ control, name: "vertical", defaultValue: BusinessVertical.GENERAL });
  const selectedCurrency = useWatch({ control, name: "currency", defaultValue: Currency.NPR });

  const onSubmit = async (data: TCreatePipelineForm) => {
    const payload: CreatePipelinePayload = {
      name: data.name,
      color: data.color,
      description: data.description,
      vertical: data.vertical,
      currency: data.currency,
      visibility: data.visibility,
    };
    createPipelineMutation.mutate(payload, {
      onSuccess: () => {
        setIsCreatePipelineOpen(false);
        reset();
      },
    });
  };

  return (
    <DialogContent
      className="max-w-3xl! sm:max-w-xl"
    >
      <div
        className="relative overflow-hidden">
        <div className="relative flex items-start gap-4">
          <div>
            <DialogTitle className="text-xl font-bold  tracking-tight">
              Create Pipeline
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-sm">
              Define your lead journey — stages, team visibility & currency.
            </DialogDescription>
          </div>
        </div>
      </div>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)} className="px-2 pb-4 space-y-5">
        {/* Pipeline Name */}
        <div className="space-y-1.5">
          <Label htmlFor="pipeline-name" className="text-sm font-semibold text-foreground">
            Pipeline Name <span className="text-accent">*</span>
          </Label>
          <Input
            {...register("name")}
            id="pipeline-name"
            placeholder="e.g., IT Consultancy Sales, Digital Marketing Leads"
            className="h-10 rounded-lg border-border/70 bg-surface focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors placeholder:text-muted-foreground/60"
          />
          {errors.name && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="pipeline-desc" className="text-sm font-semibold text-foreground">
            Description{" "}
            <span className="text-xs font-normal text-muted-foreground ml-1">Optional</span>
          </Label>
          <textarea
            {...register("description")}
            id="pipeline-desc"
            placeholder="What kind of leads does this pipeline track?"
            rows={2}
            className="w-full px-3 py-2.5 border border-border/70 rounded-lg bg-surface text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Color picker */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">Pipeline Color</Label>
          <div className="flex items-center gap-2 flex-wrap">
            {PRESET_COLORS.map(({ hex, label }) => (
              <button
                key={hex}
                type="button"
                onClick={() => setValue("color", hex)}
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

            {/* custom colour input */}
            <div className="relative ml-1 group">
              <input
                type="color"
                {...register("color")}
                className="w-8 h-8 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
                title="Custom color"
              />
              <div
                className="w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-lg leading-none select-none"
                style={
                  !PRESET_COLORS.some((c) => c.hex === selectedColor)
                    ? { backgroundColor: selectedColor, borderColor: selectedColor }
                    : {}
                }
              >
                {PRESET_COLORS.some((c) => c.hex === selectedColor) ? "+" : (
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                )}
              </div>
            </div>

            {/* live swatch */}
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

        <div className="border-t border-border/50" />

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Business Vertical</Label>
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
                        : "border-border/50 bg-surface hover:border-border hover:bg-muted"
                    )}
                  >
                    <span className="text-3xl">{VERTICAL_ICONS[vertical]}</span>
                    <span className="text-xs font-medium text-center leading-tight text-foreground">
                      {VERTICAL_LABELS[vertical]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Currency - Button Grid */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Currency</Label>
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
                        : "border-border/50 bg-surface hover:border-border hover:bg-muted"
                    )}
                  >
                    <span className="text-xl font-semibold">{symbol}</span>
                    <span className="text-xs font-medium text-muted-foreground">{label}</span>
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        {/* Divider */}
        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            onClick={() => setIsCreatePipelineOpen(false)}
            variant="outline"
            className="flex-1 h-10 rounded-xl border-border/70 hover:bg-surface-variant font-medium"
            disabled={createPipelineMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-2 h-10 rounded-xl font-semibold gap-2 shadow-md transition-all duration-150 hover:shadow-lg hover:brightness-110"
            style={{
              background: createPipelineMutation.isPending
                ? "var(--muted)"
                : `linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)`,
              color: "white",
            }}
            disabled={createPipelineMutation.isPending}
          >
            {createPipelineMutation.isPending ? (
              <>
                <span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Creating…
              </>
            ) : (
              <>
                Create Pipeline
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}

export default CreatePipelineModal;
