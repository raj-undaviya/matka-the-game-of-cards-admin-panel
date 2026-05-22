import GlobalDeployment from "@/components/AdminGames/GlobalDeployment";
import LiquidityHealth from "@/components/AdminGames/LiquidityHealth";
import ArenaRiskProfile from "@/components/AdminGames/ArenaRiskProfile";

export default function GamesSidebarWidgets() {
  return (
    <div className="space-y-6">
      <GlobalDeployment />
      <LiquidityHealth />
      <ArenaRiskProfile />
    </div>
  );
}
