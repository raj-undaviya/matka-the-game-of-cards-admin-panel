// Map the admin dashboard data to wallet stat cards format
export const mapWalletStatsResponse = (data = {}) => {
  const stats = data.stat_cards || {};

  const totalLiquidity = stats.total_wallet_balance?.display || stats.revenue?.display || "₹0";
  const revenue = stats.revenue?.display || "₹0";
  const deposits = stats.total_deposits?.display || "₹0";
  const reserveRatioPct = stats.reserve_ratio?.value || 0;

  return [
    {
      label: "TOTAL PLATFORM LIQUIDITY",
      value: totalLiquidity,
      delta: stats.total_wallet_balance?.change || "",
      deltaSub: "Updated just now",
      iconName: "wallet",
      tone: "emerald",
    },
    {
      label: "REVENUE FROM FEES",
      value: revenue,
      delta: stats.revenue?.change || "",
      deltaSub: "Platform earnings",
      iconName: "trend",
      tone: "blue",
    },
    {
      label: "PLAYER DEPOSITS",
      value: deposits,
      delta: stats.total_deposits?.change || "",
      deltaSub: "Active player balances",
      iconName: "deposit",
      tone: "amber",
    },
    {
      label: "RESERVE RATIO",
      value: stats.reserve_ratio?.display || "100%",
      delta: "Healthy",
      deltaSub: "Treasury coverage",
      iconName: "shield",
      tone: "slate",
      barPct: reserveRatioPct,
    },
  ];
};

// Map admin dashboard data to wallet mini metrics
export const mapWalletMetricsResponse = (data = {}) => {
  const stats = data.stat_cards || {};
  const totalTransactions = stats.total_transactions?.display || "0";
  const activeRounds = stats.active_rounds?.display || "0";
  const activeSessions = stats.active_sessions?.display || "0";

  return [
    { label: "TOTAL TRANSACTIONS", value: totalTransactions, iconName: "receipt" },
    { label: "DAILY VOLUME", value: stats.daily_volume?.display || "₹0", iconName: "volume" },
    { label: "ACTIVE SESSIONS", value: activeSessions, iconName: "contest" },
  ];
};

export const mapTransactionsResponse = (data = []) => {
  const typeMap = {
    deposit: "Deposit",
    withdraw: "Withdrawal",
    win_credit: "Prizing",
    bet_debit: "Entry Fee",
    refund: "Refund",
  };

  const positiveTypes = ["deposit", "win_credit", "refund"];

  return (Array.isArray(data) ? data : []).map((tx) => {
    let formattedTime = "—";
    if (tx.created_at) {
      try {
        const d = new Date(tx.created_at);
        formattedTime = d.toISOString().replace("T", " ").substring(0, 19);
      } catch {
        formattedTime = tx.created_at;
      }
    }

    const type = typeMap[tx.transaction_type] || "Refund";
    const amountTone = positiveTypes.includes(tx.transaction_type)
      ? "positive"
      : tx.transaction_type === "withdraw" || tx.transaction_type === "bet_debit"
      ? "negative"
      : "neutral";

    return {
      id: tx.id || `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: formattedTime,
      type,
      playerId: tx.username ? `@${tx.username}` : "@unknown",
      amount: tx.amount || "₹0",
      amountTone,
      status: tx.status ? tx.status.charAt(0).toUpperCase() + tx.status.slice(1) : "Settled",
    };
  });
};

export const mapWithdrawalsResponse = (data = []) => {
  return (Array.isArray(data) ? data : []).map((wr) => {
    let formattedTime = "—";
    if (wr.requested_at) {
      try {
        const d = new Date(wr.requested_at);
        formattedTime = d.toISOString().replace("T", " ").substring(0, 19);
      } catch {
        formattedTime = wr.requested_at;
      }
    }

    return {
      id: wr.id,
      timestamp: formattedTime,
      type: "Withdrawal",
      playerId: wr.wallet?.user?.username ? `@${wr.wallet.user.username}` : "@unknown",
      amount: `₹${wr.amount}`,
      amountRaw: Number(wr.amount) || 0,
      mode: wr.mode || "upi",
      upiId: wr.upi_id || "",
      accountNumber: wr.account_number || "",
      ifscCode: wr.ifsc_code || "",
      accountHolder: wr.account_holder || "",
      status: wr.status ? wr.status.charAt(0).toUpperCase() + wr.status.slice(1) : "Pending",
      note: wr.note || "",
    };
  });
};
