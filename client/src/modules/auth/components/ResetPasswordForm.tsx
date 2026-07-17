import { useState, type FormEvent } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PasswordField from "./PasswordField";
import { ErrorBanner, SubmitButton } from "./AuthMisc";
import { useAuth, getErrorMessage } from "../hooks/useAuth";

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("This reset link is invalid or has expired. Request a new one below.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({ token, password });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  if (!token) {
    return (
      <div>
        <ErrorBanner>This reset link is invalid or has expired.</ErrorBanner>
        <Link
          to="/auth/forgot-password"
          className="text-sm text-[#F0B96B] hover:underline"
        >
          Request a new reset link →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <PasswordField
          label="New password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordField
          label="Confirm new password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <SubmitButton isLoading={isLoading}>
          Reset password
          <ArrowRight className="w-4 h-4" />
        </SubmitButton>
      </form>
    </div>
  );
}