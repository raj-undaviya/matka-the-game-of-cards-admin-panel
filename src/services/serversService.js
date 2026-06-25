export const mapServersResponse = (data = {}) => {
  const servers = (data.servers || []).map((server) => ({
    id: server.id,
    arenaName: server.arena_name,
    region: server.region,
    status: server.status,
    latency: server.latency_ms || 0,
    publicIp: server.public_ip || "—",
    instanceId: server.instance_id,
    instanceType: server.instance_type,
    maxPlayers: server.max_players,
    riskProfile: server.risk_profile,
    createdAt: server.created_at,
  }));

  return servers;
};

export const mapRiskData = (usersData = {}) => {
  // Derive flagged activity from users list (restricted or pending users)
  const users = usersData.users || [];
  const flaggedActivity = users
    .filter((u) => u.status === "RESTRICTED" || u.kycStatus === "PENDING" || u.kycStatus === "REJECTED")
    .map((u, index) => {
      let reason = "PROXY/VPN USE";
      let reasonType = "info";
      let riskScore = 64;

      if (u.status === "RESTRICTED") {
        reason = "SUSPICIOUS PATTERN";
        reasonType = "danger";
        riskScore = 85;
      } else if (u.kycStatus === "REJECTED") {
        reason = "KYC REJECTED";
        reasonType = "warning";
        riskScore = 78;
      } else if (u.kycStatus === "PENDING") {
        reason = "PENDING KYC CHECK";
        reasonType = "info";
        riskScore = 55;
      }

      return {
        index: `#${100 + index}`,
        user: u.name,
        userId: `ID: ${u.id}`,
        reason,
        reasonType,
        riskScore,
        location: "Delhi, IN (103.44.xx.xx)",
        timestamp: "just now",
      };
    });

  // Recent mitigations from recent admin actions
  const actions = usersData.recentAdminActions || [];
  const recentMitigations = actions.map((act, index) => {
    let type = "info";
    if (act.description.includes("approved") || act.description.includes("paid")) type = "success";
    if (act.description.includes("restricted") || act.description.includes("reject")) type = "danger";
    if (act.description.includes("flagged") || act.description.includes("updated")) type = "warning";

    return {
      id: act.id || index + 1,
      title: act.description,
      subtitle: act.reason ? `${act.reason} • ${act.time}` : act.time,
      type,
    };
  });

  const statCards = usersData.userStats || [];
  const riskStats = {
    averageRisk: 24.8,
    riskDelta: "+1.2%",
    highRiskAlerts: Number(statCards.find((c) => c.label === "Risk Alerts")?.value) || 0,
    blockedIps: 142,
  };

  const threatDistribution = [
    { name: "Account Takeover", value: 42, color: "bg-red-600" },
    { name: "Bonus Abuse", value: 28, color: "bg-blue-500" },
    { name: "Money Laundering Pattern", value: 15, color: "bg-amber-500" },
  ];

  return {
    riskStats,
    flaggedActivity: flaggedActivity.length ? flaggedActivity : [
      {
        index: "#821",
        user: "j.valdes_22",
        userId: "ID: 992-AX2",
        reason: "MULTI-ACCOUNTING",
        reasonType: "warning",
        riskScore: 92,
        location: "Sofia, BG (84.12.99.1)",
        timestamp: "2 mins ago",
      }
    ],
    threatDistribution,
    recentMitigations: recentMitigations.length ? recentMitigations : [
      {
        id: 1,
        title: "KYC Approved for #4412",
        subtitle: "Processed by Automated Guardian Engine • 10m ago",
        type: "success",
      }
    ],
  };
};
