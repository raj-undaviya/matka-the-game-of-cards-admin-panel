import PageContainer from "@/components/ui/PageContainer";
import GamesHeader from "@/components/AdminGames/GamesHeader";
import GamesStatsRow from "@/components/AdminGames/GamesStatsRow";
import GamesTableSection from "@/components/AdminGames/GamesTableSection";
import GamesSidebarWidgets from "@/components/AdminGames/GamesSidebarWidgets";

export default function AdminGamesPage() {
  return (
    <PageContainer>
      <GamesHeader />
      <GamesStatsRow />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <GamesTableSection />
        </div>
        <GamesSidebarWidgets />
      </div>
    </PageContainer>
  );
}
