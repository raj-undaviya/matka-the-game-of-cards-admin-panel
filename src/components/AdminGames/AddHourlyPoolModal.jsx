import { useState, useRef, useEffect, useCallback } from "react";
import { X, Clock, Sparkles, Trophy, ShieldCheck, ToggleLeft, ToggleRight, Calendar, Hourglass, CheckCircle2 } from "lucide-react";
import gamesApi from "@/api/gamesApi";
import useToast from "@/utils/useToast";

export default function AddHourlyPoolModal({ open, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const toast = useToast();

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [hourlyIntervalHours, setHourlyIntervalHours] = useState(2);
  const [name, setName] = useState("2 Hourly Pool");
  const [entryFee, setEntryFee] = useState(20);
  const [winPrize, setWinPrize] = useState(1200);
  const [maxPlayers, setMaxPlayers] = useState(100);
  const [durationMinutes, setDurationMinutes] = useState(5);
  const [isEntryEnabled, setIsEntryEnabled] = useState(true);
  const [roundsCount, setRoundsCount] = useState(10);
  const [roundDurationSeconds, setRoundDurationSeconds] = useState(30);

  // Prizes
  const [firstPrize, setFirstPrize] = useState(600);
  const [secondPrize, setSecondPrize] = useState(400);
  const [thirdPrize, setThirdPrize] = useState(200);

  const [loading, setLoading] = useState(false);
  const [fetchingGames, setFetchingGames] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleHourlyScheduleChange = (val) => {
    const h = parseInt(val, 10) || 1;
    setHourlyIntervalHours(h);
    setName(`${h} Hourly Pool`);
  };

  const loadGames = useCallback(async () => {
    setFetchingGames(true);
    try {
      const res = await gamesApi.getGamesList();
      const list = Array.isArray(res.data) ? res.data : [];
      setGames(list);
      if (list.length > 0 && !selectedGame) {
        setSelectedGame(list[0].id);
      }
    } catch (err) {
      console.error("Failed to load games list for hourly pool modal:", err);
    } finally {
      setFetchingGames(false);
    }
  }, [selectedGame]);

  useEffect(() => {
    if (open) {
      loadGames();
    }
  }, [open, loadGames]);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClose]);

  // Close modal on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClose]);

  // Auto calculate total prize pool
  useEffect(() => {
    const total = Number(firstPrize || 0) + Number(secondPrize || 0) + Number(thirdPrize || 0);
    if (total > 0) {
      setWinPrize(total);
    }
  }, [firstPrize, secondPrize, thirdPrize]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!selectedGame) {
      toast.error("Please select a game for this hourly pool");
      return;
    }
    if (!name.trim()) {
      toast.error("Pool name is required");
      return;
    }

    const computedHours = Number(hourlyIntervalHours) || 2;
    const totalWinPrize = Number(firstPrize) + Number(secondPrize) + Number(thirdPrize) || winPrize;

    setLoading(true);
    try {
      await gamesApi.createPool({
        game: selectedGame,
        name: name.trim(),
        pool_type: "hourly_pool",
        is_daily_mega: false,
        entry_fee: Number(entryFee),
        win_prize: totalWinPrize,
        max_players: Number(maxPlayers),
        duration_minutes: Number(durationMinutes),
        start_delay_hours: computedHours,
        interval_hours: computedHours,
        interval_minutes: computedHours * 60,
        is_entry_enabled: Boolean(isEntryEnabled),
        daily_start_time: null,
        once_per_day: false,
        is_recurring: true,
        rounds_count: Number(roundsCount),
        round_duration_seconds: Number(roundDurationSeconds),
        prize_distribution: {
          "1": Number(firstPrize),
          "2": Number(secondPrize),
          "3": Number(thirdPrize),
          multipliers: {
            "1": `${Math.round(firstPrize / (entryFee || 1))}x`,
            "2": `${Math.round(secondPrize / (entryFee || 1))}x`,
            "3": `${Math.round(thirdPrize / (entryFee || 1))}x`,
          },
        },
      });

      toast.success(
        `Hourly Pool "${name.trim()}" created successfully! Starts in ${computedHours}h with auto-repeat.`
      );
      onSuccess?.();
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to create hourly pool");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6 transition-all duration-200 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-inner text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-white">
                Add Hourly Pool
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                Add 1 to 10 Hourly recurring pools with live start countdowns for different games
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Step 1: Select Game & Entry Button Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Select Game <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                disabled={fetchingGames}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-bold text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
              >
                {fetchingGames ? (
                  <option>Loading games list...</option>
                ) : games.length === 0 ? (
                  <option value="">No games found</option>
                ) : (
                  games.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} ({g.variation})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Entry Button Status
              </label>
              <div
                onClick={() => setIsEntryEnabled(!isEntryEnabled)}
                className={`flex h-[42px] items-center justify-between px-3.5 rounded-xl border cursor-pointer select-none transition-all ${isEntryEnabled
                    ? "border-emerald-300 bg-emerald-50/70 text-emerald-900"
                    : "border-red-300 bg-red-50/70 text-red-900"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${isEntryEnabled ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                  <span className="text-xs font-black">
                    {isEntryEnabled ? "Entry Enabled (Active)" : "Entry Disabled (Paused)"}
                  </span>
                </div>
                {isEntryEnabled ? (
                  <ToggleRight className="h-6 w-6 text-emerald-600" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-red-500" />
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Pool Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
              Pool Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 2 Hourly Pool"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Step 3: Select Hourly Schedule & Recurrence Dropdown */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-amber-950 mb-1.5 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-700" />
                Select Hourly Schedule & Recurrence <span className="text-red-500">*</span>
              </label>
              <select
                value={hourlyIntervalHours}
                onChange={(e) => handleHourlyScheduleChange(e.target.value)}
                className="w-full rounded-xl border border-amber-300 bg-white px-3.5 py-2.5 text-sm font-extrabold text-slate-900 focus:border-amber-500 focus:outline-none"
              >
                <option value="1">1 Hourly Pool (Starts in 1h • Auto Repeat every 1 hour)</option>
                <option value="2">2 Hourly Pool (Starts in 2h • Auto Repeat every 2 hours)</option>
                <option value="3">3 Hourly Pool (Starts in 3h • Auto Repeat every 3 hours)</option>
                <option value="4">4 Hourly Pool (Starts in 4h • Auto Repeat every 4 hours)</option>
                <option value="5">5 Hourly Pool (Starts in 5h • Auto Repeat every 5 hours)</option>
                <option value="6">6 Hourly Pool (Starts in 6h • Auto Repeat every 6 hours)</option>
                <option value="7">7 Hourly Pool (Starts in 7h • Auto Repeat every 7 hours)</option>
                <option value="8">8 Hourly Pool (Starts in 8h • Auto Repeat every 8 hours)</option>
                <option value="9">9 Hourly Pool (Starts in 9h • Auto Repeat every 9 hours)</option>
                <option value="10">10 Hourly Pool (Starts in 10h • Auto Repeat every 10 hours)</option>
                <option value="12">12 Hourly Pool (Starts in 12h • Auto Repeat every 12 hours)</option>
                <option value="24">24 Hourly Pool (Starts in 24h • Auto Repeat every 24 hours)</option>
              </select>
              <p className="mt-1 text-[11px] font-semibold text-amber-800">
                Select karne par mobile app par button {hourlyIntervalHours} ghante tak <strong>DISABLED</strong> rahega aur {hourlyIntervalHours} ghante baad automatically open ho kar har {hourlyIntervalHours} ghante repeat hoga.
              </p>
            </div>

            {/* Live Preview Bar */}
            <div className="flex items-center justify-between bg-slate-900 text-white p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Hourglass className="h-4 w-4 text-amber-400 animate-spin" />
                <div>
                  <p className="text-[11px] font-bold text-slate-300">Mobile App Button Live Display:</p>
                  <p className="text-xs font-mono font-black text-amber-400">
                    🔒 STARTS IN {String(hourlyIntervalHours).padStart(2, "0")}h:00m
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                Disabled Until {hourlyIntervalHours}h Timer Finishes
              </span>
            </div>
          </div>

          {/* Step 4: Entry Fee, Max Players, Duration */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Entry Fee (₹)</label>
              <input
                type="number"
                min="1"
                value={entryFee}
                onChange={(e) => {
                  const fee = Number(e.target.value) || 0;
                  setEntryFee(fee);
                  setFirstPrize(fee * 30);
                  setSecondPrize(fee * 20);
                  setThirdPrize(fee * 10);
                  setWinPrize(fee * 60);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Max Players</label>
              <input
                type="number"
                min="2"
                max="5000"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Mins)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Step 5: 3-Tier Winner Prizes */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-wide">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>Winner Prizes (Top 3 Multipliers)</span>
              </div>
              <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
                Total Pool: ₹{Number(winPrize).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  🥇 1st Prize (₹) <span className="text-amber-700">({Math.round(firstPrize / (entryFee || 1))}x)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={firstPrize}
                  onChange={(e) => setFirstPrize(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-extrabold text-amber-700 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  🥈 2nd Prize (₹) <span className="text-slate-700">({Math.round(secondPrize / (entryFee || 1))}x)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={secondPrize}
                  onChange={(e) => setSecondPrize(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-extrabold text-slate-800 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  🥉 3rd Prize (₹) <span className="text-amber-800">({Math.round(thirdPrize / (entryFee || 1))}x)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={thirdPrize}
                  onChange={(e) => setThirdPrize(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-extrabold text-amber-900 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200 shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-5 py-2.5 text-xs font-black text-white shadow-md shadow-amber-200/50 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            <Clock className="h-4 w-4" />
            {loading ? "Creating Hourly Pool..." : `+ Add ${hourlyIntervalHours} Hourly Pool`}
          </button>
        </div>
      </div>
    </div>
  );
}
