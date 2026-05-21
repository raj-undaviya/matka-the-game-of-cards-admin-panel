// import { Download, RefreshCw } from "lucide-react";

// import { statCards, clusters } from "@/data/dashboarddata";

// import StatCard from "@/components/AdminDashboard/StatCard";
// import ClusterCard from "@/shared/ClusterCard";
// import RevenueChart from "@/components/AdminDashboard/RevenueChart";
// import DataTable from "@/components/shared/DataTable";
// import DeviceDistribution from "@/components/AdminDashboard/DeviceDistribution";

// export default function AdminOverview() {
//     return (
//         <main className="p-4 md:p-8 space-y-6 bg-gray-100 min-h-screen">

//             {/* ── Header ── */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                 <div>
//                     <h1 className="text-3xl md:text-4xl font-bold text-black">
//                         Platform Overview
//                     </h1>
//                     <p className="text-gray-500 mt-2">
//                         Real-time telemetry and network performance data.
//                     </p>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                     <button
//                         type="button"
//                         className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
//                     >
//                         <Download size={18} />
//                         Export PDF
//                     </button>

//                     <button
//                         type="button"
//                         className="flex items-center gap-2 px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
//                     >
//                         <RefreshCw size={18} />
//                         Live Refresh
//                     </button>
//                 </div>
//             </div>

//             {/* ── Revenue chart + Stat cards ── */}
//             <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//                 <RevenueChart />

//                 <div className="space-y-5">
//                     {statCards.map((card) => (
//                         <StatCard key={card.label} {...card} />
//                     ))}
//                 </div>
//             </div>

//             {/* ── Cluster status row ── */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//                 {clusters.map((cluster) => (
//                     <ClusterCard key={cluster.name} {...cluster} />
//                 ))}
//             </div>

//             {/* ── Activity table + Device distribution ── */}
//             <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//                 <DataTable />
//                 <DeviceDistribution />
//             </div>

//         </main>
//     );
// }

import DashboardHeader from "@/components/AdminDashboard/DashboardHeader";

import RevenueChart from "@/components/AdminDashboard/RevenueChart";

import DashboardStats from "@/components/AdminDashboard/DashboardStats";

import ClusterSection from "@/components/AdminDashboard/ClusterSection";

import DeviceDistribution from "@/components/AdminDashboard/DeviceDistribution";

import DataTable from "@/components/shared/DataTable";

import StatusBadge from "@/components/shared/StatusBadge";

import { activity } from "@/data/dashboarddata";

export default function AdminDashboardPage() {

    const columns = [

        {
            title: "PLAYER",
            dataIndex: "user",

            render: (value, row) => (
                <div>

                    <p className="font-semibold">
                        {value}
                    </p>

                    <span className="text-sm text-gray-500">
                        {row.location}
                    </span>

                </div>
            ),
        },

        {
            title: "EVENT",
            dataIndex: "event",
        },

        {
            title: "AMOUNT",
            dataIndex: "amount",

            render: (value, row) => (
                <span className={row.amountColor}>
                    {value}
                </span>
            ),
        },

        {
            title: "STATUS",
            dataIndex: "status",

            render: (value) => (
                <StatusBadge
                    type={value.toLowerCase()}
                />
            ),
        },
    ];

    return (
        <main className="p-8 space-y-6 bg-gray-100 min-h-screen">

            <DashboardHeader />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                <RevenueChart />

                <DashboardStats />

            </div>

            <ClusterSection />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">

                    <DataTable
                        columns={columns}
                        data={activity}
                    />

                </div>

                <DeviceDistribution />

            </div>

        </main>
    );
}