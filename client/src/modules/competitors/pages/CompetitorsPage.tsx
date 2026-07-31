// src/modules/competitors/pages/CompetitorsPage.tsx
import { useState } from "react";
import type { ReactElement } from "react";
import { Plus } from "lucide-react";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import { useCompetitors } from "../hooks/useCompetitors";
import CompetitorForm from "../components/CompetitorForm";
import CompetitorList from "../components/CompetitorList";

export default function CompetitorsPage(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { competitors, isLoading, error, addCompetitor } = useCompetitors();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#94A3B8]">
          {isLoading
            ? "Loading…"
            : `${competitors.length} tracked ${
                competitors.length === 1 ? "competitor" : "competitors"
              }`}
        </p>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <Plus className="w-3.5 h-3.5" />
          Add competitor
        </Button>
      </div>

      <CompetitorList
        competitors={competitors}
        isLoading={isLoading}
        error={error}
        onAddClick={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add a competitor"
        subtitle="We'll start checking their homepage and pricing page daily."
      >
        <CompetitorForm
          onSubmit={async (payload) => {
            await addCompetitor(payload);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
