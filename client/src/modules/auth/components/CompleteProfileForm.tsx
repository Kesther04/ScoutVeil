import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import FormField from "./FormField";
import { ErrorBanner, SubmitButton } from "./AuthMisc";
import { useAuth, getErrorMessage } from "../hooks/useAuth";

const ROLE_OPTIONS = [
  "Founder / CEO",
  "Co-founder",
  "Product",
  "Marketing / Growth",
  "Sales",
  "Other",
];

export default function CompleteProfileForm() {
  const { user, completeProfile } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await completeProfile({ companyName, role: role || undefined });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {user && (
        <div className="flex items-center gap-3 mb-6 rounded-lg border border-white/10 bg-white/3 px-3.5 py-3">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#E8A64A]/15 flex items-center justify-center text-xs text-[#F0B96B] font-medium">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm text-[#E4E2ED] font-medium truncate">{user.fullName}</p>
            <p className="text-xs text-[#94A3B8] truncate">{user.email}</p>
          </div>
        </div>
      )}

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Company name"
          type="text"
          name="companyName"
          autoComplete="organization"
          placeholder="Your company or startup"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          hint="Used to tailor your competitor watchlist and digest."
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className="text-xs font-medium text-[#94A3B8] tracking-wide">
            Your role <span className="text-[#565A72]">(optional)</span>
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg bg-white/3 border border-white/10 px-3.5 py-2.5 text-sm text-[#E4E2ED] outline-none transition-colors focus:bg-white/5 focus:border-[#E8A64A]/60"
          >
            <option value="" className="bg-[#0B0D14]">
              Select a role
            </option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r} className="bg-[#0B0D14]">
                {r}
              </option>
            ))}
          </select>
        </div>

        <SubmitButton isLoading={isLoading}>
          Finish setting up
          <ArrowRight className="w-4 h-4" />
        </SubmitButton>
      </form>
    </div>
  );
}