"use server";

import { cookies } from "next/headers";

import { authApi } from "./auth-api";
import cookieConfig from "@/utils/cookieConfig";
import { LoginCredentials, RegisterData } from "./auth.types";


export async function loginAction(formData: LoginCredentials) {
  try {
    // runs on next js server
    const response = await authApi.login(formData);
    const cookieStore = await cookies();
    cookieStore.set('accessToken', response?.data?.accessToken, cookieConfig.accessTokenConfig);
    cookieStore.set('refreshToken', response?.data?.refreshToken, cookieConfig.refreshTokenConfig);

    return {
      success: true,
      data: response.data.user,
    };

  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
}

export async function registerAction(formData: RegisterData) {
  try {
    const response = await authApi.register(formData)
    console.log(response, "respone received from the registeraction")
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: "Logout failed",
    };
  }
}

