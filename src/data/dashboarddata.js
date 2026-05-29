export const kpiCards = [
  {
    label: "TOTAL USERS",
    value: "48,291",
    delta: "+12.4%",
    deltaSub: "vs last month",
    barPct: 72,
    barColor: "bg-green-500",
    iconName: "Users",
  },
  {
    label: "ACTIVE SESSIONS",
    value: "3,842",
    delta: "+5.1%",
    deltaSub: "live now",
    barPct: 58,
    barColor: "bg-blue-500",
    iconName: "Activity",
  },
  {
    label: "REVENUE",
    value: "$284K",
    delta: "+14.2%",
    deltaSub: "this week",
    barPct: 85,
    barColor: "bg-emerald-500",
    iconName: "DollarSign",
  },
  {
    label: "JACKPOT POOL",
    value: "$1.2M",
    delta: "+2.8%",
    deltaSub: "global mega pool",
    barPct: 90,
    barColor: "bg-amber-500",
    iconName: "Trophy",
  },
];

export const revenueBars = [22, 35, 30, 42, 55, 50, 38, 65, 72, 8, 78, 12, 95];

export const revenueHours = [
  "08:00 AM",
  "12:00 PM",
  "04:00 PM",
  "08:00 PM",
  "12:00 AM",
];

export const OVERVIEW_TABLE_ROW_LIMIT = 5;

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
  },
  {
    user: "K-Gamer_99",
    event: "New Registration",
    amount: "—",
    amountColor: "text-gray-500",
    location: "South Korea",
    status: "PENDING",
  },
  {
    user: "Shadow_X",
    event: "Withdrawal",
    amount: "$4,800.00",
    amountColor: "text-red-600",
    location: "Germany",
    status: "FLAGGED",
  },
  {
    user: "Lara_Craft",
    event: "Store Purchase",
    amount: "$45.99",
    amountColor: "text-green-600",
    location: "Brazil",
    status: "COMPLETED",
  },
];

export const devices = [
  { label: "Mobile Devices", pct: 64, color: "bg-green-500" },
  { label: "Desktop Web", pct: 28, color: "bg-blue-500" },
  { label: "Consoles", pct: 8, color: "bg-gray-400" },
];

export const topGames = [
  { name: "Royal Slots", players: 1240, revenue: "$42.1K" },
  { name: "Mega Dice", players: 892, revenue: "$28.4K" },
  { name: "Lucky Wheel", players: 654, revenue: "$19.2K" },
];
