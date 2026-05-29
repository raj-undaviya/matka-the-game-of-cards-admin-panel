import PageContainer from "@/components/ui/PageContainer";
import DashboardHeader from "@/components/AdminDashboard/DashboardHeader";
import DashboardKpiRow from "@/components/AdminDashboard/DashboardKpiRow";
import RevenueChart from "@/components/AdminDashboard/RevenueChart";
import TopGamesWidget from "@/components/AdminDashboard/TopGamesWidget";
import ClusterSection from "@/components/AdminDashboard/ClusterSection";
import DeviceDistribution from "@/components/AdminDashboard/DeviceDistribution";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { activity, OVERVIEW_TABLE_ROW_LIMIT } from "@/data/dashboarddata";

export default function AdminDashboardPage() {
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
      <DashboardHeader />
      <DashboardKpiRow />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RevenueChart />
        <TopGamesWidget />
      </div>

      <ClusterSection />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-color)" }}>
            Recent Platform Activity
          </h2>
          <DataTable columns={columns} data={activity.slice(0, OVERVIEW_TABLE_ROW_LIMIT)} />
        </div>
        <DeviceDistribution />
      </div>
    </PageContainer>
  );
}
