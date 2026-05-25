import { useState, useEffect } from "react";
import { Timer, Zap, Lock } from "lucide-react";

export default function NextDrawCard({ targetDate }) {
  // Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculateTime() {
      const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return { hours, minutes, seconds };
    }

    // Set initial
    setTimeLeft(calculateTime());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col justify-between h-full">
      {/* Header section */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
              STATUS: STANDBY
            </span>
            <h3 className="text-lg font-black text-slate-800 tracking-tight mt-1">
              Next Draw Sequence
            </h3>
          </div>
          
          <div className="text-emerald-500 bg-emerald-50 p-2 rounded-xl border border-emerald-100/50">
            <Timer className="h-5 w-5" />
          </div>
        </div>

        {/* Timer Blocks */}
        <div className="flex items-center justify-center gap-2 my-8">
          {/* Hours Block */}
          <div className="flex flex-col items-center">

            <div className="h-20 w-15 md:w-20 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-center shadow-inner">
              <span className="text-3xl md:text-4xl font-black text-slate-800 tabular-nums">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-2">
              Hours
            </span>
          </div>

          {/* Colon Separator */}
          <span className="text-2xl font-black text-slate-300 pb-6">:</span>

          {/* Minutes Block */}
          <div className="flex flex-col items-center">
            <div className="h-20 w-16 md:w-20 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-center shadow-inner">
              <span className="text-3xl md:text-4xl font-black text-slate-800 tabular-nums">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-2">
              Mins
            </span>
          </div>

          {/* Colon Separator */}
          <span className="text-2xl font-black text-slate-300 pb-6">:</span>

          {/* Seconds Block */}
          <div className="flex flex-col items-center">
            <div className="h-20 w-16 md:w-20 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-center shadow-inner">
              <span className="text-3xl md:text-4xl font-black text-slate-800 tabular-nums">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-2">
              Secs
            </span>
          </div>
        </div>

        {/* Scheduled info banner */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-center">
          <p className="font-mono text-[11px] font-semibold text-slate-500 uppercase tracking-tight">
            Scheduled auto-trigger at <span className="text-slate-800">00:00:00 UTC</span>
          </p>
        </div>
      </div>

      {/* Button & footer security message */}
      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={() => alert("Manual draw execution sequence initiated.")}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer group"
        >
          <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
          Manual Draw Trigger
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
          <Lock className="h-3 w-3" />
          Multi-Sig Approval Required
        </div>
      </div>
    </div>
  );
}
