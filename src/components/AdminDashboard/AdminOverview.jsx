import {
    Download,
    RefreshCw,
    Users2,
    Network,
    Server,
    AlertTriangle,
} from "lucide-react";

const revenueBars = [22, 35, 30, 42, 55, 50, 38, 65, 72, 8, 78, 12, 95];

const hours = [
    "08:00 AM",
    "12:00 PM",
    "04:00 PM",
    "08:00 PM",
    "12:00 AM",
];

const clusters = [
    { name: "NA-WEST CLUSTER", status: "Online", ok: true },
    { name: "EU-CENTRAL CLUSTER", status: "Online", ok: true },
    { name: "ASIA-SOUTH CLUSTER", status: "Online", ok: true },
    { name: "DB-REPLICA-04", status: "Degraded", ok: false },
];

const activity = [
    {
        user: "Alpha_Wolf",
        event: "Jackpot Entry",
        amount: "$1,250.00",
        amountColor: "text-green-600",
        location: "United States",
        status: "COMPLETED",
        statusClass: "bg-green-100 text-green-700",
    },
    {
        user: "K-Gamer_99",
        event: "New Registration",
        amount: "—",
        amountColor: "text-gray-500",
        location: "South Korea",
        status: "PENDING",
        statusClass: "bg-yellow-100 text-yellow-700",
    },
    {
        user: "Shadow_X",
        event: "Withdrawal",
        amount: "$4,800.00",
        amountColor: "text-red-600",
        location: "Germany",
        status: "FLAGGED",
        statusClass: "bg-red-100 text-red-700",
    },
    {
        user: "Lara_Craft",
        event: "Store Purchase",
        amount: "$45.99",
        amountColor: "text-green-600",
        location: "Brazil",
        status: "COMPLETED",
        statusClass: "bg-green-100 text-green-700",
    },
];

const devices = [
    { label: "Mobile Devices", pct: 64, color: "bg-green-500" },
    { label: "Desktop Web", pct: 28, color: "bg-blue-500" },
    { label: "Consoles", pct: 8, color: "bg-gray-400" },
];

export default function AdminOverview() {
    return (
        <main className="p-4 md:p-8 space-y-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-black">
                        Platform Overview
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Real-time telemetry and network performance data.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
                    >
                        <Download size={18} />
                        Export PDF
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    >
                        <RefreshCw size={18} />
                        Live Refresh
                    </button>
                </div>
            </div>

            {/* Revenue + Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Revenue Chart */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Revenue Telemetry
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                Gross platform revenue vs last period
                            </p>
                        </div>

                        <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                            +14.2%
                        </span>
                    </div>

                    {/* Chart */}
                    <div className="mt-10 h-72 flex items-end gap-2">
                        {revenueBars.map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 flex items-end h-full"
                            >
                                <div
                                    className={`w-full rounded-t-md ${i === revenueBars.length - 1
                                        ? "bg-green-600"
                                        : "bg-gray-300"
                                        }`}
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Labels */}
                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                        {hours.map((hour) => (
                            <span key={hour}>{hour}</span>
                        ))}
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="space-y-5">

                    <StatCard
                        label="ACTIVE USERS"
                        value="12,842"
                        delta="+8.4%"
                        deltaSub="vs 1h ago"
                        icon={<Users2 size={20} />}
                        barColor="bg-green-500"
                        barPct={75}
                    />

                    <StatCard
                        label="NETWORK LOAD"
                        value="4.2"
                        unit="GB/s"
                        delta="Normal"
                        deltaSub="latency 24ms"
                        icon={<Network size={20} />}
                        barColor="bg-blue-500"
                        barPct={60}
                    />

                </div>
            </div>

            {/* Clusters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {clusters.map((cluster) => (
                    <div
                        key={cluster.name}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4"
                    >

                        <div
                            className={`h-12 w-12 rounded-xl flex items-center justify-center ${cluster.ok
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {cluster.ok ? (
                                <Server size={22} />
                            ) : (
                                <AlertTriangle size={22} />
                            )}
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-500">
                                {cluster.name}
                            </p>

                            <h3
                                className={`text-lg font-semibold ${cluster.ok
                                    ? "text-black"
                                    : "text-red-600"
                                    }`}
                            >
                                {cluster.status}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table + Devices */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Responsive Table */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-semibold">
                            Live Activity Feed
                        </h2>

                        <button
                            type="button"
                            className="text-green-600 font-medium hover:underline"
                        >
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full border-collapse">

                            <thead>
                                <tr className="border-b border-gray-200 text-left">

                                    <th className="py-4 px-3 text-xs font-bold text-gray-500">
                                        USER
                                    </th>

                                    <th className="py-4 px-3 text-xs font-bold text-gray-500">
                                        EVENT
                                    </th>

                                    <th className="py-4 px-3 text-xs font-bold text-gray-500">
                                        AMOUNT
                                    </th>

                                    <th className="py-4 px-3 text-xs font-bold text-gray-500">
                                        LOCATION
                                    </th>

                                    <th className="py-4 px-3 text-xs font-bold text-gray-500">
                                        STATUS
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {activity.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                                    >

                                        <td className="py-4 px-3">

                                            <div className="flex items-center gap-3">

                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                                                    {item.user
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </div>

                                                <span className="font-medium whitespace-nowrap">
                                                    {item.user}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="py-4 px-3 whitespace-nowrap">
                                            {item.event}
                                        </td>

                                        <td
                                            className={`py-4 px-3 font-semibold whitespace-nowrap ${item.amountColor}`}
                                        >
                                            {item.amount}
                                        </td>

                                        <td className="py-4 px-3 text-gray-500 whitespace-nowrap">
                                            {item.location}
                                        </td>

                                        <td className="py-4 px-3">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${item.statusClass}`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                </div>

                {/* Device Distribution */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

                    <h2 className="text-xl font-semibold mb-6">
                        Device Distribution
                    </h2>

                    <div className="space-y-5">

                        {devices.map((device) => (
                            <div key={device.label}>

                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">
                                        {device.label}
                                    </span>

                                    <span className="font-semibold">
                                        {device.pct}%
                                    </span>
                                </div>

                                <div className="h-3 rounded-full bg-gray-200 overflow-hidden">

                                    <div
                                        className={`h-full ${device.color}`}
                                        style={{
                                            width: `${device.pct}%`,
                                        }}
                                    />

                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 border border-gray-200 rounded-xl p-5">

                        <p className="text-xs font-bold text-gray-500">
                            QUICK ACTION
                        </p>

                        <p className="mt-2 text-sm text-gray-700">
                            Optimize assets for mobile viewport density?
                        </p>

                        <button
                            type="button"
                            className="w-full mt-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                        >
                            Start Optimization
                        </button>

                    </div>
                </div>
            </div>
        </main>
    );
}

function StatCard({ label, value, unit, delta, deltaSub, icon, barColor, barPct }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div className="text-xs font-bold text-gray-500">
                    {label}
                </div>

                {icon}

            </div>

            <div className="mt-4 flex items-end gap-2">

                <h2 className="text-4xl font-bold">
                    {value}
                </h2>

                {unit && (
                    <span className="text-gray-500 mb-1">
                        {unit}
                    </span>
                )}

            </div>

            <div className="mt-2 text-sm">

                <span className="font-semibold text-green-600">
                    {delta}
                </span>

                <span className="text-gray-500 ml-1">
                    {deltaSub}
                </span>

            </div>

            <div className="mt-5 h-2 rounded-full bg-gray-200 overflow-hidden">

                <div
                    className={`h-full ${barColor}`}
                    style={{ width: `${barPct}%` }}
                />

            </div>
        </div>
    );
}