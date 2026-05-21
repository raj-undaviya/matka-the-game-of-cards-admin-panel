// ─────────────────────────────────────────────
//  dashboardData.js  –  single source of truth
// ─────────────────────────────────────────────

export const revenueBars = [22, 35, 30, 42, 55, 50, 38, 65, 72, 8, 78, 12, 95];

export const revenueHours = [
    "08:00 AM",
    "12:00 PM",
    "04:00 PM",
    "08:00 PM",
    "12:00 AM",
];

export const statCards = [
    {
        label: "ACTIVE USERS",
        value: "12,842",
        delta: "+8.4%",
        deltaSub: "vs 1h ago",
        iconName: "Users2",
        barColor: "bg-green-500",
        barPct: 75,
    },
    {
        label: "NETWORK LOAD",
        value: "4.2",
        unit: "GB/s",
        delta: "Normal",
        deltaSub: "latency 24ms",
        iconName: "Network",
        barColor: "bg-blue-500",
        barPct: 60,
    },
];

export const clusters = [
    { name: "NA-WEST CLUSTER", status: "Online", ok: true },
    { name: "EU-CENTRAL CLUSTER", status: "Online", ok: true },
    { name: "ASIA-SOUTH CLUSTER", status: "Online", ok: true },
    { name: "DB-REPLICA-04", status: "Degraded", ok: false },
];

export const activity = [
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

export const devices = [
    { label: "Mobile Devices", pct: 64, color: "bg-green-500" },
    { label: "Desktop Web", pct: 28, color: "bg-blue-500" },
    { label: "Consoles", pct: 8, color: "bg-gray-400" },
];