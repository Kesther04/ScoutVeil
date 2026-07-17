import {
  ApiError,
  type AuthFieldErrors,
  type AuthResponse,
  type CompleteProfilePayload,
  type ForgotPasswordPayload,
  type GoogleAuthPayload,
  type LoginPayload,
  type RegisterPayload,
  type ResetPasswordPayload,
  type User,
} from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = body?.message ?? "Something went wrong. Please try again.";
    const fieldErrors: AuthFieldErrors | undefined = body?.errors;
    throw new ApiError(message, res.status, fieldErrors);
  }

  return body as T;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  register: (payload: RegisterPayload) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  continueWithGoogle: (payload: GoogleAuthPayload) =>
    request<AuthResponse>("/auth/google", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  completeProfile: (payload: CompleteProfilePayload) =>
    request<{ user: User }>("/auth/complete-profile", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    request<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  resetPassword: (payload: ResetPasswordPayload) =>
    request<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: () => request<{ user: User }>("/auth/me", { method: "GET" }),

  logout: () => request<{ message: string }>("/auth/logout", { method: "POST" }),
};