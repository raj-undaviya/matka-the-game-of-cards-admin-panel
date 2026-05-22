import { Download, Upload } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export default function PoliciesHeader() {
  return (
    <PageHeader
      eyebrow="Regulatory Control"
      title="Policies & Compliance"
      subtitle="Manage legal frameworks, document versions, and cross-border regulatory standards."
      actions={
        <>
          <Button variant="secondary" startIcon={<Download size={18} />}>
            Export Report
          </Button>
          <Button variant="primary" startIcon={<Upload size={18} />}>
            Publish Changes
          </Button>
        </>
      }
    />
  );
}
