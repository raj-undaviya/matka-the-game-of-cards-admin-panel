export const riskStats = {
  averageRisk: 24.8,
  riskDelta: "+3.2%",
  highRiskAlerts: 12,
  blockedIps: 1402,
};

export const FLAGGED_ACTIVITY_PAGE_SIZE = 10;

export const flaggedActivity = [
  {
    index: "#821",
    user: "j.valdes_22",
    userId: "ID: 992-AX2",
    reason: "MULTI-ACCOUNTING",
    reasonType: "warning", // Orange
    riskScore: 92,
    location: "Sofia, BG (84.12.99.1)",
    timestamp: "2 mins ago",
  },
  {
    index: "#449",
    user: "crypto_whale9",
    userId: "ID: 110-PQ1",
    reason: "SUSPICIOUS PATTERN",
    reasonType: "danger", // Red
    riskScore: 88,
    location: "Moscow, RU (92.1.2.14)",
    timestamp: "14 mins ago",
  },
  {
    index: "#102",
    user: "lucky_strike",
    userId: "ID: 554-ZZ3",
    reason: "PROXY/VPN USE",
    reasonType: "info", // Blue or gold/yellow
    riskScore: 64,
    location: "Amsterdam, NL (104.22.1.0)",
    timestamp: "1 hour ago",
  },
];

export const threatDistribution = [
  {
    name: "Account Takeover",
    value: 42,
    color: "bg-red-600",
  },
  {
    name: "Bonus Abuse",
    value: 28,
    color: "bg-blue-500",
  },
  {
    name: "Money Laundering Pattern",
    value: 15,
    color: "bg-amber-500",
  },
];

export const recentMitigations = [
  {
    id: 1,
    title: "KYC Approved for #4412",
    subtitle: "Processed by Automated Guardian Engine • 10m ago",
    type: "success", // Green check icon
  },
  {
    id: 2,
    title: "Permanent Ban: IP Range 194.xx",
    subtitle: "Manual action by Admin_Sarah • 42m ago",
    type: "danger", // Red slash icon
  },
  {
    id: 3,
    title: "Mandatory Reset: 12 Flagged Users",
    subtitle: "Bulk security trigger • 1h 05m ago",
    type: "warning", // Orange sync icon
  },
];
