// src/modules/auth/hooks/useAuth.tsx

import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContext";
import { ApiError, type AuthFieldErrors } from "../types";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again.";
}

export function getFieldError(err: unknown, field: string): string | undefined {
  if (err instanceof ApiError) return (err.fieldErrors as AuthFieldErrors | undefined)?.[field];
  return undefined;
}