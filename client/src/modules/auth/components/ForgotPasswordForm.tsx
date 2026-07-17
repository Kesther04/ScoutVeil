import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import FormField from "./FormField";
import { ErrorBanner, SubmitButton, SuccessBanner } from "./AuthMisc";
import { useAuth, getErrorMessage } from "../hooks/useAuth";

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await forgotPassword({ email });
      setSentTo(email);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  if (sentTo) {
    return (
      <SuccessBanner>
        If an account exists for <span className="text-[#F0B96B]">{sentTo}</span>, a reset
        link is on its way. Check your inbox — it can take a minute to arrive.
      </SuccessBanner>
    );
  }

  return (
    <div>
      {error && <ErrorBanner>{error}</ErrorBanner>}

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

        <SubmitButton isLoading={isLoading}>
          Send reset link
          <ArrowRight className="w-4 h-4" />
        </SubmitButton>
      </form>
    </div>
  );
}