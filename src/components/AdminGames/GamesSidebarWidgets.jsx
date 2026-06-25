import GlobalDeployment from "@/components/AdminGames/GlobalDeployment";
import LiquidityHealth from "@/components/AdminGames/LiquidityHealth";
import ArenaRiskProfile from "@/components/AdminGames/ArenaRiskProfile";

export default function GamesSidebarWidgets({ regions, health, riskProfile, loading }) {
  return (
    <div className="space-y-6">
      <GlobalDeployment regions={regions} loading={loading} />
      <LiquidityHealth health={health} loading={loading} />
      <ArenaRiskProfile riskProfile={riskProfile} loading={loading} />
    </div>
  );
}
