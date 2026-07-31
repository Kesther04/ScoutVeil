// src/modules/competitors/components/CompetitorForm.tsx
import { useState } from "react";
import type { FormEvent, ReactElement } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import { isValidDomain, normalizeDomain } from "../../../shared/utils/formatDomain";
import type { CreateCompetitorPayload } from "../types";

type CompetitorFormProps = {
  onSubmit: (payload: CreateCompetitorPayload) => Promise<void>;
  onCancel: () => void;
};

export default function CompetitorForm({
  onSubmit,
  onCancel,
}: CompetitorFormProps): ReactElement {
  const [domain, setDomain] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!domain.trim()) {
      setError("Enter a domain to start tracking.");
      return;
    }
    if (!isValidDomain(domain)) {
      setError("That doesn't look like a valid domain, e.g. rivalco.com");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit({
        domain: normalizeDomain(domain),
        name: name.trim() || undefined,
      });
    } catch {
      setError("Couldn't add this competitor. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="competitor-domain"
        label="Domain"
        placeholder="rivalco.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        error={error ?? undefined}
        autoFocus
      />
      <Input
        id="competitor-name"
        label="Name (optional)"
        placeholder="Rivalco"
        value={name}
        onChange={(e) => setName(e.target.value)}
        hint="Helps you tell competitors apart at a glance."
      />
      <div className="flex items-center justify-end gap-3 mt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Start tracking
        </Button>
      </div>
    </form>
  );
}
