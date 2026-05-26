export const jackpotStats = {
  poolAmount: "$242,508,122.00",
  poolLabel: "Active Global Pool",
  growthTrend: "+12.4%",
  targetAmount: "$250.0M",
  totalEntries: "1.84M",
  avgContribution: "$0.14",
  trendValues: [35, 45, 25, 60, 80, 50, 95], // height values for the 7-day trend bar graph
  uniquePlayers: "42,801",
  avgPayout: "$18,402",
  burnRate: "0.08%",
  reserveRatio: "114%",
};

// Target date is exactly 5 hours from the user's current execution time
export const countdownTarget = new Date(Date.now() + 5 * 60 * 60 * 1000);

export const recentWinners = [
  {
    id: "w-001",
    user: "User_88219",
    timestamp: "Mar 24 • 14:20:05",
    prize: "$1,240,000",
    game: "TEXAS HOLD'EM",
    status: "Verified",
  },
  {
    id: "w-002",
    user: "LuckyAlpha_9",
    timestamp: "Mar 24 • 09:12:44",
    prize: "$890,200",
    game: "BLACKJACK PRO",
    status: "Verified",
  },
  {
    id: "w-003",
    user: "KingXanax",
    timestamp: "Mar 23 • 18:05:12",
    prize: "$2,100,550",
    game: "SLOTS GLOBAL",
    status: "Verified",
  },
];

export const jackpotConfig = {
  houseEdgeContribution: 2.50,
  minEntry: "1.00",
  seedAmount: "50,000.00",
  maxPayoutMultiplier: "10.00",
  drawFrequency: "24",
  autoSeedEnabled: true,
};
