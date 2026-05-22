export const USERS_PAGE_SIZE = 5;

export const userStats = [
  {
    label: "Total Players",
    value: "12,842",
    delta: "+8%",
    deltaSub: "vs last month",
    deltaColor: "primary",
    highlight: false,
  },
  {
    label: "Active Now",
    value: "1,402",
    delta: "Live",
    deltaSub: "",
    deltaColor: "primary",
    highlight: true,
  },
  {
    label: "Pending KYC",
    value: "48",
    delta: "Action Required",
    deltaSub: "",
    deltaColor: "info",
  },
  {
    label: "Risk Alerts",
    value: "3",
    delta: "High Priority",
    deltaSub: "",
    deltaColor: "danger",
  },
];

export const users = [
  {
    id: "PX-82910",
    name: "Alex Mercer",
    initials: "AM",
    registered: "May 12, 2024 · 14:22 UTC",
    kycStatus: "VERIFIED",
    balance: "$4,280.50 USD",
    status: "ACTIVE",
  },
  {
    id: "PX-82911",
    name: "Priya Sharma",
    initials: "PS",
    registered: "May 10, 2024 · 09:15 UTC",
    kycStatus: "VERIFIED",
    balance: "$12,450.00 USD",
    status: "ACTIVE",
  },
  {
    id: "PX-82912",
    name: "Marcus Chen",
    initials: "MC",
    registered: "May 08, 2024 · 18:40 UTC",
    kycStatus: "PENDING",
    balance: "$0.00 USD",
    status: "PENDING",
  },
  {
    id: "PX-82919",
    name: "Elena Vogt",
    initials: "EV",
    registered: "Apr 28, 2024 · 11:05 UTC",
    kycStatus: "VERIFIED",
    balance: "$45,800.00 USD",
    status: "RESTRICTED",
  },
  {
    id: "PX-82920",
    name: "James Okonkwo",
    initials: "JO",
    registered: "Apr 15, 2024 · 07:30 UTC",
    kycStatus: "UNVERIFIED",
    balance: "$120.00 USD",
    status: "RESTRICTED",
  },
  {
    id: "PX-82925",
    name: "Sofia Martins",
    initials: "SM",
    registered: "May 18, 2024 · 16:55 UTC",
    kycStatus: "VERIFIED",
    balance: "$3,120.50 USD",
    status: "ACTIVE",
  },
];

export const recentAdminActions = [
  {
    id: "A-001",
    icon: "lock",
    description: "Admin_04 restricted player #PX-82919",
    reason: "Suspicious withdrawal pattern",
    time: "2 hours ago",
  },
  {
    id: "A-002",
    icon: "user",
    description: "Admin_02 approved KYC for #PX-82911",
    reason: "Documents verified",
    time: "4 hours ago",
  },
  {
    id: "A-003",
    icon: "edit",
    description: "Admin_01 updated balance limit for #PX-82910",
    reason: "VIP tier upgrade",
    time: "6 hours ago",
  },
  {
    id: "A-004",
    icon: "lock",
    description: "Admin_04 flagged player #PX-82920",
    reason: "Multi-accounting detected",
    time: "1 day ago",
  },
];

export const riskShieldReport = {
  kycComplianceRate: 98.2,
  fraudScore: "Low (12)",
  urgentAlert: {
    title: "Urgent Actions Required",
    message:
      "3 accounts flagged for multi-accounting in the last 24 hours. Review before next payout cycle.",
  },
};

export const statusFilterOptions = ["All Statuses", "Active", "Restricted", "Pending"];
export const kycFilterOptions = ["KYC: All", "KYC: Verified", "KYC: Pending", "KYC: Unverified"];
