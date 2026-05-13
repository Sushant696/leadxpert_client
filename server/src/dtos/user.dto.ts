import z from "zod"
import { UserSchema } from "../types/user.types"

export const CreateUserDTO = UserSchema.pick(
  {
    email: true,
    name: true,
    password: true,
    isEmailVerified: true,
    role: true,
    isActive: true,
    onboardingCompleted: true
  }
).extend({
  confirmPassword: z.string().min(6)
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "passwords do not match",
    path: ["confirmPassword"]
  }
)
export const loginUserDTO = UserSchema.pick(
  {
    email: true,
    password: true,
  }
)

export type loginUserDTO = z.infer<typeof loginUserDTO>
export type CreateUserDTO = z.infer<typeof CreateUserDTO>
