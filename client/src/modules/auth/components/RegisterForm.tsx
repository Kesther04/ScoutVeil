import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import GoogleButton from "./GoogleButton";
import { ErrorBanner, OrDivider, SubmitButton } from "./AuthMisc";
import { useAuth, getErrorMessage, getFieldError } from "../hooks/useAuth";

export default function RegisterForm() {
  const { register, continueWithGoogle } = useAuth();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Passwords don't match.");
      return;
    }
    if (!agreedToTerms) {
      setLocalError("Please agree to the Terms and Privacy Policy to continue.");
      return;
    }

    setIsLoading(true);
    try {
      await register({ fullName, companyName, email, password });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleCredential(credential: string) {
    setError(null);
    setLocalError(null);
    setIsLoading(true);
    try {
      await continueWithGoogle({ credential });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  const topLevelError = localError ?? (error ? getErrorMessage(error) : null);

  return (
    <div>
      {topLevelError && <ErrorBanner>{topLevelError}</ErrorBanner>}

      <GoogleButton
        label="signup_with"
        onCredential={handleGoogleCredential}
        onError={setLocalError}
        disabled={isLoading}
      />

      <OrDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Full name"
          type="text"
          name="fullName"
          autoComplete="name"
          placeholder="Ada Lovelace"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={getFieldError(error, "fullName")}
        />

        <FormField
          label="Company name"
          type="text"
          name="companyName"
          autoComplete="organization"
          placeholder="Your company or startup"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          error={getFieldError(error, "companyName")}
          hint="Used to tailor your competitor watchlist and digest."
        />

        <FormField
          label="Work email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={getFieldError(error, "email")}
        />

        <PasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={getFieldError(error, "password")}
        />

        <PasswordField
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label className="flex items-start gap-2.5 text-xs text-[#94A3B8] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-[#E8A64A]"
          />
          <span>
            I agree to ScoutVeil's{" "}
            <a href="/terms" className="text-[#F0B96B] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#F0B96B] hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <SubmitButton isLoading={isLoading}>
          Create account
          <ArrowRight className="w-4 h-4" />
        </SubmitButton>
      </form>
    </div>
  );
}