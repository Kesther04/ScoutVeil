import type { ReactElement } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
import CompleteProfileForm from "../components/CompleteProfileForm";
import { useAuth } from "../hooks/useAuth";

type AuthMode = "login" | "register" | "forgot-password" | "reset-password" | "complete-profile";

const MODE_COPY: Record<
  AuthMode,
  { eyebrow: string; title: string; subtitle?: string }
> = {
  login: {
    eyebrow: "Welcome back",
    title: "Log in to ScoutVeil",
    subtitle: "Pick up where your last digest left off.",
  },
  register: {
    eyebrow: "Get started",
    title: "Create your account",
    subtitle: "Start tracking a competitor in under a minute.",
  },
  "forgot-password": {
    eyebrow: "Reset password",
    title: "Forgot your password?",
    subtitle: "We'll email you a link to set a new one.",
  },
  "reset-password": {
    eyebrow: "Reset password",
    title: "Set a new password",
    subtitle: "Make it something you haven't used before.",
  },
  "complete-profile": {
    eyebrow: "One last step",
    title: "Tell us about your company",
    subtitle: "This helps ScoutVeil tailor your first digest.",
  },
};

function getModeFromPath(pathname: string): AuthMode | null {
  const segment = pathname.split("/auth/")[1]?.split("/")[0];
  if (
    segment === "login" ||
    segment === "register" ||
    segment === "forgot-password" ||
    segment === "reset-password" ||
    segment === "complete-profile"
  ) {
    return segment;
  }
  return null;
}

export default function AuthPage(): ReactElement {
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const mode = getModeFromPath(location.pathname);

  if (!mode) {
    return <Navigate to="/auth/login" replace />;
  }

  // Google sign-ups with an incomplete profile must finish that step first.
  if (!isLoading && user?.profileIncomplete && mode !== "complete-profile") {
    return <Navigate to="/auth/complete-profile" replace />;
  }

  // Nothing to complete if the profile is already there — send them along.
  if (!isLoading && mode === "complete-profile" && (!user || !user.profileIncomplete)) {
    return <Navigate to={user ? "/dashboard" : "/auth/login"} replace />;
  }

  const copy = MODE_COPY[mode];

  const footer: Record<AuthMode, ReactElement | undefined> = {
    login: (
      <p>
        New to ScoutVeil?{" "}
        <Link to="/auth/register" className="text-[#F0B96B] hover:underline">
          Create an account
        </Link>
      </p>
    ),
    register: (
      <p>
        Already have an account?{" "}
        <Link to="/auth/login" className="text-[#F0B96B] hover:underline">
          Log in
        </Link>
      </p>
    ),
    "forgot-password": (
      <p>
        Remembered it?{" "}
        <Link to="/auth/login" className="text-[#F0B96B] hover:underline">
          Back to log in
        </Link>
      </p>
    ),
    "reset-password": undefined,
    "complete-profile": undefined,
  };

  return (
    <AuthShell eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} footer={footer[mode]}>
      {mode === "login" && <LoginForm />}
      {mode === "register" && <RegisterForm />}
      {mode === "forgot-password" && <ForgotPasswordForm />}
      {mode === "reset-password" && <ResetPasswordForm />}
      {mode === "complete-profile" && <CompleteProfileForm />}
    </AuthShell>
  );
}