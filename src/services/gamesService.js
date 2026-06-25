const iconMap = {
  V1: "castle",
  V2: "sun",
  V3: "zap",
  V4: "waves",
  V5: "shield",
};

export const mapGamesResponse = (data) => {
  if (!data) return {};

  const stats = data.stat_cards || {};
  const gamesStats = [
    {
      label: "Total Active Arenas",
      value: stats.total_active_arenas?.display || "0",
      delta: stats.total_active_arenas?.change || "",
      deltaSub: "",
      deltaColor: stats.total_active_arenas?.trend === "down" ? "danger" : "primary",
      barPct: 70,
      barColor: "bg-green-500",
    },
    {
      label: "Total Pool Value",
      value: stats.total_pool_value?.display || "₹0",
      delta: stats.total_pool_value?.change || "",
      deltaSub: "",
      deltaColor: "primary",
      barPct: 65,
      barColor: "bg-blue-500",
    },
    {
      label: "Initializing Status",
      value: stats.initializing_status?.display || "00",
      delta: stats.initializing_status?.label || "Pending handshake",
      deltaSub: "",
      deltaColor: stats.initializing_status?.color === "purple" ? "info" : "primary",
      barPct: stats.initializing_status?.value ? Math.min(100, stats.initializing_status.value * 25) : 10,
      barColor: "bg-violet-500",
    },
    {
      label: "Peak Concurrent Users",
      value: stats.peak_concurrent_users?.display || "0",
      delta: stats.peak_concurrent_users?.change || "",
      deltaSub: "",
      deltaColor: stats.peak_concurrent_users?.trend === "down" ? "danger" : "primary",
      barPct: 85,
      barColor: "bg-red-400",
    },
  ];

  const arenaInstances = (data.arena_instances || []).map((arena) => ({
    id: arena.arena_id || arena.id,
    uuid: arena.id,
    name: arena.arena_name,
    icon: iconMap[arena.variation] || "flame",
    status: arena.status_badge?.label || arena.status || "RUNNING",
    poolSize: arena.pool_size || "₹0",
    investors: arena.investor_count || 0,
    load: arena.load_pct || 0,
  }));

  const clusters = data.global_deployment?.clusters || [];
  const deploymentRegions = clusters.map((cluster) => {
    let statusType = "running";
    if (cluster.status === "warming") statusType = "initializing";
    else if (cluster.status === "degraded") statusType = "closed";

    return {
      region: cluster.name,
      latency: cluster.latency_ms || 0,
      status: cluster.status_badge?.label || "Healthy",
      statusType,
    };
  });

  const liq = data.liquidity_health || {};
  const liquidityHealth = {
    settlementReserve: {
      label: "Settlement Reserve",
      value: liq.settlement_reserve?.display || "₹0",
      pct: liq.reserve_pct || 100,
    },
    exposureLimit: {
      label: "Exposure Limit",
      value: liq.exposure_limit?.display || "₹0",
      pct: Math.max(0, 100 - (liq.reserve_pct || 100)),
    },
  };

  const riskProfile = liq.risk_profile || {};
  const arenaRiskProfile = {
    title: riskProfile.label || "RISK PROFILE: STABLE",
    message: riskProfile.description || "Historical volatility within bounds.",
  };

  return {
    gamesStats,
    arenaInstances,
    deploymentRegions,
    liquidityHealth,
    arenaRiskProfile,
  };
};
