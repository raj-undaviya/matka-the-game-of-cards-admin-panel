import { Filter, Plus, Layers } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export default function GamesHeader({
  onDeployClick,
  onAddTemplateClick,
  onCreatePoolClick,
}) {
  return (
    <PageHeader
      title="Arena Control Center"
      subtitle="Real-time oversight of active game instances and liquidity pools."
      actions={
        <>
          <Button variant="secondary" startIcon={<Filter size={16} />}>
            Filter
          </Button>
          <Button variant="primary" startIcon={<Plus size={16} />} onClick={onDeployClick}>
            Deploy Arena
          </Button>
          <Button variant="blue" startIcon={<Plus size={16} />} onClick={onAddTemplateClick}>
            Add Template
          </Button>
          <Button variant="purple" startIcon={<Layers size={16} />} onClick={onCreatePoolClick}>
            Create Pool
          </Button>
        </>
      }
    />
  );
}
