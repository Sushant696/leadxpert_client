import { LoginCredentials, RegisterData } from "./auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post(apiURLs.AUTH.login, credentials);
    return response.data;
  },

  register: async (registerData: RegisterData) => {
    const response = await axiosInstance.post(apiURLs.AUTH.register, registerData)
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.get(apiURLs.AUTH.logout);
    return response.data;
  },
};
