import { MoreHorizontal, ArrowUpRight } from "lucide-react";

export default function ActivePoolCard({
  poolAmount = "$242,508,122.00",
  growthTrend = "+12.4%",
  targetAmount = "$250.0M",
  totalEntries = "1.84M",
  avgContribution = "$0.14",
  trendValues = [35, 45, 25, 60, 80, 50, 95],
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col justify-between h-full">
      {/* Top section: badge & trend menu */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
            Active Global Pool
          </span>
          
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              7-Day Trend
            </span>
            <button className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Large Jackpot value */}
        <h2 className="text-4xl md:text-5xl font-black text-emerald-600 tracking-tight leading-none mb-3">
          {poolAmount}
        </h2>

        {/* Growth details */}
        <div className="flex items-center gap-2 mb-8">
          <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/50">
            <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
            {growthTrend}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Growth in last 24h
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 pt-6 mt-auto">
        <div className="grid grid-cols-3 gap-4 items-end">
          {/* Sub-metrics stack */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Target Amount
              </span>
              <span className="block text-base font-extrabold text-slate-800">
                {targetAmount}
              </span>
              {/* Colored completion bar indicator */}
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mt-1.5">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: "85%" }} />
              </div>
            </div>

            <div className="space-y-1">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Total Entries
              </span>
              <span className="block text-base font-extrabold text-slate-800">
                {totalEntries}
              </span>
              <span className="block text-[10px] font-bold text-emerald-600 mt-1">
                Active now
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Avg Contribution
              </span>
              <span className="block text-base font-extrabold text-slate-800">
                {avgContribution}
              </span>
              <span className="block text-[10px] font-medium text-slate-400 mt-1">
                Per entry
              </span>
            </div>
          </div>

          {/* Mini 7-day trend chart */}
          <div className="col-span-1 flex items-end justify-between h-20 px-2">
            {trendValues.map((val, idx) => (
              <div
                key={idx}
                className="w-1.5 bg-slate-100 rounded-t-full relative group h-full flex items-end"
              >
                <div
                  className="w-full bg-emerald-600 rounded-t-full transition-all duration-500 hover:bg-emerald-700"
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
