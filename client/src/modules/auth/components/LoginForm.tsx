import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import GoogleButton from "./GoogleButton";
import { ErrorBanner, OrDivider, SubmitButton } from "./AuthMisc";
import { useAuth, getErrorMessage } from "../hooks/useAuth";

export default function LoginForm() {
  const { login, continueWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login({ email, password, rememberMe });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleCredential(credential: string) {
    setError(null);
    setIsLoading(true);
    try {
      await continueWithGoogle({ credential });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <GoogleButton
        label="signin_with"
        onCredential={handleGoogleCredential}
        onError={setError}
        disabled={isLoading}
      />

      <OrDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Work email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Link
              to="/auth/forgot-password"
              className="text-xs text-[#94A3B8] hover:text-[#E4E2ED] transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-[#94A3B8] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-[#E8A64A]"
          />
          Keep me signed in
        </label>

        <SubmitButton isLoading={isLoading}>
          Log in
          <ArrowRight className="w-4 h-4" />
        </SubmitButton>
      </form>
    </div>
  );
}