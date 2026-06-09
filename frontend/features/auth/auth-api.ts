import { apiURLs } from "@/utils/apiUrls";
import axiosInstance from "@/lib/api/axios";
import { apiWrapper } from "@/lib/api/api-wrapper";
import { LoginCredentials, RegisterData } from "./auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post(apiURLs.AUTH.login, credentials);
    return response.data;
  },

  register: async (registerData: RegisterData) => {
    const response = await axiosInstance.post(apiURLs.AUTH.register, registerData);
    return response.data;
  },

  logout: async () => {
    return await apiWrapper.post(apiURLs.AUTH.logout);
  },

  getCurrentUser: async () => {
    return await apiWrapper.post(apiURLs.AUTH.me);
  },

  joinWorkspaceByToken: async (token: string) => {
    const response = await apiWrapper.post(apiURLs.WORKSPACE.joinByToken(token));
    return response;
  }
};
