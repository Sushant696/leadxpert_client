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
    .optional(),

  color: z
    .string(),

  icon: z
    .string()
    .optional(),

  currency: z
    .nativeEnum(Currency),

  vertical: z
    .nativeEnum(BusinessVertical),

  visibility: z
    .nativeEnum(PipelineVisibility),

  memberIds: z
    .array(z.string())
    .optional(),
});

export const UpdatePipelineSchema = CreatePipelineSchema.partial();

export type TCreatePipelineForm = z.infer<typeof CreatePipelineSchema>;
export type TUpdatePipelineForm = z.infer<typeof UpdatePipelineSchema>;
