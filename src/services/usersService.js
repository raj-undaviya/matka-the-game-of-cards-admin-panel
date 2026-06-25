export const mapUsersResponse = (data) => {
  if (!data) return {};

  const statCards = data.stat_cards || {};
  const userStats = [
    {
      label: "Total Players",
      value: statCards.total_players?.display || "0",
      delta: statCards.total_players?.change || "",
      deltaSub: "",
      deltaColor: statCards.total_players?.trend === "down" ? "danger" : "primary",
      highlight: false,
    },
    {
      label: "Active Now",
      value: statCards.active_now?.display || "0",
      delta: "Live",
      deltaSub: "",
      deltaColor: "primary",
      highlight: true,
    },
    {
      label: "Pending KYC",
      value: statCards.pending_kyc?.display || "0",
      delta: statCards.pending_kyc?.label || "Action Required",
      deltaSub: "",
      deltaColor: statCards.pending_kyc?.priority === "high" ? "info" : "primary",
    },
    {
      label: "Risk Alerts",
      value: statCards.risk_alerts?.display || "0",
      delta: statCards.risk_alerts?.label || "No Alerts",
      deltaSub: "",
      deltaColor: statCards.risk_alerts?.priority === "high" ? "danger" : "info",
    },
  ];

  const usersList = (data.users || []).map((user) => {
    const initials = user.username
      ? user.username
          .split(/[\s_-]+/)
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

    let registeredStr = "—";
    if (user.registered_at) {
      try {
        const d = new Date(user.registered_at);
        const options = { month: "short", day: "2-digit", year: "numeric" };
        const dateStr = d.toLocaleDateString("en-US", options);
        const timeStr = d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
        registeredStr = `${dateStr} · ${timeStr} UTC`;
      } catch (e) {
        registeredStr = user.registered_at;
      }
    }

    return {
      id: String(user.id),
      name: user.username || user.email || "Unknown",
      initials,
      registered: registeredStr,
      kycStatus: (user.kyc_status || "PENDING").toUpperCase(),
      balance: user.wallet_balance || "₹0",
      status: (user.account_status || "ACTIVE").toUpperCase(),
    };
  });

  const recentAdminActions = (data.recent_admin_actions || []).map((action, idx) => {
    let icon = "edit";
    if (action.icon === "lock" || action.icon === "x-circle" || action.icon === "alert-triangle") {
      icon = "lock";
    } else if (action.icon === "user" || action.icon === "check-circle") {
      icon = "user";
    }

    return {
      id: action.id || `action-${idx}`,
      icon,
      description: `${action.actor || "Admin"} ${action.action} (${action.username || "user"})`,
      reason: action.reason || "",
      time: action.time_ago || "some time ago",
    };
  });

  const shieldReport = data.risk_shield_report || {};
  const riskShieldReport = {
    kycComplianceRate: shieldReport.kyc_compliance_rate || 0,
    fraudScore: shieldReport.potential_fraud_score?.label || "Low (0)",
    urgentAlert: shieldReport.urgent_flags?.length
      ? {
          title: "Urgent Actions Required",
          message: shieldReport.urgent_flags.map((f) => f.message).join(" "),
        }
      : null,
  };

  return {
    userStats,
    users: usersList,
    recentAdminActions,
    riskShieldReport,
  };
};
