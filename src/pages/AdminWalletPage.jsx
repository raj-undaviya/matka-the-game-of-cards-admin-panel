import { useEffect, useState, useCallback } from "react";
import PageContainer from "@/components/ui/PageContainer";
import WalletChartCard from "@/components/AdminWallet/WalletChartCard";
import WalletHeader from "@/components/AdminWallet/WalletHeader";
import WalletMetricStrip from "@/components/AdminWallet/WalletMetricStrip";
import WalletStatsRow from "@/components/AdminWallet/WalletStatsRow";
import WalletTransactionsTable from "@/components/AdminWallet/WalletTransactionsTable";
import WalletWithdrawalsTable from "@/components/AdminWallet/WalletWithdrawalsTable";
import Tabs from "@/components/shared/Tabs";
import walletApi from "@/api/walletApi";
import {
  mapWalletStatsResponse,
  mapWalletMetricsResponse,
  mapTransactionsResponse,
} from "@/services/walletService";

export default function AdminWalletPage() {
  const [loading, setLoading] = useState(true);
  const [walletStats, setWalletStats] = useState(null);
  const [walletMetrics, setWalletMetrics] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [activeTab, setActiveTab] = useState("ledger");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [dashRes, txRes] = await Promise.allSettled([
        walletApi.getDashboard(),
        walletApi.getTransactions(),
      ]);

      if (dashRes.status === "fulfilled") {
        const dashData = dashRes.value.data;
        setWalletStats(mapWalletStatsResponse(dashData));
        setWalletMetrics(mapWalletMetricsResponse(dashData));
      }

      if (txRes.status === "fulfilled") {
        const txData = txRes.value.data;
        const txList = Array.isArray(txData) ? txData : (txData?.results || []);
        setTransactions(mapTransactionsResponse(txList));
      }
    } catch (err) {
      console.error("Failed to load wallet data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageContainer>
      <WalletHeader />
      <WalletStatsRow stats={walletStats} />
      <WalletChartCard />
      <WalletMetricStrip metrics={walletMetrics} />
      
      <div className="mt-8 mb-4">
        <Tabs
          tabs={[
            { id: "ledger", label: "Platform Ledger" },
            { id: "withdrawals", label: "Withdrawal Requests" }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {activeTab === "ledger" ? (
        <WalletTransactionsTable transactions={transactions} loading={loading} />
      ) : (
        <WalletWithdrawalsTable />
      )}
    </PageContainer>
  );
}
