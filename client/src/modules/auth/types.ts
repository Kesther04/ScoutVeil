export interface User {
  id: string;
  fullName: string;
  email: string;
  companyName: string | null;
  avatarUrl?: string | null;
  authProvider: "password" | "google";
  /** true when a Google sign-up hasn't supplied company info yet */
  profileIncomplete: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterPayload {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
}

export interface GoogleAuthPayload {
  /** ID token returned by Google's identity SDK on the client */
  credential: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface CompleteProfilePayload {
  companyName: string;
  role?: string;
}

export type AuthFieldErrors = Record<string, string>;

export class ApiError extends Error {
  status: number;
  fieldErrors?: AuthFieldErrors;

  constructor(message: string, status: number, fieldErrors?: AuthFieldErrors) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}