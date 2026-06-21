import { z } from "zod";
import { StageType } from "../types/pipeline-stage.types";

export const PipelineStageSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(80, "Name must be less than 80 characters")
    .trim(),

  description: z
    .string()
    .max(300, "Description must be less than 300 characters")
    .trim()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : (val ?? null))),

  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex color code")
    .default("#3B82F6"),

  type: z.nativeEnum(StageType).default(StageType.OPEN),

  probability: z
    .number()
    .min(0, "Probability must be at least 0")
    .max(100, "Probability must be at most 100")
    .default(20),
});

export const CreatePipelineStageSchema = PipelineStageSchema.pick({
  name: true,
  description: true,
  color: true,
  type: true,
  probability: true,
});

export const UpdatePipelineStageSchema = PipelineStageSchema.partial().pick({
  name: true,
  description: true,
  color: true,
  type: true,
  probability: true,
});

export const ReorderPipelineStagesSchema = z.object({
  stageIds: z.array(z.string()).min(1, "At least one stage ID is required"),
});

export type CreatePipelineStageFormData = z.infer<
  typeof CreatePipelineStageSchema
>;
export type UpdatePipelineStageFormData = z.infer<
  typeof UpdatePipelineStageSchema
>;
export type ReorderPipelineStagesFormData = z.infer<
  typeof ReorderPipelineStagesSchema
>;
