import { Download, UserPlus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export default function UsersHeader() {
  return (
    <PageHeader
      title="User Management"
      subtitle="Review and manage platform player accounts and security status."
      actions={
        <>
          <Button variant="secondary" startIcon={<Download size={18} />}>
            Export CSV
          </Button>
          {/* <Button variant="primary" startIcon={<UserPlus size={18} />}>
            Manual Register
          </Button> */}
        </>
      }
    />
  );
}
