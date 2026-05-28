import { Filter, Plus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export default function GamesHeader({ onDeployClick }) {
  return (
    <PageHeader
      title="Arena Control Center"
      subtitle="Real-time oversight of active game instances and liquidity pools."
      actions={
        <>
          <Button variant="secondary" startIcon={<Filter size={18} />}>
            Filter View
          </Button>
          <Button variant="primary" startIcon={<Plus size={18} />} onClick={onDeployClick}>
            Deploy New Instance
          </Button>
        </>
      }
    />
  );
}
