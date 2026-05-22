import PageContainer from "@/components/ui/PageContainer";
import UsersHeader from "@/components/AdminUsers/UsersHeader";
import UsersStatsRow from "@/components/AdminUsers/UsersStatsRow";
import UsersTableSection from "@/components/AdminUsers/UsersTableSection";
import RecentAdminActions from "@/components/AdminUsers/RecentAdminActions";
import RiskShieldReport from "@/components/AdminUsers/RiskShieldReport";

export default function AdminUsersPage() {
  return (
    <PageContainer>
      <UsersHeader />
      <UsersStatsRow />
      <UsersTableSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAdminActions />
        <RiskShieldReport />
      </div>
    </PageContainer>
  );
}
