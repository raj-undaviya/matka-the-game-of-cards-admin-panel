import { useState, useEffect, useCallback } from "react";
import PageContainer from "@/components/ui/PageContainer";
import GamesHeader from "@/components/AdminGames/GamesHeader";
import GamesStatsRow from "@/components/AdminGames/GamesStatsRow";
import GamesTableSection from "@/components/AdminGames/GamesTableSection";
import GamesSidebarWidgets from "@/components/AdminGames/GamesSidebarWidgets";
import DeployInstanceModal from "@/components/AdminGames/DeployInstanceModal";
import gamesApi from "@/api/gamesApi";
import { mapGamesResponse } from "@/services/gamesService";

export default function AdminGamesPage() {
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState(null);

  const fetchGamesData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await gamesApi.getGamesDashboard();
      setGamesData(mapGamesResponse(res.data));
    } catch (err) {
      console.error("Failed to load games data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGamesData();
  }, [fetchGamesData]);

  const handleDeploySuccess = () => {
    setDeployModalOpen(false);
    fetchGamesData();
  };

  return (
    <>
      <PageContainer>
        <GamesHeader onDeployClick={() => setDeployModalOpen(true)} />
        <GamesStatsRow stats={gamesData?.gamesStats} loading={loading} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <GamesTableSection arenas={gamesData?.arenaInstances} loading={loading} />
          </div>
          <GamesSidebarWidgets
            regions={gamesData?.deploymentRegions}
            health={gamesData?.liquidityHealth}
            riskProfile={gamesData?.arenaRiskProfile}
            loading={loading}
          />
        </div>
      </PageContainer>

      <DeployInstanceModal
        open={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
        onDeploy={handleDeploySuccess}
      />
    </>
  );
}
