import z from "zod"

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
  firstName: z.string().min(3, "Please enter your first name"),
  lastname: z.string().min(3, "Please enter your last name"),
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
