import { apiClient } from "../../services/client";
import {
  // ApiError,
  // type AuthFieldErrors,
  // type AuthResponse,
  type CompleteProfilePayload,
  type ForgotPasswordPayload,
  type GoogleAuthPayload,
  type LoginPayload,
  type RegisterPayload,
  type ResetPasswordPayload,
  // type User,
} from "./types";


export const authApi = {
  login: async (payload: LoginPayload) => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  },

  continueWithGoogle: async (payload: GoogleAuthPayload) => {
    const response = await apiClient.post("/auth/google", payload);
    return response.data;
  },

  completeProfile: async (payload: CompleteProfilePayload) => {
    const response = await apiClient.post("/auth/complete-profile", payload);
    return response.data;
  },
    
  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const response = await apiClient.post("/auth/forgot-password", payload);
    return response.data;
  },

  resetPassword: async (payload: ResetPasswordPayload) => {
    const response = await apiClient.post("/auth/reset-password", payload);
    return response.data;
  },

  me: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },
};