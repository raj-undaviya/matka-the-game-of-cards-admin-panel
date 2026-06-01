import PageContainer from "@/components/ui/PageContainer";
import WalletChartCard from "@/components/AdminWallet/WalletChartCard";
import WalletHeader from "@/components/AdminWallet/WalletHeader";
import WalletMetricStrip from "@/components/AdminWallet/WalletMetricStrip";
import WalletStatsRow from "@/components/AdminWallet/WalletStatsRow";
import WalletTransactionsTable from "@/components/AdminWallet/WalletTransactionsTable";

export default function AdminWalletPage() {
  return (
    <PageContainer>
      <WalletHeader />
      <WalletStatsRow />
      <WalletChartCard />
      <WalletMetricStrip />
      <WalletTransactionsTable />
    </PageContainer>
  );
}
