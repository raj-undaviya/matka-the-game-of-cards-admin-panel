import { Download, RefreshCw } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export default function DashboardHeader() {
  return (
    <PageHeader
      title="Platform Overview"
      subtitle="Real-time telemetry and network performance data."
      actions={
        <>
          <Button variant="secondary" startIcon={<Download size={18} />}>
            Export PDF
          </Button>
          <Button variant="primary" startIcon={<RefreshCw size={18} />}>
            Live Refresh
          </Button>
        </>
      }
    />
  );
}
