import { Shield, ArrowUpRight } from "lucide-react";

export default function AverageRiskCard({
  averageRisk = 24.8,
  riskDelta = "+3.2%",
  highRiskAlerts = 12,
  blockedIps = "1,402",
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header Title & Icon */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Average Platform Risk
          </span>
          <div className="text-emerald-500 bg-emerald-50 p-1.5 rounded-lg">
            <Shield className="h-5 w-5" />
          </div>
        </div>

        {/* Big Number & Delta Trend */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {averageRisk}%
          </span>
          <span className="flex items-center text-sm font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
            {riskDelta}
          </span>
        </div>

        {/* Threshold Assessment text */}
        <p className="text-xs italic text-slate-500 mt-1">
          Score remains within 'Nominal' threshold.
        </p>
      </div>

      {/* Nested stats panels at the bottom */}
      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
        <div className="bg-slate-50/70 hover:bg-slate-50 rounded-xl p-4 transition-all duration-200 border border-slate-100/50">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            High Risk Alerts
          </span>
          <span className="text-2xl font-black text-red-500">
            {highRiskAlerts}
          </span>
        </div>
        
        <div className="bg-slate-50/70 hover:bg-slate-50 rounded-xl p-4 transition-all duration-200 border border-slate-100/50">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Blocked IPs
          </span>
          <span className="text-2xl font-black text-slate-800">
            {blockedIps}
          </span>
        </div>
      </div>
    </div>
  );
}
