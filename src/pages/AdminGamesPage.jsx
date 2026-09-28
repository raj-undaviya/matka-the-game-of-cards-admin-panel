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
import AddHourlyPoolModal from "@/components/AdminGames/AddHourlyPoolModal";
import PoolLeaderboardModal from "@/components/AdminGames/PoolLeaderboardModal";
import gamesApi from "@/api/gamesApi";
import { mapGamesResponse } from "@/services/gamesService";
import useToast from "@/utils/useToast";
import { Plus, Play, Award, Layers, Clock } from "lucide-react";

export default function AdminGamesPage() {
  const toast = useToast();
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [createPoolOpen, setCreatePoolOpen] = useState(false);
  const [addHourlyPoolOpen, setAddHourlyPoolOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [selectedPoolId, setSelectedPoolId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState(null);
  const [gamesList, setGamesList] = useState([]);
  const [gamesListLoading, setGamesListLoading] = useState(false);
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

  const fetchGamesList = useCallback(async () => {
    setGamesListLoading(true);
    try {
      const res = await gamesApi.getGamesList();
      setGamesList(res.data);
    } catch (err) {
      console.error("Failed to load games list:", err);
    } finally {
      setGamesListLoading(false);
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
    fetchGamesList();
    fetchPoolsList();
  }, [fetchGamesData, fetchGamesList, fetchPoolsList]);

  const handleDeploySuccess = () => {
    setDeployModalOpen(false);
    fetchGamesData();
  };

  const handleCreateGameSuccess = () => {
    setCreateGameOpen(false);
    fetchGamesList();
  };

  const handleCreatePoolSuccess = () => {
    setCreatePoolOpen(false);
    setAddHourlyPoolOpen(false);
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

  const handleToggleEntry = async (poolId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await gamesApi.togglePoolEntry(poolId, newStatus);
      toast.success(`Pool entry ${newStatus ? "enabled (Button Open)" : "disabled (Button Locked)"} successfully!`);
      // Update local state immediately
      setPools((prevPools) =>
        prevPools.map((p) => (p.id === poolId ? { ...p, is_entry_enabled: newStatus } : p))
      );
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to update pool entry status");
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
            onAddHourlyPoolClick={() => setAddHourlyPoolOpen(true)}
          />
        </div>

        <GamesStatsRow stats={gamesData?.gamesStats} loading={loading} />

        <div className="space-y-6">
          {/* Active Arenas (Rounds) Table */}
          <GamesTableSection arenas={gamesData?.arenaInstances} loading={loading} />

          {/* Configured Dynamic Games Templates Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider text-slate-900 sm:text-xl">
                  Dynamic Game Templates
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Manage active games, graphics, multipliers, and descriptions for the Mobile App.
                </p>
              </div>
              <button
                onClick={() => setCreateGameOpen(true)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-xs font-bold text-white shadow-sm hover:bg-blue-800 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Game
              </button>
            </div>

            {gamesListLoading ? (
              <p className="text-center py-6 text-sm font-bold text-slate-500">Loading games...</p>
            ) : gamesList.length === 0 ? (
              <p className="text-center py-6 text-sm font-bold text-slate-400">No game templates found. Click "Add Game" to create one.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Game Name</th>
                      <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Variation</th>
                      <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Description</th>
                      <th className="px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {gamesList.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-900 text-amber-400 font-extrabold text-sm border border-slate-700">
                              {g.variation}
                            </div>
                            <div>
                              <p className="text-sm font-extrabold text-slate-900">{g.name}</p>
                              <p className="text-xs text-slate-500">{g.image_url || 'Default Medal'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                          {g.variation}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600">
                          {g.description || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${g.is_active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                            }`}>
                            {g.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Configured Pools Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider text-slate-900 sm:text-xl">
                  Configured Game Pools
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Multiple custom tournament pools with 2-Hour/3-Hour intervals, Daily schedules, and instant Entry Button control.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setCreatePoolOpen(true)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 text-xs font-bold text-white shadow-sm hover:bg-purple-800 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Create Pool
                </button>
                <button
                  onClick={() => setAddHourlyPoolOpen(true)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 text-xs font-bold text-white shadow-sm hover:bg-amber-700 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Clock className="h-4 w-4" />
                  Add Hourly Pool
                </button>
              </div>
            </div>

            {poolsLoading ? (
              <p className="text-center py-6 text-sm font-bold text-slate-500">Loading pools...</p>
            ) : pools.length === 0 ? (
              <p className="text-center py-6 text-sm font-bold text-slate-400">No custom pools configured. Click "Create Pool" or "Add Hourly Pool" to start.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Pool Name</th>
                      <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Game Template</th>
                      <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-wider text-slate-500">Entry & Prizes</th>
                      <th className="px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">Schedule / Countdown</th>
                      <th className="px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">Capacity</th>
                      <th className="px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">Entry Button Control</th>
                      <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-wider text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {pools.map((pool) => {
                      const isMega = pool.is_daily_mega || pool.pool_type === "mega_daily";
                      const isRegular = pool.pool_type === "regular_pool" || pool.pool_type === "regular_5min" || (pool.name && pool.name.includes("Regular"));
                      const isHourly = !isRegular && !isMega && (pool.pool_type === "hourly_pool" || pool.pool_type === "hourly" || (pool.interval_minutes && pool.interval_minutes >= 60));
                      const p1 = Number(pool.prize_distribution?.["1"] || (isMega ? 6000 : (isRegular ? 300 : pool.entry_fee * 30)));
                      const p2 = Number(pool.prize_distribution?.["2"] || (isMega ? 4000 : (isRegular ? 200 : pool.entry_fee * 20)));
                      const p3 = Number(pool.prize_distribution?.["3"] || (isMega ? 2000 : (isRegular ? 100 : pool.entry_fee * 10)));
                      const entryEnabled = pool.is_entry_enabled !== false;

                      return (
                        <tr key={pool.id} className={`hover:bg-slate-50/50 ${isMega ? "bg-amber-50/30" : isHourly ? "bg-amber-50/20" : isRegular ? "bg-emerald-50/20" : ""}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-slate-900">{pool.name}</span>
                              {isMega && (
                                <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-800 border border-amber-300">
                                  ⭐ Daily
                                </span>
                              )}
                              {isHourly && (
                                <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-800 border border-amber-300">
                                  ⏱️ {pool.interval_minutes ? `${pool.interval_minutes / 60}h Interval` : "Hourly"}
                                </span>
                              )}
                              {isRegular && !isHourly && (
                                <span className="inline-flex items-center rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 border border-emerald-300">
                                  🎯 5-Min Slot
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">
                              {pool.schedule_display || "Auto-Recurring"}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                            {pool.game_name} ({pool.game_variation})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <p className="font-extrabold text-slate-900">₹{pool.entry_fee}</p>
                            {p1 > 0 ? (
                              <p className="text-[11px] font-bold text-purple-700">
                                🥇 ₹{p1.toLocaleString()} | 🥈 ₹{p2.toLocaleString()} | 🥉 ₹{p3.toLocaleString()}
                              </p>
                            ) : (
                              <p className="text-xs font-semibold text-slate-500">
                                Total: ₹{Number(pool.win_prize).toLocaleString()}
                              </p>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-slate-900">
                            <div className="inline-flex flex-col items-center">
                              <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                                {pool.countdown_label || pool.schedule_display || "Active"}
                              </span>
                              {pool.starts_in_seconds > 0 && (
                                <span className="text-[10px] text-amber-700 font-bold mt-0.5">
                                  Locked until start
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-slate-700">
                            <span className={pool.participants_count >= pool.max_players ? "text-red-600 font-black" : "font-extrabold text-slate-900"}>
                              {pool.participants_count}
                            </span>
                            <span className="text-slate-500"> / {pool.max_players}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleEntry(pool.id, entryEnabled)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${entryEnabled
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                                  : "bg-red-50 text-red-800 border-red-300 hover:bg-red-100"
                                }`}
                            >
                              <span className={`h-2 w-2 rounded-full ${entryEnabled ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                              {entryEnabled ? "Entry OPEN (Click to Disable)" : "Entry LOCKED (Click to Enable)"}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium space-x-2">
                            {pool.status === "upcoming" && pool.starts_in_seconds === 0 && (
                              <button
                                onClick={() => handleStartPool(pool.id)}
                                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                              >
                                <Play className="h-3 w-3 fill-white" />
                                Start Now
                              </button>
                            )}
                            <button
                              onClick={() => handleViewLeaderboard(pool.id)}
                              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                            >
                              <Award className="h-3.5 w-3.5 text-slate-500" />
                              Leaderboard
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
        onSuccess={handleCreateGameSuccess}
      />

      <CreatePoolModal
        open={createPoolOpen}
        onClose={() => setCreatePoolOpen(false)}
        onSuccess={handleCreatePoolSuccess}
      />

      <AddHourlyPoolModal
        open={addHourlyPoolOpen}
        onClose={() => setAddHourlyPoolOpen(false)}
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
