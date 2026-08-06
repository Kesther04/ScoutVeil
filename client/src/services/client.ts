import axios from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "../shared/constants/tokenStore";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url === "/auth/refresh") {
      clearAccessToken();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        // De-dupe concurrent 401s so we only hit /auth/refresh once.
        if (!refreshPromise) {
          refreshPromise = apiClient
            .post("/auth/refresh")
            .then((res) => {
              const token = res.data.tokens.accessToken;
              setAccessToken(token);
              return token;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);