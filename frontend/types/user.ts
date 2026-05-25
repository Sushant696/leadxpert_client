export type UserRole = 'ADMIN' | 'USER'

export interface AuthState {
  isAuthenticated: boolean
  role: UserRole | null
}
