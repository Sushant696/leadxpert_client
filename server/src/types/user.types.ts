import z from "zod";

export const UserSchema = z.object({
  name: z.string,
  email: z.email().min(5),
  password: z.string().min(8),
  isEmailVerified: z.boolean().default(false),
  role: z.enum(["admin", 'user']).default("user"),
  isActive: z.boolean().default(false),
  lastLoginAt: z.date(),
  deletedAt: z.date(),
  onboardingCompleted: z.boolean().default(false),
});

export type UserType = z.infer<typeof UserSchema>;
