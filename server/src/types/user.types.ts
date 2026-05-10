import z from "zod";

// Domain contract
export const UserSchema = z.object({
  name: z.string,
  email: z.email().min(5),
  password: z.string().min(8),
  role: z.enum(["user", "admin"]).default("user"),
  isEmailVerified: z.boolean().default(false),
  isActive: z.boolean().default(false),
  lastLoginAt: z.date(),
  deletedAt: z.date(),
  onboardingCompleted: z.boolean().default(false),
});

export type UserType = z.infer<typeof UserSchema>;
