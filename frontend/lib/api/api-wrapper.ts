import axiosInstance from "./axios";
import { apiURLs } from "@/utils/apiUrls";
import SessionExpiredError from "../auth/session-error-handler";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../auth/cookies";

type HttpMethod = "GET" | "POST" | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig {
  url: string,
  method: HttpMethod,
  data?: any,
  params?: any,
  headers?: Record<string, string>
}

async function makeAuthenticatedRequest<T>(config: RequestConfig): Promise<T> {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    try {
      accessToken = await refreshAccessToken();
    } catch (refreshError: any) {
      throw new SessionExpiredError('No access token available');
    }
  }

  try {
    const response = await axiosInstance.request({
      url: config.url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;

  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        // retry original request with new token
        const retryResponse = await axiosInstance.request({
          url: config.url,
          method: config.method,
          data: config.data,
          params: config.params,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        return retryResponse.data;

      } catch (refreshError: any) {
        // Refresh failed - session is completely expired
        throw new SessionExpiredError('Your session has expired. Please login again.');
      }
    }

    // If it's not a 401, just throw the original error
    throw error;
  }
}

/*
 * Refreshes access token using the refresh token 
 * gets called automatically when 401 error is detected if api-Wrapper methods are used
*/

async function refreshAccessToken(): Promise<string> {
  const refreshToken = await getRefreshToken()
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const response = await axiosInstance.post(
    apiURLs.AUTH.refresh,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )

  if (!response.data.success) {
    throw new Error('Refresh token invalid or expired');
  }

  const newAccessToken = response.data.data.accessToken;
  const newRefreshToken = response.data.data.refreshToken;

  await setAccessToken(newAccessToken);
  await setRefreshToken(newRefreshToken);

  return newAccessToken;
}

// Generic API wrapper methods

export const apiWrapper = {
  get: <T = any>(url: string, params?: any, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: 'GET', params, headers }),

  post: <T = any>(url: string, data?: any, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: 'POST', data, headers }),

  put: <T = any>(url: string, data?: any, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: 'PUT', data, headers }),

  patch: <T = any>(url: string, data?: any, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: 'PATCH', data, headers }),

  delete: <T = any>(url: string, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: 'DELETE', headers }),
};
