import { z } from "zod";
import { BusinessVertical, PipelineVisibility, Currency } from "../types/pipeline-types";

export const CreatePipelineSchema = z.object({
  name: z
    .string()
    .min(1, "Pipeline name is required")
    .max(100, "Pipeline name must be at most 100 characters")
    .trim(),

  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? null : val ?? null)),

  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex color")
    .default("#3B82F6"),

  icon: z
    .string()
    .max(10, "Icon must be at most 10 characters")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? null : val ?? null)),

  currency: z
    .nativeEnum(Currency)
    .default(Currency.NPR),

  vertical: z
    .nativeEnum(BusinessVertical)
    .default(BusinessVertical.GENERAL),

  visibility: z
    .nativeEnum(PipelineVisibility)
    .default(PipelineVisibility.WORKSPACE),

  memberIds: z
    .array(z.string())
    .optional(),
});

export const UpdatePipelineSchema = CreatePipelineSchema.partial();

export type TCreatePipelineForm = z.infer<typeof CreatePipelineSchema>;
export type TUpdatePipelineForm = z.infer<typeof UpdatePipelineSchema>;
