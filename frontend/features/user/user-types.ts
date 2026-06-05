import { UserRole } from "@/types/user";

export interface getAllUsersParams {
  page?: number
  limit?: number
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole
  isEmailVerified: boolean;
  isActive: boolean;
  onboardingCompleted: boolean;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// get all usrs 
export interface UsersResponseData {
  users: User[];
  pagination: Pagination;
}


