import { useState, useRef, useEffect, useCallback } from "react";
import { X, Layers, Plus } from "lucide-react";
import gamesApi from "@/api/gamesApi";
import useToast from "@/utils/useToast";

export default function CreatePoolModal({ open, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const toast = useToast();

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [name, setName] = useState("");
  const [entryFee, setEntryFee] = useState(10);
  const [maxPlayers, setMaxPlayers] = useState(100);
  const [durationMinutes, setDurationMinutes] = useState(5);
  const [roundsCount, setRoundsCount] = useState(10);
  const [roundDurationSeconds, setRoundDurationSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [fetchingGames, setFetchingGames] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const fetchGames = async () => {
      setFetchingGames(true);
      try {
        const res = await gamesApi.getGamesList();
        setGames(res.data);
        if (res.data.length > 0) {
          setSelectedGame(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch games list");
      } finally {
        setFetchingGames(false);
      }
    };
    fetchGames();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!selectedGame) {
      toast.error("Please select a game template");
      return;
    }
    if (!name.trim()) {
      toast.error("Pool name is required");
      return;
    }

    setLoading(true);
    try {
      await gamesApi.createPool({
        game: selectedGame,
        name,
        entry_fee: entryFee,
        max_players: maxPlayers,
        duration_minutes: durationMinutes,
        rounds_count: roundsCount,
        round_duration_seconds: roundDurationSeconds,
      });
      toast.success("Game pool created successfully!");
      setName("");
      setEntryFee(10);
      setMaxPlayers(100);
      setDurationMinutes(5);
      setRoundsCount(10);
      setRoundDurationSeconds(30);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to create pool");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px]">
      <section
        ref={modalRef}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-[650px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-700">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Create Game Pool</h2>
              <p className="mt-1 text-sm text-slate-600">Roll out multiple dynamic pools for players.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
              Select Game
            </label>
            {fetchingGames ? (
              <p className="text-sm font-semibold text-slate-500">Loading games...</p>
            ) : games.length === 0 ? (
              <p className="text-sm font-semibold text-red-500">No active game templates found. Please create one first.</p>
            ) : (
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15"
              >
                {games.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({g.variation})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
              Pool Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Daily Mega Pool A"
              className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                Entry Fee (₹)
              </label>
              <input
                type="number"
                value={entryFee}
                onChange={(e) => setEntryFee(parseInt(e.target.value, 10) || 0)}
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                Max Players Capacity
              </label>
              <input
                type="number"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(parseInt(e.target.value, 10) || 0)}
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                Pool Duration (min)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10) || 0)}
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                Rounds Count
              </label>
              <input
                type="number"
                value={roundsCount}
                onChange={(e) => setRoundsCount(parseInt(e.target.value, 10) || 0)}
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                Round Duration (sec)
              </label>
              <input
                type="number"
                value={roundDurationSeconds}
                onChange={(e) => setRoundDurationSeconds(parseInt(e.target.value, 10) || 0)}
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/15"
              />
            </div>
          </div>
        </form>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="h-12 rounded border border-slate-300 bg-white px-6 text-base font-bold text-slate-800 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || games.length === 0 || !name.trim()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-purple-700 px-6 text-base font-extrabold text-white shadow-md hover:bg-purple-800 disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            {loading ? "Creating..." : "Create Pool"}
          </button>
        </footer>
      </section>
    </div>
  );
}
