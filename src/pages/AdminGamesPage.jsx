import { useState } from "react";
import PageContainer from "@/components/ui/PageContainer";
import GamesHeader from "@/components/AdminGames/GamesHeader";
import GamesStatsRow from "@/components/AdminGames/GamesStatsRow";
import GamesTableSection from "@/components/AdminGames/GamesTableSection";
import GamesSidebarWidgets from "@/components/AdminGames/GamesSidebarWidgets";
import DeployInstanceModal from "@/components/AdminGames/DeployInstanceModal";

export default function AdminGamesPage() {
  const [deployModalOpen, setDeployModalOpen] = useState(false);

  return (
    <>
      <PageContainer>
        <GamesHeader onDeployClick={() => setDeployModalOpen(true)} />
        <GamesStatsRow />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <GamesTableSection />
          </div>
          <GamesSidebarWidgets />
        </div>
      </PageContainer>

      <DeployInstanceModal
        open={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
      />
    </>
  );
}
