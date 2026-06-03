import { Download, RefreshCw } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export default function DashboardHeader({
  onExportPdf,
  onRefresh,
  isExporting = false,
  isLoading = false,
  isRefreshing = false,
  lastUpdated,
}) {
  return (
    <PageHeader
      title="Platform Overview"
      subtitle="Real-time telemetry and network performance data."
      actions={
        <>
          <Button
            variant="secondary"
            startIcon={<Download size={18} />}
            onClick={onExportPdf}
            disabled={isExporting || isLoading || isRefreshing}
          >
            {isExporting ? "Exporting" : "Export PDF"}
          </Button>
          <Button
            variant="primary"
            startIcon={<RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />}
            onClick={onRefresh}
            disabled={isRefreshing || isLoading}
            title={lastUpdated ? `Last updated ${lastUpdated}` : undefined}
          >
            {isRefreshing ? "Refreshing" : "Live Refresh"}
          </Button>
        </>
      }
    />
  );
}
