import { useState, useRef, useEffect, useCallback } from "react";
import { X, Layers, Plus, Sparkles, Clock, Trophy, ShieldCheck, Hourglass, Calendar, ToggleLeft, ToggleRight, CheckCircle2 } from "lucide-react";
import gamesApi from "@/api/gamesApi";
import useToast from "@/utils/useToast";

export default function CreatePoolModal({ open, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const toast = useToast();

  const [poolType, setPoolType] = useState("mega_daily"); // mega_daily, regular_pool, hourly_pool, standard
  const [hourlyIntervalHours, setHourlyIntervalHours] = useState(2); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10...
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [name, setName] = useState("Daily Mega Pool");
  const [entryFee, setEntryFee] = useState(200);
  const [winPrize, setWinPrize] = useState(12000);
  const [maxPlayers, setMaxPlayers] = useState(150);
  const [durationMinutes, setDurationMinutes] = useState(5);
  const [dailyStartTime, setDailyStartTime] = useState("13:30");
  const [startDelayHours, setStartDelayHours] = useState(2);
  const [intervalHours, setIntervalHours] = useState(2);
  const [isEntryEnabled, setIsEntryEnabled] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [oncePerDay, setOncePerDay] = useState(true);
  const [roundsCount, setRoundsCount] = useState(10);
  const [roundDurationSeconds, setRoundDurationSeconds] = useState(30);

  // Prizes
  const [firstPrize, setFirstPrize] = useState(6000);
  const [secondPrize, setSecondPrize] = useState(4000);
  const [thirdPrize, setThirdPrize] = useState(2000);

  const [loading, setLoading] = useState(false);
  const [fetchingGames, setFetchingGames] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const applyMegaPoolPreset = useCallback((gameList = games) => {
    setPoolType("mega_daily");
    setName("Daily Mega Pool");
    setEntryFee(200);
    setWinPrize(12000);
    setMaxPlayers(150);
    setDurationMinutes(5);
    setDailyStartTime("13:30");
    setIsRecurring(false);
    setOncePerDay(true);
    setIsEntryEnabled(true);
    setRoundsCount(10);
    setRoundDurationSeconds(30);
    setFirstPrize(6000);
    setSecondPrize(4000);
    setThirdPrize(2000);

    const pairGame = gameList.find((g) => g.variation === "V2" || g.name?.toLowerCase().includes("pair"));
    if (pairGame) {
      setSelectedGame(pairGame.id);
    } else if (gameList.length > 0 && !selectedGame) {
      setSelectedGame(gameList[0].id);
    }
  }, [games, selectedGame]);

  const applyRegularPoolPreset = useCallback((gameList = games) => {
    setPoolType("regular_pool");
    setName("Regular Pool");
    setEntryFee(10);
    setWinPrize(600);
    setMaxPlayers(500);
    setDurationMinutes(5);
    setIsRecurring(true);
    setOncePerDay(false);
    setIsEntryEnabled(true);
    setRoundsCount(10);
    setRoundDurationSeconds(30);
    setFirstPrize(300);
    setSecondPrize(200);
    setThirdPrize(100);

    const pairGame = gameList.find((g) => g.variation === "V2" || g.name?.toLowerCase().includes("pair"));
    if (pairGame) {
      setSelectedGame(pairGame.id);
    } else if (gameList.length > 0 && !selectedGame) {
      setSelectedGame(gameList[0].id);
    }
  }, [games, selectedGame]);

  const applyHourlyPoolPreset = useCallback((hours = 2, gameList = games) => {
    const h = parseInt(hours, 10) || 2;
    setPoolType("hourly_pool");
    setHourlyIntervalHours(h);
    setName(`${h} Hourly Pool`);
    setEntryFee(20);
    setWinPrize(1200);
    setMaxPlayers(100);
    setDurationMinutes(5);
    setStartDelayHours(h);
    setIntervalHours(h);
    setIsRecurring(true);
    setOncePerDay(false);
    setIsEntryEnabled(true);
    setRoundsCount(10);
    setRoundDurationSeconds(30);
    setFirstPrize(600);
    setSecondPrize(400);
    setThirdPrize(200);

    if (gameList.length > 0 && !selectedGame) {
      setSelectedGame(gameList[0].id);
    }
  }, [games, selectedGame]);

  const handleHourlyScheduleChange = (val) => {
    const h = parseInt(val, 10) || 1;
    setHourlyIntervalHours(h);
    setStartDelayHours(h);
    setIntervalHours(h);
    setName(`${h} Hourly Pool`);
  };

  const applyStandardPreset = useCallback((gameList = games) => {
    setPoolType("standard");
    setName("Custom Contest Pool");
    setEntryFee(100);
    setWinPrize(1000);
    setMaxPlayers(100);
    setDurationMinutes(5);
    setIsRecurring(true);
    setOncePerDay(false);
    setIsEntryEnabled(true);
    setRoundsCount(10);
    setRoundDurationSeconds(30);
    setFirstPrize(500);
    setSecondPrize(300);
    setThirdPrize(200);
    if (gameList.length > 0 && !selectedGame) {
      setSelectedGame(gameList[0].id);
    }
  }, [games, selectedGame]);

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

    const isMega = poolType === "mega_daily";
    const isRegular = poolType === "regular_pool";
    const isHourly = poolType === "hourly_pool";
    const totalWinPrize = (isMega || isRegular || isHourly)
      ? Number(firstPrize) + Number(secondPrize) + Number(thirdPrize)
      : winPrize;

    let computedStartDelay = 0;
    let computedInterval = 0;

    if (isHourly) {
      computedStartDelay = Number(hourlyIntervalHours) || 2;
      computedInterval = Number(hourlyIntervalHours) || 2;
    }

    setLoading(true);
    try {
      await gamesApi.createPool({
        game: selectedGame,
        name: name.trim(),
        pool_type: isMega ? "mega_daily" : (isHourly ? "hourly_pool" : poolType),
        is_daily_mega: isMega,
        entry_fee: Number(entryFee),
        win_prize: totalWinPrize,
        max_players: Number(maxPlayers),
        duration_minutes: Number(durationMinutes),
        start_delay_hours: computedStartDelay,
        interval_hours: computedInterval,
        interval_minutes: computedInterval * 60,
        is_entry_enabled: Boolean(isEntryEnabled),
        daily_start_time: isMega ? `${dailyStartTime}:00` : null,
        once_per_day: isMega ? true : oncePerDay,
        is_recurring: isMega ? false : isRecurring,
        rounds_count: Number(roundsCount),
        round_duration_seconds: Number(roundDurationSeconds),
        prize_distribution: (isMega || isRegular || isHourly)
          ? {
            "1": Number(firstPrize),
            "2": Number(secondPrize),
            "3": Number(thirdPrize),
            multipliers: {
              "1": `${Math.round(firstPrize / (entryFee || 1))}x`,
              "2": `${Math.round(secondPrize / (entryFee || 1))}x`,
              "3": `${Math.round(thirdPrize / (entryFee || 1))}x`,
            },
          }
          : {},
      });

      toast.success(
        isMega
          ? "Daily Mega Pool created successfully!"
          : isHourly
            ? `${hourlyIntervalHours} Hourly Pool created successfully! Starts in ${computedStartDelay}h with auto-repeat.`
            : isRegular
              ? "Regular Pool created successfully!"
              : "Contest Pool created successfully!"
      );
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to create pool");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/40 px-3 py-4 backdrop-blur-[6px]">
      <section
        ref={modalRef}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shrink-0">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-400 text-slate-950 shadow-md">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide">Create Contest Pool</h2>
              <p className="mt-0.5 text-xs font-medium text-slate-300">
                Configure Daily Mega Pools, Regular 5-Min Pools, Hourly Interval Pools, or Custom Tournament Slots.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-5 space-y-4 text-slate-900">
          {/* Pool Type Selection Preset Tabs */}
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-700">
              Pool Type Preset
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {/* Preset 1: Mega Daily */}
              <button
                type="button"
                onClick={() => applyMegaPoolPreset()}
                className={`flex flex-col items-start gap-2 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${poolType === "mega_daily"
                  ? "border-amber-500 bg-amber-50/80 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg shrink-0 ${poolType === "mega_daily" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  {poolType === "mega_daily" && <CheckCircle2 className="h-4 w-4 text-amber-600" />}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-amber-950">Pool 1: Mega Daily</p>
                  <p className="text-[10px] font-semibold text-slate-500 mt-0.5">1:30 PM • 150 Pl • ₹200</p>
                </div>
              </button>

              {/* Preset 2: Regular Pool */}
              <button
                type="button"
                onClick={() => applyRegularPoolPreset()}
                className={`flex flex-col items-start gap-2 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${poolType === "regular_pool"
                  ? "border-emerald-500 bg-emerald-50/80 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg shrink-0 ${poolType === "regular_pool" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                    <Trophy className="h-4 w-4" />
                  </div>
                  {poolType === "regular_pool" && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-emerald-950">Pool 2: Regular</p>
                  <p className="text-[10px] font-semibold text-slate-500 mt-0.5">5-Min Slots • 500 Pl • ₹10</p>
                </div>
              </button>

              {/* Preset 3: Hourly Pool */}
              <button
                type="button"
                onClick={() => applyHourlyPoolPreset(hourlyIntervalHours || 2)}
                className={`flex flex-col items-start gap-2 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${poolType === "hourly_pool"
                  ? "border-indigo-600 bg-indigo-50/80 shadow-sm ring-2 ring-indigo-500/20"
                  : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg shrink-0 ${poolType === "hourly_pool" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                    <Clock className="h-4 w-4" />
                  </div>
                  {poolType === "hourly_pool" && <CheckCircle2 className="h-4 w-4 text-indigo-600" />}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-indigo-950">Pool 3: Hourly Pool</p>
                  <p className="text-[10px] font-semibold text-indigo-700 mt-0.5">1h to 10h • Auto Repeat</p>
                </div>
              </button>

              {/* Preset 4: Custom Pool */}
              <button
                type="button"
                onClick={() => applyStandardPreset()}
                className={`flex flex-col items-start gap-2 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${poolType === "standard"
                  ? "border-purple-600 bg-purple-50/80 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg shrink-0 ${poolType === "standard" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                    <Layers className="h-4 w-4" />
                  </div>
                  {poolType === "standard" && <CheckCircle2 className="h-4 w-4 text-purple-600" />}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-900">Custom Pool</p>
                  <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Continuous auto-slots</p>
                </div>
              </button>
            </div>
          </div>

          {/* Game Selection & Entry Button Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-700">
                Select Game <span className="text-red-500">*</span>
              </label>
              {fetchingGames ? (
                <p className="text-sm font-semibold text-slate-500">Loading games...</p>
              ) : games.length === 0 ? (
                <p className="text-sm font-semibold text-red-500">No active game templates found.</p>
              ) : (
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-bold text-slate-950 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/15"
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
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-700">
                Entry Button Status
              </label>
              <div
                onClick={() => setIsEntryEnabled(!isEntryEnabled)}
                className={`flex h-11 items-center justify-between px-3.5 rounded-xl border cursor-pointer select-none transition-all ${isEntryEnabled
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

          {/* Pool Name */}
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-700">
              Pool Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 2 Hourly Pool, Daily Mega Pool or Regular Pool"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-bold text-slate-950 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/15"
            />
          </div>

          {/* Hourly Schedule & Recurrence Dropdown (Positioned directly under Pool Name for Hourly Pool) */}
          {poolType === "hourly_pool" && (
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-indigo-950 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  Select Hourly Schedule & Recurrence <span className="text-red-500">*</span>
                </label>
                <select
                  value={hourlyIntervalHours}
                  onChange={(e) => handleHourlyScheduleChange(e.target.value)}
                  className="h-11 w-full rounded-xl border border-indigo-300 bg-white px-3.5 text-sm font-extrabold text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
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
                <p className="mt-1 text-[11px] font-semibold text-indigo-800">
                  Select karne par button {hourlyIntervalHours} ghante tak <strong>DISABLED</strong> rahega aur {hourlyIntervalHours} ghante baad automatically entry open ho jayegi, phir auto-repeat chalega.
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
          )}

          {/* Entry Fee & Capacity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-700">
                Entry Fee (₹)
              </label>
              <input
                type="number"
                value={entryFee}
                onChange={(e) => {
                  const fee = parseInt(e.target.value, 10) || 0;
                  setEntryFee(fee);
                  if (poolType === "mega_daily" || poolType === "regular_pool" || poolType === "hourly_pool") {
                    setFirstPrize(fee * 30);
                    setSecondPrize(fee * 20);
                    setThirdPrize(fee * 10);
                    setWinPrize(fee * 60);
                  } else {
                    setWinPrize(fee * 10);
                  }
                }}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-bold text-slate-950 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/15"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-700">
                Max Players
              </label>
              <input
                type="number"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(parseInt(e.target.value, 10) || 0)}
                placeholder="100"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-bold text-slate-950 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/15"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-700">
                Duration (Minutes)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10) || 1)}
                placeholder="5"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-bold text-slate-950 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/15"
              />
            </div>
          </div>

          {/* Winner Payout Structure */}
          {poolType === "mega_daily" || poolType === "regular_pool" || poolType === "hourly_pool" ? (
            <div className={`rounded-xl border p-4 space-y-3 ${poolType === "mega_daily"
                ? "border-amber-200 bg-amber-50/50"
                : poolType === "hourly_pool"
                  ? "border-indigo-200 bg-indigo-50/50"
                  : "border-emerald-200 bg-emerald-50/50"
              }`}>
              <div className="flex items-center justify-between">
                <p className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${poolType === "mega_daily" ? "text-amber-900" : poolType === "hourly_pool" ? "text-indigo-900" : "text-emerald-900"
                  }`}>
                  <Trophy className={`h-4 w-4 ${poolType === "mega_daily" ? "text-amber-600" : poolType === "hourly_pool" ? "text-indigo-600" : "text-emerald-600"}`} />
                  Winner Payout Structure (Top 3 Multipliers)
                </p>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${poolType === "mega_daily" ? "text-amber-700 bg-amber-100" : poolType === "hourly_pool" ? "text-indigo-700 bg-indigo-100" : "text-emerald-700 bg-emerald-100"
                  }`}>
                  Total Prize: ₹{Number(firstPrize) + Number(secondPrize) + Number(thirdPrize)}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className={`bg-white p-3 rounded-lg border ${poolType === "mega_daily" ? "border-amber-200" : poolType === "hourly_pool" ? "border-indigo-200" : "border-emerald-200"
                  }`}>
                  <span className={`text-[11px] font-black uppercase ${poolType === "mega_daily" ? "text-amber-700" : poolType === "hourly_pool" ? "text-indigo-700" : "text-emerald-700"
                    }`}>
                    🥇 1st Winner ({Math.round(firstPrize / (entryFee || 1))}x)
                  </span>
                  <div className="mt-1 flex items-center">
                    <span className="text-xs font-bold text-slate-500 mr-1">₹</span>
                    <input
                      type="number"
                      value={firstPrize}
                      onChange={(e) => setFirstPrize(parseInt(e.target.value, 10) || 0)}
                      className="w-full font-black text-slate-900 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className={`bg-white p-3 rounded-lg border ${poolType === "mega_daily" ? "border-amber-200" : poolType === "hourly_pool" ? "border-indigo-200" : "border-emerald-200"
                  }`}>
                  <span className="text-[11px] font-black text-slate-700 uppercase">
                    🥈 2nd Winner ({Math.round(secondPrize / (entryFee || 1))}x)
                  </span>
                  <div className="mt-1 flex items-center">
                    <span className="text-xs font-bold text-slate-500 mr-1">₹</span>
                    <input
                      type="number"
                      value={secondPrize}
                      onChange={(e) => setSecondPrize(parseInt(e.target.value, 10) || 0)}
                      className="w-full font-black text-slate-900 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className={`bg-white p-3 rounded-lg border ${poolType === "mega_daily" ? "border-amber-200" : poolType === "hourly_pool" ? "border-indigo-200" : "border-emerald-200"
                  }`}>
                  <span className={`text-[11px] font-black uppercase ${poolType === "mega_daily" ? "text-amber-800" : poolType === "hourly_pool" ? "text-indigo-800" : "text-emerald-800"
                    }`}>
                    🥉 3rd Winner ({Math.round(thirdPrize / (entryFee || 1))}x)
                  </span>
                  <div className="mt-1 flex items-center">
                    <span className="text-xs font-bold text-slate-500 mr-1">₹</span>
                    <input
                      type="number"
                      value={thirdPrize}
                      onChange={(e) => setThirdPrize(parseInt(e.target.value, 10) || 0)}
                      className="w-full font-black text-slate-900 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {poolType === "mega_daily" ? (
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-700" />
                    <label className="text-xs font-bold text-slate-800">Daily Open Time:</label>
                    <input
                      type="time"
                      value={dailyStartTime}
                      onChange={(e) => setDailyStartTime(e.target.value)}
                      className="h-8 rounded border border-amber-300 bg-white px-2 text-xs font-bold text-slate-900"
                    />
                    <span className="text-xs font-bold text-amber-800">(1:30 PM Afternoon)</span>
                  </div>
                </div>
              ) : poolType === "hourly_pool" ? (
                <p className="text-[11px] font-semibold text-indigo-900 flex items-center gap-1.5 pt-0.5">
                  <Clock className="h-3.5 w-3.5 text-indigo-600" />
                  {hourlyIntervalHours} Hourly automatic recurring pool. Button stays locked with live countdown until start, then auto-repeats every {hourlyIntervalHours} hours.
                </p>
              ) : (
                <p className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5 pt-0.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" />
                  5-minute countdown. Automatically resolves and spawns next continuous slot (Slot #1 → #2 → #3...)
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-700">
                Total Win Prize Pool (₹)
              </label>
              <input
                type="number"
                value={winPrize}
                onChange={(e) => setWinPrize(parseInt(e.target.value, 10) || 0)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-bold text-slate-950 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/15"
              />
            </div>
          )}

          {/* Rules and Behavior Flags */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            {poolType === "hourly_pool" ? (
              <div className="flex items-start gap-2.5 text-xs text-indigo-900 font-semibold bg-indigo-50/80 p-3 rounded-xl border border-indigo-200">
                <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Hourly Pool Rules & Settings:</p>
                  <ul className="list-disc list-inside mt-0.5 text-[11px] text-slate-700 space-y-0.5">
                    <li>Entry button displays <span className="font-bold font-mono text-indigo-950">"STARTS IN {String(hourlyIntervalHours).padStart(2, '0')}h:00m"</span> and stays <strong>DISABLED</strong> until the {hourlyIntervalHours}-hour countdown reaches 00h:00m.</li>
                    <li>Countdown khatam hote hi entry button automatically open ho jayega.</li>
                    <li>Har {hourlyIntervalHours} ghante ke baad pool auto-repeat hoga.</li>
                  </ul>
                </div>
              </div>
            ) : poolType === "mega_daily" ? (
              <div className="flex items-start gap-2.5 text-xs text-amber-900 font-semibold bg-amber-50/80 p-3 rounded-xl border border-amber-200">
                <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Daily Mega Pool Rules Enforced:</p>
                  <ul className="list-disc list-inside mt-0.5 text-[11px] text-slate-600 space-y-0.5">
                    <li>Entry window is exactly 5 minutes (max 150 players).</li>
                    <li>Players can enter only once per day.</li>
                    <li>Opens again the next day at 1:30 PM.</li>
                  </ul>
                </div>
              </div>
            ) : poolType === "regular_pool" ? (
              <div className="flex items-start gap-2.5 text-xs text-emerald-900 font-semibold bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Pool 2 — Regular Pool Rules:</p>
                  <ul className="list-disc list-inside mt-0.5 text-[11px] text-slate-600 space-y-0.5">
                    <li>Max 500 players per slot, ₹10 entry fee.</li>
                    <li>1st: ₹300 (30x) | 2nd: ₹200 (20x) | 3rd: ₹100 (10x).</li>
                    <li>Continuous 5-minute recurrence (Slot #1 → Slot #2 → Slot #3...).</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isRecurring"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500/15"
                />
                <label htmlFor="isRecurring" className="text-xs font-bold text-slate-800">
                  Auto-Spawn Next Slot upon countdown completion (Continuous recurrence)
                </label>
              </div>
            )}
          </div>
        </form>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="h-11 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || games.length === 0 || !name.trim()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-700 hover:bg-purple-800 px-6 text-sm font-extrabold text-white shadow-md disabled:opacity-50 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            {loading ? "Creating..." : poolType === "mega_daily" ? "Create Daily Mega Pool" : poolType === "hourly_pool" ? `Create ${name}` : poolType === "regular_pool" ? "Create Regular Pool" : "Create Pool"}
          </button>
        </footer>
      </section>
    </div>
  );
}
