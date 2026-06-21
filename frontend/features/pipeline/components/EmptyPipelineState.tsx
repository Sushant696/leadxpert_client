"use client";

import { useState } from "react";
import { Sparkles, Check, ArrowRight, Layers, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  STARTER_TEMPLATES,
  StarterTemplate,
  StarterStageDef,
} from "../templateConstants";
import useBulkCreatePipelineStage from "../hooks/useBulkCreatePipelineStage";

interface EmptyPipelineStateProps {
  pipelineName: string;
  mutation: ReturnType<typeof useBulkCreatePipelineStage>;
  onSelectTemplate: (template: StarterTemplate) => void;
  onCreateManually: () => void;
  isLoading?: boolean;
}

function EmptyPipelineState({
  mutation,
  onSelectTemplate,
  onCreateManually,
  isLoading = false,
}: EmptyPipelineStateProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<StarterTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] =
    useState<StarterTemplate | null>(null);

  const handleTemplateClick = (template: StarterTemplate) => {
    if (template.id === "manual") {
      onCreateManually();
      return;
    }
    setSelectedTemplate(template);
  };

  const handlePreview = (e: React.MouseEvent, template: StarterTemplate) => {
    e.stopPropagation();
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      //   mutation.mutate(selectedTemplate.id);
      onSelectTemplate(selectedTemplate);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-8">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Set up your pipeline stages
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Choose a template to get started quickly, or create your own
              stages from scratch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {STARTER_TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className={cn(
                  "group relative p-4 rounded-xl border-2 text-left transition-all duration-200",
                  "hover:shadow-lg hover:-translate-y-0.5",
                  selectedTemplate?.id === template.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/50",
                )}
              >
                {template.isRecommended && (
                  <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full flex items-center gap-1">
                    <Sparkles size={10} />
                    Recommended
                  </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{
                      backgroundColor: template.accentColor + "20",
                      border: `1.5px solid ${template.accentColor}`,
                    }}
                  >
                    {template.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm truncate">
                      {template.label}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {template.description}
                    </p>
                  </div>
                </div>

                {template.stages.length > 0 ? (
                  <div className="flex items-center gap-1.5 mb-3">
                    {template.stages.slice(0, 5).map((stage, idx) => (
                      <div
                        key={idx}
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: stage.color }}
                        title={stage.name}
                      />
                    ))}
                    {template.stages.length > 5 && (
                      <span className="text-[10px] text-muted-foreground ml-1">
                        +{template.stages.length - 5} more
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mb-3">
                    <Plus size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Create your own
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {template.stages.length > 0
                      ? `${template.stages.length} stages`
                      : "Manual setup"}
                  </span>

                  {template.stages.length > 0 && (
                    <button
                      onClick={(e) => handlePreview(e, template)}
                      className="text-[10px] font-medium text-primary hover:underline"
                    >
                      Preview
                    </button>
                  )}
                </div>

                {selectedTemplate?.id === template.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedTemplate && selectedTemplate.id !== "manual" && (
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleApplyTemplate}
                disabled={isLoading}
                className="gap-2 px-8"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Creating stages...
                  </>
                ) : (
                  <>
                    Apply &quot;{selectedTemplate.label}&quot;
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          {previewTemplate && (
            <>
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{
                    backgroundColor: previewTemplate.accentColor + "20",
                    border: `2px solid ${previewTemplate.accentColor}`,
                  }}
                >
                  {previewTemplate.icon}
                </div>
                <div>
                  <DialogTitle className="text-lg font-bold">
                    {previewTemplate.label}
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    {previewTemplate.description}
                  </DialogDescription>
                </div>
              </div>

              <Separator />

              <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {previewTemplate.stages.length} Stages
                </p>

                {previewTemplate.stages.map((stage, idx) => (
                  <StagePreviewRow key={idx} stage={stage} index={idx + 1} />
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedTemplate(previewTemplate);
                    setIsPreviewOpen(false);
                  }}
                  className="gap-1.5"
                >
                  <Check size={14} />
                  Select Template
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StagePreviewRow({
  stage,
  index,
}: {
  stage: StarterStageDef;
  index: number;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-medium text-muted-foreground w-5 text-center">
          {index}
        </span>
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: stage.color }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {stage.name}
          </span>
          <span
            className={cn(
              "text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase",
              stage.type === "OPEN" && "bg-blue-100 text-blue-700",
              stage.type === "WON" && "bg-green-100 text-green-700",
              stage.type === "LOST" && "bg-red-100 text-red-700",
            )}
          >
            {stage.type}
          </span>
        </div>
        {stage.description && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {stage.description}
          </p>
        )}
      </div>
      <div className="text-right shrink-0">
        <span className="text-xs font-semibold text-primary">
          {stage.probability}%
        </span>
        <p className="text-[9px] text-muted-foreground">probability</p>
      </div>
    </div>
  );
}

export default EmptyPipelineState;
