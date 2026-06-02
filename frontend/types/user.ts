export type UserRole = 'ADMIN' | 'USER'

export const UserRoles = {
  ADMIN: "ADMIN",
  USER: "USER"
} as const

export interface AuthState {
  isAuthenticated: boolean
  role: UserRole | null
}
