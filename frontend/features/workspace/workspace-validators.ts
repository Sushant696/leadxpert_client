import z from "zod";

export const WorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required").max(100),
  businessType: z.string().max(100).optional().or(z.literal("")),
  teamSize: z.string().optional().or(z.literal("")),
})

export type TWorkspaceForm = z.infer<typeof WorkspaceSchema>;

