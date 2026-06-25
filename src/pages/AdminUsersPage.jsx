import { useCallback, useEffect, useState } from "react";
import PageContainer from "@/components/ui/PageContainer";
import UsersHeader from "@/components/AdminUsers/UsersHeader";
import UsersStatsRow from "@/components/AdminUsers/UsersStatsRow";
import UsersTableSection from "@/components/AdminUsers/UsersTableSection";
import RecentAdminActions from "@/components/AdminUsers/RecentAdminActions";
import RiskShieldReport from "@/components/AdminUsers/RiskShieldReport";
import usersApi from "@/api/usersApi";
import { mapUsersResponse } from "@/services/usersService";

export default function AdminUsersPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [kycFilter, setKycFilter] = useState("KYC: All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    const params = {};
    if (statusFilter !== "All Statuses") {
      params.status = statusFilter.toLowerCase();
    }
    if (kycFilter !== "KYC: All") {
      // Map "KYC: Verified" -> "verified", etc.
      const kycVal = kycFilter.replace("KYC: ", "").toLowerCase();
      params.kyc = kycVal === "unverified" ? "rejected" : kycVal;
    }
    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    try {
      const response = await usersApi.getUsers(params);
      setData(mapUsersResponse(response.data));
    } catch (err) {
      setError(err?.message || "Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, kycFilter, searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <PageContainer>
      <UsersHeader onRefresh={fetchUsers} />
      
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <UsersStatsRow stats={data?.userStats} />
      
      <UsersTableSection
        usersList={data?.users || []}
        loading={loading}
        statusFilter={statusFilter}
        kycFilter={kycFilter}
        searchQuery={searchQuery}
        onStatusChange={setStatusFilter}
        onKycChange={kycFilter}
        onSearchChange={setSearchQuery}
        refreshList={fetchUsers}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentAdminActions actions={data?.recentAdminActions} />
        <RiskShieldReport report={data?.riskShieldReport} />
      </div>
    </PageContainer>
  );
}
