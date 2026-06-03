import { kpiCards } from "@/data/dashboarddata";

const clampPercent = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(100, Math.round(number)));
};

const splitChange = (change) => {
  if (!change) return { delta: "", deltaSub: "" };

  const [delta, ...rest] = String(change).trim().split(/\s+/);
  return {
    delta,
    deltaSub: rest.join(" "),
  };
};

const getTrendPositive = (trend) => String(trend || "up").toLowerCase() !== "down";

const mapStatCards = (statCards = {}) => {
  const cardConfig = [
    ["total_users", kpiCards[0]],
    ["active_sessions", kpiCards[1]],
    ["revenue", kpiCards[2]],
    ["jackpot_pool", kpiCards[3]],
  ];

  return cardConfig.map(([key, fallback]) => {
    const stat = statCards[key] || {};
    const { delta, deltaSub } = splitChange(stat.change);

    return {
      ...fallback,
      value: stat.display ?? "-",
      delta,
      deltaSub,
      barPct: undefined,
      deltaPositive: getTrendPositive(stat.trend),
    };
  });
};

const mapRevenueTelemetry = (telemetry = {}) => {
  const points = Array.isArray(telemetry.data) ? telemetry.data : [];
  const maxRevenue = Math.max(...points.map((point) => Number(point.revenue) || 0), 0);
  const bars = points.map((point) => {
    if (maxRevenue <= 0) return 4;
    return Math.max(4, clampPercent(((Number(point.revenue) || 0) / maxRevenue) * 100));
  });

  return {
    bars,
    hours: points
      .filter((_, index) => {
        const interval = Math.max(1, Math.floor(points.length / 5));
        return index % interval === 0;
      })
      .slice(0, 5)
      .map((point) => point.time),
    growth: telemetry.growth || "+0.0%",
    period: telemetry.period || "Last 24 hours",
  };
};

const mapTopGames = (games = []) =>
  (Array.isArray(games) ? games : []).map((game) => ({
    name: game.name || game.variation || "Untitled Game",
    players: Number(game.player_count ?? game.players ?? 0),
    revenue: game.revenue || "$0",
  }));

const mapClusters = (serverStatus = {}) =>
  (Array.isArray(serverStatus.clusters) ? serverStatus.clusters : []).map((cluster) => ({
    name: cluster.name,
    status: cluster.status
      ? String(cluster.status).charAt(0).toUpperCase() + String(cluster.status).slice(1)
      : "Unknown",
    ok: Boolean(cluster.healthy ?? cluster.ok),
  }));

const getAmountColor = (status = {}) => {
  const color = String(status.color || "").toLowerCase();
  if (color === "red") return "text-red-600";
  if (color === "yellow") return "text-amber-600";
  if (color === "green") return "text-green-600";
  return "text-gray-600";
};

const mapActivity = (recentActivity = []) =>
  (Array.isArray(recentActivity) ? recentActivity : []).map(
    (item, index) => ({
      id: item.id || item.timestamp || index,
      user: item.player || item.user || "Unknown",
      event: item.event || "Activity",
      amount: item.amount || "-",
      amountColor: getAmountColor(item.status),
      location: item.location || "-",
      status: item.status?.label || item.status || "PENDING",
    })
  );

const mapDevices = (distribution = {}) => {
  const entries = Array.isArray(distribution)
    ? distribution
    : Object.values(distribution).filter((value) => value && typeof value === "object" && "pct" in value);

  const colors = ["bg-green-500", "bg-blue-500", "bg-gray-400"];

  return entries.length
    ? entries.map((device, index) => ({
        label: device.label || `Device ${index + 1}`,
        pct: clampPercent(device.pct),
        color: colors[index] || "bg-gray-400",
      }))
    : [];
};

export const mapDashboardResponse = (payload) => {
  const data = payload?.data || payload || {};

  return {
    kpiCards: mapStatCards(data.stat_cards),
    revenue: mapRevenueTelemetry(data.revenue_telemetry),
    topGames: mapTopGames(data.top_performing_games),
    clusters: mapClusters(data.server_status),
    activity: mapActivity(data.recent_activity),
    devices: mapDevices(data.device_distribution),
  };
};
