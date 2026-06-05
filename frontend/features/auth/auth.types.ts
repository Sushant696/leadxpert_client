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
