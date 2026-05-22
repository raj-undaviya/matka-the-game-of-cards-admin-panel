export const GAMES_PAGE_SIZE = 4;
export const TOTAL_ACTIVE_ARENAS = 42;

export const gamesStats = [
  {
    label: "Total Active Arenas",
    value: "42",
    delta: "+3%",
    deltaSub: "vs last hour",
    deltaColor: "primary",
    barPct: 72,
    barColor: "bg-green-500",
  },
  {
    label: "Total Pool Value",
    value: "$1.2M",
    delta: "+$12k",
    deltaSub: "(24h)",
    deltaColor: "primary",
    barPct: 65,
    barColor: "bg-blue-500",
  },
  {
    label: "Initializing Status",
    value: "04",
    delta: "Pending handshake",
    deltaSub: "",
    deltaColor: "info",
    barPct: 40,
    barColor: "bg-violet-500",
  },
  {
    label: "Peak Concurrent Users",
    value: "8.9k",
    delta: "-1.2%",
    deltaSub: "spike",
    deltaColor: "danger",
    barPct: 88,
    barColor: "bg-red-400",
  },
];

export const arenaInstances = [
  {
    id: "IV-8821-X",
    name: "Ironclad Valley",
    icon: "castle",
    status: "RUNNING",
    poolSize: "$284,200",
    investors: 1240,
    load: 68,
  },
  {
    id: "SR-4410-A",
    name: "Solaris Ridge",
    icon: "sun",
    status: "RUNNING",
    poolSize: "$512,800",
    investors: 2104,
    load: 94,
  },
  {
    id: "NF-2093-B",
    name: "Neon Flux Arena",
    icon: "zap",
    status: "INITIALIZING",
    poolSize: "$0",
    investors: 0,
    load: 12,
  },
  {
    id: "DW-7732-C",
    name: "Deepwater Vault",
    icon: "waves",
    status: "RUNNING",
    poolSize: "$128,450",
    investors: 892,
    load: 45,
  },
  {
    id: "CR-1102-M",
    name: "Crimson Reach",
    icon: "flame",
    status: "CLOSED",
    poolSize: "$0",
    investors: 0,
    load: 0,
  },
  {
    id: "ST-5590-K",
    name: "Stormgate Keep",
    icon: "shield",
    status: "RUNNING",
    poolSize: "$198,720",
    investors: 654,
    load: 52,
  },
];

export const deploymentRegions = [
  { region: "US-EAST-1", latency: 24, status: "Healthy", statusType: "running" },
  { region: "EU-CENTRAL-1", latency: 38, status: "Healthy", statusType: "running" },
  { region: "AP-SOUTH-1", latency: 62, status: "Warming", statusType: "initializing" },
];

export const liquidityHealth = {
  settlementReserve: { label: "Settlement Reserve", value: "$4.82M", pct: 82 },
  exposureLimit: { label: "Exposure Limit", value: "$10.0M", pct: 48 },
};

export const arenaRiskProfile = {
  title: "RISK PROFILE: STABLE",
  message:
    "Historical volatility within acceptable bounds. No manual intervention required for current arena load.",
};
