export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdateUser {
  name: string;
  profilePicture?: string;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  code: string;
  email: string;
  newPassword: string;
}

export interface VerifyEmailData {
  code: string;
}
