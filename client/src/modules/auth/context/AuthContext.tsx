// src/modules/auth/context/AuthContext.tsx

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import type {
  CompleteProfilePayload,
  ForgotPasswordPayload,
  GoogleAuthPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  User,
} from "../types";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  continueWithGoogle: (payload: GoogleAuthPayload) => Promise<void>;
  completeProfile: (payload: CompleteProfilePayload) => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<string>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<string>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  /** Routes a freshly authenticated user to the right place, sending
   *  Google sign-ups that are missing a company name to finish up. */
  const routeAfterAuth = useCallback(
    (nextUser: User) => {
      setUser(nextUser);
      if (nextUser.profileIncomplete) {
        navigate("/auth/complete-profile", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    },
    [navigate]
  );

  const login = useCallback(
    async (payload: LoginPayload) => {
      const { user } = await authApi.login(payload);
      routeAfterAuth(user);
    },
    [routeAfterAuth]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const { user } = await authApi.register(payload);
      routeAfterAuth(user);
    },
    [routeAfterAuth]
  );

  const continueWithGoogle = useCallback(
    async (payload: GoogleAuthPayload) => {
      const { user } = await authApi.continueWithGoogle(payload);
      routeAfterAuth(user);
    },
    [routeAfterAuth]
  );

  const completeProfile = useCallback(
    async (payload: CompleteProfilePayload) => {
      const { user } = await authApi.completeProfile(payload);
      setUser(user);
      navigate("/dashboard", { replace: true });
    },
    [navigate]
  );

  const forgotPassword = useCallback(async (payload: ForgotPasswordPayload) => {
    const { message } = await authApi.forgotPassword(payload);
    return message;
  }, []);

  const resetPassword = useCallback(
    async (payload: ResetPasswordPayload) => {
      const { message } = await authApi.resetPassword(payload);
      navigate("/auth/login", { replace: true });
      return message;
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore — clear local state regardless of network/server outcome
    }
    setUser(null);
    navigate("/auth/login", { replace: true });
  }, [navigate]);

  /**
   * Restore session on page load / refresh by asking the backend who the
   * current cookie/session belongs to.
   */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { user } = await authApi.me();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      login,
      register,
      continueWithGoogle,
      completeProfile,
      forgotPassword,
      resetPassword,
      logout,
    }),
    [
      user,
      isLoading,
      login,
      register,
      continueWithGoogle,
      completeProfile,
      forgotPassword,
      resetPassword,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}