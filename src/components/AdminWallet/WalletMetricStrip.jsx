import { BarChart3, ClipboardList, Trophy } from "lucide-react";
import { walletMiniMetrics as mockMetrics } from "@/data/walletData";

const iconMap = {
  receipt: ClipboardList,
  volume: BarChart3,
  contest: Trophy,
};

export default function WalletMetricStrip({ metrics }) {
  const displayMetrics = metrics || mockMetrics;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {displayMetrics.map((metric) => {
        const Icon = iconMap[metric.iconName] ?? BarChart3;

        return (
          <div
            key={metric.label}
            className="flex min-w-0 items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-500">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                {metric.label}
              </p>
              <p className="mt-1 text-lg font-extrabold text-slate-950">{metric.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
