import PageContainer from "@/components/ui/PageContainer";
import PoliciesHeader from "@/components/AdminPolicies/PoliciesHeader";
import PoliciesSidebar from "@/components/AdminPolicies/PoliciesSidebar";
import PolicyDocumentPanel from "@/components/AdminPolicies/PolicyDocumentPanel";
import PolicyVersionHistory from "@/components/AdminPolicies/PolicyVersionHistory";

export default function AdminPoliciesPage() {
  return (
    <PageContainer>
      <PoliciesHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <PoliciesSidebar />
        </div>
        <div className="xl:col-span-2">
          <PolicyDocumentPanel />
        </div>
      </div>

      <PolicyVersionHistory />
    </PageContainer>
  );
}
