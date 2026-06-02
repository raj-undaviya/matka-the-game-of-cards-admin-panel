import { useCallback, useEffect, useMemo, useState } from "react";
import PageContainer from "@/components/ui/PageContainer";
import DashboardHeader from "@/components/AdminDashboard/DashboardHeader";
import DashboardKpiRow from "@/components/AdminDashboard/DashboardKpiRow";
import RevenueChart from "@/components/AdminDashboard/RevenueChart";
import TopGamesWidget from "@/components/AdminDashboard/TopGamesWidget";
import ClusterSection from "@/components/AdminDashboard/ClusterSection";
import DeviceDistribution from "@/components/AdminDashboard/DeviceDistribution";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { OVERVIEW_TABLE_ROW_LIMIT } from "@/data/dashboarddata";
import dashboardApi from "@/api/dashboardApi";
import { mapDashboardResponse } from "@/services/dashboardService";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchDashboard = useCallback(async ({ showRefreshing = false } = {}) => {
    if (showRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await dashboardApi.getAdminDashboard();
      setDashboardData(mapDashboardResponse(response.data));
      setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (requestError) {
      setError(requestError?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchDashboard();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchDashboard]);

  const visibleActivity = useMemo(
    () => (dashboardData?.activity || []).slice(0, OVERVIEW_TABLE_ROW_LIMIT),
    [dashboardData?.activity]
  );
  const canShowDashboard = Boolean(dashboardData) && !loading && !refreshing;

  const handleExportPdf = useCallback(async () => {
    setExportingPdf(true);

    try {
      const { exportDashboardPdf } = await import("@/services/dashboardPdfService");

      exportDashboardPdf(
        {
          ...dashboardData,
          activity: visibleActivity,
        },
        { generatedAt: new Date() }
      );
    } catch {
      setError("Unable to export dashboard PDF.");
    } finally {
      setExportingPdf(false);
    }
  }, [dashboardData, visibleActivity]);

  const columns = [
    {
      title: "PLAYER",
      dataIndex: "user",
      render: (value, row) => (
        <div>
          <p className="font-semibold">{value}</p>
          <span className="text-sm" style={{ color: "var(--text-light-color)" }}>
            {row.location}
          </span>
        </div>
      ),
    },
    { title: "EVENT", dataIndex: "event" },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      render: (value, row) => <span className={row.amountColor}>{value}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (value) => <StatusBadge type={value.toLowerCase()} label={value} />,
    },
  ];

  return (
    <PageContainer>
      <DashboardHeader
        onExportPdf={handleExportPdf}
        onRefresh={() => fetchDashboard({ showRefreshing: true })}
        isExporting={exportingPdf}
        isLoading={loading}
        isRefreshing={refreshing}
        lastUpdated={lastUpdated}
      />

      {error && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {canShowDashboard && (
        <>
          <DashboardKpiRow cards={dashboardData.kpiCards} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <RevenueChart
              bars={dashboardData.revenue?.bars}
              hours={dashboardData.revenue?.hours}
              growth={dashboardData.revenue?.growth}
              period={dashboardData.revenue?.period}
            />
            <TopGamesWidget games={dashboardData.topGames} />
          </div>

          <ClusterSection items={dashboardData.clusters} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-color)" }}>
                Recent Platform Activity
              </h2>
              {visibleActivity.length ? (
                <DataTable columns={columns} data={visibleActivity} />
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm font-semibold text-gray-500">
                  No recent platform activity available.
                </div>
              )}
            </div>
            <DeviceDistribution items={dashboardData.devices} />
          </div>
        </>
      )}
    </PageContainer>
  );
}
