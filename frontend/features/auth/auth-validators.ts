import z from "zod"

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  firstName: z.string().min(3, "Please enter your first name"),
  lastName: z.string().min(3, "Please enter your last name"),
  password: z.string().min(8, "Min 8 characters"),
  confirmPassword: z.string().min(8, "Password must match."),
})
  .refine((data) =>
    data.password === data.confirmPassword, {
    message: "Password do not match!",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});


export type TloginForm = z.infer<typeof loginSchema>;
export type TregisterForm = z.infer<typeof registerSchema>;
