import { useState, useEffect, useCallback } from "react";
import PageContainer from "@/components/ui/PageContainer";
import GamesHeader from "@/components/AdminGames/GamesHeader";
import GamesStatsRow from "@/components/AdminGames/GamesStatsRow";
import GamesTableSection from "@/components/AdminGames/GamesTableSection";
import GlobalDeployment from "@/components/AdminGames/GlobalDeployment";
import LiquidityHealth from "@/components/AdminGames/LiquidityHealth";
import ArenaRiskProfile from "@/components/AdminGames/ArenaRiskProfile";
import DeployInstanceModal from "@/components/AdminGames/DeployInstanceModal";
import CreateGameModal from "@/components/AdminGames/CreateGameModal";
import CreatePoolModal from "@/components/AdminGames/CreatePoolModal";
import PoolLeaderboardModal from "@/components/AdminGames/PoolLeaderboardModal";
import gamesApi from "@/api/gamesApi";
import { mapGamesResponse } from "@/services/gamesService";
import useToast from "@/utils/useToast";
import { Plus, Play, Award, Layers } from "lucide-react";

export default function AdminGamesPage() {
  const toast = useToast();
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [createPoolOpen, setCreatePoolOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [selectedPoolId, setSelectedPoolId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState(null);
  const [pools, setPools] = useState([]);
  const [poolsLoading, setPoolsLoading] = useState(false);

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

  const fetchPoolsList = useCallback(async () => {
    setPoolsLoading(true);
    try {
      const res = await gamesApi.getPoolsList();
      setPools(res.data);
    } catch (err) {
      console.error("Failed to load pools list:", err);
    } finally {
      setPoolsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGamesData();
    fetchPoolsList();
  }, [fetchGamesData, fetchPoolsList]);

  const handleDeploySuccess = () => {
    setDeployModalOpen(false);
    fetchGamesData();
  };

  const handleCreatePoolSuccess = () => {
    setCreatePoolOpen(false);
    fetchPoolsList();
  };

  const handleStartPool = async (poolId) => {
    try {
      await gamesApi.startPool(poolId);
      toast.success("Game Pool started successfully and Round 1 is open!");
      fetchPoolsList();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to start pool");
    }
  };

  const handleViewLeaderboard = (poolId) => {
    setSelectedPoolId(poolId);
    setLeaderboardOpen(true);
  };

  return (
    <>
      <PageContainer>
        <div className="mb-6">
          <GamesHeader
            onDeployClick={() => setDeployModalOpen(true)}
            onAddTemplateClick={() => setCreateGameOpen(true)}
            onCreatePoolClick={() => setCreatePoolOpen(true)}
          />
        </div>

        <GamesStatsRow stats={gamesData?.gamesStats} loading={loading} />

        <div className="space-y-6">
          {/* Active Arenas (Rounds) Table */}
          <GamesTableSection arenas={gamesData?.arenaInstances} loading={loading} />
          
          {/* Configured Pools Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider text-slate-900 sm:text-xl">
                  Configured Game Pools
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Multiple custom tournament pools provided for players.
                </p>
              </div>
            </div>

            {poolsLoading ? (
              <p className="text-center py-6 text-sm font-bold text-slate-500">Loading pools...</p>
            ) : pools.length === 0 ? (
              <p className="text-center py-6 text-sm font-bold text-slate-400">No custom pools configured. Click "Create New Pool" to start.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Pool Name</th>
                      <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Game Template</th>
                      <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-wider text-slate-500">Entry Fee</th>
                      <th className="px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">Rounds</th>
                      <th className="px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">Capacity</th>
                      <th className="px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-wider text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {pools.map((pool) => (
                      <tr key={pool.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{pool.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                          {pool.game_name} ({pool.game_variation})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-extrabold text-slate-900">₹{pool.entry_fee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-slate-900">
                          {pool.rounds_count} rounds ({pool.round_duration_seconds}s)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-slate-700">
                          {pool.participants_count} / {pool.max_players}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${
                            pool.status === "upcoming" ? "bg-amber-100 text-amber-800" :
                            pool.status === "active" ? "bg-emerald-100 text-emerald-800 animate-pulse" :
                            "bg-slate-100 text-slate-800"
                          }`}>
                            {pool.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium space-x-2">
                          {pool.status === "upcoming" && (
                            <button
                              onClick={() => handleStartPool(pool.id)}
                              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                            >
                              <Play className="h-3 w-3 fill-white" />
                              Start Pool
                            </button>
                          )}
                          {pool.status !== "upcoming" && (
                            <button
                              onClick={() => handleViewLeaderboard(pool.id)}
                              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                            >
                              <Award className="h-3.5 w-3.5 text-slate-500" />
                              Leaderboard
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlobalDeployment regions={gamesData?.deploymentRegions} loading={loading} />
            <LiquidityHealth health={gamesData?.liquidityHealth} loading={loading} />
            <ArenaRiskProfile riskProfile={gamesData?.arenaRiskProfile} loading={loading} />
          </div>
        </div>
      </PageContainer>

      <DeployInstanceModal
        open={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
        onDeploy={handleDeploySuccess}
      />

      <CreateGameModal
        open={createGameOpen}
        onClose={() => setCreateGameOpen(false)}
        onSuccess={() => {
          setCreateGameOpen(false);
          fetchPoolsList();
        }}
      />

      <CreatePoolModal
        open={createPoolOpen}
        onClose={() => setCreatePoolOpen(false)}
        onSuccess={handleCreatePoolSuccess}
      />

      {selectedPoolId && (
        <PoolLeaderboardModal
          open={leaderboardOpen}
          onClose={() => setLeaderboardOpen(false)}
          poolId={selectedPoolId}
        />
      )}
    </>
  );
}
  