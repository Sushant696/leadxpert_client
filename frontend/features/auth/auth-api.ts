import { apiURLs } from "@/utils/apiUrls";
import axiosInstance from "@/lib/api/axios";
import { apiWrapper } from "@/lib/api/api-wrapper";
import {
  ForgotPasswordData,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
  VerifyEmailData,
  VerifyResetCodeData
} from "./auth.types";

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

  joinWorkspaceByToken: async (token: string, accessToken?: string) => {
    const response = await axiosInstance.post(apiURLs.WORKSPACE.joinByToken(token), {}, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.data
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await axiosInstance.post(apiURLs.AUTH.forgotPassword, data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await axiosInstance.post(apiURLs.AUTH.resetPassword, data);
    return response.data;
  },

  verifyEmail: async (data: VerifyEmailData) => {
    return await apiWrapper.post(apiURLs.AUTH.verifyEmail, data);
  },

  verifyResetCode: async (data: VerifyResetCodeData) => {
    const response = await axiosInstance.post(apiURLs.AUTH.verifyResetCode, data);
    return response.data;
  },

  sendVerification: async () => {
    return await apiWrapper.post(apiURLs.AUTH.sendVerification);
  },

};
