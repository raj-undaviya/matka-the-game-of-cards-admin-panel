import { useState, useEffect, useRef, useCallback } from "react";
import { X, Trophy, Users, RefreshCw } from "lucide-react";
import gamesApi from "@/api/gamesApi";
import useToast from "@/utils/useToast";

export default function PoolLeaderboardModal({ open, onClose, poolId }) {
  const modalRef = useRef(null);
  const toast = useToast();

  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaderboard = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await gamesApi.getPoolLeaderboard(poolId);
      setLeaderboardData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load leaderboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [poolId]);

  useEffect(() => {
    if (!open || !poolId) return;

    fetchLeaderboard();

    // Poll every 5 seconds to keep leaderboard updated in real time
    const interval = setInterval(() => {
      fetchLeaderboard(true);
    }, 5000);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, poolId, fetchLeaderboard, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px]">
      <section
        ref={modalRef}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-[700px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">
                {leaderboardData?.pool_name || "Pool Leaderboard"}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Status: <span className="font-extrabold uppercase text-slate-900">{leaderboardData?.pool_status || "..."}</span>
                {leaderboardData?.active_round_num && (
                  <span className="ml-3 font-medium text-blue-700">
                     • Round {leaderboardData.active_round_num} / {leaderboardData.rounds_count}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchLeaderboard(true)}
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              title="Refresh standings"
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin text-amber-700" : ""}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </header>

        <div className="overflow-y-auto px-6 py-6 flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="h-10 w-10 animate-spin text-slate-400" />
              <p className="mt-3 text-base font-semibold text-slate-500">Loading standings...</p>
            </div>
          ) : !leaderboardData?.leaderboard || leaderboardData.leaderboard.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Users className="h-12 w-12" />
              <p className="mt-3 text-base font-semibold text-slate-500">No participants registered in this pool yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden border border-slate-200 rounded-lg">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider text-slate-500">Username</th>
                    <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-wider text-slate-500">Points</th>
                    <th className="px-6 py-3 text-right text-xs font-black uppercase tracking-wider text-slate-500">Prizes Paid</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {leaderboardData.leaderboard.map((row, idx) => {
                    const isTopThree = idx < 3;
                    const medalColors = ["bg-amber-100 text-amber-800", "bg-slate-100 text-slate-800", "bg-orange-100 text-orange-800"];
                    
                    return (
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                          {isTopThree ? (
                            <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full font-black ${medalColors[idx]}`}>
                              {idx + 1}
                            </span>
                          ) : (
                            `#${idx + 1}`
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          {row.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-black text-slate-900">
                          {row.total_points}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-extrabold text-emerald-700">
                          {row.reward_paid > 0 ? `₹${parseFloat(row.reward_paid).toFixed(2)}` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded border border-slate-300 bg-white px-8 text-base font-bold text-slate-800 hover:bg-slate-100"
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}
